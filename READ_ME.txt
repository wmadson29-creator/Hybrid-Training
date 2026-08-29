Hybrid Training v36.2 — History Editing Improvements

CHANGES
- Saved workout sessions now use a prominent primary button:
  "✎ Edit Workout"
- On mobile, the workout edit button remains full-width and easy to tap.
- Every date in History now has:
  "Edit Recovery" when recovery data exists
  "Add Recovery" when no recovery entry exists for that date
- Tapping Edit Recovery opens the Recovery screen on that exact date
  and loads the saved values for editing.
- Recent Daily Recovery also has an Edit button on every saved row.
- Saving recovery continues to overwrite that date's existing entry
  rather than creating a duplicate.

TESTED
- 390 x 844 mobile viewport
- Previous recovery date and values load correctly
- Previous workout opens in finished-workout edit mode
- No horizontal page overflow
- No JavaScript page errors in the targeted test

UPLOAD TO GITHUB
Replace only:
- index.html
- sw.js

You can leave manifest-v36.webmanifest and all existing logo PNG files alone.
