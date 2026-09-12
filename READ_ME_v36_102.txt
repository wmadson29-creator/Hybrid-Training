Hybrid Training v36.102

Deployment-resilience hotfix for the v36.101 GitHub Pages partial-upload/reload-loop issue.

This build preserves all v36.101 product improvements while changing update behavior so an older/stale version.json cannot force the installed PWA into repeated reloads. The core app also remains usable if the modular shell assets are temporarily unavailable during deployment.

See DEPLOY_CHECKLIST_v36_102.txt before uploading to GitHub.
