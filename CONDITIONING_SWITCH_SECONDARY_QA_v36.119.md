# v36.119 — Conditioning switch + Home Secondary hotfix

Scope is intentionally narrow.

- Replaced the single adaptive **Conditioning** primary-switch button with two explicit choices:
  - **LSS / Aerobic** — keeps the normal recovery/schedule/environment logic and chooses between the rolling easy-run and other-aerobic lanes before selecting the actual modality.
  - **Sprints / HIC** — explicitly requests the speed/HIC lane while preserving tissue-load, recovery, recency, and future-interference checks.
- Existing primary switching for Gym, Calisthenics, SE, Classes, Activities, Active Recovery, Rest, and Use Recommended is unchanged.
- The chosen conditioning family is saved in the one-day conditioning swap metadata so the correct button remains highlighted.
- Hardened the unified Home Secondary renderer so legacy **Optional secondary** cards are removed after the new Secondary hub is inserted. The intended Home flow remains **Primary → Secondary → context/actions**.
- Inline JavaScript syntax check passes.
