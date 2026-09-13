# Hybrid Training v36.111 QA

## Exact-state regression
The user-provided v36.110 export from 2026-09-13 was loaded unchanged. Its learned recovery profile is active, which previously reproduced the crash.

Expected/observed after the root fix:
- primary recommendation completes without fallback;
- Today = Conditioning;
- primary activity = LSS Run, 40–55 min, RPE 4–5;
- next fixed anchor = Barbell Strength on Sep 14;
- current recovery remains Watch recovery and the entered Sep 13 values render (Sleep 7.0 h, Resting HR 59 bpm, Wake BioCharge 79);
- calendar Sunday resolves to Conditioning rather than Open Training;
- no page errors or console errors/warnings in the exact-state run.

## Scope-boundary regression
The later diagnostics/core bridge no longer directly references the private v36.91 identifiers `v3691RecoveryMultiplier`, `v3691Clone`, or `v3691PersistSnapshot`.
