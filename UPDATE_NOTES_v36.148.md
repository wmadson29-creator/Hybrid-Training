# Hybrid Training v36.148 — update notes

Export (23) revealed role leakage and an exercise-feedback conflict; Recovery also needed a shorter daily form.

- Put sleep hours/score, resting HR, wake BioCharge, steps, body fatigue, energy and soreness in daily Recovery. Move HRV, current BioCharge, stress, SpO₂, VO₂, notes and Clear Date under More fields. Sore-area choices open when relevant. Hidden values and drafts remain supported.
- Treat overall workout experience as general feedback. Keep Great/Good/Average/Rough/Very Rough in records while removing it from difficulty, progression and physiological/secondary-cost inference. The UI explains that difficulty belongs to specific effort/RPE.
- Hold a completed Very hard / RPE ≥9 exercise independently of the overall experience. The actual rollout stays at five reps; Too easy push press and leg curl keep their own calibration increases.
- Scope guided roles by matching date and session, and clear guided context before scheduled primary loading. Derive the high-confidence September 30 Barbell-primary / short-bike repair without rewriting completed records. Explicit secondary and manual choices remain honored.
- Keep KB recipe 147. The latest export has no completed KB evidence. Preserve actual Reformer focus, manual F45/rest commitments and all observed workout fields.
- Advance app/cache/manifest stamps to 36.148 and recommendation model stamp to 14. Add runnable Recovery/roles/experience tests; make the test server derive its mock update stamp from version.json.

Validation: the real-export suite passed 494 checks, with separate empty-history browser/PWA and Recovery checks. See QA_REPORT_v36.148.md and EXPORT_RECOVERY_AUDIT_v36.148.md.

Install the cumulative Hybrid_Training_v36_148_GitHub_Update.zip in the existing GitHub repository, preserving folders and all other assets. It updates v36.139–147 and contains 47 new/modified paths. No repository push or deployment was performed here.
