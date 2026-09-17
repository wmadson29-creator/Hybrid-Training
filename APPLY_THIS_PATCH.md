# Apply Hybrid Training v36.121

The repository root now contains the complete v36.121 runtime. Keep these changed files together:

1. **Replace** `index.html`
2. **Replace** `sw.js`
3. **Replace** `version.json`
4. **Replace** `manifest-v36.webmanifest`
5. **Keep** `adaptive-personalization-v36.120.js` (the v36.121 core deliberately continues loading this versioned personalization/swim layer)
6. **Add** `UPDATE_NOTES_v36.121.md`
7. **Add** `QA_REPORT_v36.121.md`

Suggested commit message:

`Add v36.121 anchor reflow and Steps summary`

After deployment, open the app online so the v36.121 service worker installs. If an older worker controls the first navigation, reload once more. Existing local training data should be preserved; no clearing or re-import is required.
