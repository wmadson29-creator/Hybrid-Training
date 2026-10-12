# Within-workout fatigue model and weight options — v36.159

## Problem and implemented behavior

Generic Gym time filling could accumulate many different exercises for one muscle, each using an otherwise independent fresh target. Equipment actions excluded Cable entries. All muscle groups now share the within-session planning logic; triceps is only one example.

Generated Gym and Calisthenics work uses the existing muscle fingerprints, including fractional contribution from supporting muscles. It keeps the user's explicit first priority, then trades off movement priority against accumulated and adjacent overlap. Core finishers remain last. It never invents unrelated exercises solely to create a gap.

The generated session receives a per-muscle effective-working-set budget across exercises, then is allowed to end shorter. Duration filling is not rerun after that budget. Current defaults are 6/8/10/12 effective sets for easy/medium/hard/very-hard. A strong fingerprint contribution counts a direct set; smaller supporting contributions count fractionally. These numbers are transparent **app programming priors**, not proven physiological limits or personalised capacity measurements. Fixed Barbell/KB/circuit prescriptions and explicitly saved manual workouts are not rewritten by this generated-session volume guard.

An ordered evaluation accumulates local fatigue per planned set, allowing partial decay during work/rest and unrelated exercises. Later automatic loaded targets can decrease; bodyweight rep targets can decrease; rest can increase by up to a minute. First-exercise targets start without within-session fatigue. Gaps and longer rest reduce modeled fatigue but do not erase it. Assistance/manual loads are preserved. A known previous same-session order provides a bounded reference so the same prior fatigue is not repeatedly deducted from an already fatigued logged load; unknown old order uses a generic prior. No new learned personal fatigue coefficient is claimed.

The estimate uses a 12-minute residual half-life prior, a small exposure dead zone, bounded load scaling and existing equipment steps. The exact equation is an implementation choice informed by the direction of the evidence, not a fitted scientific formula. Existing daily/weekly fatigue and readiness still determine the fresh exercise-specific target; this is a separate within-workout correction.

Pre-start and active Gym/Calisthenics edits recalculate from saved fresh baselines. Manual reps/weight overrides and exercises with completed set timestamps are preserved. Repeated refreshes do not compound reductions. Baselines and manual-field markers survive preparation and active draft round trips. History editing is excluded. Fatigue refresh is triggered by user edits, not by the one-second clock or a document-wide observer.

## Evidence and practical limits

Primary acute studies support order-dependent performance loss among overlapping exercises and the importance of rest, without establishing an exact individualized load reduction:

- [Ratamess et al. 2012](https://pubmed.ncbi.nlm.nih.gov/22964859/): sequential upper-body performance differed from isolated baseline; manipulating the first exercise's rest did not restore later performance uniformly.
- [Miranda et al. 2010](https://pubmed.ncbi.nlm.nih.gov/20508461/): sequence and rest interval affected repetitions for similar upper-body demands.

These studies support the general correction, not the exact default set budgets, decay rate, percentages or claims that every muscle behaves identically. The app uses a modest heuristic until stronger individual evidence is available. During live work it still relies on entered dose/effort, prescribed rest and order; it does not directly measure real muscular fatigue or enforce stopwatch-based recovery guarantees.

## Machine and cable weight options

Workout cards offer **Don't have this equipment** for known loaded Gym exercises, including Wrist Roller. Availability is saved for that exercise/attachment in the gym profile for the workout date; blocking one attachment does not disable the entire cable station. Marking unavailable opens substitutions. The switch can be undone.

An optional **Weight options for this exercise** disclosure accepts a regular increment, minimum/maximum, or an exact stack list in lb. Settings live under gymEquipmentProfiles[profile].exerciseLoads[exercise]. Exact lists take priority. Progression/backoff uses the adjacent available stack entry; fatigue reductions use a permitted lower entry; arbitrary unavailable numbers are not generated. Regular grids use the configured minimum as their origin and respect their bounds. Empty fields restore defaults. Invalid lists leave the saved configuration intact. Existing equipment defaults remain fallbacks.

The current editor is per exercise within a gym profile. Two different physical stations used for the same named exercise at one gym share that entry; use separate gym profiles for distinct setups. Load labels are not converted into actual cable tension or compared across pulley ratios. JSON settings export/import carries the options; CSV is an observation export, not an equipment-settings backup.
