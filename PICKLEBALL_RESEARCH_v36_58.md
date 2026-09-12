# Pickleball fatigue, exertion, and conditioning model — v36.58

## Evidence summary

### Professional doubles
A 2025 analysis of eight final-stage PPA men's doubles matches (6,839 shots) reported a mean match duration of 36 ± 15.9 min, 14.0 ± 5.0 min of effective playing time (~39%), and a work:rest ratio of 1:1.6 ± 0.3. Most points lasted 3–9 s (67.4%); most rest periods were 9–15 s (84.3%).

A separate 2026 elite men's doubles study of 2,344 points found very long rallies (≥13 shots) were the most frequent rally category (35.2%). Elite doubles can therefore combine intermittent cardiovascular demand with very high technical/stroke density.

### Professional singles
A 2026 analysis of seven professional men's singles matches reported 37.1 ± 11.6 min mean match duration, 20.5% effective playing time, and a work:rest ratio of 1:3.8. Most rallies were 3–9 s (77.4%) and most rest periods were 9–18 s (76.9%).

The app does not interpret the lower effective-play fraction as “easy singles.” Singles is modeled with greater locomotion, lunge, impact, acceleration/deceleration, and lower-body cost per active minute because one player covers the full court.

### Cardiovascular/metabolic evidence
Most direct physiological studies are recreational and older-adult cohorts, so they are not treated as elite HR targets. They still establish that pickleball produces meaningful cardiovascular work:
- recreational singles and doubles averaged roughly 70–71% of predicted HRmax, with >70% of time in moderate-to-vigorous HR zones;
- an acute doubles study reported about 4.1 METs, ~51% HR reserve, ~53% VO2 reserve, and ~5.9 kcal/min.

HR is therefore useful, but the app keeps RPE, session structure, and movement density primary; HR only modestly adjusts load when the reading passes reliability checks.

### Fatigue
Published pickleball work repeatedly fails to show a simple “pickleball causes big neuromuscular fatigue” pattern. Recreational doubles studies and a preliminary singles-tournament study did not show deterioration in countermovement-jump performance. A 2026 repeated-doubles competition study found perceived fatigue increased while CMJ performance did not decrease.

The app therefore separates:
- perceived/systemic fatigue,
- local lower-body and impact load,
- shoulder/grip/stroke-volume fatigue,
- aerobic/anaerobic conditioning load,
rather than assigning one giant fatigue score.

### Injury/tissue-load context
Injury epidemiology is not used as an injury prediction model. It is used only to decide which tissues deserve explicit load tracking. Lower leg, ankle, knee, and shoulder/wrist are prominent in published injury series; Achilles rupture/gastrocnemius injury and running/lunging mechanisms are especially relevant to court-movement exposure.

## Drilling vs matches in the app

### Pickleball — Matches
When Effective Rally Time is not entered, professional time-motion data provide fallback estimates:
- doubles: ~39% effective play,
- singles: ~20.5%,
- mixed/unknown: conservative midpoint.

Inactive match time still gets a small load credit because physiological recovery is incomplete between rallies.

Singles receives higher lower-body/impact/power weighting.
Doubles receives more technical/stroke-density emphasis and less locomotor cost.
Tournament context adds only a modest systemic multiplier; the model does not pretend every tournament match is physiologically maximal.

### Pickleball — Drilling
Direct pickleball drill physiology is sparse. Drill profiles are therefore lower-confidence and are intentionally overridden by logged Active Drill Time, RPE, HR, work/rest, and shot volume. If both work and rest intervals are logged and Active Drill Time is omitted, the app uses the entered work:rest ratio to estimate active density before falling back to a drill-type prior.

Drill types:
1. Technique / Repetition — low systemic/cardio, high technical/repetitive upper-extremity load.
2. Kitchen / Hands — high reaction and stroke density, modest locomotion, moderate anaerobic bursts.
3. Live-Ball Cooperative — high active fraction, stronger aerobic/work-capacity stimulus.
4. Point-Pattern / Competitive — match-like movement with reduced dead time; higher aerobic + anaerobic + impact load.
5. Movement / Footwork Conditioning — highest lower-body, impact, power, anaerobic and systemic load.
6. Mixed High-Level Practice — balanced prior when the session mixes several drill styles.

Optional shot count raises shoulder/grip/technical fatigue without falsely inflating cardiovascular load.

A classic on-court tennis drill study is used only as an analogy: altering work duration changed lactate and RPE substantially even when HR responses were similar. That supports using drill density and drill type rather than HR alone.

## Sources
- Lozano M, et al. Match activity profile analysis during professional men's double pickleball tournaments. International Journal of Performance Analysis in Sport. 2025. DOI 10.1080/24748668.2025.2457223.
- Lozano M, et al. Match activity profile analysis during professional single male pickleball matches. International Journal of Sports Science & Coaching. 2026. DOI 10.1177/17479541251356028.
- Prieto-Lage I, et al. Technical–tactical behaviour and rally structure in professional men's doubles pickleball. International Journal of Sports Science & Coaching. 2026. DOI 10.1177/17479541261436986.
- Webber SC, et al. Physical Activity Intensity of Singles and Doubles Pickleball in Older Adults. J Aging Phys Act. 2023;31(3):365–370. PMID 36087934.
- Smith LE, Buchanan CA, Dalleck LC. The Acute and Chronic Physiological Responses to Pickleball in Middle-Aged and Older Adults. Int J Res Exerc Physiol. 2018.
- Martin E, et al. Lack of Neuromuscular Fatigue Due to Recreational Doubles Pickleball. J. 2024;7(3):264–280. DOI 10.3390/j7030015.
- Falknor MJ, et al. Lack of Neuromuscular Fatigue in Singles Pickleball Tournament: A Preliminary Study. PMID 40700203.
- Perceived, but Not Neuromuscular, Fatigue Demonstrated After Doubles Pickleball Competitions. 2026. PMID 42312964.
- Fernandez-Fernandez J, et al. Quantification of the physiological and performance characteristics of on-court tennis drills. Br J Sports Med. 2007. PMID 17681984. Used only as a drill-density analogue.
