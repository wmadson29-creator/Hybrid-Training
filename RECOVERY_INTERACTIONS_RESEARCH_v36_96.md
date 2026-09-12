# Hybrid Training v36.96 — Recovery & Interaction Audit Extension

Reviewed: September 2026

## Purpose

This extension continues the v36.95 systems audit without retuning the base program. The goal is to identify relationships that should affect interpretation of recovery, conditioning, speed work, and concurrent training—and equally important, relationships that are too weak or context-dependent to automate.

## 1. Recovery should be multidimensional, not a single readiness score

Subjective fatigue, soreness, stress, sleep quality, and objective signals such as HR/HRV do not perfectly agree. Reviews of athlete monitoring consistently find that subjective measures can be sensitive to changes in training load, but the size and direction of relationships vary and prediction of performance is imperfect.

**App implication:** retain separate channels for body fatigue, energy/sleepiness, soreness, sleep, HRV/RHR, and direct performance. Do not collapse them into one decisive green/red score. Discordant signals should lower confidence rather than force a rest day.

Sources:
- Saw AE, et al. Monitoring the athlete training response: subjective self-reported measures trump commonly used objective measures. Br J Sports Med. 2016. PMID 26423706. https://pubmed.ncbi.nlm.nih.gov/26423706/
- Duignan C, et al. Single-Item Self-Report Measures of Team-Sport Athlete Wellbeing and Their Relationship With Training Load. Sports Med Open. 2020. PMID 32991706. https://pubmed.ncbi.nlm.nih.gov/32991706/
- The short-term relation between load and acute psychophysiological responses in football: a meta-analysis. 2025. PMID 40159621. https://pubmed.ncbi.nlm.nih.gov/40159621/

## 2. High-speed / explosive running is not equivalent to easy mileage

Evidence from field-sport fatigue monitoring shows that high-speed running is more closely related to acute neuromuscular/muscle-damage responses than total distance alone. Running-induced fatigue also changes mechanics such as ground-contact time and can redistribute load.

**App implication:** keep sprint/speed/HIC impact and neuromuscular stress distinct from low-intensity running volume. Do not let equal duration or equal distance imply equal recovery cost. The existing speed/power, impact, lower-body, and systemic channels already implement this distinction, so no coefficient retune is required here.

Sources:
- Hader K, et al. Monitoring the Athlete Match Response: Can External Load Variables Predict Post-match Acute and Residual Fatigue in Soccer? Sports Med. 2019. PMID 31820260. https://pubmed.ncbi.nlm.nih.gov/31820260/
- Effects of running-induced fatigue on joint kinematics and kinetics during overground running: a systematic review and meta-analysis. 2024. PMID 38752790. https://pubmed.ncbi.nlm.nih.gov/38752790/

## 3. Endurance modality should not become a blanket interference rule

Older and newer concurrent-training reviews differ on whether running or cycling is universally more likely to interfere with lower-body adaptation. The more defensible relationship is the one the app already uses: intensity, impact, local-muscle overlap, duration, proximity to resistance work, and the importance of the upcoming session matter more than a hard-coded "running bad / cycling good" rule.

**App implication:** retain modality-specific impact/local-overlap traits but do not add a universal cycling-vs-running interference bonus or penalty.

Sources:
- Wilson JM, et al. Concurrent training: a meta-analysis examining interference of aerobic and resistance exercises. J Strength Cond Res. 2012. PMID 22002517. https://pubmed.ncbi.nlm.nih.gov/22002517/
- Sabag A, et al. The compatibility of concurrent high intensity interval training and resistance training for muscular strength and hypertrophy. 2018. PMID 29658408. https://pubmed.ncbi.nlm.nih.gov/29658408/
- Comparative efficacy of concurrent training types on lower limb strength and muscular hypertrophy. 2024. PMID 38187085. https://pubmed.ncbi.nlm.nih.gov/38187085/

## 4. Active recovery and soreness relief are not the same as restored performance

Massage, active recovery, compression, and water-based recovery methods can reduce soreness or perceived fatigue in some contexts, but soreness relief does not necessarily mean strength, sprint, or endurance performance has fully recovered.

**App implication:** Active Recovery remains low-cost movement, not a magic acceleration of the physiological recovery clock. The model should not award a next-day readiness bonus simply because an active-recovery session was completed or soreness subjectively improved.

Sources:
- Ortiz RO Jr, et al. A Systematic Review on the Effectiveness of Active Recovery Interventions on Athletic Performance. J Strength Cond Res. 2019. PMID 29742750. https://pubmed.ncbi.nlm.nih.gov/29742750/
- Davis HL, et al. Effect of sports massage on performance and recovery: a systematic review and meta-analysis. BMJ Open Sport Exerc Med. 2020. PMID 32426160. https://pubmed.ncbi.nlm.nih.gov/32426160/
- Dupuy O, et al. An Evidence-Based Approach for Choosing Post-exercise Recovery Techniques. Front Physiol. 2018. PMID 29755363. https://pubmed.ncbi.nlm.nih.gov/29755363/

## 5. Cold-water immersion has a goal-dependent tradeoff

Cold-water immersion can be useful when short-term recovery between competitions or dense sessions is the overriding goal. However, meta-analytic evidence also suggests repeated immediate post-resistance use can attenuate some strength adaptations in certain protocols/populations.

**App implication:** do not auto-recommend cold immersion as a universal recovery tool. If a future recovery-intervention logger is added, the model should distinguish **short-term readiness priority** from **long-term strength/hypertrophy adaptation priority** rather than label CWI simply good or bad.

Sources:
- Effects of post-exercise cold-water immersion on resistance training-induced gains in muscular strength: a meta-analysis. 2022. PMID 35068365. https://pubmed.ncbi.nlm.nih.gov/35068365/
- Cold water immersion protocol optimization across exercise modalities: systematic review and network meta-analysis. 2026. PMID 41845491. https://pubmed.ncbi.nlm.nih.gov/41845491/

## 6. Heat exposure / sauna is potentially useful but should not be silently added to training load

Post-exercise heat exposure and heat acclimation can improve heat tolerance and may influence endurance-related adaptations, but dose, hydration, timing, and environmental goals matter.

**App implication:** heat acclimation remains an environmental adaptation/context system rather than an automatic "extra conditioning" recommendation. Sauna/hot-water exposure should not earn cardio cadence credit unless actual exercise occurred.

Sources:
- The effect of post-exercise heat exposure (passive heat acclimation) on endurance exercise performance: systematic review and meta-analysis. 2025. PMID 39762944. https://pubmed.ncbi.nlm.nih.gov/39762944/
- Brown HA, et al. Quantifying Exercise Heat Acclimatisation in Athletes and Military Personnel: A Systematic Review and Meta-analysis. Sports Med. 2024. PMID 38051495. https://pubmed.ncbi.nlm.nih.gov/38051495/

## 7. Stretching / mobility should not be treated as a recovery or performance shortcut

Static stretching is useful for range of motion and can have chronic benefits, but the acute performance effect depends strongly on dose and context. Longer static-stretch bouts can transiently reduce isolated maximal force; modern evidence does not support a blanket ban before all athletic activity.

**App implication:** mobility/stretch classes remain low-fatigue movement rather than conditioning credit. The model should not add a large readiness bonus from stretching, nor impose a generic "never stretch before speed" rule.

Sources:
- Revisiting the stretch-induced force deficit: systematic review with multilevel meta-analysis. 2024. PMID 38735533. https://pubmed.ncbi.nlm.nih.gov/38735533/
- Thomas E, et al. Does Stretching Training Influence Muscular Strength? J Strength Cond Res. 2023. PMID 36525533. https://pubmed.ncbi.nlm.nih.gov/36525533/

## Decisions from this extension

### Retain / validate
- Separate subjective fatigue, sleepiness/energy, and soreness.
- Use wearable recovery metrics as confidence-weighted context rather than commands.
- Give high-speed/impact work more neuromuscular/tissue significance than equal easy volume.
- Keep active recovery low-cost without pretending it instantly restores readiness.
- Let interference depend on proximity, intensity, impact, and local overlap rather than only modality name.

### Do not automate yet
- Cold plunge / sauna / massage prescriptions without the user explicitly logging those interventions and goals.
- A single soreness cutoff that cancels training.
- A generic running-vs-cycling concurrent-training penalty.
- A universal pre-workout static-stretch prohibition.
- A readiness bonus merely for completing active recovery.

The v36.96 application therefore adds **no new training coefficient changes from v36.95**. This research pass strengthens the rationale for existing multidimensional recovery/interference architecture and documents future guardrails without making the model more reactive.
