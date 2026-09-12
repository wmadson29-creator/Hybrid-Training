# Class & Activity Effort Research — Hybrid Training v36.63

## Method

The app now treats class names as **different physiological activities**, not cosmetic labels.

The evidence hierarchy is:

1. **Direct peer-reviewed studies / systematic reviews** of the activity or class.
2. **2024 Compendium of Physical Activities** values when the activity has a supported MET entry.
3. **Close physiological-family analogue** when a branded/specialized class has sparse direct literature.
4. **Lower-confidence prior** when neither direct nor close evidence is strong.

MET values are used as **population-level intensity anchors, not personalized calorie estimates**. The Compendium itself cautions that standard MET values are not precise individual energy-expenditure predictions. Actual logged duration, HR, RPE, work/rest, power/distance, active time, heat and exercise components can move the app's session load away from the prior.

## Important research conclusions used by the model

- **Yoga:** Hatha is generally light (~2.2 MET in direct work); Vinyasa is higher but still usually below brisk walking on average; power yoga is higher. Heated yoga raises HR/core-temperature/thermal strain more than it raises oxygen cost.
- **Pilates:** Direct and systematic-review evidence supports light-to-moderate average metabolic intensity. Reformer tends to exceed mat, while local core/muscular-endurance stress can be meaningful despite low HR.
- **Spin/indoor cycling:** Can spend substantial time above ventilatory threshold. Compendium lists RPM/Spin at ~9 MET and cycling HIIT ~8.8 MET.
- **Step/dance:** Step height and movement density matter. Compendium values span ~4.8 MET for low-impact dance to ~9 MET for high-step work; Zumba ~6.5; POUND ~8.5.
- **BodyPump:** Direct work shows lower average HR/energy expenditure than cycle/step classes but considerable high-repetition local muscular and lactate stress. It should not be modeled like heavy strength or like pure cardio.
- **HIFT/CrossFit:** Direct studies and reviews consistently show high HR/lactate/RPE; WOD structure materially changes stress. Some challenge-type sessions may require 48–72 h for full recovery.
- **HYROX:** Direct 2025 work supports sustained high physiological demand from repeated running + stations; the model gives it more aerobic continuity than typical CrossFit while preserving station-related local fatigue.
- **Racquet sports:** A systematic review supports large sport-specific differences. Competitive badminton and squash are high demand; tennis/padel are more variable. Badminton can average >90% HRmax in competitive play.
- **Climbing:** HR can rise disproportionately to VO2 because of isometric upper-body work. Grip/forearm fatigue is therefore weighted more heavily than HR alone.
- **BJJ/grappling:** Systematic-review evidence supports intermittent high-intensity demands with substantial grip/isometric/core stress; drilling and live rolling are deliberately separate.
- **Boxing/combat:** Boxing competition/sparring produces high HR and lactate, with competition generally > sparring > simulations. Technique/bag work is modeled below sparring.
- **Swimming/water exercise:** Water aerobics, aqua HIIT, water running and lap swimming have direct Compendium ranges and essentially no ground-impact cost.
- **Recovery/mind-body:** Restorative yoga, stretching, meditation and breathwork do not get false conditioning credit.

## Catalog

| Activity | Category | Effort prior | Typical RPE | MET anchor/range | Evidence basis |
|---|---|---:|---:|---:|---|
| Yoga — Hatha | mindbody | Light | 2–4 | 2.0–2.5 | Direct/Compendium |
| Yoga — Slow Flow | mindbody | Light–Moderate | 2–5 | 2.3–3.3 | Family evidence |
| Yoga — Vinyasa | mindbody | Moderate | 3–6 | 2.7–3.8 | Direct/Compendium |
| Yoga — Hot Yoga | mindbody | Moderate + heat | 4–6 | ~3 | Direct/Systematic review |
| Yoga — Power Yoga | mindbody | Moderate–Hard | 4–7 | ~4 | Compendium |
| Yoga — Ashtanga | mindbody | Moderate–Hard | 4–7 | 3.5–5 | Yoga-family evidence |
| Yoga — Bikram / 26+2 | mindbody | Moderate + high heat | 4–7 | ~2.7–3.5 | Direct |
| Yoga — Yin / Restorative | mindbody | Very Light | 1–3 | 1.5–2.3 | Compendium/family |
| Yoga — Aerial | mindbody | Light–Moderate | 3–5 | 3–5 | Family/limited |
| Yoga Sculpt | mindbody | Moderate–Hard | 5–7 | 5–7 | Mixed-class analogue |
| Pilates — Mat | mindbody | Light | 2–4 | 1.8–3.0 | Direct/Systematic review |
| Pilates — Reformer | mindbody | Light–Moderate | 3–5 | 2.5–3.7 | Direct/Systematic review |
| Pilates — Tower / Cadillac | mindbody | Light–Moderate | 3–5 | 2.5–4 | Pilates-family evidence |
| Pilates — Chair | mindbody | Moderate | 3–6 | 3–4.5 | Pilates-family evidence |
| Hot Pilates | mindbody | Moderate + heat | 4–7 | 3–5 | Pilates + heat analogue |
| Lagree / Megaformer | mindbody | Hard local endurance | 6–8 | 4–6 | Limited direct evidence |
| Barre | mindbody | Moderate local endurance | 4–6 | 3–5 | Limited/direct analogues |
| Mobility / Stretch Class | mindbody | Very Light | 1–3 | 1.8–2.8 | Compendium |
| Tai Chi / Qigong | mindbody | Light | 2–4 | 3–3.5 | Compendium |
| Meditation / Breathwork | mindbody | Recovery | 1–2 | 1–1.5 | Compendium analogue |
| Indoor Cycling / Spin | cardio | Hard | 6–8 | ~9 | Direct/Compendium |
| Cycle — Endurance | cardio | Moderate–Hard | 5–7 | 5–8 | Cycling-family evidence |
| Cycle — HIIT / Sprint | cardio | Very Hard | 7–9 | 8.8–11 | Direct/Compendium |
| Cycle + Strength | cardio | Hard | 6–8 | 6–9 | Mixed-class analogue |
| Rowing Class | cardio | Hard | 6–8 | 7–11 | Compendium |
| Rowing — Endurance | cardio | Moderate–Hard | 5–7 | 5–8 | Compendium |
| Rowing — Intervals | cardio | Very Hard | 7–9 | 8–12+ | Compendium/interval family |
| Treadmill Running Class | cardio | Hard | 6–8 | 6–11 | Compendium |
| Treadmill — Intervals / Hills | cardio | Very Hard | 7–9 | 8–13+ | Compendium/interval family |
| Stair / Climb Class | cardio | Hard | 6–8 | ~9.3 | Compendium |
| Elliptical / Arc Trainer Class | cardio | Moderate–Hard | 5–8 | 5–9 | Compendium |
| Dance Cardio / Zumba | cardio | Moderate–Hard | 5–7 | ~6.5 | Compendium |
| Aerobics / Step Class | cardio | Moderate–Hard | 5–8 | 5.5–9 | Compendium/direct |
| Dance — Hip-Hop / Choreo | cardio | Moderate–Hard | 5–7 | 5–8 | Dance-family evidence |
| Dance — Ballet / Jazz | cardio | Moderate | 4–6 | 5–6.3 | Direct/Compendium |
| Dance — Line / Country | cardio | Moderate | 3–6 | 4–7 | Compendium |
| POUND / Drumming Fitness | cardio | Hard | 6–8 | ~8.5 | Compendium |
| Aqua Fitness | cardio | Moderate | 4–6 | ~5.5 | Compendium |
| Aqua HIIT | cardio | Hard | 6–8 | ~7.5 | Compendium |
| Deep-Water Running / Aqua Jog | cardio | Moderate–Very Hard | 5–9 | 6.5–9.8 | Compendium |
| Masters Swim / Swim Workout | cardio | Moderate–Hard | 5–8 | 5.8–10.5 | Compendium |
| Jump Rope / Rope Skipping Class | cardio | Very Hard | 7–9 | 9–12+ | Compendium |
| Pickleball — Drilling | sports | Variable | 3–8 | Structure-dependent | Direct + lower-confidence drill priors |
| Pickleball — Matches | sports | Moderate–Hard | 5–8 | Intermittent | Direct time-motion |
| Tennis — Drilling | sports | Moderate | 4–6 | 5–6 | Compendium/racket review |
| Tennis — Match | sports | Moderate–Hard | 5–8 | 4.5–8 | Compendium/racket review |
| Padel | sports | Moderate–Hard | 5–7 | 5–7 | Racket-sport review |
| Badminton | sports | Hard–Very Hard | 6–9 | 7–9 | Direct review/Compendium |
| Squash | sports | Very Hard | 7–9 | 7–12 | Direct review/Compendium |
| Racquetball | sports | Hard–Very Hard | 6–9 | 7–10 | Compendium |
| Basketball — Skills / Drills | sports | Hard | 6–8 | ~9.3 | Compendium/team-sport evidence |
| Basketball — Pickup / Game | sports | Hard | 6–9 | 7.5–8+ | Compendium/team-sport evidence |
| Soccer / Futsal | sports | Hard–Very Hard | 6–9 | 7–10 | Compendium/team-sport evidence |
| Volleyball | sports | Moderate–Hard | 4–7 | 4–6+ | Compendium/team-sport evidence |
| Indoor Climbing / Top Rope | sports | Moderate systemic / hard local | 5–8 | 5.8–8 | Direct/Compendium |
| Bouldering | sports | Hard local / intermittent | 6–9 | 8–9 | Direct/Compendium |
| Boxing Fitness Class | combat | Hard | 6–8 | 7–10 | Compendium/boxing review |
| Boxing — Technique / Bag | combat | Moderate–Hard | 5–8 | 5.8–8.5 | Compendium |
| Boxing — Sparring | combat | Very Hard | 7–9 | 7.8–12.3 | Direct review/Compendium |
| Kickboxing Fitness Class | combat | Hard | 6–8 | 7–10 | Combat-family evidence |
| Muay Thai | combat | Very Hard | 7–9 | 8–12 | Combat-sport evidence |
| Brazilian Jiu-Jitsu — Drilling | combat | Moderate | 4–7 | 5–7 | BJJ systematic review/family |
| Brazilian Jiu-Jitsu — Rolling / Sparring | combat | Hard–Very Hard | 7–9 | 7–10 | BJJ systematic review |
| MMA | combat | Very Hard | 8–10 | 8–12+ | Combat-sport review |
| Wrestling / Grappling | combat | Very Hard | 7–9 | 7–10+ | Compendium/combat-family |
| Karate / Taekwondo | combat | Moderate–Hard | 5–8 | 6–10 | Compendium/combat-family |
| Martial Arts Cardio / BodyCombat-style | combat | Hard | 6–8 | 6–9 | Group-fitness analogue |
| HIIT Class | combat | Very Hard | 7–9 | 7–11 | Compendium/HIFT evidence |
| Bootcamp Class | combat | Hard | 6–8 | ~5–8 | Compendium |
| Circuit Training Class | strength | Moderate–Hard | 5–8 | 5–7.5 | Compendium |
| Strength Class | strength | Moderate | 5–7 | 3.5–6 | Compendium |
| Heavy Strength / Barbell Class | strength | Hard local / lower cardio | 6–9 | 4–6 | Compendium |
| Olympic Weightlifting Technique | strength | Moderate technical | 4–7 | 4–6 | Weightlifting-family evidence |
| Kettlebell Class | strength | Moderate–Hard | 5–8 | 5–9.8 | Compendium |
| BodyPump / Barbell Class | strength | Moderate–Hard local endurance | 5–7 | ~4–6 | Direct |
| TRX / Suspension Class | strength | Moderate–Hard | 5–7 | 4–7 | Functional-resistance family |
| Functional Fitness Class | strength | Hard | 6–8 | 5.5–11.6 | HIFT direct |
| CrossFit / High-Intensity Functional Training | strength | Very Hard | 8–10 | High / WOD-dependent | Direct/systematic review |
| MetCon / Conditioning Circuit | strength | Very Hard | 7–9 | 7–11 | HIFT family |
| HYROX / Race Fitness | strength | Very Hard sustained | 7–9 | High | Direct 2025 + HIFT review |
| Sled / Prowler Conditioning | strength | Very Hard | 7–9 | 7–11 | Conditioning-family evidence |
| Core / Abs Class | strength | Light–Moderate local | 3–6 | 2.8–4 | Compendium |
| Glutes / Lower-Body Sculpt | strength | Moderate–Hard local | 5–8 | 3.5–6 | Resistance-family evidence |
| Upper-Body Sculpt | strength | Moderate local | 5–7 | 3.5–6 | Resistance-family evidence |
| Full-Body Sculpt | strength | Moderate–Hard | 5–8 | 4–7 | Resistance-family evidence |
| Treadmill + Row + Strength Class | strength | Very Hard | 7–9 | 7–10 | Mixed-studio analogue |
| Treadmill + Strength Class | strength | Very Hard | 7–9 | 7–10 | Mixed-studio analogue |

## Why some evidence confidence is lower

For classes such as **Lagree/Megaformer, Barre, Yoga Sculpt, Tower/Chair Pilates, TRX, sculpt classes, and mixed boutique formats**, direct physiology studies are limited or heterogeneous. The app therefore does not invent precise physiology. These get lower-confidence family priors and lean more heavily on your logged RPE, HR, duration and class details.

## Class time/duration design

A class has two independent time concepts:
- **Start time** = clock time.
- **Planned/actual duration** = number of minutes.

The app now stores these separately. It does not infer 45, 50, or 60 minutes from a class name. Future-interference modeling uses entered duration when available; otherwise it uses the class profile without pretending a specific class length is known.

## Activity-step design

Total daily steps can include steps accumulated during workouts. v36.63 therefore:
- adds **Steps during activity** to conditioning/class logs;
- subtracts only the exact value you enter;
- never estimates workout steps from miles, pace, duration, class type or cadence;
- if a logged step-bearing activity is missing that value, background-step recovery load is treated as **unknown**, not zero and not guessed.

## Principal sources

- 2024 Compendium of Physical Activities, Adult Compendium — Conditioning Exercise, Sports, Dancing, Water Activities.
- Hagins et al. The metabolic cost of hatha yoga. PMID 16095417.
- Clay et al. Energy Expenditure in Vinyasa Yoga Versus Walking. PMID 28422589.
- Hot Yoga systematic review, Sports Medicine Open 2025. PMID 41032153.
- Bueno de Souza et al. Pilates mat vs apparatus metabolic intensity. PMID 33992270.
- 2026 Pilates metabolic-intensity systematic review/meta-analysis. PMID 41495794.
- Battista et al. Physiologic responses during indoor cycling. PMID 18545183.
- Wickham et al. Group resistance (PUMP) vs cycle (RIDE) vs step (STEP). PMID 28185805.
- Oliveira et al. Physiological and neuromuscular profile during BodyPump. PMID 19209078.
- McDougle et al. Acute physiological outcomes of HIFT, scoping review. PMID 36620744.
- CrossFit physical/physiological demands review. PMID 39300545.
- Brandt et al. Acute physiological outcomes of HYROX. PMID 40230601.
- Racket sports physiological-demands systematic review. PMID 37063547.
- Phomsoupha & Laffaye. The science of badminton. PMID 25549780.
- Andreato et al. Brazilian Jiu-Jitsu systematic review. PMID 28194734.
- Boxing acute response systematic review/meta-analysis. PMID 35380916.
- Indoor climbing HR/grip-fatigue study. PMID 35180193.
- Watts et al. Indoor climbing physiology / disproportionate HR vs VO2. PMID 12840646.

