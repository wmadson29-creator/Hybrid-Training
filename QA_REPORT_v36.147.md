# QA report — v36.147

Prepared October 4, 2026, America/Phoenix. Final checks use the supplied private v36.138 export and synthetic edge-case histories. The export itself is excluded from the deliverables.

## Executed checks

| Check set | Passed |
| --- | ---: |
| Static/deployment | 19 / 19 |
| Export-seeded browser/PWA | 90 / 90 |
| Coordinated KB / secondary execution | 93 / 93 |
| Future assumptions / variety | 26 / 26 |
| Barbell phase / slow ab progression | 57 / 57 |
| Secondary agreement / SE spacing / location / duration | 39 / 39 |
| Secondary frequency / feasibility / cache context | 29 / 29 |
| Gym bodyweight core | 27 / 27 |
| Class focus / muscle model / persistence | 47 / 47 |
| Substitute recalculation | 18 / 18 |
| **Static/export-seeded total** | **445 / 445** |
| Separate empty-history browser/PWA | 84 / 84 |

The entire final `npm run test:all` passed against the private export. The final empty-history browser suite passed separately. Before the final full run, the new baseline-fatigue assertion was corrected to use the same no-feel RPE-7 fixture as the captured baseline; a Comfortable feel had changed effective effort. No failure remained in the final runs. npm's existing proxy-configuration deprecation notice did not affect execution.

## New behavior verified

- Monday/Thursday Barbell anchors, Tuesday/Friday/Sunday KB slots, and Wednesday/Saturday open opportunities retain their placement.
- A and B each contain two controlled RDL sets with 8–12 rep bounds, 120-second rest, available paired loads and the controlled-lowering cue. Sunday has two press and two row sets and no new RDL.
- KB resistance sets total 10/8/6 across A/B/C, or 24 weekly. The baseline swings stay 5/8/4 rounds of ten. Stable distinct exercise lists retain press, squat/lunge, row and hinge coverage across blocks.
- A/B full and single-bell/time-limited builds retain five exercises; C retains four. Single-Leg RDL uses its own bell setting and `8/side`, rather than a pair's weight. A five-minute budget cannot fabricate a complete full workout.
- Exact full A RDL history earns reps in A without advancing B. Exact full B history at the ceiling earns the next supported bell and resets reps. Existing manual, custom, short/partial/full, quality and recovery-gate checks remain passing.
- Both floor-press forms have chest and horizontal-push fingerprints. Both RDL forms reach hip-extensor hamstrings and controlled-eccentric mechanics.
- Eight ten-rep swing rounds receive less hamstring/hypertrophy credit than three controlled hinge sets while retaining the captured original acute-fatigue estimate. They earn work-capacity and power credit without aerobic-base or cardio-efficiency credit.
- Actual swing set details determine completed rounds/reps. Logged rest affects the bounded conditioning estimate without inflating muscle credit; missing rest is explicitly marked as assumed. Skipped swings receive no fatigue, muscle, conditioning or power credit. Stimulus calculation leaves row data unchanged.
- Full KB B secondaries load/save all five exercises with their actual session style, full-secondary role and planned rest. Original swim-primary identity, completed rows and older history remain intact.
- Forecast assumptions and displayed prescriptions retain the revised exercises, sets, reps and weights. Model-generated advice refreshes under model version 13; deliberate manual constraints remain authoritative.

The retained suites exercise Hybrid Deadlift omission; three-set machine abs with slow five-unit progression; consistent Recommended/None/calendar choices; same-place pairings; adjacent SE spacing; practical secondary reachability; hanging Gym abs; class-focus input/model/persistence/History edits; substitute set/rep/load/rest recalculation; coherent PWA updates, active-workout deferral, failed backup handling, offline reopening and data preservation.

## Visual and package checks

The phone-sized A builder displays all five exercise rows and the revised overview is readable. No horizontal page overflow or runtime page errors were observed. C's unilateral exercises and rep units remain covered by browser checks. Temporary screenshots and diagnostics are not shipped.

The private fixture has 165 workout rows, 34 recovery dates and seven bodyweight measurements, with no completed KB rows or custom KB routines. Synthetic histories test progression without attributing those workouts to the user. Completed logs, recovery, manual commitments and user-owned routines remain unchanged by planning.

The cumulative 42-path ZIP is checked against the final working files. Runtime/manifest/worker/version stamps agree. The standalone and packaged handoff are identical, and the archived commit section retains SHA256 `560573d37786625313b130565c87e59a587563effd30b345642c4dd6e4b3b195`. Dependency folders, exports, browser downloads and temporary analysis are excluded.

No GitHub push, fresh HEAD verification, completed Pages deployment, installed Android build verification or new Android timing benchmark was performed. The baseline A/B/C minute estimates are planning estimates, not phone benchmarks. Passing tests do not validate muscle growth, aerobic gains, physiological model coefficients or the best possible program.
