# Hybrid Training — complete historical iteration audit

Audit date: 2026-09-25  
Repository: `wmadson29-creator/Hybrid-Training`  
Audited history: all 138 commits reachable from local `main` and `origin/main` through remote commit `0c94421`, plus the cumulative v36.129–v36.131 working tree

## Executive result

I inspected every archived repository state, not just the commit messages. The repository contains 138 commits across two unmerged tips that fork after v36.120. Of those commits, 131 change the tree relative to their parent, 7 are byte-identical no-op commits, and the two v36.121/v36.122 snapshots are duplicated across the local and remote branches. That yields 129 distinct tree snapshots across all refs. There are no tags or merge commits.

Most commit titles are the generic `Add files via upload`, so the chronology below was reconstructed from each commit's actual file tree, diff, embedded build identifiers, update notes, QA reports, and research documents. The generic titles were not treated as evidence of what changed.

The model is cumulative rather than a sequence of unrelated rewrites. Its central rules are consistent across the later history:

- fixed Barbell Strength, kettlebell, Base Building, and explicitly moved program anchors are authoritative;
- completed work and edited actual values drive future fatigue and progression;
- manual choices override automatic recommendations;
- direct same-exercise evidence outranks related-exercise transfer, which outranks population priors;
- historical completed workouts remain historical truth unless deliberately edited in History;
- strength, easy endurance, hard conditioning, swimming, speed, skill, and local tissue stress are modeled as related but non-interchangeable qualities;
- recovery constraints are conditional, not universal 48-hour rules or fixed weekly quotas.

The audit also found one concrete regression relevant to the requested update: v36.101 introduced Workout Mode and its stylesheet hid `#addLogExercise` while a workout was active. The underlying add-card code remained present, so users could add an exercise before Start but not after Start. In addition, the existing add-card save fallback could give a manually added exercise its own name as the “planned” exercise, obscuring that it was unplanned. Both are implementation defects, not intentional model policy.

## Coverage and limitations

- Audited refs: local `main` through `a766050` and `origin/main` through `0c94421`.
- Topology: two unmerged branch tips after common v36.120 commit `236dcf0`; no merge commits or tags. The first two remote continuation trees are byte-identical to local v36.121 and v36.122, so the semantic release sequence remains coherent even though the commit hashes differ.
- Commits across all refs: 138.
- Commits that change their parent tree: 131.
- Distinct archived tree snapshots across all refs: 129.
- Exact no-op commits: `8f5fc96`, `13c30b9`, `817064f`, `423a4e2`, `379e157`, `b8aed02`, and `494849c`.
- Cross-branch duplicate snapshots: local `d0b91f2` equals remote `daf8b69` (v36.121), and local `a766050` equals remote `05c14ab` (v36.122).
- Some displayed version numbers were skipped or bundled. A number that never existed as a distinct commit cannot be reconstructed as an exact standalone tree. Bundled changes are identified below.
- v36.123–v36.128 are archived on `origin/main`, although several numbered builds were bundled into a later release commit rather than preserved as one Git commit per displayed version.

## Every archived iteration

### Foundation through v20

| # | Commit | Build visible in tree | Semantic change verified from tree/diff |
|---:|:---|:---|:---|
| 1 | `9a4d93d` | — | Repository initialized. |
| 2 | `8f96014` | — | First uploaded app/PWA files and project documentation. |
| 3 | `3fbef78` | — | Initial fixed-program dashboard and workout presentation expanded. |
| 4 | `d4f2d84` | — | Early conditioning override and schedule behavior added. |
| 5 | `8f5fc96` | — | No tree change; exact duplicate state. |
| 6 | `a8de0c6` | v5 | Adaptive kettlebell and conditioning choices, Barbell Strength maxes, and block review introduced. |
| 7 | `9b80031` | v6 | Gym builder and class/activity support introduced. |
| 8 | `10e045e` | v8 | Calisthenics, exercise relationships, recovery-week/block-review logic, and guided builders consolidated. |
| 9 | `41e1b3b` | v8.1 | Mobile layout and navigation overhaul. |
| 10 | `0a95ccd` | v8.2 | Dashboard density and small-screen interaction cleanup. |
| 11 | `db08cc6` | v8.3 | Skipped/missed exercise semantics and logging behavior refined. |
| 12 | `be39513` | v9 | Helio/recovery inputs connected to planning context. |
| 13 | `3500736` | v10 | Draft persistence and workout autosave foundation. |
| 14 | `13c30b9` | v10 | No tree change; exact duplicate state. |
| 15 | `1dd3809` | v10.1 | Draft restoration and log-state continuity improved. |
| 16 | `ecd3ac8` | v10.2 | Additional autosave/restore safeguards. |
| 17 | `767519c` | v10.3 | Log workspace recovery and view restoration hardened. |
| 18 | `ab98992` | v12 | Native data-safety/recovery journal and backup protections added. |
| 19 | `817064f` | v12 | No tree change; exact duplicate state. |
| 20 | `182688e` | v13.1 | Plate/loading visuals and refresh/root-DOM validation fixes consolidated. |
| 21 | `ccfa1ae` | v15 | Editing completed sessions in History added. |
| 22 | `ae0c874` | v16 | Complete-workout flow and event binding made more robust. |
| 23 | `6ad3475` | v17 | Completion/save behavior and duplicate-binding defenses refined. |
| 24 | `b97625b` | v18 | Hard conditioning stopped being automatically removed merely because recovery was cautious. |
| 25 | `61f0c83` | v19 | Duration-aware, more diverse gym-workout generation. |
| 26 | `9845132` | v20 | Conditioning swap helper and alternative-session flow. |

### Unified model through v36.31

| # | Commit | Build visible in tree | Semantic change verified from tree/diff |
|---:|:---|:---|:---|
| 27 | `4bd2b8a` | v26 | Duration/schedule/pause/settings/anchor behavior received a large hardening pass. |
| 28 | `3c197ef` | v27 | Unified training-load, fatigue, trends, and rest model introduced. |
| 29 | `43b90b5` | v28 | Planned-versus-actual intent and custom workouts added. |
| 30 | `65e9094` | v29 | Barbell Strength invariant fixed: deadlift is exactly one work set Monday/Friday in Strength-only blocks, absent Wednesday and hybrid blocks. |
| 31 | `7db1e34` | v31 | Advanced calibration, counterfactual checks, and deload logic added. |
| 32 | `af9ba8f` | v32 | Log state made more authoritative across navigation. |
| 33 | `e460d21` | v33 | Additional state-authority and restore corrections. |
| 34 | `9d10b92` | v34 | Exercise/activity substitution and multi-movement conditioning introduced. |
| 35 | `57c5286` | v35 | Mobile substitution sheet and related logging UX. |
| 36 | `40af975` | v35 | History/recovery editing groundwork; later documentation labels this stream v36.2. |
| 37 | `85cf556` | v35 | Recovery/history-edit corrections and documentation completion. |
| 38 | `06c5b81` | v36.3 | Calisthenics duration now respects the chosen time and stress budget. |
| 39 | `4da2b4f` | v36.4 | Rest-day override and authoritative adaptive-plan tracking. |
| 40 | `07ad781` | v36.4 | Adaptive mode switching and class scheduling added without a displayed build bump. |
| 41 | `d6f09ec` | v36.7 | Default ab-machine finisher introduced. |
| 42 | `15a917c` | v36.8 | Ab work moved to independent double progression. |
| 43 | `8b04263` | v36.9 | Universal untimed core-finisher behavior. |
| 44 | `82b0559` | v36.10 | Conditioning modalities and controlled variation broadened. |
| 45 | `939dfe1` | v36.12 | Import/delete safety and explicit adaptive-switch authority. |
| 46 | `ab1e50c` | v36.15 | Double-progression and calendar-scroll corrections. |
| 47 | `ac896c6` | v36.16 | RPE tracking and workout-start safeguards. |
| 48 | `2caf885` | v36.17 | Research-informed exercise order, rest, and duration logic. |
| 49 | `bbfaaf3` | v36.18 | Log-card UX and plate-loaded-machine distinction. |
| 50 | `e5c8fde` | v36.20 | Base Building mode added and isolated from ordinary adaptive scheduling. |
| 51 | `655ce6f` | v36.21 | Rolling seven-day cadence replaced weekly-reset/rest-quota behavior. |
| 52 | `4b6f406` | v36.24 | Manual anchor moves and program pause added. |
| 53 | `39d5273` | v36.26 | Strength credit separated from fatigue for drills and mobility. |
| 54 | `54d63fe` | v36.27 | Label/cache cleanup. |
| 55 | `423a4e2` | v36.27 | No tree change; exact duplicate state. |
| 56 | `7618aca` | v36.28 | Future shadow forecast; running and treadmill running share a frequency family. |
| 57 | `379e157` | v36.28 | No tree change; exact duplicate state. |
| 58 | `40af814` | v36.31 | Recommendation feedback, explicit step handling, and bodyweight context. |

### Longitudinal personalization through v36.67

| # | Commit | Build visible in tree | Semantic change verified from tree/diff |
|---:|:---|:---|:---|
| 59 | `3041e02` | v36.36 | Longitudinal bodyweight, cardio, and recovery interpretation expanded. |
| 60 | `9c8167b` | v36.39 | Multi-horizon hybrid adaptation and progress views. |
| 61 | `204b378` | v36.40 | Bottom-navigation opacity and UI layering fix. |
| 62 | `31c1e61` | v36.41 | Immediate block review and short focus blocks. |
| 63 | `863aea9` | v36.43 | Builder/core behavior and exercise-relationship model upgraded. |
| 64 | `ed9b0d7` | v36.44 | Multimodal research priors integrated. |
| 65 | `5584db3` | v36.45 | Manual schedule reflow. |
| 66 | `e03e966` | v36.47 | Six-lane rolling-cadence model. |
| 67 | `b8aed02` | v36.47 | No tree change; exact duplicate state. |
| 68 | `088b907` | v36.49 | Exact kettlebell equipment availability. |
| 69 | `0e20950` | v36.51 | Adaptive strength-endurance recommendations. |
| 70 | `64afaf8` | v36.52 | Movement-diverse strength-endurance construction. |
| 71 | `5746aae` | v36.53 | Exercise guides expanded. |
| 72 | `9c9304e` | v36.55 | Guides made interactive with movement visuals. |
| 73 | `d47cadd` | v36.56 | Guide media and presentation expanded again. |
| 74 | `41b06a0` | v36.58 | Barbell Strength terminology normalized; pickleball drill and match loads separated. |
| 75 | `e370b6b` | v36.59 | Automatic calisthenics/strength-endurance frequency reduced. |
| 76 | `c43cc25` | v36.60 | Capacity calibration and subjective fatigue added. |
| 77 | `08b68f1` | v36.61 | Runtime stabilization. |
| 78 | `8e7e6e1` | v36.63 | Walking dose-versus-toll, explicit steps, and class/activity expansion. |
| 79 | `1cdaa8c` | v36.63 | Follow-up class/activity and walking-model corrections without a build bump. |
| 80 | `e600298` | v36.65 | Prescription/time consistency and cache hardening. |
| 81 | `9c401c4` | v36.66 | Classes and independent activities separated. |
| 82 | `0e8781f` | v36.67 | Bodyweight observation context and separate navigation tabs. |

### Research provenance through v36.100

| # | Commit | Build visible in tree | Semantic change verified from tree/diff |
|---:|:---|:---|:---|
| 83 | `754b567` | v36.73 | Bundled v36.68–73: provenance, timing, multichannel exercise relationships, fractional sets, concurrent-training research, broader exercise coverage, UI updates, and evidence-informed set/rep prescriptions. |
| 84 | `29809bc` | v36.74 | Smart accessory selection and completed-workout truth. |
| 85 | `b52e45e` | v36.75 | Secondary-workout frequency and calibration. |
| 86 | `ab8dbc3` | v36.76 | Location-aware bidirectional secondary recommendations and outdoor-running preference. |
| 87 | `a2c5247` | v36.77 | Inline context choices; secondary work placed after the primary. |
| 88 | `497d50a` | v36.78 | Calendar/secondary consistency. |
| 89 | `08eff3f` | v36.79 | Completed History authority, plan-versus-actual records, and secondary-outcome learning. |
| 90 | `56a2674` | v36.81 | Subjective fatigue split into energy, soreness, and related signals. |
| 91 | `4d228ce` | v36.82 | Interval and prediction calibration. |
| 92 | `d543491` | v36.83 | Calendar fallback hardening. |
| 93 | `ad2016e` | v36.85 | Substitution-specific dosing and live-workout persistence. |
| 94 | `ba24432` | v36.86 | Automatic calisthenics frequency reduced again after observed crowding. |
| 95 | `622c143` | v36.89 | Bundled v36.88–89: swim availability/low-fatigue prior and fatigue-recovery model rework. |
| 96 | `754d2f3` | v36.90 | Performance and UI memoization. |
| 97 | `8b55d6c` | v36.91 | IndexedDB durability, worker support, and personal recovery learning. |
| 98 | `ee7b86c` | v36.94 | Bundled v36.92–94: UI, recommendation feedback, and readability work. |
| 99 | `25a18c8` | v36.96 | Bundled v36.95–96: systems audit rejected rigid 80/20, universal 48-hour, HRV-switch, and ACWR-injury rules; Log became execution-first. |
| 100 | `3902927` | v36.97 | Log-state authority hardened. |
| 101 | `703a2f7` | v36.99 | Bundled v36.98–99: status colors and calendar presentation. |
| 102 | `cc9fabe` | v36.100 | Icon and install-asset refresh. |

### Modular shell through v36.122

| # | Commit | Build visible in tree | Semantic change verified from tree/diff |
|---:|:---|:---|:---|
| 103 | `747c72d` | v36.100 | Core v36.101 behavior landed: Workout Mode, context, undo, performance intelligence, PWA-update handling, and modularization. |
| 104 | `e43e560` | v36.101 | Shell/docs/version wiring completed for v36.101. |
| 105 | `8a84109` | v36.105 | Bundled v36.102–105: partial-deployment hotfix, assisted-dip increments, “too easy” category, weak-link diagnostics, and full second-workout support. |
| 106 | `4d544f1` | v36.106 | Diagnostics, cardio, and duration QA. |
| 107 | `d6c88a5` | v36.107 | Persisted-state shape recovery. |
| 108 | `6248529` | v36.108 | Fail-soft recovery and recommendation rendering. |
| 109 | `a7ac3df` | v36.109 | Guaranteed recommendation fallback. |
| 110 | `f78bb88` | v36.110 | Export diagnostics. |
| 111 | `ac89db2` | v36.111 | Primary-recommendation crash fix. |
| 112 | `9b5ce51` | v36.112 | One-ended landmine loading semantics. |
| 113 | `dbd6104` | v36.114 | Execution-first Log flow, second-workout flow, and authoritative activity-card duration. |
| 114 | `ca6c8bf` | v36.115 | Landmine and phase-guard correction. |
| 115 | `62185af` | v36.116 | Actual resistance effort began affecting stimulus. |
| 116 | `2919a37` | v36.117 | Whole-athlete development, endurance-versus-speed balance, and weekend capacity. |
| 117 | `9746e9e` | v36.119 | v36.119 shell baseline and deployment set. |
| 118 | `93ab566` | v36.119 | Stretching/flexibility module added. |
| 119 | `50bde25` | v36.119 | Landmine-loading visual correction. |
| 120 | `dd5065c` | v36.119 | Conditioning-family canonicalization plus sprint/hill research. |
| 121 | `4cc1d14` | v36.119 | Home secondary hierarchy cleaned up. |
| 122 | `5150da5` | v36.119 | LSS versus Sprints/HIC switch behavior corrected. |
| 123 | `7029740` | v36.119 | Recommendation-family labels and secondary placement corrected. |
| 124 | `f1a74eb` | v36.119 | Sprint/hill activation and secondary-choice matrix. |
| 125 | `494849c` | v36.119 | No tree change; exact duplicate state. |
| 126 | `ecc8e06` | v36.119 | Performance/conditioning-family consistency. |
| 127 | `5632502` | v36.119 | Calendar secondary visibility. |
| 128 | `5849a24` | v36.119 | Secondary-frequency correction. |
| 129 | `cf9b0df` | v36.119 | Weekend package, History truth, on-site gym logic, and Base Building corrections. This intentionally supersedes v36.75's blanket avoidance of Barbell-day secondaries with narrowly allowed low-overlap accessories. |
| 130 | `236dcf0` | v36.120 | Adaptive-personalization module and swim-length support. This is the common ancestor of the current local and remote tips. |
| 131 | `d0b91f2` | v36.121 | Moved-anchor reflow and Steps summary. |
| 132 | `a766050` | v36.122 | Accepted conditioning selection became canonical in calendar and workout views. |

## Remote continuation through v36.128

The remote branch independently uploaded byte-identical v36.121 and v36.122 trees, then continued through v36.128. Some displayed versions were bundled rather than committed one at a time.

| # | Commit | Build visible in tree | Semantic change verified from tree/diff |
|---:|:---|:---|:---|
| 133 | `daf8b69` | v36.121 | Remote v36.121 upload; tree is byte-identical to local `d0b91f2`. |
| 134 | `05c14ab` | v36.122 | Remote v36.122 upload; tree is byte-identical to local `a766050`. |
| 135 | `0b64571` | v36.124 | Bundled v36.123–v36.124 secondary-choice, display-consistency, and tissue-stress work. |
| 136 | `d43cc81` | v36.125 | Muscle-specific development/frequency, whole-athlete benchmarks, stroke-aware swimming, storage/import hardening, accessibility, calendar cues, and executable QA. |
| 137 | `c69d57e` | v36.127 | Bundled v36.126–v36.127 actual-versus-planned feedback, forecast balancing, endurance protection, anthropometry context, and export repair. |
| 138 | `0c94421` | v36.128 | Exercise expansion, evidence-gated balance refinements, calibration cleanup, searchable exercise pickers, and plain-language UI copy. This is the audited `origin/main`. |

## Current working-tree iterations after origin v36.128

These builds are the new cumulative local layer on top of the audited remote release.

| Build | Auditable change set |
|:---|:---|
| v36.129 | Active-workout exercise insertion, explicit unplanned-work semantics, Barbell Forearm Curl, and audit-driven regression coverage. |
| v36.130 | Localized soreness and pain, equipment availability controls, exercise-library expansion, recommendation stabilization, reason-copy cleanup, and import/backup hardening. |
| v36.131 | Three-week planning horizon, durable decision/evidence records, component-dose feedback, independent overlapping equipment profiles, encrypted backups, import preview/rollback, expanded browser QA, and final integration fixes. |

## Rules that were deliberately superseded

| Earlier behavior | Later authoritative behavior | Reason visible in history |
|:---|:---|:---|
| Calendar-week resets and rest quotas | Rolling windows and need-driven selection | Training stress and opportunity do not reset on Monday. |
| Equal exposure to every lane | Evidence/need-driven lanes with bounded anti-crowding | Prevent repeated speed work without turning balance into rigid quotas. |
| Blanket avoidance of secondaries on Barbell days | Low-overlap, short on-site accessories may be offered | v36.119 adds useful work without displacing the fixed anchor. |
| A recovery caution can remove all hard work | Hard work remains eligible when readiness and recent response support it | The user explicitly wants to be pushed; recovery is a constraint, not an automatic veto. |
| Generic exercise-family transfer | Direct exercise history first; related transfer is capped | Skill and machine geometry make exercises only partially interchangeable. |
| Planned work as the assumed load | Logged actual work controls fatigue and progression | Shorter/longer, lighter/heavier, partial, substituted, and unplanned work must change the next forecast. |
| Swimming as generic easy cardio | Stroke-, duration-, course-, and local-fatigue-aware swimming | Strokes and pool configuration impose different local demands; same-stroke data remain strongest. |
| Rigid speed spacing | Soft four-day window, three with explicit conditioning priority, bypassed by short focus blocks; supported two-day hard stacks allowed | Prevent crowding while retaining purposeful back-to-back hard days. |

## Current invariant verification

The cumulative v36.131 source and regression suite preserve the following high-risk rules:

1. **Fixed anchors win.** Automatic forecast balancing cannot rewrite fixed Barbell Strength, KB, moved-program, or Base Building anchors.
2. **Barbell deadlift placement is exact.** In Barbell Strength-only blocks it appears Monday and Friday for one work set, never Wednesday; it is absent from hybrid blocks.
3. **Weighted pull-ups keep the prescribed grip/load sequence.** They remain outside generic training-max progression.
4. **Manual selections win.** A user-accepted conditioning family is canonical across the calendar, selected-day view, and Log.
5. **Actuals are authoritative.** Edited sets, reps, load, duration, and set details are saved as actual work; planned values remain separate for comparison.
6. **Under- and over-plan dose affect both progression and fatigue.** A 20-minute completion of a planned 45-minute swim produces less load; extra work produces more load, with tolerance inferred only from repeated response evidence.
7. **Unplanned workouts count.** Rows with actual dose and no plan are dose-weighted into recent fatigue and future recommendations.
8. **History stays truthful.** Completed sessions are not silently rewritten by later schedule changes.
9. **Endurance running remains protected.** Overdue endurance running receives a bounded priority boost; repeated automatic speed slots are limited without imposing a fake weekly quota.
10. **Swimming remains its own cadence lane.** It is not treated as interchangeable with running or converted into resistance-training sets.
11. **Body measurements remain context, not destiny.** Height/reach can explain range-of-motion or stroke-length context but do not override direct performance.
12. **Completed and secondary calendar states use distinguishable styling.** This resolves the previously confusing shared-color treatment.

## Findings and resolution

### High-priority findings resolved

1. **Workout Mode hid Add Exercise.** The v36.101 stylesheet explicitly hid `#addLogExercise` while an active workout was running, despite the add-card function still existing. v36.129 restores a clear active-workout action and focuses the new card.
2. **Manual extra exercises needed explicit unplanned semantics.** v36.129 prevents the save fallback from copying the actual exercise into `modelPlannedExercise` and preserves the unplanned marker through draft restore, History, import/export, and load-model paths.

### Requested library gap resolved

3. **Barbell Forearm Curl was absent.** v36.129 adds it as a distinct movement with the app's `grip` channel as its primary forearm/wrist-flexor area, `biceps` as secondary assistance, explicit related-exercise links, and direct-history separation from machine-stack work.

### Repository hygiene observations

4. **Version labels are not one-to-one with commits.** Future releases should use descriptive commit messages and one release commit per displayed build when practical.
5. **The root README is historically stale.** It is not a reliable record of the modern app; the versioned update notes and this audit are currently the more accurate chronology.
6. **Large inline application code raises regression risk.** The gradual modularization is sound, but core logic still spans a very large `index.html`; new behavior needs targeted executable tests, not string checks alone.

## Audit conclusion

The current architecture reflects a coherent set of decisions rather than arbitrary recommendation changes. The scheduling concern found in earlier screenshots—too many sprint sessions and too little endurance/gym variety—was addressed in v36.127–v36.128 with soft speed spacing, endurance protection, and flexible-strength variety. The audit's implementation defects and requested library gap were then resolved in v36.129, and v36.130–v36.131 added durable recommendation state, localized constraints, equipment profiles, import safety, and deeper executable QA without weakening fixed-anchor authority. The only remaining local verification limitation is environmental: the Playwright browser binary could not be installed in this workspace, so browser execution is delegated to the included CI workflow while all static and export-fixture checks run locally.

## v36.129 resolution recorded after the audit

The requested implementation was applied only after the historical audit above was completed:

- Workout Mode now exposes `+ Exercise` and focuses the newly created card.
- The added row is explicitly unplanned through draft, History, import/export, and load-model paths.
- Resistance added within a conditioning session retains resistance semantics.
- Barbell Forearm Curl now has validated loading, anatomy, and relationship metadata.
- At the time of v36.129, the regression suite passed 133/133 checks and the then-current v36.127 export passed with zero warnings.

## v36.130–v36.131 follow-through

- Equipment availability is now profile-specific for Main Gym, Home, and Travel; one machine can belong to any combination of those profiles without being moved between them.
- Recommendation choices are stable across view changes, feedback is attributed to performed work, and reasons use concise user-facing language rather than internal score terminology.
- Localized soreness and pain constrain the relevant tissues and movements, with explicit resolution controls rather than a permanent global penalty.
- Import now previews and validates before mutation, migrations run against the imported schema in the correct order, and durable storage is verified with rollback on failure.
- The current static regression suite passes 169/169 checks. The latest supplied v36.128 export passes the audit with zero errors and two data-quality warnings: legacy strength rows carrying irrelevant planned-minute values and one swim-distance/lap mismatch.
