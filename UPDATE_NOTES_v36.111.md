# Hybrid Training v36.111 — Primary Recommendation Crash Fix

- Fixes the actual primary-model crash instead of relying on the Active Recovery fallback.
- Root cause: the v36.107 recovery-personalization layer called `v3691RecoveryMultiplier`, a helper that is private to the earlier v36.91 IIFE. Once the background recovery learner produced a meaningful learned profile, the personalized fatigue path executed that inaccessible helper and threw `ReferenceError: v3691RecoveryMultiplier is not defined`.
- The recovery multiplier is now computed inside the v36.107 diagnostics scope using the same bounded/aged learned-profile formula.
- Fixes a second latent cross-IIFE dependency in pre-update snapshots by adding one intentional durable-storage bridge.
- Recommendation scoring itself is unchanged from v36.110. With the user's exact Sep 13 export, the full primary model now selects Conditioning -> LSS Run rather than entering the Active Recovery fallback.
