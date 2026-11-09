# VisualMD

VisualMD is a local molecular dynamics explorer for protein trajectories. The
Linux app runs on your computer, with linked structure and analysis views,
dark and light themes, and a real demo trajectory.

Explore the [live website](https://7fe4fc54.visualmd.pages.dev/). The Linux x86_64
preview is distributed through [Releases](https://github.com/Eswar-mse/visualmd/releases).
The remaining cross-distro, GPU, and large-data checks are tracked in
[PROJECT.md](PROJECT.md); this is a preview release.

## Download and run

When a release is available, download its `.tar.gz` archive and matching
`.sha256` file from the same release page. Verify and extract it:

```bash
sha256sum --check visualmd-linux-x86_64-0.2.0-preview.tar.gz.sha256
tar -xzf visualmd-linux-x86_64-0.2.0-preview.tar.gz
cd visualmd-linux-x86_64-0.2.0-preview
./install.sh
./run.sh
```

The first installation downloads pinned Python scientific packages. After
that, VisualMD works locally. The service listens on `127.0.0.1`; trajectories
are processed on your computer. The archive includes a Python runtime and the
real `demo.pdb`/`demo.xtc` sample; it needs no system Python or Node.js.

This public repository contains the website and release information. The
VisualMD application source is maintained in a separate private repository.
The download has an end-user license; the website and repository have their
own terms in [LICENSE.txt](LICENSE.txt). The app is free to use under the
release license, but VisualMD is not open-source software.

## Feedback

Use [Issues](https://github.com/Eswar-mse/visualmd/issues) for bugs and
feature ideas. For a bug, include your Linux distribution, browser, VisualMD
version, input formats, and a small reproducible example when possible. Do not
attach private trajectories or molecular structures without permission.

## Website

The static Cloudflare Pages site is in [`site/`](site/). It has no backend or
user-upload service. Deploy that directory as the Pages output folder. The
public site preview contains reduced data from the author's demo trajectory.
