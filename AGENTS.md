# wirelessrumor Codex instructions

Read DEVELOPMENT_STATUS.md and inspect existing code and CI before changes. Work in isolated task branches, run relevant tests, update progress, and prepare draft pull requests. Never deploy or merge without authorization. Do not use real customer data or production credentials.


## Parallel cloud task continuity
- At task start read the existing project status file (STATUS.md for SupplyYardPro, .codex/STATE.md for Barkboys-estimator) and DEVELOPMENT_STATUS.md if present.
- Prefer one well-scoped task per isolated branch. Do not overwrite concurrent branches or unfinished work.
- Before finishing, record actual tests, remaining blockers and the next safe task in DEVELOPMENT_STATUS.md; also maintain the existing project-specific status file.
- Open a draft PR for review; never merge or deploy without authorization.
- A completed cloud task does not automatically start another one. Do not claim unattended execution unless a runner is verified.
