# VisualMD launch project

The public GitHub Project should use these items as its initial board. Keep
release claims tied to measured results, especially on real Linux hardware.

| Priority | Item | Done when |
| --- | --- | --- |
| P0 | Clean Linux install | Archive installs on fresh Ubuntu LTS and Fedora x86_64 without Node or system Python; exact versions and logs recorded. |
| P0 | Browser and GPU check | Demo and user PDB/XTC open; structure, surfaces, linked plots, themes, focus, PNG, and MP4 are reviewed on real hardware. |
| P0 | Large trajectory check | Full atom detail at 25,000–30,000 frames and up to 1,000 residues is measured, with disk, memory, preparation time, and playback results. |
| P0 | Offline use | After setup, disconnect network and run the demo, an imported trajectory, analysis, and exports. |
| P0 | Release provenance | Check archive SHA-256, included third-party license texts, package dependency audit, demo rights, and release license. |
| P0 | Publish Linux preview | Attach archive and checksum to an official GitHub Release, then update website download link and redeploy Cloudflare Pages. |
| P1 | Accessibility and layout | Review keyboard use, contrast, focus states, 390 px layout, and reduced motion in both themes. |
| P1 | Compatibility matrix | Broaden topology/trajectory format and GPU/browser coverage with shareable fixtures. |
| P2 | Windows and macOS | Design and validate native packages after Linux preview. |

Suggested board columns: **Backlog**, **Ready**, **In progress**, **Validation**, **Done**. Create one issue per item and link it to the account-level project. The public board tracks user-facing progress; private code tasks can stay in the private source repository.
