# Hybrid Training v36.141

This release adds a coordinated three-day full-body kettlebell program, makes secondary workouts available across SE/Calisthenics/KB and complementary aerobic activities, and repairs future previews that lost variety. It retains both barbell days and conditioning/open days. The cumulative update ZIP includes the v36.140 reliability/history/updater fixes.

## Resulting behavior

- **One complete KB program:** A is lower-rep clean-and-press/squat/row work plus swings; B uses floor press, goblet squat, row, and a larger swing block; C uses controlled clean-and-press/squat/row volume with fewer squat sets/rounds before Monday. Movements stay consistent across blocks. Full research, exact doses, and limitations are in `KETTLEBELL_RESEARCH_v36.141.md`.
- **Original hybrid week:** Monday/Thursday Barbell; Tuesday/Friday/Sunday KB A/B/C; Wednesday/Saturday conditioning/open. The TB-only schedule, waves, max review, dedicated Pull-up loads, deadlift placement, and Pull-up → Squat order remain intact.
- **Progression from comparable KB results:** two comfortable complete exposures earn reps first, then an available bell with rep reset. Swings earn a round before a bell change. Short add-ons cannot earn full progression; true full secondaries can. Recent partial/poor results block progression from older successful work; recovery holds earned increases.
- **Hardware and time:** presets select appropriate single-bell equivalents and actual available weight settings. Full time-limited builds retain press/squat/pull/hinge and rests while reducing sets/rounds, or decline if that minimum cannot fit. Saved user routines retain their exercises and dose. Default bell loads remain provisional because the supplied export contains no KB results.
- **Secondary families:** Gym, Calisthenics, SE, and KB A/B/C can be complete secondary candidates on suitable non-Barbell days. Short KB work can also appear on TB open days when hardware and preference permit it. SE remains SE and KB retains its actual style through loading, saving, effort, fatigue, and progression.
- **Doubles without Gym:** different aerobic activities can pair with each other as well as with circuits/SE, Calisthenics, and KB. A run + swim double can clear an automatic weekday gate. The scorer counts actual effort, shared load, total available time, equipment/environment, spacing, and nearby anchors. It does not require Gym or promise a double every day.
- **Correct activity selection:** distinct aerobic options retain their activity key. Selecting one loads that option rather than the first generic Conditioning entry. Automatic/Best full choices exclude repeated completed cardio modalities; Custom remains available for a deliberate repeat.
- **Secondary execution:** opening a new full secondary clears an old primary edit mode and refreshes the tracker for the selected date. Start is available; saving creates a full secondary while retaining the actual primary and previous rows.
- **Future assumptions:** earlier unfinished scheduled workouts count as temporary completed prescriptions for the selected future day. Barbell waves and KB/manual plans use their actual exercise dose/load/rest. Future displayed/loaded strength prescriptions agree with the projection. Actual primary completion supersedes a hypothetical primary; a secondary alone does not erase it.
- **Surrounding manual changes:** exact activity/dose commitments replace their prospective rows and re-rank nearby open days. An upcoming Sunday is protected/reserved as upcoming work, not inserted as completed history before Saturday.
- **Distant variety:** the old 42-day cutoff is removed. The entire final scorer, display bridge, and future secondary surfaces use prospective history. Weekend caches include model revision and forecast context. A feasible weekend double can break a close primary tie; it does not replace a clearly stronger conditioning choice merely to create a Gym double.

Automatic extras remain off Barbell days. A KB primary retains the existing stricter, rare easy-aerobic-double policy. Best full/Custom availability is separate from the model’s automatic recommendation. No new weekly optimizer or within-workout automatic autoregulation was added.

## Validation

The release passed **19 static**, **90 export-seeded browser**, **62 KB/secondary**, and **26 forecast** checks, plus **84 empty-history browser** checks. The 85-day preview audit contains multiple conditioning activities and Gym choices beyond the old cutoff, preserves saved rows, and produces no uncaught page errors. See `QA_REPORT_v36.141.md` for exact evidence and limits.

## Install on the existing GitHub app

1. Extract `Hybrid_Training_v36_141_GitHub_Update.zip`.
2. Upload its contents into the existing repository, preserving nested `tests/` paths, and commit the bundle together. Keep the other existing assets.
3. Wait for Pages deployment, reopen the installed app at its existing address, and check the loaded build. A client still running an older pre-v140 build may need an initial normal refresh before the repaired updater is loaded.

This is a cumulative new/modified-file delta from v36.139 (`093f077a8290b9a1b3d1b80703bf493c6a5073d7`) and also updates the verified v36.140 GitHub upload (`f20ede8b9ef5fa715163e1756e951611ae187daa`). It restores test files omitted from that v140 upload. No personal export or browser/dependency files are included. This chat prepared the release; it did not push or deploy it.

## Continuity and reproduction

`RELEASE_HISTORY_AND_CHAT_HANDOFF.md` is the comprehensive standalone history/decision document for a replacement chat: 148 archived commits in actual order, current rules, research, changes since v139, validation, and deployment status. The separate downloadable handoff has identical contents.

```bash
npm install
npx playwright install chromium
npm run test:all
HYBRID_TEST_EXPORT='/absolute/path/to/export.json' npm run test:all
```

Use `HYBRID_CHROMIUM_PATH` for an existing Chromium executable. Keep private exports out of GitHub. Local test hooks are absent from deployed HTML.
