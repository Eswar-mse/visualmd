<div align="center">
  <img src="banner (1).gif" />
</div>
<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Orbitron&weight=900&size=15&duration=3000&pause=100000&color=b7fb82&center=true&vCenter=true&width=900&height=80&lines=SEE+MOLECULAR+MOTION,+FOLLOW+THE+DATA,+AND+EXPORT+THE+STORY,+LOCALLY"/>
</p>
<img src="https://capsule-render.vercel.app/api?type=rect&height=4&color=0:0d0e0d,50:b7fb82,100:0d0e0d" alt="" width="100%"/>
<div align="center">
  
[![Version](https://img.shields.io/badge/version-v0.2.1--preview-b7fb82?style=for-the-badge&labelColor=151716)](https://github.com/Eswar-mse/visualmd/releases/tag/v0.2.1-preview)
[![Platform](https://img.shields.io/badge/platform-Linux%20x86__64-88cc7c?style=for-the-badge&logo=linux&logoColor=b7fb82&labelColor=151716)](#install)
[![Local-first](https://img.shields.io/badge/local--first-127.0.0.1-a490e8?style=for-the-badge&labelColor=151716)](#privacy)
[![License](https://img.shields.io/badge/license-Preview%20EULA-5c8854?style=for-the-badge&labelColor=151716)](#license)

[![Python](https://img.shields.io/badge/Python-3.14-88cc7c?logo=python&logoColor=b7fb82&labelColor=151716)](https://www.python.org/)
[![MDAnalysis](https://img.shields.io/badge/MDAnalysis-2.11.0-88cc7c?labelColor=151716)](https://www.mdanalysis.org/)
[![NumPy](https://img.shields.io/badge/NumPy-2.5.4-88cc7c?logo=numpy&logoColor=b7fb82&labelColor=151716)](https://numpy.org/)
[![SciPy](https://img.shields.io/badge/SciPy-1.18.1-88cc7c?logo=scipy&logoColor=b7fb82&labelColor=151716)](https://scipy.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.162.0-88cc7c?logo=fastapi&logoColor=b7fb82&labelColor=151716)](https://fastapi.tiangolo.com/)
[![Mol*](https://img.shields.io/badge/Mol*-4.18.0-88cc7c?labelColor=151716)](https://molstar.org/)
[![Plotly.js](https://img.shields.io/badge/Plotly.js-3.0.1-88cc7c?logo=plotly&logoColor=b7fb82&labelColor=151716)](https://plotly.com/javascript/)
[![Vite](https://img.shields.io/badge/Vite-6.4.5-88cc7c?logo=vite&logoColor=b7fb82&labelColor=151716)](https://vite.dev/)

[![Website](https://img.shields.io/badge/-Explore%20the%20website-0d0e0d?style=for-the-badge&logo=cloudflarepages&logoColor=b7fb82&labelColor=0d0e0d)](https://visualmd.pages.dev/)
[![Download](https://img.shields.io/badge/-Download%20the%20Linux%20preview-0d0e0d?style=for-the-badge&logo=linux&logoColor=b7fb82&labelColor=0d0e0d)](https://github.com/Eswar-mse/visualmd/releases/tag/v0.2.1-preview)
[![Docs](https://img.shields.io/badge/-Documentation-0d0e0d?style=for-the-badge&logo=readthedocs&logoColor=b7fb82&labelColor=0d0e0d)](DOCUMENTATION.md)

<img src="https://capsule-render.vercel.app/api?type=rect&height=4&color=0:0d0e0d,50:b7fb82,100:0d0e0d" alt="" width="100%"/></div>

<div align="center">
<h3>A Unified Workspace for Molecular Dynamics </h3>


**VisualMD** is a local-first molecular dynamics visualization and exploration workspace that brings protein structures, simulation trajectories, and analytical results together in one interactive environment. Instead of switching between multiple applications to inspect structures, navigate trajectories, and interpret simulation data, VisualMD connects these activities within a unified workspace.


### Core Capabilities

**Interactive Visualization:** Explore protein structures and conformational changes frame by frame.

**Integrated Analysis:** Examine RMSD, RMSF, radius of gyration, contacts, DCCM, PCA, and free-energy landscapes.

**Connected Exploration:** Relate analytical observations to their corresponding molecular conformations.

**Flexible Workflow:** Configure visualization and analysis parameters, and export scientific figures, data, and portable sessions.

**Local-First:** Work with molecular dynamics data directly on your Linux system.

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&height=4&color=0:0d0e0d,50:b7fb82,100:0d0e0d" alt="" width="100%"/>

<div align="center">
<h3> A Visual Preview </h3>
Glimpse of VisualMD through this short visual presentation, and the vision behind the project.

<img src="demo.gif" />
</div>

> The visuals shown are illustrative representations created for the website and project presentation. They are not screen recordings of the actual application interface and should not be interpreted as demonstrations of implemented functionality or scientific results.
<img src="https://capsule-render.vercel.app/api?type=rect&height=4&color=0:0d0e0d,50:b7fb82,100:0d0e0d" alt="" width="100%"/>

<div align="center">
<h3> Installation </h3>
</div>

> **Linux x86_64 only** for `v0.2.1-preview`. No system Python or Node.js is needed; the archive bundles its own runtime. The first `./install.sh` needs internet to fetch pinned scientific packages.

Download **both** files from the [v0.2.1-preview release](https://github.com/Eswar-mse/visualmd/releases/tag/v0.2.1-preview) into one folder, then:

```bash
sha256sum --check visualmd-linux-x86_64-0.2.1-preview.tar.gz.sha256
tar -xzf visualmd-linux-x86_64-0.2.1-preview.tar.gz
cd visualmd-linux-x86_64-0.2.1-preview
./install.sh
visualmd
```

`visualmd` starts the local service on a free port and opens your browser. Keep the terminal open; **Ctrl+C** stops it. Keep the extracted folder, because the `visualmd` command points into it. If the command is not found, run `./visualmd` from that folder.

Choose **Explore the real demo** on the opening screen to try it without any files of your own. Troubleshooting and full details are in the [documentation](DOCUMENTATION.md#download-install-and-launch).

<details>
<summary>Release checksum</summary>

SHA-256 for `visualmd-linux-x86_64-0.2.1-preview.tar.gz`:

```
1f88e39379f2b07755eee1a2ff870a69a9d3bf76d4cc5a16b323b502e392f5f5
```

Verify against the `.sha256` file shipped with the release.

</details>

<img src="https://capsule-render.vercel.app/api?type=rect&height=4&color=0:0d0e0d,50:b7fb82,100:0d0e0d" alt="" width="100%"/>

<div align="center">
<h3>Explore & Analyze </h3>
</div>

<h3> Molecular Visualisation</h3>

Inspect molecular architecture, and switch between structural representations to understand the organization of your system.
<div>&nbsp;</div>
<img src="/assets/rep.png" alt="" width="100%"/>

**Includes**: Interactive 3D structures · Cartoon and atom representations · Residue inspection · Molecular surfaces

<div>&nbsp;</div>
<h3> Trajectory Exploration</h3>

Navigate molecular dynamics trajectories frame by frame and observe how protein conformations evolve over simulation time. Investigate structural changes and explore different conformational states interactively.
<div>&nbsp;</div>
<img src="/assets/visual.gif" alt="" width="100%"/>

**Includes**: Frame-by-frame navigation · Trajectory playback · Structural alignment · Conformational inspection
<div>&nbsp;</div>

<h3> Molecular Dynamics Analysis</h3>

Investigate structural stability, flexibility, residue interactions, and collective molecular motions through integrated analytical tools and visual representations.
<div>&nbsp;</div>
<img src="/assets/analysis.png" alt="" width="100%"/>

**Includes**: RMSD · RMSF · Radius of gyration · Residue contacts · DCCM · PCA · Free-energy landscapes
<div>&nbsp;</div>


<img src="https://capsule-render.vercel.app/api?type=rect&height=4&color=0:0d0e0d,50:b7fb82,100:0d0e0d" alt="" width="100%"/>

<div align="center">
<h3> Real molecular visualization, powered by Mol* </h3>
</div>
<img src="https://github.com/Eswar-mse/visualmd/releases/download/v0.2.1-preview/molecules.gif" alt="" width="100%"/>
<img src="https://capsule-render.vercel.app/api?type=rect&height=4&color=0:0d0e0d,50:b7fb82,100:0d0e0d" alt="" width="100%"/>
<div align="center">

<h3>Analyses</h3>

[![RMSD](https://img.shields.io/badge/RMSD-14532d?style=for-the-badge)](DOCUMENTATION.md#rmsd)
[![RMSF](https://img.shields.io/badge/RMSF-14532d?style=for-the-badge)](DOCUMENTATION.md#rmsf)
[![Radius of gyration](https://img.shields.io/badge/Radius_of_gyration-14532d?style=for-the-badge)](DOCUMENTATION.md#radius-of-gyration)
[![PCA](https://img.shields.io/badge/PCA-14532d?style=for-the-badge)](DOCUMENTATION.md#pca)
[![Free-energy landscape](https://img.shields.io/badge/Free--energy_landscape-14532d?style=for-the-badge)](DOCUMENTATION.md#free-energy-landscape)
[![Residue-centre contacts](https://img.shields.io/badge/Residue--centre_contacts-14532d?style=for-the-badge)](DOCUMENTATION.md#residue-centre-contacts)
[![DCCM](https://img.shields.io/badge/DCCM-14532d?style=for-the-badge)](DOCUMENTATION.md#dccm)
[![SASA](https://img.shields.io/badge/SASA-14532d?style=for-the-badge)](DOCUMENTATION.md#sasa)
[![Secondary structure](https://img.shields.io/badge/Secondary_structure-14532d?style=for-the-badge)](DOCUMENTATION.md#secondary-structure)
[![Hydrogen bonds](https://img.shields.io/badge/Hydrogen_bonds-14532d?style=for-the-badge)](DOCUMENTATION.md#hydrogen-bonds)
[![Protein-ligand distances](https://img.shields.io/badge/Protein--ligand_distances-14532d?style=for-the-badge)](DOCUMENTATION.md#protein-ligand-distances)

**Per-analysis input notes are in the [documentation](DOCUMENTATION.md#run-and-interpret-analyses).**

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&height=4&color=0:0d0e0d,50:b7fb82,100:0d0e0d" alt="" width="100%"/>


<a id="license"></a>
<div align="center">
<h3>License</h3>

VisualMD is **free to use, but not open source.** The VisualMD Preview End User License grants no-charge use of official, unmodified releases for personal, educational, research and internal commercial purposes. Modification, redistribution, resale and offering VisualMD as a hosted service are restricted. Third-party libraries keep their own licenses; you keep the rights to your own inputs and outputs. The governing terms are in `LICENSE.txt` inside the download.

This public repository holds the launch website, documentation, release information and issue tracker. The application source is private.
</div>
<img src="https://capsule-render.vercel.app/api?type=rect&height=4&color=0:0d0e0d,50:b7fb82,100:0d0e0d" alt="" width="100%"/>

<div align="center">
<h3> Preview status</h3>

`v0.2.1-preview` is the first public release. The author has verified the downloaded package on a Linux workstation with the demo, their own PDB/XTC data, offline use after setup, surface playback, Legend view, and Legend PNG/MP4 export.
</div>

Still open, and tracked on the [public project board](https://github.com/users/Eswar-mse/projects/1):


- Clean installs on Ubuntu and Fedora
- A real 25,000-30,000-frame benchmark at full atom detail
- Dependency, security and license review
- More format, browser and GPU test coverage
- Accessibility and responsive layout
- Windows and macOS packages (not released yet)

<img src="https://capsule-render.vercel.app/api?type=rect&height=4&color=0:0d0e0d,50:b7fb82,100:0d0e0d" alt="" width="100%"/>

<div align="center">

<h3>Documentation</h3>

Everything beyond this page lives in one place: **[DOCUMENTATION.md](DOCUMENTATION.md)**

[![How it works](https://img.shields.io/badge/How_it_works-14532d?style=for-the-badge)](DOCUMENTATION.md#how-visualmd-works)
[![Prepare a trajectory](https://img.shields.io/badge/Prepare_a_trajectory-14532d?style=for-the-badge)](DOCUMENTATION.md#prepare-a-trajectory-correctly)
[![Analyses](https://img.shields.io/badge/Analyses-14532d?style=for-the-badge)](DOCUMENTATION.md#run-and-interpret-analyses)
[![Formats & limits](https://img.shields.io/badge/Formats_%26_limits-14532d?style=for-the-badge)](DOCUMENTATION.md#large-files-limits-and-storage)
[![Troubleshooting](https://img.shields.io/badge/Troubleshooting-14532d?style=for-the-badge)](DOCUMENTATION.md#troubleshooting)
[![FAQ](https://img.shields.io/badge/FAQ-14532d?style=for-the-badge)](DOCUMENTATION.md#frequently-asked-questions)
[![Limitations](https://img.shields.io/badge/Limitations-14532d?style=for-the-badge)](DOCUMENTATION.md#current-preview-limitations)

[![Releases](https://img.shields.io/badge/Releases-b7fb82?style=for-the-badge&logo=github&logoColor=b7fb82)](https://github.com/Eswar-mse/visualmd/releases)
[![Issues](https://img.shields.io/badge/Issues-b7fb82?style=for-the-badge&logo=github&logoColor=14532d)](https://github.com/Eswar-mse/visualmd/issues)
[![Project board](https://img.shields.io/badge/Project_board-b7fb82?style=for-the-badge&logo=github&logoColor=14532d)](https://github.com/users/Eswar-mse/projects/1)

When reporting a bug, include the VisualMD version, Linux distribution, browser and GPU, topology/trajectory formats, approximate atom/residue/frame counts, exact steps and error text, and whether the bundled demo reproduces it. Please do not post confidential data.

</div>
<img src="https://capsule-render.vercel.app/api?type=rect&height=4&color=0:0d0e0d,50:b7fb82,100:0d0e0d" alt="" width="100%"/>

<div align="center">
<h3> Built with</h3>


[![Pydantic](https://img.shields.io/badge/Pydantic-data%20validation-14532d?logo=pydantic&logoColor=b7fb82&labelColor=151716)](https://docs.pydantic.dev/)
[![Uvicorn](https://img.shields.io/badge/Uvicorn-ASGI%20server-14532d?logoColor=b7fb82&labelColor=151716)](https://www.uvicorn.org/)
[![HTML5](https://img.shields.io/badge/HTML5-markup-14532d?logo=html5&logoColor=b7fb82&labelColor=151716)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-styling-14532d?logo=css3&logoColor=b7fb82&labelColor=151716)](https://developer.mozilla.org/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES%20modules-14532d?logo=javascript&logoColor=b7fb82&labelColor=151716)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Geist](https://img.shields.io/badge/Geist-typeface-14532d?labelColor=151716)](https://vercel.com/font)
[![Phosphor Icons](https://img.shields.io/badge/Phosphor-icons-14532d?labelColor=151716)](https://phosphoricons.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-website-14532d?logo=cloudflarepages&logoColor=b7fb82&labelColor=151716)](https://visualmd.pages.dev/)
[![GitHub Releases](https://img.shields.io/badge/GitHub%20Releases-downloads-14532d?logo=github&logoColor=b7fb82&labelColor=151716)](https://github.com/Eswar-mse/visualmd/releases/tag/v0.2.1-preview)

</div>
<img src="https://capsule-render.vercel.app/api?type=rect&height=4&color=0:0d0e0d,50:b7fb82,100:0d0e0d" alt="" width="100%"/>

<div align="center">
<h3> Cite</h3>

If VisualMD helps your work, please cite it. GitHub's **Cite this repository** button (from [`CITATION.cff`](CITATION.cff)) gives BibTeX and APA.
</div>

```bibtex
@software{moparti_visualmd_2026,
  author  = {Moparti, Sri Venkata Satya Sai Eswar},
  title   = {{VisualMD}: a local-first molecular dynamics exploration workspace},
  version = {0.2.1-preview},
  year    = {2026},
  url     = {https://github.com/Eswar-mse/visualmd},
  note    = {Linux x86\_64 preview release}
}
```

Please also cite the libraries you rely on, notably [MDAnalysis](https://www.mdanalysis.org/pages/citations/) and [Mol\*](https://molstar.org/).

<img src="https://capsule-render.vercel.app/api?type=rect&height=4&color=0:0d0e0d,50:b7fb82,100:0d0e0d" alt="" width="100%"/>

<div align="center">
<h3>Author and contact</h3>
</div>

**Sri Venkata Satya Sai Eswar Moparti**

[ORCID](https://orcid.org/0009-0005-4635-7368) · [Google Scholar](https://scholar.google.com/citations?user=Bzc45zwAAAAJ&hl=en) · [msaieswar2002@gmail.com](mailto:msaieswar2002@gmail.com)

&copy; Sri Venkata Satya Sai Eswar Moparti. All rights reserved except as granted by the VisualMD Preview End User License.
