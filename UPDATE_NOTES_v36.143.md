# Hybrid Training v36.143

Useful secondary workouts return on suitable open days. The planner now compares genuinely feasible weekend full workouts with real short alternatives, accepts complete pairings that fit below the old blanket time floor, and offers a bounded easy aerobic short when another resistance block is a poor fit.

## Resulting behavior

- **A failed full cannot suppress a short.** The weekend package builds and scores complete second-workout candidates after the actual/resolved primary. Forecast, card, calendar, and adjacent weekday checks use that feasible package. A cheap full reservation no longer owns a date when the real workout cannot fit.
- **Actual combined time decides.** Remove the independent 75-minute minimum. Primary + secondary + five minutes of transition + any modeled transfer must still fit. Two complete 25/30-minute sessions can fit a 65-minute budget. A 50-minute primary with ten usable minutes left can receive a genuine ten-minute short.
- **Suitable open weekdays have more opportunity.** Normal full score thresholds become 7 for Conditioning/Gym and 7.5 for other eligible non-KB families. KB stays at 11.5 with its longer double spacing. Existing actual effort, recovery, shared load, time, equipment, and anchor checks remain active.
- **A complementary easy aerobic short can fit.** Suitable Conditioning/Gym/Cal/SE primaries can earn ten to twenty conversational minutes when the old resistance short cannot fit. Gym favors available stationary bike/row/elliptical/pool; home favors available swimming/outdoor cardio. The activity differs from a conditioning primary's modality. Dose shrinks for primary effort/duration, tomorrow's anchor, and time left.
- **Automatic limits still matter.** No new Barbell or KB-primary short fallback. Recovery guard/caution, very hard actual effort, insufficient time, hardware/environment constraints, recent doubles, and two completed full sessions prevent inappropriate extras. Explicit skipped choices remain respected. A full role counts despite old short metadata.
- **Caches reflect the actual decision.** Weekend keys include growing forecast history and resolved primary dose/effort. Transient nested-resolution answers cannot become the stable expected primary. Open-day recommendation model version advances to 9; manual choices stay authoritative.
- **KB prescriptions remain the coordinated A/B/C program.** The user's concern was exercise count, sets, and reps rather than weights. The included review explains the eight press/seven squat/seven row weekly KB sets, starting 170 swings, additional Barbell work, conservative conditioning component, and research limits. No arbitrary baseline volume increase was made.

The cumulative bundle retains v36.142's slow Barbell ab-machine ladder and 5 lb steps, Hybrid Deadlift omission, full-SE spacing, same-location pairing, truthful conditioning duration, and agreement among automatic secondary surfaces. It also retains the v36.140/v36.141 reliability, KB progression/execution, manual commitment, and long-range forecast changes.

## Matched preview and validation

Using the same supplied export and October 2 at 21:00 Phoenix clock, the October 3–November 6 preview changes from **six secondary days to eleven**: two shorts/four fulls become four shorts/seven fulls. Barbell extras remain zero; the stricter KB-primary policy yields zero extras in this particular preview. Saved logs remain unchanged. This is a conditional preview at one saved state, not a frequency promise or completed training.

Passed **321 static/export-seeded checks** across seven suites: 19 static, 90 browser/PWA, 62 KB/secondary execution, 26 forecast, 56 Barbell/ab, 39 secondary logic, and 29 frequency/feasibility/cache checks. A separate empty-history browser/PWA run passed **84/84**. The mobile Short Swim recommendation was visually inspected. See `QA_REPORT_v36.143.md` for scenarios and limits.

## Install on the existing GitHub app

1. Extract `Hybrid_Training_v36_143_GitHub_Update.zip`.
2. Upload its contents over the corresponding existing repository paths, preserving the nested `tests/` folder, and commit the bundle together. Keep the other existing app assets.
3. Wait for Pages deployment, reopen the existing address, and confirm build **36.143** and saved data.

The ZIP contains 28 cumulative new/modified paths from the reviewed v36.139 baseline. It can also update v36.140/v36.141/v36.142 and restores tests absent from the verified v36.140 upload. It excludes the private export, browser downloads, dependencies, and temporary analysis. This work prepared the release; it did not push or deploy it.

`RELEASE_HISTORY_AND_CHAT_HANDOFF.md` retains the 148-commit archive and latest decisions. Its standalone copy has identical contents. `KETTLEBELL_RESEARCH_v36.141.md` remains the program research record; `KETTLEBELL_PROGRAM_REVIEW_v36.143.md` addresses the latest volume question.

```bash
npm install
npx playwright install chromium
npm run test:all
HYBRID_TEST_EXPORT='/absolute/path/to/export.json' npm run test:all
```

Use `HYBRID_CHROMIUM_PATH` for an existing executable. The new individual command is `npm run test:frequency`. Tests inject hooks through their local server; deployed HTML has no QA interface.
