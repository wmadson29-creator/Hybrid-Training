Hybrid Training v36.91

Open index.html from the hosted PWA package. For Android installation, host the entire folder over HTTPS (localhost is also valid for development) so the manifest, service worker, IndexedDB, and worker-backed preprocessing are available.

v36.91 builds on the v36.90 QA/performance baseline and the v36.89 fatigue/recovery model. Its major changes are durable IndexedDB-backed state and bounded restore snapshots, a lightweight recent-data boot journal, worker-backed history/recovery preprocessing, confidence-shrunk personal muscular-recovery learning, visible recommendation reasoning and alternative-mode comparisons, progressive History rendering, one-tap session completion, and an in-app self-check panel.

The new personal recovery learner is deliberately conservative. It begins at the research prior and only changes operational recovery persistence after enough repeated, informative evidence. Small learned differences remain informational until they exceed the evidence/meaningfulness gate.

See UPDATE_NOTES_v36_91.md, QA_REPORT_v36_91.txt, STORAGE_ARCHITECTURE_v36_91.md, and GOLDEN_REGRESSION_v36_91.md.

Use Export Data periodically as a portable backup. IndexedDB snapshots and the local boot/safety journal improve resilience but are not a substitute for an external backup.
