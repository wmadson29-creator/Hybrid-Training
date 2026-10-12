# v36.162 — approved model and workout workflow refinements

Implements proposal 1 and proposals 3–10. Proposal 2 (machine-specific performance histories) is intentionally excluded.

1. Missing effort/performance feedback is unknown. Projected sessions cannot teach volume tolerance. At least half the outcome rows must have feedback, dose must vary, and two later comparable observed windows must validate a range fitted on earlier windows before learned volume is used. Tolerated work is not proof of optimal volume or growth.
3. Live Gym/Calisthenics fatigue reads effort bands, eligible RIR and individual set RPE/timing. Completed/started sets and manual fields remain protected. Untouched, linked pending set prefills can update while completed records retain their values.
4. Gym selection compares complete prescribed candidate combinations, including their set/rep/load/rest dose, accumulated fatigue and upcoming-anchor interference. Final Gym and Calisthenics stress checks run after duration filling and shared-muscle caps. Explicit skipped, warm-up and zero-work rows do not create proposed workload.
5. Related volume/budget penalties use one load domain; sleep/deload penalties use one recovery domain. Local fatigue remains separate. Chronological held-out validation is required before trusting learned volume. These remain explicit planning heuristics, not physiological measurements.
6. Unavailable this workout opens substitutes and excludes that exercise from this workout's substitute/rebuild choices. The existing permanent gym-availability control remains separate. Temporary exclusions are saved in prepared/active drafts and cleared for the next workout.
7. Preview shorter plan estimates remaining strength work from sets, holds, per-side work and rest. Applying removes lower-priority pending work and marks entirely omitted exercises Skipped. Pinned work can make the requested time impossible; the preview says so. Conditioning/classes retain their direct duration/interval editors.
8. Alternate with next pairs two adjacent, unstarted strength exercises. Planned fatigue follows round-by-round set order. Measured Start/Done timestamps take priority for performed order and gaps. Fixed barbell order is protected; KB pairs require matching bell setups or pairing with bodyweight so plate instructions remain valid.
9. Undo edit restores exercise fields, feedback, set details and loading instructions. A rebuild is one undo action. Undo is withheld if it would erase newly started/completed sets logged after the edit. History is never rewritten by these controls.
10. Pin exercise retains it while rebuilding the remaining Gym/Calisthenics accessories around the loaded workout's focus, available equipment, time and shared muscle budget. Performed and manually loaded exercises are retained as well. Fixed programs are not automatically rebuilt.

Expandable Adjust this workout and Exercise options panels keep the logging screen compact. Pins/pairs are visible in the collapsed option labels.

New runtime: workout-optimizer.js; included in script loading, version.required and service-worker precache. Build 36.162, recommendation stamp 24, automatic Gym model 6.

Validation and limits: see QA_REPORT_v36.162.md. Prepared for extracted-content repository upload; not pushed or deployed.
