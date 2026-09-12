# Hybrid Training v36.75 — Smart Secondary Work + Core/Grip Accessory Model

## Purpose
v36.75 broadens the daily recommendation engine from a single primary workout into an optional **primary + complementary work** model. The second block is not a quota and is not guaranteed. It can be omitted entirely.

Examples the model can produce when the surrounding context supports them include:
- short/easy run or cycling → light upper-body resistance;
- short/easy swim → light lower-body resistance;
- short conditioning → core finisher;
- Gym / Calisthenics → occasional grip finisher when actual grip exposure is low and the next grip-sensitive anchor is not close.

Base Building remains separate and does not use this opportunistic add-on system.

## Evidence boundary
The scientific literature supports **concurrent endurance + resistance training as a generally compatible training strategy**, but it does not establish a rule that a particular 30-minute run should always be followed by a particular 20-minute upper-body workout.

### Current umbrella evidence
Held et al. (2026), *Maximizing Adaptations in Concurrent Training: An Umbrella Review of Meta-analyses*, included 17 meta-analyses / 144 individual studies. Concurrent training generally produced strength, power, and hypertrophy outcomes comparable with resistance training while adding aerobic benefits. The review did not find a significant overall sequence effect, although the authors noted a trend favoring resistance-before-endurance for some strength/hypertrophy outcomes.

Source: https://pubmed.ncbi.nlm.nih.gov/41762427/

**Used for in v36.75:** establishing that combining endurance and resistance work is not inherently something the app should avoid, while still treating session dose, goal priority, and interference as context-dependent.

### Training status and same-session proximity
A 2021 systematic review/meta-analysis by Schumann et al. found that trained individuals were more susceptible to lower-body strength interference when resistance and endurance work occurred in the **same session**; the effect was not significant when sessions were separated.

Source: https://pubmed.ncbi.nlm.nih.gov/33751469/

**Used for in v36.75:** keeping the secondary block small, penalizing it around important fixed anchors, and refusing it when the primary session is already long/hard or local fatigue is elevated. The app does not treat a light secondary block as equivalent to a full standalone strength session.

## App-derived rules — not direct published prescriptions
The following exact numbers are Hybrid Training model choices informed by the evidence and the user's logged training, not values directly prescribed by the papers above:
- roughly 20 minutes normally, sometimes ~25 minutes when the primary is especially short and cadence need is high; if a fixed Barbell Strength / KB anchor is tomorrow or in two days, the secondary resistance dose shrinks to roughly 12 or 15 minutes rather than being categorically banned;
- about 2 sets per selected secondary movement;
- 2–3 complementary movements;
- partial Gym/Calisthenics cadence credit (about 0.25 for a ~12-minute microdose, 0.35 for ~15 minutes, and 0.45 for a normal ~20–25-minute secondary block before time decay), rather than full-session credit;
- suppression thresholds based on primary duration/RPE, regional fatigue, recent strength work, and anchor proximity;
- choosing upper-body after a lower-dominant conditioning modality or lower-body after an upper-dominant modality;
- the exact recommendation score / threshold.

These are intentionally labeled as **app-derived** because no study directly validates this exact scoring algorithm.

## Exercise-selection guardrails
The secondary block is deliberately lower-risk/lower-systemic than a normal strength workout:
- heavy barbell floor pulls and major axial barbell work are excluded from automatic secondary Gym selection;
- power/explosive Gym movements are excluded;
- secondary lower-body work favors stable knee-extension/flexion/accessory patterns before high-systemic hinges;
- secondary upper-body work favors stable push, pull, and accessory roles with movement-role diversity;
- Calisthenics secondary selection excludes high-skill/high-fatigue options such as plyometrics, Nordics, pistols, and advanced hanging skills;
- each selected movement is capped at 2 working sets in the automatic secondary block.

The model may still choose no secondary work at all.

## Relationship with cadence and fatigue
A completed secondary resistance row is stored as the actual exercise performed and is classified as resistance work even when the top-level session is `Conditioning`. It therefore contributes to local fatigue and effective volume through the existing relationship-vector model.

However, it does **not** fully reset the Generic Gym or Calisthenics cadence lane. It receives partial, time-decaying cadence credit. This prevents both failure modes:
1. ignoring useful extra resistance work; and
2. pretending a 15–25 minute light block is equivalent to a full dedicated workout.

## Core and grip
Generic Gym and Calisthenics retain the existing guaranteed untimed core finisher. The new opportunistic accessory layer applies outside that guarantee:
- core can be appended after suitable conditioning / KB work when recent core exposure and fatigue support it;
- grip can be appended selectively after Conditioning, Gym, or Calisthenics when recent actual grip exposure is low;
- grip receives stronger penalties near Barbell Strength / KB anchors because pull-ups, rows, deadlifts, carries, and KB work already create substantial grip overlap;
- there is no weekly core/grip accessory quota.

## Planned vs actual behavior
v36.75 also fixes the completed-day display bug that motivated this release. A recommendation is a plan; the log is the source of truth for what happened.

If the model recommended Stationary Bike and the user completed Swimming instead:
- History stores Swimming;
- fatigue, freshness, recency, and adaptation use Swimming;
- the Today/calendar completed display shows Swimming;
- Stationary Bike remains only in plan-vs-actual metadata.

The screen no longer recomputes a fresh Active Recovery recommendation and presents that as though it were the completed activity.


## v36.75 frequency calibration
The previous release was physiologically conservative enough that the new complementary-strength outcome could become nearly invisible on a real calendar. v36.75 fixes that without turning two-part days into a quota.

Rules now enforced:
- **Barbell Strength:** smart secondary work is hard-disabled. The existing Barbell Strength ab accessory remains part of that Barbell session, but the scheduler will not create a second workout around it.
- **Non-anchor conditioning/open days:** complementary resistance is a genuine occasional outcome when the primary dose is modest, the opposite region is fresh, Gym/Calisthenics cadence need exists, and recent smart-secondary exposure is not too close. A projected future secondary block participates in recency so scrolling ahead does not produce several copies in a row.
- **Next-day anchor:** this is no longer an automatic veto. When the rest of the context is favorable, the resistance add-on becomes a smaller/lighter ~12-minute two-movement microdose. A two-day gap uses about ~15 minutes.
- **KB Heavy / KB Power:** a second workout is intentionally rare. Only a very-easy ~15-minute aerobic microdose can be added, recovery must be good, endurance need must be high, there can be no next-day fixed anchor, and a deterministic rarity gate must also pass.
- **KB Volume:** never receives a smart second workout because the primary session is already the volume-oriented KB day.
- **No monthly target:** there is no rule like “two doubles per week.” Recency changes competitiveness rather than scheduling a mandatory count. This allows zero in a poor-recovery period and several in a month where short complementary opportunities repeatedly make sense.

### Calibration QA target
The release is tested against a clean representative Barbell-focused calendar to ensure smart secondary resistance is neither universal nor absent. It is also tested against a forced Hybrid calendar to ensure Barbell days remain at zero and KB second-workout recommendations remain materially rarer than non-anchor secondary recommendations. These are QA sanity checks, not user-facing quotas.
