# Hybrid Training v36.148 — validation

Executed against actual export (23): 192 workout rows / 40 recovery dates / seven weight entries, exported from v36.144. Chromium viewport: 412×915; deterministic dates in America/Phoenix. No personal export is bundled.

| Suite | Passed |
| --- | ---: |
| Static/deployment | 19 |
| Browser/calendar/PWA | 90 |
| KB and secondary execution | 93 |
| Forecast | 26 |
| Barbell | 57 |
| Secondary logic | 39 |
| Secondary frequency | 29 |
| Core options | 27 |
| Class focus | 47 |
| Substitution | 18 |
| Recovery, session roles and experience semantics | 49 |
| **Actual-export total** | **494** |

Independent empty-history browser/PWA: **84 passed**. Independent empty-history Recovery/roles/experience: **38 passed**.

The new checks exercise real export attribution and hard/easy exercise targets, explicit short/full/manual guards, guided date/session isolation during load/add/save, hidden Recovery-value and draft persistence, date changes, selecting None, relevant soreness disclosure, unique IDs, two-column phone metrics, disclosure migration and no horizontal overflow. Changing general experience across all five ratings preserves effort, progression, fatigue, recovery learning, actual-load response, primary cost and spacing advice.

Observed workout evidence remains unchanged: date, identity, order, sets, reps, weights, effort/RPE, status, notes, class selections and original prescription metadata. The existing derived personalExpectedRpe, personalEffortCorrection and personalCalibrationConfidence fields can recompute for the test's as-of date. The startup comparison excludes only those derived fields; all other saved evidence is compared recursively and in order.

Calendar/secondary regression tests retain explicit actual rest/class commitments and synthetic scenarios as separate inputs. PWA tests verify coherent versus incomplete deployments, Later, active-workout deferral, failed-backup preservation, updated worker/application loading, pre-update snapshots and offline reopening. No page errors were observed in passing flows.

The complete commit-archive section is byte-identical to the v36.147 handoff: SHA-256 35bc6f97c9845d8197ab9e258f0812abfb1c893c1d8ef70c341ab1956e0018f7. Repository and standalone handoff copies match at delivery. The ZIP is a 47-path cumulative delta from v36.139, excludes private exports/dependencies/temporary analyses, and passes archive and runtime-version consistency checks.

Reproduce:

```bash
npm install
npx playwright install chromium
HYBRID_TEST_EXPORT='/absolute/path/to/export.json' npm run test:all
npm run test:browser
npm run test:recovery
```

HYBRID_CHROMIUM_PATH can select an existing executable. Test hooks are injected only by the local test server. These are local checks, not an Android performance benchmark or proof of deployment; no push or deployment was performed.
