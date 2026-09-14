# Deploy v36.114

Upload the production files in this folder together to the repository root in one commit. **Do not clear app data or re-import history.**

Required runtime files:
- `index.html`
- `sw.js`
- `manifest-v36.webmanifest`
- `app-shell-v36.114.js`
- `app-shell-v36.114.css`

The `.md`, `.txt`, and checksum files are documentation only and do not need to be served for the app to run.

After deployment:
1. Reopen/refresh the installed app and confirm build **v36.114**.
2. Open Log and confirm the selected Today workout loads without Advanced setup opening.
3. After one completed workout, confirm Log shows **Short secondary / Full second workout / Build another** with no pre-filled second session.
4. In More, confirm **Aerobic / LSS** and **Conditioning / Intervals** open the correct Cardio Library family.

Existing workout/recovery history is compatible. Cardio remains stored internally as `Conditioning` for backward compatibility.
