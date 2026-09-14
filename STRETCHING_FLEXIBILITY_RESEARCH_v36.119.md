# Stretching & Flexibility — Research Basis

This document supports the standalone **Stretching & Flexibility** utility added to Hybrid Training. The utility is deliberately isolated from workout history, recovery, fatigue, scheduling, and adaptive recommendations.

## Evidence used for dosing and method selection

### Static stretching
- Static stretching consistently improves joint range of motion. A 2025 systematic review/meta-analysis of 189 studies (6,654 adults) found moderate acute and large chronic flexibility benefits. In that analysis, additional acute flexibility gains leveled off around **4 cumulative minutes per session**, while chronic gains leveled off around **10 minutes per week**. This does **not** mean every stretch needs four minutes; the app uses shorter practical holds and distributes the time across selected areas.  
  Source: Ingram LA et al. *Sports Medicine* (2025). https://pubmed.ncbi.nlm.nih.gov/39614059/
- Mayo Clinic recommends gentle, slow stretching, no bouncing, and roughly **30-second holds**, repeated on both sides. HSS similarly recommends holding a static stretch at least ~20 seconds and repeating 2–4 times when the goal is flexibility.  
  Sources: https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/stretching/art-20546848 and https://www.hss.edu/health-library/move-better/how-to-increase-flexibility

### Before hard strength, sprinting, jumping, or explosive work
- Prolonged static stretching performed immediately before maximal strength/power work can transiently reduce performance. Reviews show the effect is substantially smaller with short-duration static stretching and that dynamic stretching is generally more appropriate immediately before explosive activity.  
  Sources: Behm DG & Chaouachi A. https://pubmed.ncbi.nlm.nih.gov/21373870/ ; Behm DG et al. https://pubmed.ncbi.nlm.nih.gov/26642915/ ; Simic L et al. https://pubmed.ncbi.nlm.nih.gov/22316148/
- Because this utility does not know whether the user is about to train, it does not pretend otherwise. The interface explicitly notes that users going directly into hard/explosive work should favor the controlled-mobility cards and keep static holds short.

### Foam rolling
- Foam rolling can acutely improve range of motion. A 2024 systematic review/meta-analysis found both static stretching and foam rolling improved ROM, with no significant overall difference between them, although static stretching was favored over shorter intervention periods (≤4 weeks).  
  Sources: https://pubmed.ncbi.nlm.nih.gov/38760635/ and https://pubmed.ncbi.nlm.nih.gov/31628662/
- The app therefore treats foam rolling as an **optional alternative tool**, not a mandatory pre-stretch ritual. It uses short deliberate bouts, generally around 30–45 seconds per region, and avoids instructing the user to roll directly over joints/bones.
- Practical technique reference: https://www.hss.edu/health-library/move-better/foam-roller-exercises and https://health.clevelandclinic.org/foam-rolling

### PNF / contract-relax
- PNF/contract-relax methods can improve ROM, but evidence does not establish them as consistently superior to simpler stretching. The app therefore includes only a small number of optional, equipment-dependent contract-relax choices and uses a **gentle submaximal contraction**, not maximal effort.  
  Source: https://pubmed.ncbi.nlm.nih.gov/29474101/

## Stretch library design

The library is deliberately granular. Selectable regions include:

- **Upper body:** neck, upper traps, chest/pecs, front shoulder, rear shoulder, lats, upper/mid back, thoracic spine, triceps, biceps, forearms/wrists.
- **Hips & torso:** lower back, hip flexors, glutes, deep glute/piriformis, adductors/groin, hip rotation, outer hip/TFL.
- **Lower body:** quads, hamstrings, calves/gastrocnemius, soleus, ankle dorsiflexion, feet/plantar fascia.

Technique references for common lower-body positions include HSS and Mayo guidance:
- HSS leg stretch guide: https://www.hss.edu/health-library/move-better/guide-to-leg-muscles
- HSS hip-flexor guide: https://www.hss.edu/health-library/move-better/hip-flexor-stretch
- HSS lower-back mobility guide: https://www.hss.edu/health-library/move-better/stretches-to-loosen-lower-back
- Mayo basic stretch guide: https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/stretching/art-20546848

## Equipment-aware behavior

No special equipment is always a valid option. The user can additionally mark any of these as available **right now**:

- Wall / doorway
- Chair / bench
- Pull-up / hanging bar
- Foam roller
- Stretch strap / towel / foot-loop calf-hamstring strap
- Resistance band
- PVC / yoga stick / dowel
- Slant board / calf stretcher
- Massage / lacrosse ball
- Yoga block

A movement that requires equipment is excluded unless that equipment is selected. Equipment never changes the training model because the entire utility is standalone.

## Routine-generation rules

1. At least one selected body region must be a **primary target** of every generated card. Secondary-target tags may improve ranking but cannot cause an unrelated movement to enter the routine.
2. The generator tries to cover every selected region first, then uses remaining time for complementary movements or a second round when useful.
3. Time choices are 5, 10, 15, 20, or 30 minutes. The displayed estimate is the modeled working time; normal transitions between positions can add a small amount of real-world time.
4. Movement-type order is generally: controlled mobility → foam rolling → static holds → optional contract-relax. This is organizational rather than a claim that one universal order is physiologically superior.
5. Static work uses controlled holds. Dynamic work uses **slow repetitions**, not ballistic bouncing or end-range pulsing.
6. Regenerate changes among comparably appropriate movements without changing any workout history or recommendation state.

## Safety boundary

This feature is designed for normal perceived tightness, stiffness, or ordinary post-training soreness. It does not diagnose or treat injury. The UI tells the user not to stretch through sharp pain, new swelling/bruising, joint instability, numbness/tingling, or a suspected acute injury. Stretch sensation should stay in the muscle/soft tissue rather than becoming joint pain.
