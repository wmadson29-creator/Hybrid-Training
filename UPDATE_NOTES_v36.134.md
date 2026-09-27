# Hybrid Training v36.134

Release date: 2026-09-27

## Effort feedback now changes the modeled dose

Exact RPE remains the best effort signal. When it is blank, **Too easy**, **Easy**, **Comfortable**, **Challenging**, **Very hard**, and failure-style feedback now map to bounded effort estimates used by the same actual-load calculation as a numeric RPE.

This closes an important gap in the latest run: completing 44 of 50 planned minutes still records the lower duration, while reporting **Very hard** prevents the session from being interpreted as low-fatigue simply because it was six minutes short. Duration, intensity, response, and future tolerance evidence remain separate inputs.

## Secondary history stays attached to the right workout

The outcome reconciler now requires the same date, primary workout, and secondary type before connecting a completed secondary to an earlier offer. It no longer selects the first same-day secondary when the metadata disagree. A stale link is cleared rather than allowed to teach the recommendation model the wrong preference.

## Advanced comparisons agree with the live recommendation

The conditioning comparison shown in Advanced Trends now honors:

- saved outdoor-versus-treadmill preference;
- shared run-family recovery recency;
- weather/environment suitability;
- pool availability; and
- swim-specific recommendation context.

This prevents a treadmill counterfactual from appearing to outrank the outdoor run merely because that internal comparison previously omitted the live picker's preference inputs.

## Narrow historical primary repair

Schema 54 repairs dates where explicit secondary metadata and exactly one completed primary make the intended primary unambiguous. It does not infer through ambiguous history and does not delete or rewrite completed exercise rows.

## Verification

- **191/191 static and model checks passed.**
- The unmodified supplied export passed with zero errors and four actionable/legacy warnings.
- The corrected copy passed with zero errors and one retained legacy warning.
- The corrected copy retains 149 exercise rows, 39 sessions, and 32 recovery days.
