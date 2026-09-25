# Hybrid Training v36.130

Release date: 2026-09-25

## What changed

- Open-day recommendations are now stable while the user compares workout types. If the recommendation shown was Generic Gym, selecting Gym no longer causes the Recommended button to mutate to LSS Run and then flip back on the next tap. The original recommendation is saved as a compact snapshot before the manual switch.
- Recovery entry now supports localized soreness by body area. The app preserves those areas through draft restore, JSON import/export, Recovery History, and model snapshots; selected areas augment matching muscle-fatigue channels rather than pretending all soreness is global.
- Multi-movement conditioning now exposes the principal local loading of each component. Push-ups contribute chest, triceps, shoulder, serratus, and core work; hills/sprints contribute lower-body, impact, power, and anaerobic load.
- Structured conditioning keeps both planned components and performed components. A completed circuit is no longer mislabeled as unplanned just because it lacks a single comparable minute/set ratio.
- Inline **Don’t have this machine** controls persist equipment availability, suppress future automatic recommendations for that machine, and immediately open the normal substitution flow. The control can also undo the unavailable setting.
- The expansion catalog now contains 43 gym and 44 calisthenics/bodyweight additions (87 total). Every addition declares primary muscles, assisting muscles, movement family, related exercises, and a logging/technique note.
- Added gym movements include single-arm and wide-grip pulldowns, plate-loaded and Smith overhead presses, cable upright row, landmine and cable-belt squats, two calf-machine variants, two reverse-wrist-curl variants, and a wrist roller.
- Added bodyweight movements include triceps extensions, planche leans, handstand shoulder taps, towel pull-ups, archer rows, lunge-to-knee-drive, dragon-flag negatives, windshield wipers, bent-knee calf raises, quadruped hovers, eccentric push-ups, side-plank reach-throughs, good mornings, and superman holds.
- Actual-versus-planned classification now protects old strength rows whose bare rep target was previously misread as planned minutes. Strength-session identity wins unless a row explicitly declares itself conditioning.
- Primary and full/short secondary sessions use actual completed work for later fatigue and dose calculations. Secondary-only saves no longer replace the calendar's primary workout identity.
- Barbell Strength anchors remain fixed. Their deliberately narrow secondary-work exception is preserved: only a tightly capped, low-overlap easy swim or 1–2-set / roughly 10–12-minute accessory block may appear when readiness, cadence, equipment, and interference checks all pass.
- Swim History Edit no longer overwrites a manually entered distance when old pool-length fields disagree. New saves block contradictory total-distance versus pool-length × lengths entries until corrected.
- Export schema advances to 52. Planned conditioning components and actual-load model v2 metadata are included in JSON/CSV round trips.

## Findings from the supplied v36.128 export

- 138 exercise rows across 35 sessions passed structural validation.
- 23 older strength rows contain an erroneous planned-minutes field. Current code ignores it for strength; historical rows are not rewritten.
- The Sept. 17 LSS Swim stores 420 yd but also 2 lengths × 21 yd (42 yd). The new consistency guard prevents another contradictory save. The athlete should correct the old row in History to either 20 lengths or the intended total distance.
- No destructive migration is performed. Saved actual exercise values remain authoritative.

## Deployment

All runtime files in this delta must be uploaded together because the page, service worker, manifest, modules, and export schema are version-coupled. Existing on-device history is retained.
