# Anthropometry Research and Model Policy — v36.127

## Decision

The app now accepts four optional measurements:

- Height and arm span as a stable body profile.
- Dated waist circumference and body-fat estimate, including the measurement method.

They are useful context, but they are not day-to-day workload controls. A tall athlete or an athlete with long arms is not assigned more fatigue, less work, or a lower strength rating. Actual completed work, performance, effort, recovery, and personal response remain authoritative.

## Why height and arm span are contextual

Folland, Mc Cauley, and Williams found that strength comparisons depend on how body size is normalized; body mass alone is not a universally sufficient denominator, and height can matter when estimating the relevant size variable. That supports recording height for honest comparisons, not converting height into a workout multiplier. [Original study, 2008](https://pubmed.ncbi.nlm.nih.gov/18172672/)

Falch and colleagues studied 36 resistance-trained adults and found associations between anthropometric variables, lean mass, maximal strength, and repetitions to failure. The relationships differed by lift and sex. This does not justify a rule such as “long arms reduce bench targets by X%,” especially when the app has the athlete's own repeated results. [Original study, 2023](https://pmc.ncbi.nlm.nih.gov/articles/PMC9944492/)

Knopfli and colleagues found relationships between lower-limb anatomy and squat outcomes, but the exploratory sample contained only eight participants. It supports retaining geometry as possible context while rejecting strong limb-ratio prescriptions from sparse population data. [Original study, 2023](https://pubmed.ncbi.nlm.nih.gov/37508892/)

For this user, entering 6 ft 6 in height and 6 ft 11 in arm span will record a +5 in reach difference (arm-span-to-height ratio about 1.064). That can explain some range-of-motion and swim-stroke differences, but it will not automatically raise or lower pull-up, pressing, swimming, or fatigue targets.

## Why waist and body-fat estimates are trends only

Li and colleagues analyzed 36,642 adults and found that waist, waist-to-height ratio, and BMI contain cardiometabolic-risk information. This supports showing waist-to-height as descriptive context when both measurements exist. It does not establish a training-dose rule for an individual athlete. [Original study](https://pmc.ncbi.nlm.nih.gov/articles/PMC3549404/)

Kerr, Slater, and Byrne tested body-composition methods in 32 athletic males under standardized and non-standardized conditions. Food, fluid, time, and method affected measurement error, with some methods more sensitive than others. The app therefore stores the method and compares dated values as a trend; it does not treat one BIA, tape, visual, skinfold, or DXA estimate as exact. [Original study, 2017](https://pubmed.ncbi.nlm.nih.gov/28382898/)

## Model guardrails

- No height, arm-span, waist, or body-fat value directly changes today's fatigue score.
- No population anthropometric equation overrides personal performance history.
- Height and reach can appear in strength, pull-up, and swim interpretation as range-of-motion context.
- Waist and body-fat values are compared only with prior values, preferably using the same method and conditions.
- Weight remains neutral: the app evaluates it alongside strength, running, swimming, conditioning, and recovery trends.
- Missing measurements are valid and do not reduce model confidence in unrelated training decisions.

## Measurements not added

The app does not request self-measured femur, tibia, torso, shoulder width, chest, arm, thigh, calf, hand, or foot dimensions. Current evidence does not support turning those noisy measurements into reliable automatic prescriptions for this general-performance goal. They could be added later for a specific fit, technique, rehabilitation, or physique goal, but they should not be collected merely because they are measurable.
