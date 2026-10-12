# Model interaction review — v36.161

The goal is more reliable relationships between inputs, not more coefficients for their own sake. Existing daily scheduling, physiological recovery estimates, subjective fatigue/energy/soreness separation, and exercise-specific progression remain in use. This pass corrects confirmed gaps in the within-workout model and extends QA across the daily model.

## Refined interactions

| Input or relationship | Result |
| --- | --- |
| Press → triceps, row → biceps, squat → quads | Direct and indirect muscle contributions accumulate across exercises. Existing shared-muscle volume caps remain. |
| Grip and bracing across different movements | Bounded axial/systemic demands now affect later Gym/Calisthenics targets and automatic ordering, separately from muscle set budgets. Grip already represented as a muscle channel is not counted again as a shared channel. |
| Timed holds and unilateral work | Seconds/minutes are parsed as time. Both sides count toward elapsed time without doubling the aggregate muscle's set dose. Longer gaps/rest reduce residual fatigue, with no instant reset. |
| Actual effort | Known easy RPE gives lower acute fatigue than near-failure effort; eligible RIR and established effort-band interpretation feed the same calculation. Unknown effort uses a planning prior. RIR is not treated as a timed-hold measurement. |
| Recorded sets | Actual set details replace the summary set count; skipped detail rows contribute nothing. All-skipped details do not revert to the planned count. Zero-set and explicit warmup rows do not invent work. |
| Manual and completed targets | Manual loads remain protected. Recalculation starts from the saved baseline, so repeated refreshes do not repeatedly reduce loads or add rest. The explanation states when the manual target is retained. |
| Day-specific KB equipment | Bodyweight core remains bodyweight under explicit KB setup overrides. Bell rows still use the date's compatible equipment. |

The shared-exposure addition is capped at 2 model units, raw target scale remains 0.8–1 (existing normalization against a previously fatigued history position can allow a bounded 1.15 scale when the new position is fresher), and extra rest remains 0–60 seconds. Within-workout decay retains the 12-minute planning half-life. These constants are app priors; they are not individualized biological measurements or scientifically established safe limits. The inter-day half-lives are a different model of residual performance fatigue and were not replaced with the within-session rule.

## Mixed core and patio context

The three-week core rotation includes bodyweight work and Kettlebell Suitcase March / Kettlebell Front Rack March, performed slowly **in place**. Each full KB workout gets one small core finisher. Loaded core uses compatible equipment at or below its own conservative load ceiling, prefers a suitable already-programmed bell setting, and enters the exact ordered loading plan. No heavy main-lift load is copied into core just to avoid an adjustment.

Two comparable comfortable completed exposures of that exact core movement can earn five seconds, capped at 30 seconds per side. Load is not automatically increased. Another carry or march cannot earn its progression. Recovery caution, unavailable suitable light bells, or excessive preceding grip/bracing exposure select a bodyweight alternative. Existing manually chosen core is preserved.

The A/B/C presets are already stationary and contain no walking carries. The overview now explains the patio context. Optional Double Farmer Hold and Suitcase Hold are available with brief two-set, 20-second substitution prescriptions; they are not appended automatically. Existing manual workouts and carry selections are not silently rewritten. Rows, hinges and swings already contribute grip exposure. Core still adds a labelled estimated 3–5 minutes beyond the main KB time budget.

## Research and limits

- [Nunes et al., exercise order meta-analysis](https://pubmed.ncbi.nlm.nih.gov/32077380/): strength gains favor exercises performed earlier; exercise order did not show a significant overall hypertrophy effect. This supports retaining the chosen priority early while spacing overlapping accessory work, not inventing an exact recovery interval.
- [Refalo et al., 2023 randomized proximity-to-failure study](https://pubmed.ncbi.nlm.nih.gov/36752989/): nearer-failure bench-press work produced greater acute fatigue and worse perceptual responses. It supports effort-sensitive directionality. It does not validate this app's coefficients or one universal 48-hour recovery rule for every exercise.
- [Grgic et al., rest-interval systematic review](https://pubmed.ncbi.nlm.nih.gov/28641044/): both short and long intervals can support hypertrophy; evidence suggested a possible advantage for longer rest in trained participants, with limited comparable studies. Added rest is a performance allowance, not a promise of greater growth.
- [ACSM 2026 guidelines update](https://acsm.org/resistance-training-guidelines-update-2026/): individual goals, adequate volume, effort and consistency matter; unnecessary programming complexity is not itself an improvement.

QA verifies directional and bounded behavior, actual-versus-planned separation, preservation of completed evidence, and usable mobile workflows. It does not demonstrate that the model predicts Will's exact physiology. Future personal calibration should use comparable actual exercise results and out-of-sample validation, not learn arbitrary relationships from a small mixed history. No new field/device performance benchmark or deployment is claimed.
