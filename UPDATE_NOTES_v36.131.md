# Hybrid Training v36.131

Release date: 2026-09-25

## Decision and planning integrity

- Open-day recommendations now persist against a deterministic evidence revision. Merely viewing or switching workout choices does not manufacture new evidence or make Gym and LSS flip back and forth.
- The UI separates **how strongly one option outranks another** from **how much athlete-specific evidence exists**. It no longer labels a close score as high confidence.
- Recommendation explanations use short, plain-language reasons. Raw scores, “rolling cadence,” and other model jargon were removed from high-traffic copy.
- Trends now includes a three-week development horizon. Fixed anchors remain visible, the next 72 hours are the firm portion, and later flexible days are explicitly provisional.
- Recommendation decisions retain what was shown, what was chosen, later feedback, and the completed outcome so learning is attributed to the correct choice.

## Actual work, recovery, and pain

- Primary and secondary work both compare completed dose with planned dose. Under-plan work lowers near-term fatigue; over-plan work raises it unless repeated, well-tolerated evidence supports a cautious capacity increase.
- Multi-part conditioning can store planned and completed dose per component, with units, instead of forcing a circuit into a misleading single-minute ratio.
- Recovery observations store when and where they were entered. Same-day edits remain a history rather than silently rewriting the evidence timeline.
- Pain/discomfort records include the affected body area. Recent overlapping pain temporarily de-prioritizes or suppresses automatic movement picks, while a resolution action ends that constraint without deleting history.

## Data safety

- Imports are validated and summarized before replacing local state. A durable snapshot is verified after confirmation, with rollback on failure.
- Sequential migrations run only after every imported collection—including recovery—has been restored. This fixes older recovery timestamps missing their migration.
- Optional encrypted backups use PBKDF2-SHA-256 and AES-GCM locally. The passphrase never leaves the device and cannot be recovered by the app.
- The encrypted import limit accounts for base64 envelope overhead while retaining the original 8 MB decrypted-data limit.

## Equipment and exercise workflow

- Main Gym, Home, and Travel have independent equipment profiles and dumbbell ranges. One exercise can be enabled in any number of profiles; editing one location does not remove it from another.
- The quick Gym editor now reads and writes the active location instead of always displaying the legacy Main Gym list.
- Gym and calisthenics libraries have search, equipment/muscle filters, availability filters, and favorites.
- Machine exercises expose a contextual **Don’t have this machine** action that updates the current location and opens substitution.

## UI and accessibility

- Completed sessions and planned secondary sessions use distinct colors.
- The mobile week strip includes a swipe/position affordance.
- Import and substitution dialogs trap keyboard focus and return it to the launching control.
- Common workout-save errors appear inline near the action instead of relying only on alerts.

## Automated protection

- The local static/model suite contains 169 checks.
- A real mobile-Chromium walkthrough covers boot, calendar navigation, equipment profiles, encrypted backup round-trip, non-mutating import preview, Trends horizon, and browser/console errors.
- GitHub Actions installs Chromium and runs both suites on pushes and pull requests.
