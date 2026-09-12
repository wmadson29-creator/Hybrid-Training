# Bodyweight Measurement Context Research — Hybrid Training v36.67

## Why context matters

A scale measures total body mass at that instant. Short-term changes can reflect food/fluid in the gastrointestinal tract, bladder/bowel contents, hydration, sweat loss, glycogen-associated water, clothing, and normal day-to-day variation — not just tissue gain/loss.

### Morning standardization
For longitudinal comparison, the cleanest practical reference is a standardized morning measurement after waking/bathroom, before meaningful food/fluid intake and before exercise, with minimal/light clothing. Research on body-composition measurement shows that daily activities, breakfast and exercise increase biological measurement noise; morning measurements are generally more repeatable under standardized conditions.

### Empty stomach at night is not the same as morning fasted
Being several hours since food does not erase the rest of the day's hydration, sodium/carbohydrate intake, glycogen/water state, prior meals or activity. v36.67 therefore gives an empty-stomach bedtime measurement less trend weight than a standardized morning measurement rather than pretending they are equivalent.

### Post-workout weight
Exercise can change body mass acutely through sweat/fluid balance. Studies show change in body mass closely tracks change in body water after prolonged exercise, so an immediate post-workout weight is useful data but a noisy estimate of underlying tissue mass.

### Food/fluid effects
Acute fluid ingestion can move measured body mass within minutes. A study using 466 mL isotonic fluid observed a peak body-mass increase of about 0.38 kg at 30 minutes. Day-to-day weight change also correlates with food intake and fluid balance.

### Glycogen/water
Carbohydrate/glycogen changes can move body mass independent of fat or muscle tissue. Human work has reported roughly 2.7–4 g of associated water per gram of glycogen under carbohydrate-loading conditions.

## How the app uses this

The app **never subtracts a guessed number of pounds** from a bedtime, fed, hydrated or post-workout measurement. It stores the raw scale weight exactly as entered.

Instead, each observation gets a comparison-quality/confidence weight:
- Highest: morning, overnight fasted, after bathroom, before meaningful fluids, before exercise, minimal/light clothing.
- Moderate: daytime/evening but otherwise relatively controlled.
- Lower: recent meal, large recent fluid intake, before bathroom, heavy clothing.
- Lowest: immediately post-workout or likely dehydrated.

Lower-quality measurements still contribute to the latent trend; they simply pull it less and widen uncertainty.

## Sources
- Effects of daily activities/meal on standardized body-composition measurement: PMID 22179140.
- Effects of exercise sessions on body-composition measurement noise: PMID 22895377.
- Morning vs evening reliability of multifrequency bioimpedance: PMID 30539099.
- Morning body-mass variability in elite athletes: PMID 29893591.
- Day-to-day body-weight changes and food/fluid balance: PMID 16431548.
- Body-mass change vs body-water change after endurance exercise: PMID 19156437.
- Acute isotonic fluid consumption and body mass: PMID 30998857.
- Glycogen-associated body water after carbohydrate loading: PMID 27231310.
- Lower glycogen associated with ~0.7 kg lower body mass in a crossover study: PMID 36932633.
