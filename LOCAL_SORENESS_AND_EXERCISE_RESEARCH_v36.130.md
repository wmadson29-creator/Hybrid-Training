# Hybrid Training v36.130 — Local Soreness and Exercise-Mapping Research

Research review date: 2026-09-25

## Modeling rule

The app uses a hierarchy: completed personal performance and recovery first, closely related personal work second, research-informed priors third, and a generic default last. Exercise anatomy is therefore used to estimate overlap and fatigue; it is not treated as proof that one exercise automatically improves another by a fixed amount.

## Local soreness

Delayed soreness, muscle-damage markers, and performance do not move in a perfectly interchangeable way. Soreness is useful context, but it is not a diagnosis and should not create an automatic whole-body rest day. Muscle-damaging work can also reduce later endurance performance even when submaximal physiology changes little, supporting local tissue/performance caution rather than ignoring soreness entirely. [Marcora and Bosio, 2007](https://pubmed.ncbi.nlm.nih.gov/17346288/)

Implementation:

- The user records a severity plus any sore areas: chest, shoulders, upper back/lats, arms/grip, triceps, core/low back, glutes, quads, hamstrings, adductors/groin, or calves/Achilles.
- Severity retains a modest global recovery signal because soreness can accompany broader training stress.
- The additional local penalty is applied only to the selected muscle channels.
- Local soreness can change exercise ranking, secondary-work eligibility, and overlapping conditioning choices; it does not override a fixed anchor or diagnose injury.
- Pain remains a separate per-exercise field and carries stronger stop/caution semantics than ordinary soreness.

## Push-ups inside conditioning

Push-ups are not generic cardio. They are a horizontal press with substantial pectoralis-major and triceps involvement, plus shoulder, serratus, and trunk stabilization. Hand position changes task mechanics; in one direct study, narrow-base push-ups produced greater pectoralis-major and triceps EMG than wide-base push-ups. That is activation evidence, not a guarantee of superior long-term growth. [Cogley et al., 2005](https://pubmed.ncbi.nlm.nih.gov/16095413/)

The component model therefore gives push-ups local chest/triceps/shoulder/serratus/core load and horizontal-push exposure. A circuit containing push-ups can affect chest readiness and pressing overlap even when the overall session is saved as Conditioning.

## Hills and sprints inside conditioning

Hill sprints are modeled as lower-body locomotion/power work with quadriceps, hamstring, glute, and calf loading, plus high anaerobic, impact, and systemic demand. This makes a push-up-plus-hills workout a mixed local-load session rather than a single undifferentiated cardio value.

Each component retains its planned movement and actual substitute. If a structured circuit has no defensible one-number planned/actual ratio, it is marked `planned-unquantified`; its performed components, RPE, intervals, time, and later response still drive fatigue.

## Pull-up grips

Pronated/overhand and neutral-grip pull-ups share the same broad vertical-pull musculature. They should be related for transfer and overlap, but kept as separate performance records. Direct comparison research found broadly similar activation across grips and did not establish greater biceps activity for neutral versus overhand; pronated pull-ups showed more middle-trapezius activity in that study. [Dickie et al., 2017](https://pubmed.ncbi.nlm.nih.gov/28011412/)

The app therefore does **not** hard-code “neutral grip equals more biceps.” A user may experience that personally, and repeated direct performance can refine the relationship. Supinated chin-ups remain the clearer elbow-flexor-biased comparison.

## Calf variants

Straight-knee and bent-knee plantarflexion are related but not identical. Recent high-density EMG work found lower gastrocnemius activity with the knee flexed and some phase-specific increase in soleus activity, while warning against a simplistic full-compensation claim. [Kovács et al., 2024](https://pubmed.ncbi.nlm.nih.gov/39786921/)

Accordingly, Smith/standing/donkey calf raises emphasize gastrocnemius plus general calf load; seated and bent-knee variants emphasize soleus. They share fatigue and partial transfer but retain direct histories.

## Added movement groups

The expansion module now validates 43 gym and 44 bodyweight additions. Notable v36.130 additions include:

| Group | Added examples | Modeling distinction |
|---|---|---|
| Vertical pull | Single-Arm Lat Pulldown, Wide-Grip Lat Pulldown, Towel-Grip Pull-Up | Direct exercise history stays separate; unilateral, grip, and upper-back assistance differ |
| Overhead/shoulder | Plate-Loaded Shoulder Press, Smith Overhead Press, Cable Upright Row, Planche Lean, Handstand Shoulder Tap | Pressing strength, scapular control, and advanced skill are not collapsed into one score |
| Squat/legs | Landmine Squat, Cable Belt Squat, Reverse Lunge to Knee Drive | Axial load, unilateral balance, and equipment constraints remain distinct |
| Calves | Smith Calf Raise, Donkey Calf Machine, Single-Leg Bent-Knee Calf Raise | Straight- versus bent-knee calf emphasis is explicit |
| Forearms/grip | Barbell/Cable Reverse Wrist Curl, Wrist Roller, Towel-Grip Pull-Up | Wrist extensors and grip endurance assist pulling but do not prove pull-up strength |
| Trunk | Dragon Flag Negative, Hanging Windshield Wiper, Side-Plank Reach-Through, Quadruped Hover, Superman Hold | Anti-extension, rotation/lateral control, hanging demand, and posterior-chain endurance differ |
| Accessible progressions | Eccentric Push-Up, Bodyweight Good Morning, Bodyweight Triceps Extension | Progressions provide partial family transfer without inventing equivalent loads |

Every entry requires primary muscles, assisting muscles, a movement family, two or more resolvable related exercises, equipment/load semantics where applicable, and a concise technique/logging note. Automatic selection remains conservative for advanced or setup-sensitive movements.

## Equipment availability

Machine stack numbers and lever arms vary, and an unavailable station should not repeatedly win a recommendation. The live workout now exposes **Don’t have this machine**. That setting:

- writes to the same persistent availability map used by the gym builder and automatic model;
- removes the machine from future automatic candidates;
- opens a relationship-ranked substitute list;
- remains reversible through **Marked unavailable — undo**.

It lowers recommendation frequency by making the exercise unavailable; it does not erase past performance or pretend another machine has an equivalent weight.

## Guardrails

- EMG is a task-activation measure, not direct evidence of hypertrophy, injury prevention, or strength transfer.
- Related exercises share capped, directional information; unlike loads are never converted one-to-one.
- Local soreness modifies overlapping load but never diagnoses an injury.
- Fixed Barbell Strength, KB, and Base Building anchors remain authoritative.
- Tightly capped, low-overlap secondary work can still occur on Barbell days when the existing eligibility gates pass.
