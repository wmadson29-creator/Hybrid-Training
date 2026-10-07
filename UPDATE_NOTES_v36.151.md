# Hybrid Training v36.151 — practical recommendations and workflow repairs

This release repairs the user-reported secondary card, makes dated travel/recovery constraints visible and effective, and fixes exact future cardio commitments. It also includes the broader mobile workflow audit.

## Recommendations and planning

- Separate explicit Best full feasibility from the automatic Barbell-extra policy. A compatible optional plan can open while Recommended remains None, with Your choice/Selected labels across the preview and calendar.
- Explain unavailable full plans and provide context, short and custom actions. Keep time, equipment, recovery, duplicate-cardio, SE-spacing and two-full-session guards.
- Show meaningful saved day-context badges on calendar cards, including initial placeholders, plus a selected-day context notice. Add dated time/sick/very-sore/limited-equipment controls.
- Enforce indoor conditioning requirements under Travel/indoor, storms, poor air and extreme heat. Respect equipment access and preserve the ordinary outdoor-running preference when conditions allow.
- Bound automatic easy cardio by the saved available time; use explicit indoor walking when appropriate. Cap that fallback at 45 minutes, sick/returning at 20 and very sore at 30. Recovery flags hold hard automatic conditioning and full extras.
- Preserve the chosen future date through More → aerobic library, show an editable target date, and label the action with that date even after search/category changes.
- Treat a specific library selection as manual intent and store its prescription. Both intervening forecast rows and upcoming-lane reservations use the selected dose; the tested future Swim is 60 minutes rather than a 45-minute fallback.

## Logging, History and Trends

- Compare prior History sessions by actual activity and full/short role. Only compare distance values with matching known units; keep different classes separate.
- Exclude cardio/classes from the resistance-progression exercise table so completed cardio is not presented as zero resistance exposures.
- Refresh the correct activity heading when editing a class, reuse the existing Log stage header and show clean reps remaining as inline buttons.
- Keep completed observations, manual prescriptions, fixed anchors, class focus, active/paused work, drafts and original target metadata intact.

## Delivery

App/cache/manifest build **36.151**, recommendation model stamp **17**, KB recipe **147**. This release does not revise the KB recipe or fixed Barbell wave. `UI_AUDIT_v36.151.md` lists the remaining prioritized UI recommendations and distinguishes them from the implemented fixes. `QA_REPORT_v36.151.md` records current validation. The cumulative GitHub ZIP retains v36.140–150 work; upload all its paths together and keep other app assets. No push or deployment was performed.
