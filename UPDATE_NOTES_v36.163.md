# v36.163 — collapsible homepage workout details

The Today homepage now keeps the selected workout's name, date and status visible, with exercises and detailed actions inside a native expandable Workout details section. It applies across Gym, Barbell, KB, Calisthenics, Strength-Endurance, Conditioning and other selected-day plans, including completed-session summaries and their Edit/wearable/History actions.

Default: collapsed on page load and on selecting another date. The same date retains its open/closed state during refresh. A compact summary shows exercise count and completed-session status without displaying the entire exercise list. The existing card elements and event listeners are retained. Keyboard and touch use the native details/summary control.

This is a presentation-only change. Training, logged history, progression, fatigue, loading and workout editing from v36.162 are unchanged. Build/query/cache 36.163; recommendation model remains 24 and automatic Gym model remains 6.

Prepared for repository upload; not pushed/deployed. See QA_REPORT_v36.163.md.
