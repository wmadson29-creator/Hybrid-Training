# Fatigue / Recovery Model v36.89 — research rationale

## What the model is estimating

The local `muscles` state is now explicitly **readiness-relevant residual performance fatigue**, not a literal percentage of biological tissue healing and not a binary "can/cannot train" flag. The app already has separate channels for soreness, impact/tissue loading, subjective body fatigue, energy, sleep/recovery, and performance trends. Keeping those concepts separate avoids treating lingering soreness as proof that the muscle cannot perform.

## Why the old model was too conservative

The prior implementation used fixed local half-lives of roughly 20–40 hours, fixed systemic half-lives up to 50 hours, linear accumulation across every overlapping exercise row, a 4.5 cap, and recommendation penalties at low overlap. With several compound exercises in the same workout, shared muscles could therefore hit the ceiling even when logged effort was Easy/Comfortable and performance was stable.

The user's 2026-09-09 export illustrates that failure mode: lats, upper back and chest were each at 4.5, with systemic and axial fatigue also at 4.5, despite the surrounding Barbell Strength sessions being predominantly Easy/Comfortable with only isolated Challenging/Very Hard work. That is too much certainty from the model.

## Evidence translated into model rules

1. **Failure and high velocity loss deserve longer recovery than subfailure work.** Pareja-Blanco et al. (PMID 28965198) found 3×10(10) failure training caused larger acute impairment and slower 24–48 h recovery than 3×5(10) and volume-matched 6×5(10). González-Badillo et al. (PMID 26667923) reported CMJ recovered by 6 h after 3×4(8) but remained reduced through 48 h after 3×8(8) failure. A meta-analysis by Vieira et al. (PMID 34881412) found greater biomechanical fatigue, metabolic response, muscle damage and RPE with failure training.
   A 2025 systematic review of 51 acute-fatigue studies (PMID 40644670) likewise identified proximity to failure, set duration, total volume and density as major determinants of performance/perceptual fatigue. This is why v36.89 does not assign one fixed recovery duration to every exposure.

2. **Proximity to failure is a continuum.** In resistance-trained participants, six bench-press sets produced an immediate velocity decline of roughly 25% at failure versus 13% at 1-RIR and 8% at 3-RIR (PMID 36752989). Cornejo-Daza et al. (PMID 37972985) found no significant 6/24/48 h performance reductions after a 20% velocity-loss squat protocol, whereas higher velocity-loss protocols recovered more slowly.

3. **Soreness/damage and performance recovery are not interchangeable.** In highly resistance-trained men, elbow-flexor peak torque after a multi-joint row protocol returned to baseline by 24 h even though DOMS persisted longer (PMID 25807025). The app therefore keeps soreness/tissue channels separate from performance fatigue.

4. **Familiar exercise can recover better after repeated exposure.** A 2023 systematic review/meta-analysis of 20 studies found a repeated-bout effect for multiarticular exercise, with less DOMS/CK and smaller performance deficits at 24–48 h after the second bout (PMID 38015738). The app uses this only as a modest familiarity modifier, not a blanket assumption that experienced lifters recover instantly.

5. **Residual fatigue should not equal "untrainable."** A 25-study meta-analysis found no meaningful hypertrophy difference between higher and lower volume-equated frequencies (PMID 30558493). In resistance-trained men, 3 versus 6 weekly sessions produced similar adaptations under volume-equated conditions (PMID 30363041), and 2 versus 3 days/week likewise produced similar adaptations in trained men (PMID 31531139). These do not prove any individual session is safe regardless of recovery; they support treating residual fatigue as a graded modifier while preserving performance- and recovery-based guardrails.

## v36.89 calibration

Baseline performance-fatigue half-lives are approximately 14–26 h for local muscles and 10–28 h for most systemic channels, while impact remains slower at 40 h. Each exposure then receives a persistence multiplier based on categorical/exact RPE, effective volume, set repeatability/velocity-loss proxy, exercise familiarity, failure/rough-technique markers, eccentric novelty, and objective recovery. The allowed multiplier range is broad enough that genuinely hard/failure work can still persist far longer than routine subfailure work.

Same-session overlap now accumulates with a saturating equation rather than simple addition. This preserves the fact that two chest exercises are more fatiguing than one without assuming every additional row contributes a full independent dose all the way to the cap.

Recommendation gates are intentionally less binary: RPE prediction gets no local-fatigue increase below 0.75 overlap; automatic Gym/Calisthenics selection gets no local-fatigue penalty below 1.10; conditioning does not receive a dedicated overlap penalty until 0.85. Severe fatigue still matters, and future-anchor interference, deload logic, subjective body fatigue, soreness, sleep/HRV/RHR, and learned exercise-specific spacing remain separate safeguards.

## Personalization philosophy

The research sets the prior. The user's own logged performance is allowed to move the model away from that prior when evidence accumulates. In particular, the existing recovery-spacing model compares performance after different intervals for related exposures. If a specific lift repeatedly underperforms at <24 or 24–48 h spacing, that learned signal can still reduce its recommendation score even though the generic muscle half-life is shorter.
