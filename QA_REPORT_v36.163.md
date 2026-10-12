# QA report — v36.163

Focused validation: 157 checks across five suites (25 static deployment/syntax, 32 homepage disclosure workflows, 41 phone UI audit, 50 UI workflows, 9 idle-performance checks). Older v36.162 regression results remain historical evidence and are not counted in this total.

Homepage checks use the real disclosure control across Generic Gym, Barbell Strength, KB Heavy, Calisthenics, Strength-Endurance and Conditioning. They verify default collapse, expansion, same-day refresh, date-change reset, keyboard access, completed-session status/count, available History action, immutable history, phone overflow and browser errors. A synthetic eight-exercise completed Gym session models the screenshot's long list. No new private export was used.

Phone layout visually inspected at 412×915 using local Chrome Headless Shell. The selected workout panel is compact when collapsed. Existing optional secondary/day-context UI tests explicitly expand the section before interacting with controls now intentionally hidden inside it. Functional assertions are retained. No training-model or device-speed claim is made.

Run npm run test:home-collapse for focused checks; npm run test:all includes the new suite. Prepared only; GitHub/Pages and the installed Android client have not been verified for v36.163.
