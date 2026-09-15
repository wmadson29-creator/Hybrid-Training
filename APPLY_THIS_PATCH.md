# Apply Hybrid Training v36.120

The ChatGPT GitHub connection could read the repository but GitHub rejected repository-content writes with HTTP 403. These files are the ready-to-apply patch.

Replace/add these files at the repository root on `main`:

1. **Add** `adaptive-personalization-v36.120.js`
2. **Replace** `sw.js` with the included `sw.js`
3. **Replace** `version.json` with the included `version.json`
4. **Add** `UPDATE_NOTES_v36.120.md`
5. **Add** `QA_REPORT_v36.120.md`

No changes to `index.html` or the existing `app-shell-v36.119.js` are required. The updated service worker injects the v36.120 layer into navigation HTML.

Suggested commit message:

`Add v36.120 personalized calibration and swim logging`

After deployment, load the app while online so the updated service worker and new JavaScript asset can install. If an old service worker still controls the first load, reload/navigate once more.
