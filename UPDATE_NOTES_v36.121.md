# Hybrid Training v36.121

## Anchor-move reflow and Steps-first recovery summary

- One-off Barbell Strength / KB / Base-Building moves still preserve the exact user-selected target date and the source workout's original training week/day prescription.
- A moved anchor now creates an explicit reflow claim when it displaces Conditioning, Strength-Endurance, Generic Gym, Calisthenics, or Active Recovery.
- Reflow claims are reconstructed directly from `programDayMoves.targetOriginalSession`, so they survive imports even when the target workout-intent record has normalized `originalSession` and `selectedSession` to the same moved anchor.
- Multiple displaced flexible opportunities receive distinct nearby open dates. Candidate assignment is deterministic, bounded to seven days, never uses a past date, and skips fixed anchors, other move targets, explicit user schedules, and non-open move-source replacements.
- The reflow date is an opportunity, not a copied workout. The adaptive scorer still chooses the best current modality from recovery, cadence, goals, fatigue, feedback, and future interference. Recovery Guard remains authoritative.
- A move-source replacement does not manufacture a second reflow claim. It remains a planning constraint and contributes its real scheduled load without double-counting the target session that was displaced.
- New move records store `displacedFlexibleSession`, `reflowClaimId`, and `reflowPolicy` for durable auditability. Older exports remain compatible and derive the same claim from existing move metadata.
- The Home recovery summary now shows explicitly entered daily Steps instead of HRV. Missing steps render as `—`, never as zero; an entered zero remains a real value.
- The v36.120 personalization/swim layer can now replace its existing public bridge hooks because the bridge is sealed rather than frozen. Its shape remains protected while its documented hooks remain patchable.
- Deployment/cache metadata is advanced to v36.121.
