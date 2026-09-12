# Walking dose vs recovery toll — v36.62

## Why the model changed

The app previously used one `enduranceModalityCost` factor for both aerobic dose and recovery toll. That was too coarse. Easy walking can accumulate meaningful low-intensity energy expenditure and aerobic volume while producing far less impact and recovery disruption than running or hard conditioning.

The 2024 Compendium of Physical Activities places ordinary level walking around ~2.8–3.8 METs at common slow-to-moderate paces and brisk walking around ~4.8 METs, while jogging/running is substantially higher. This supports keeping walking's aerobic dose per minute below running without treating it as physiologically zero.

Biomechanical studies also show substantially lower loading during walking than running. Classic force-platform work reported vertical ground-reaction-force peaks around ~1.0–1.5 bodyweights in walking versus ~2.0–2.9 bodyweights in running as speed increased. A controlled same-intensity comparison also found substantially lower peak vertical ground-reaction force and loading rate during walking than running.

Active recovery literature supports low-intensity movement as a legitimate recovery mode, although lactate-clearance studies do not imply that walking is magically restorative in every context. The app therefore treats easy walking as low toll rather than negative fatigue.

## v36.62 implementation

### 1. Aerobic dose and fatigue are separated
`enduranceModalityCost("LSS Walk")` continues to represent low-intensity aerobic dose. It is no longer used as a direct proxy for recovery toll.

### 2. Easy walking fatigue is strongly discounted
Only exact `LSS Walk` receives the special low-toll model. Hikes, rucks, stair work, and ambiguous treadmill sessions remain distinct.

The toll is allowed to rise when:
- RPE is 4–5+,
- walking speed is very brisk,
- climbing/elevation is substantial,
- reliable HR suggests the session was above the easy-aerobic range.

### 3. Long easy walking is sublinear for fatigue
For recovery-fatigue purposes:
- first 60 min: full easy-walk fatigue time,
- 60–120 min: extra minutes count at 35%,
- >120 min: extra minutes count at 15%.

Aerobic volume remains duration-sensitive. This prevents a 3-hour easy flat walk from being modeled as three times as recovery-costly as a 1-hour walk.

### 4. Active-recovery walking is cheaper again
An `Active Recovery` LSS Walk gets an additional toll discount.

### 5. Stress budgets separate aerobic volume from recovery stress
Walking's lower-body, impact, systemic, anaerobic, and local-muscle stress are strongly discounted by the walking-toll factor. Aerobic stress is discounted less so the app still recognizes real low-intensity training volume.

### 6. Background steps are weak evidence
Logged purposeful run/walk/hike/ruck steps are credited out first. Remaining background steps now need a much larger deviation before they create a recovery warning, and the warning is capped as a small contextual signal.

Around an 8,000-step background baseline:
- ~12,000: no recovery penalty,
- ~18,000: only a small penalty (~0.15),
- ~25,000: still only a modest penalty (~0.24).

## Sources
- 2024 Compendium of Physical Activities — Walking. https://pacompendium.com/walking/
- Keller TS et al. Ground reaction forces at different speeds of human walking and running. PMID 2782094.
- Miller RH et al. The mechanics and energetics of human walking and running: a joint level perspective. Proc Biol Sci. 2012;279:1107–1115. PMID 21613286.
- Swain DP et al. Impact Forces of Walking and Running at the Same Intensity. PMID 27003452.
- Menzies P et al. Blood lactate clearance during active recovery after an intense running bout depends on the intensity of the active recovery. PMID 20544484.
