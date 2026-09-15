# Secondary Matrix QA — v36.119

## Scope
Home/Today secondary-workout controls only, plus activation of the previously packaged sprint/hill research patch inside the engine scope so the page has no runtime scope error. Primary workout switching logic is unchanged.

## Intended Home choices
The secondary section always exposes six choices:

- Model recommended — follows the model-wide Full / Short / None decision.
- Recommended short — model's best short complementary add-on even when short did not win the overall decision.
- Custom short — expands inline family choices.
- Recommended full — model's best complete second session even when a full double did not win the overall decision.
- Custom full — expands inline family choices.
- No secondary — explicit stop-after-primary choice.

Custom short expands to LSS/Aerobic, Sprints/HIC microdose, Generic Gym, Calisthenics, SE microdose, Kettlebell, and Blank custom. Custom full expands to LSS/Aerobic, Sprints/HIC, Generic Gym, Calisthenics, SE Circuit, KB Heavy, KB Power, KB Volume, and Blank custom.

## QA performed
- All inline JavaScript parsed successfully in Node VM.
- Headless Chromium rendered exactly one `data-v36123=secondary-matrix` surface and zero legacy `v3677-secondary` or old `v36121-secondary-hub` surfaces.
- Six top-level controls were visible simultaneously on a 390 px mobile viewport.
- Selecting Custom short exposed the expected family grid.
- Selecting Custom full exposed the expected family grid.
- Recommended short produced the model-built short candidate even when the model-wide decision was None.
- No secondary produced the explicit stop-after-primary state.
- Custom-short LSS successfully opened Log with no page/runtime errors in the browser harness.
- Sprint/hill research model is now active inside engine scope (`window.__v36120SprintHillModel` present) rather than throwing before the secondary UI code can execute.
- Service-worker cache key bumped to `hybrid-training-v36-119-secondary-matrix1`.
