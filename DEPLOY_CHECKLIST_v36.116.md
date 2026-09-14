# Hybrid Training v36.116 — Deployment Checklist

Upload **all production files in this folder together** to the GitHub Pages repository root.

Required shell:
- `index.html`
- `sw.js`
- `manifest-v36.webmanifest`
- `version.json`
- `app-shell-v36.116.js`
- `app-shell-v36.116.css`

Do not replace production `index.html` with the self-contained test HTML.

No data clearing or re-import is required. v36.116 reads the existing Exercise Effort values already stored in workout history; the new dose interpretation is calculated from that history automatically.

After deployment, confirm `version.json` reports build `36.116` and refresh once if the PWA update banner appears.
