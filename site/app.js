const root = document.documentElement;
const themeButton = document.querySelector('#theme-toggle');
const themeLabel = document.querySelector('.theme-label');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  themeLabel.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#050605' : '#f2f5ee';
  try { localStorage.setItem('visualmd-site-theme', theme); } catch { /* Storage can be unavailable. */ }
  window.dispatchEvent(new Event('visualmd-theme-change'));
}
let savedTheme;
try { savedTheme = localStorage.getItem('visualmd-site-theme'); } catch { /* Storage can be unavailable. */ }
setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));
themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
document.querySelector('#year').textContent = new Date().getFullYear();

const heroCanvas = document.querySelector('#hero-molecule');
const moleculeCanvas = document.querySelector('#stage-molecule');
const chartCanvas = document.querySelector('#analysis-chart');
const frameRange = document.querySelector('#frame-range');
const frameNumber = document.querySelector('#frame-number');
const heroFrame = document.querySelector('#hero-frame');
const playButton = document.querySelector('#play-toggle');
const playSymbol = document.querySelector('#play-symbol');
const chartTitle = document.querySelector('#chart-title');
const chartSubtitle = document.querySelector('#chart-subtitle');
const chartNote = document.querySelector('#chart-note');
const tabs = [...document.querySelectorAll('[data-chart]')];
const chartCopy = {
  pca: ['CARTESIAN PROJECTION', 'Collective motion', 'Each point is one retained frame. Select a frame below to locate it.', 'PCA projection of all 1,001 stride-5 demo frames'],
  fel: ['PROJECTED OCCUPANCY', 'Energy landscape', 'An exploratory estimate from observed bins; equilibrium is not established.', 'Projected free-energy estimate of the real demo trajectory'],
  rmsd: ['STRUCTURAL DEVIATION', 'RMSD over frames', 'Cα RMSD after first-frame alignment, shown in ångströms.', 'C-alpha RMSD of all 1,001 stride-5 demo frames'],
};

let data;
let trace;
let ribbon;
let sheetEnds;
let frameIndex = 0;
let activeChart = 'pca';
let playing = false;
let lastPlayback = 0;
let moleculeDirty = true;
const views = [
  { canvas: heroCanvas, yaw: 0.4, pitch: -0.5, dragging: false, lastX: 0, lastY: 0 },
  { canvas: moleculeCanvas, yaw: -0.4, pitch: 0.6, dragging: false, lastX: 0, lastY: 0 },
];

function palette() {
  const light = root.dataset.theme === 'light';
  return {
    ink: light ? '#1d2c22' : '#e9f5e9',
    muted: light ? '#587061' : '#8fa69a',
    grid: light ? '#d7e3d6' : '#26352e',
    lime: light ? '#36835e' : '#b8fb83',
    teal: light ? '#238578' : '#72e4c4',
    violet: light ? '#7257b0' : '#b4a2fc',
  };
}

function fitCanvas(canvas) {
  const bounds = canvas.getBoundingClientRect();
  const ratio = Math.min(devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.round(bounds.width * ratio));
  const height = Math.max(1, Math.round(bounds.height * ratio));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  const ctx = canvas.getContext('2d');
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  return { ctx, width: bounds.width, height: bounds.height };
}

function colorsAt(t, light) {
  const a = light ? [57, 137, 91] : [188, 252, 130];
  const b = light ? [29, 133, 137] : [103, 223, 204];
  const c = light ? [119, 88, 172] : [173, 143, 245];
  const first = t < .55 ? a : b;
  const second = t < .55 ? b : c;
  const fraction = t < .55 ? t / .55 : (t - .55) / .45;
  return first.map((value, i) => Math.round(value + (second[i] - value) * fraction));
}

let centre = [0, 0, 0];
let extent = 1;
function setMoleculeBounds() {
  const points = trace.subarray(0, data.residue_count * 3);
  const low = [Infinity, Infinity, Infinity];
  const high = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < points.length; i += 3) {
    for (let axis = 0; axis < 3; axis++) {
      low[axis] = Math.min(low[axis], points[i + axis]);
      high[axis] = Math.max(high[axis], points[i + axis]);
    }
  }
  centre = low.map((value, axis) => (value + high[axis]) / 2);
  extent = Math.max(...high.map((value, axis) => value - low[axis])) || 1;
}

function drawMolecule(view) {
  if (!trace || !ribbon) return;
  const { ctx, width, height } = fitCanvas(view.canvas);
  ctx.clearRect(0, 0, width, height);
  if (width < 1 || height < 1) return;
  const points = data.residue_count;
  const offset = frameIndex * points * 3;
  const scale = Math.min(width, height) * (view.canvas === heroCanvas ? .84 : .88) / extent;
  const sineY = Math.sin(view.yaw), cosineY = Math.cos(view.yaw);
  const sineX = Math.sin(view.pitch), cosineX = Math.cos(view.pitch);
  const project = (x, y, z) => {
    x -= centre[0];y -= centre[1];z -= centre[2];
    const rx = x * cosineY + z * sineY;
    const rz = z * cosineY - x * sineY;
    const ry = y * cosineX - rz * sineX;
    const depth = y * sineX + rz * cosineX;
    const perspective = 1.8 / (1.8 + depth / extent);
    return { x: width * .5 + rx * scale * perspective, y: height * .52 - ry * scale * perspective, z: depth };
  };
  const read = (array, residue, axis) => array[offset + residue * 3 + axis];
  const catmull = (a, b, c, d, t) => .5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (-a + 3 * b - 3 * c + d) * t * t * t);
  const sample = (residue, t, state) => {
    const before = Math.max(0, residue - 1);
    const after = Math.min(points - 1, residue + 2);
    const centrePoint = [0, 1, 2].map(axis => catmull(read(trace, before, axis), read(trace, residue, axis), read(trace, residue + 1, axis), read(trace, after, axis), t));
    const direction = [0, 1, 2].map(axis => read(ribbon, residue, axis) * (1 - t) + read(ribbon, residue + 1, axis) * t);
    const length = Math.hypot(...direction) || 1;
    let widthAngstrom = state === 1 ? 1.22 : state === 2 ? 1.45 : .38;
    if (state === 2 && sheetEnds[residue] > 0) {
      const remaining = sheetEnds[residue] - (residue + t);
      if (remaining < 1.3) widthAngstrom *= Math.max(.035, 1.65 * remaining / 1.3);
    }
    const side = direction.map(value => value / length * widthAngstrom);
    return {
      left: project(centrePoint[0] - side[0], centrePoint[1] - side[1], centrePoint[2] - side[2]),
      mid: project(...centrePoint),
      right: project(centrePoint[0] + side[0], centrePoint[1] + side[1], centrePoint[2] + side[2]),
    };
  };
  const light = root.dataset.theme === 'light';
  const shades = light ? [[39, 116, 107], [72, 153, 91], [109, 86, 164]] : [[82, 190, 177], [160, 239, 145], [170, 149, 238]];
  const quads = [];
  const subdivisions = 3;
  for (let i = 0; i < points - 1; i++) {
    const state = data.secondary[i];
    for (let step = 0; step < subdivisions; step++) {
      const a = sample(i, step / subdivisions, state);
      const b = sample(i, (step + 1) / subdivisions, state);
      quads.push({ a, b, state, z: (a.mid.z + b.mid.z) * .5 });
    }
  }
  quads.sort((a, b) => b.z - a.z);
  const polygon = (p1, p2, p3, p4) => {
    ctx.beginPath();ctx.moveTo(p1.x, p1.y);ctx.lineTo(p2.x, p2.y);ctx.lineTo(p3.x, p3.y);ctx.lineTo(p4.x, p4.y);ctx.closePath();ctx.fill();
  };
  ctx.lineCap = 'round';
  for (const quad of quads) {
    const [r, g, b] = shades[quad.state];
    const depthShade = Math.max(.58, Math.min(1.12, .89 - quad.z / (extent * 2)));
    const darken = value => Math.min(255, Math.round(value * depthShade));
    ctx.fillStyle = `rgb(${darken(r * .61)},${darken(g * .61)},${darken(b * .61)})`;
    polygon(quad.a.left, quad.a.mid, quad.b.mid, quad.b.left);
    ctx.fillStyle = `rgb(${darken(r)},${darken(g)},${darken(b)})`;
    polygon(quad.a.mid, quad.a.right, quad.b.right, quad.b.mid);
    if (quad.state !== 0) {
      ctx.strokeStyle = light ? 'rgba(255,255,255,.25)' : 'rgba(255,255,255,.17)';
      ctx.lineWidth = .7;
      ctx.beginPath();ctx.moveTo(quad.a.mid.x, quad.a.mid.y);ctx.lineTo(quad.b.mid.x, quad.b.mid.y);ctx.stroke();
    }
  }
}

function plotArea(width, height) { return { left: 42, right: width - 15, top: 14, bottom: height - 33 }; }
function chartBase(ctx, width, height, xName, yName) {
  const p = palette();
  const area = plotArea(width, height);
  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1;
  ctx.strokeStyle = p.grid;
  for (let step = 0; step <= 4; step++) {
    const y = area.top + (area.bottom - area.top) * step / 4;
    ctx.beginPath();ctx.moveTo(area.left, y);ctx.lineTo(area.right, y);ctx.stroke();
    const x = area.left + (area.right - area.left) * step / 4;
    ctx.beginPath();ctx.moveTo(x, area.top);ctx.lineTo(x, area.bottom);ctx.stroke();
  }
  ctx.font = '10px Geist, sans-serif';ctx.fillStyle = p.muted;
  ctx.fillText(xName, Math.max(area.left, area.right - ctx.measureText(xName).width), height - 8);
  ctx.save();ctx.translate(12, area.top + 34);ctx.rotate(-Math.PI / 2);ctx.fillText(yName, 0, 0);ctx.restore();
  return area;
}
function range(values, padding = .06) {
  const lo = Math.min(...values), hi = Math.max(...values);
  const span = hi - lo || 1;
  return [lo - span * padding, hi + span * padding];
}
function drawChart() {
  if (!data) return;
  const { ctx, width, height } = fitCanvas(chartCanvas);
  if (width < 1 || height < 1) return;
  const p = palette();
  const retained = frameIndex * 10;
  if (activeChart === 'pca') {
    const points = data.pca;
    const [xmin, xmax] = range(points.map(point => point[0]));
    const [ymin, ymax] = range(points.map(point => point[1]));
    const area = chartBase(ctx, width, height, 'PC 01 / Å', 'PC 02 / Å');
    const px = value => area.left + (value - xmin) / (xmax - xmin) * (area.right - area.left);
    const py = value => area.bottom - (value - ymin) / (ymax - ymin) * (area.bottom - area.top);
    for (let i = 0; i < points.length; i++) {
      const t = i / (points.length - 1);
      const [r, g, b] = colorsAt(t, root.dataset.theme === 'light');
      ctx.fillStyle = `rgba(${r},${g},${b},.68)`;
      ctx.beginPath();ctx.arc(px(points[i][0]), py(points[i][1]), 2.1, 0, Math.PI * 2);ctx.fill();
    }
    const selected = points[retained];
    ctx.strokeStyle = p.ink;ctx.lineWidth = 2;
    ctx.fillStyle = p.lime;
    ctx.beginPath();ctx.arc(px(selected[0]), py(selected[1]), 6.5, 0, Math.PI * 2);ctx.fill();ctx.stroke();
  } else if (activeChart === 'fel') {
    const z = data.fel.z;
    const area = chartBase(ctx, width, height, 'PC 01 / Å', 'PC 02 / Å');
    const rows = z.length, cols = z[0].length;
    const finite = z.flat().filter(value => value !== null);
    const maximum = Math.max(...finite, 1);
    const cw = (area.right - area.left) / cols, ch = (area.bottom - area.top) / rows;
    for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
      const value = z[row][col];
      if (value === null) continue;
      const t = Math.max(0, Math.min(1, value / maximum));
      const r = Math.round(174 - t * 118), g = Math.round(250 - t * 150), b = Math.round(134 + t * 87);
      ctx.fillStyle = `rgba(${r},${g},${b},${root.dataset.theme === 'light' ? .76 : .91})`;
      ctx.fillRect(area.left + col * cw, area.bottom - (row + 1) * ch, cw + .5, ch + .5);
    }
    const point = data.pca[retained];
    const [xmin, xmax] = range(data.fel.x, 0), [ymin, ymax] = range(data.fel.y, 0);
    const x = area.left + (point[0] - xmin) / (xmax - xmin) * (area.right - area.left);
    const y = area.bottom - (point[1] - ymin) / (ymax - ymin) * (area.bottom - area.top);
    if (x >= area.left && x <= area.right && y >= area.top && y <= area.bottom) {
      ctx.strokeStyle = p.ink;ctx.lineWidth = 2.2;ctx.fillStyle = p.lime;
      ctx.beginPath();ctx.arc(x, y, 5.5, 0, Math.PI * 2);ctx.fill();ctx.stroke();
    }
    ctx.fillStyle = p.muted;ctx.font = '9px Geist, sans-serif';ctx.fillText('LOW ← kJ/mol → HIGH', area.left + 5, area.top + 14);
  } else {
    const values = data.rmsd;
    const maximum = Math.max(...values) * 1.12;
    const area = chartBase(ctx, width, height, 'SOURCE FRAME', 'RMSD / Å');
    const px = i => area.left + i / (values.length - 1) * (area.right - area.left);
    const py = value => area.bottom - value / maximum * (area.bottom - area.top);
    const fill = ctx.createLinearGradient(0, area.top, 0, area.bottom);
    fill.addColorStop(0, root.dataset.theme === 'light' ? '#2b8c7770' : '#b8fb8360');
    fill.addColorStop(1, '#4f806300');
    ctx.beginPath();ctx.moveTo(px(0), area.bottom);
    for (let i = 0; i < values.length; i++) ctx.lineTo(px(i), py(values[i]));
    ctx.lineTo(px(values.length - 1), area.bottom);ctx.closePath();ctx.fillStyle = fill;ctx.fill();
    ctx.beginPath();ctx.moveTo(px(0), py(values[0]));
    for (let i = 1; i < values.length; i++) ctx.lineTo(px(i), py(values[i]));
    ctx.strokeStyle = p.teal;ctx.lineWidth = 2;ctx.stroke();
    ctx.strokeStyle = p.lime;ctx.globalAlpha = .5;ctx.beginPath();ctx.moveTo(px(retained), area.top);ctx.lineTo(px(retained), area.bottom);ctx.stroke();ctx.globalAlpha = 1;
    ctx.fillStyle = p.lime;ctx.strokeStyle = p.ink;ctx.lineWidth = 2;
    ctx.beginPath();ctx.arc(px(retained), py(values[retained]), 5.5, 0, Math.PI * 2);ctx.fill();ctx.stroke();
  }
}

function setFrame(index) {
  frameIndex = Math.max(0, Math.min(data.preview_frame_count - 1, index));
  moleculeDirty = true;
  frameRange.value = String(frameIndex);
  frameRange.style.setProperty('--range', `${frameIndex / (data.preview_frame_count - 1) * 100}%`);
  frameNumber.textContent = String(frameIndex * data.preview_stride).padStart(4, '0');
  heroFrame.textContent = (frameIndex * data.preview_stride).toLocaleString();
  drawChart();
}
function setChart(name) {
  activeChart = name;
  for (const tab of tabs) {
    const active = tab.dataset.chart === name;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  }
  const [subtitle, title, note, label] = chartCopy[name];
  chartSubtitle.textContent = subtitle;chartTitle.textContent = title;chartNote.textContent = note;
  chartCanvas.setAttribute('aria-label', label);
  document.querySelector('#chart-panel').setAttribute('aria-labelledby', `tab-${name}`);
  drawChart();
}
function setPlaying(value) {
  playing = value;
  playButton.setAttribute('aria-label', playing ? 'Pause preview' : 'Play preview');
  playSymbol.textContent = playing ? 'Ⅱ' : '▶';
  lastPlayback = performance.now();
}

for (const view of views) {
  view.canvas.addEventListener('pointerdown', event => {
    view.dragging = true;view.lastX = event.clientX;view.lastY = event.clientY;
    view.canvas.setPointerCapture(event.pointerId);
  });
  view.canvas.addEventListener('pointermove', event => {
    if (!view.dragging) return;
    view.yaw += (event.clientX - view.lastX) * .009;
    view.pitch = Math.max(-1.4, Math.min(1.4, view.pitch + (event.clientY - view.lastY) * .009));
    moleculeDirty = true;
    view.lastX = event.clientX;view.lastY = event.clientY;
  });
  view.canvas.addEventListener('pointerup', () => { view.dragging = false; });
  view.canvas.addEventListener('pointercancel', () => { view.dragging = false; });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => setChart(tab.dataset.chart));
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next].focus();tabs[next].click();
  });
});
frameRange.addEventListener('input', () => { if (data) setFrame(Number(frameRange.value)); });
playButton.addEventListener('click', () => { if (data) setPlaying(!playing); });

chartCanvas.addEventListener('click', event => {
  if (!data || activeChart !== 'pca') return;
  const rect = chartCanvas.getBoundingClientRect();
  const area = plotArea(rect.width, rect.height);
  const [xmin, xmax] = range(data.pca.map(point => point[0]));
  const [ymin, ymax] = range(data.pca.map(point => point[1]));
  const x = event.clientX - rect.left, y = event.clientY - rect.top;
  let nearest = 0, distance = Infinity;
  for (let i = 0; i < data.pca.length; i++) {
    const point = data.pca[i];
    const px = area.left + (point[0] - xmin) / (xmax - xmin) * (area.right - area.left);
    const py = area.bottom - (point[1] - ymin) / (ymax - ymin) * (area.bottom - area.top);
    const candidate = (px - x) ** 2 + (py - y) ** 2;
    if (candidate < distance) { distance = candidate;nearest = i; }
  }
  setFrame(Math.round(nearest / 10));
});
new ResizeObserver(() => { drawChart(); }).observe(chartCanvas);
for (const view of views) new ResizeObserver(() => { moleculeDirty = true; }).observe(view.canvas);
window.addEventListener('visualmd-theme-change', () => { moleculeDirty = true; drawChart(); });

function tick(now) {
  if (data && !document.hidden) {
    if (playing && now - lastPlayback >= 125) {
      setFrame((frameIndex + 1) % data.preview_frame_count);
      lastPlayback = now;
    }
    const animated = !reduceMotion.matches;
    if (animated || moleculeDirty) {
      for (const view of views) {
        if (animated && !view.dragging) view.yaw += view.canvas === heroCanvas ? .0028 : .0017;
        drawMolecule(view);
      }
      moleculeDirty = false;
    }
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

async function loadPreview() {
  try {
    const [response, binary, directions] = await Promise.all([fetch('./data/preview.json'), fetch('./data/trace.f32'), fetch('./data/ribbon.f32')]);
    if (!response.ok || !binary.ok || !directions.ok) throw new Error('Preview files could not be loaded.');
    data = await response.json();
    trace = new Float32Array(await binary.arrayBuffer());
    ribbon = new Float32Array(await directions.arrayBuffer());
    if (trace.length !== data.preview_frame_count * data.residue_count * 3 || ribbon.length !== trace.length || data.secondary.length !== data.residue_count || data.pca.length !== data.analysis_frame_count) throw new Error('Preview data are incomplete.');
    sheetEnds = new Array(data.residue_count).fill(0);
    for (let i = 0; i < data.residue_count;) {
      if (data.secondary[i] !== 2) { i++;continue; }
      let end = i + 1;
      while (end < data.residue_count && data.secondary[end] === 2) end++;
      for (let j = i; j < end; j++) sheetEnds[j] = end - 1;
      i = end;
    }
    frameRange.max = String(data.preview_frame_count - 1);
    setMoleculeBounds();setFrame(0);
  } catch (error) {
    document.querySelector('.preview-disclosure').textContent = `The interactive demo preview is unavailable: ${error.message}`;
    document.querySelector('.preview-disclosure').setAttribute('role', 'status');
    playButton.disabled = true;frameRange.disabled = true;
  }
}
loadPreview();
