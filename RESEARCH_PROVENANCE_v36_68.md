# Hybrid Training v36.68 — Card-Level Research Provenance

## Purpose
This build adds an auditable, card-level evidence layer to the research-heavy surfaces under **More** without adding citation clutter to Today or the main dashboard. The goal is provenance, not citation decoration: a source is shown because it supports a specific claim used by the card.

## UI behavior
Each supported card ends with a collapsed **Sources & evidence** disclosure. Expanding it shows:

- evidence confidence;
- a short explanation of why the app rates/programs the item the way it does;
- the specific claims being informed (for example exertion/METs, movement family, muscle demand, interval structure, impact, or recovery characteristics);
- source title, evidence type, year, evidence-match quality, and a link when available;
- a **Used for** line connecting the source to the card claim;
- a **Research vs. app model** disclosure identifying values that are computed by Hybrid Training rather than directly published; and
- **Research reviewed: September 2026**.

The drawer is collapsed by default. Dashboard / Today workout rendering is intentionally unchanged.

## Coverage
| Surface | Cards checked | Cards with >=1 resolved source |
|---|---:|---:|
| Classes / Activities | 127 | 127 |
| Generic Gym | 85 | 85 |
| Calisthenics | 94 | 94 |
| Kettlebell | 40 | 40 |
| Conditioning (E/HIC/Power) | 59 | 59 |

Strength-Endurance cluster guidance is also sourced. Builder rows for KB, Gym, and Calisthenics update their source drawer when the selected exercise changes.

## Evidence hierarchy
The implementation prefers evidence in roughly this order, subject to relevance:

1. Current position stands, systematic reviews, meta-analyses, and umbrella reviews.
2. Direct exercise- or modality-specific physiology / biomechanics studies.
3. The 2024 Adult Compendium of Physical Activities for activity-specific MET/intensity anchors.
4. Closely related movement-family evidence when direct exercise research is not available.
5. Explicitly labeled proxy / analogue evidence for niche classes or activities.

A lower-confidence label is preferable to pretending that a nearby source directly tested the exact class or exercise.

## Research-backed inputs vs app-derived outputs
Examples of research-backed inputs include:

- activity-specific MET/intensity estimates;
- resistance-training principles;
- movement family and biomechanics;
- interval / HIIT structure and physiological demand;
- impact, eccentric, load-carriage, and modality characteristics;
- class/activity physiology where direct evidence exists.

Examples of app-derived outputs include:

- the exact personalized recovery-cost score;
- fatigue contribution and recommendation ranking;
- predicted interference with another workout;
- exact selected weight, reps, sets, or exercise choice;
- exact duration assembled from workout components; and
- the adaptive Strength-Endurance choice between **2 and 3 circuits**.

Those outputs can be informed by research-backed inputs while still being model outputs. The drawer says so explicitly.

## Core source families represented in the registry
- American College of Sports Medicine 2026 resistance-training position stand / umbrella review.
- 2024 Adult Compendium of Physical Activities.
- Concurrent training meta-analysis evidence.
- HIIT / sprint-interval review evidence.
- Kettlebell systematic/scoping and training-transfer literature.
- Suspension-training review evidence.
- Calisthenics/bodyweight biomechanics and task-specificity literature.
- Walking/running/cycling/rowing/load-carriage modality evidence.
- Pilates, yoga, indoor cycling, aquatic exercise, group-fitness, HIFT, combat-sport, racket-sport, climbing, and pickleball literature where applicable.

The application registry contains the specific source title, type/year, link, and claim mapping displayed in each card.

## Design rule for future cards
A new research-heavy card should not be considered complete until it can resolve to at least one relevant source or is explicitly marked as an unsourced / low-confidence model heuristic. Generic guideline citations should not be added merely to inflate source count.
