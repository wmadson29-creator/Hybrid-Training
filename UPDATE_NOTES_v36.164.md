# v36.164 — hard-class context and comparable recovery rebound

The user described a hard Tuesday F45 session disrupting Wednesday's strength work and Thursday's activity, followed by normal Friday/weekend performance. This release connects observed hard-class exposure, overlapping soreness/reduced dose and later comparable performance while keeping all actual records intact.

Progression review: a reduced/sore, difficult resistance exposure within 72 hours of a hard overlapping class receives 0.8 evidence weight; after a verified comparable rebound it receives 0.5. Actual sets/reps completion credit and fatigue workload are unchanged. Contextual discount alone cannot earn a training-max increase. Pain-flagged observations are not discounted as class carryover. Labels say possible carryover, not proven causality.

Comparable rebound requires an observed complete exposure within seven days: same exercise/session, same load units, at least the prior planned load/reps/sets, full completion credit and known manageable effort. Weighted pull-ups also require matching explicitly recorded grip. Unknown effort, lighter/reduced work, different reps, future/uncompleted or projected sessions cannot establish a rebound.

Residual recovery: after the rebound, only the old class's residual contribution to verified major muscle groups is multiplied by 0.65. Other workouts and class contributions to unverified muscles, systemic fatigue, impact, axial stress and current soreness are retained. This is a bounded planning heuristic, not a physiological measurement or complete fatigue reset.

Class response learning: one class session counts as one episode even when several lifts suffered. It produces provisional context and a small 6% persistence modifier for subsequent same-name class exposures. Three comparable episodes can support stronger caution, capped at 18%; evidence uses the prior 56 days, actual completed observations and the model's as-of time. The existing pre-Barbell class warning includes this history. One F45 experience does not permanently penalize all classes.

Build/cache/query 36.164; recommendation stamp 25; automatic Gym model remains 6. No new runtime asset. New test:class-recovery is included in test:all. All previous changes, including collapsed homepage workouts, remain cumulative.

Prepared for upload; not pushed or deployed. See QA_REPORT_v36.164.md for validation and limits.

Additional clarification: the user attributes Sunday’s increasingly hard triceps exercises to accumulated within-session fatigue, and says the workout preceded the newer fatigue updates. Existing historical-position normalization, overlap-aware spacing and live targets remain in place. Later logged loads are retained as sequence-dependent performance; they are not rewritten or treated as confirmed fresh-capacity values.
