# RFC: Translation Drift Management for Mojaloop Documentation

## Status
Draft

## Authors
Mojaloop Documentation Contributors

## Date
2026-04-12

## Context
Mojaloop documentation now supports multiple locales (for example `fr`) and is expected to support more over time. In an open-source setting, source pages may evolve quickly while translated pages lag behind. This causes inconsistent user experience and makes it difficult for contributors who do not speak every language to know where help is needed.

Today, there is no consistent, automated way to:

- detect which translated pages are impacted when source pages change;
- notify the community when translation work is needed;
- track the translation backlog in a transparent and repeatable way.

## Problem statement
We need a workflow that is:

- visible to all contributors;
- automation-first (not dependent on local setup);
- friendly for maintainers and occasional contributors;
- scalable as more locales are introduced.

## Goals

- Keep translation gaps visible in every relevant pull request.
- Automatically create actionable tasks when source docs change on `master`.
- Avoid blocking contributors during initial rollout.
- Keep the solution simple and repository-native (GitHub + lightweight script).

## Non-goals

- Full machine translation pipeline.
- Hard quality enforcement for translation style/accuracy.
- Replacing human review by locale maintainers.

## Proposal
Adopt a GitHub-first translation drift workflow, backed by a repository script:

1. **Canonical source language**
   - English (default docs path, non-locale prefixed pages) remains the source of truth.

2. **Drift detection script**
   - Add a script that reads configured locales from `docs/.vuepress/config.js`.
   - For each changed source Markdown file, compute expected localized paths.
   - Classify each locale page as:
     - `missing`: translated file does not exist;
     - `needs_review`: translated file exists but was not changed in the same PR/range;
     - `updated`: translated file changed in the same PR/range.

3. **PR visibility**
   - On pull requests touching docs, post/update a PR comment with impacted files and locale status.
   - This provides immediate visibility for reviewers, including non-native speakers.

4. **Backlog creation**
   - On push to `master`, create a GitHub Issue when translation work is needed.
   - Issue body includes per-locale checklists for missing and review-needed files.

5. **Optional local helper**
   - Contributors may run the same script locally before opening PRs.
   - Local checks are optional; GitHub automation is authoritative.

## Why GitHub-first (vs local-only)

- Local scripts are frequently skipped in open-source contribution flows.
- GitHub comments/issues are visible, searchable, and asynchronous.
- Community members can self-assign translation tasks without cloning/setup.
- Automation behavior is auditable and consistent.

## Trade-offs

- **Pros**
  - Low implementation complexity.
  - Immediate community visibility.
  - Scales with additional locales.

- **Cons**
  - `needs_review` is heuristic-based (it does not confirm translation quality).
  - May generate issue noise if thresholds are too low.

## Rollout plan

### Phase 1: Informational (non-blocking)
- Enable PR comment report only.
- Tune path filters and report readability.

### Phase 2: Task automation
- Enable issue creation on `master` when drift exists.
- Add labels and assign locale maintainers where available.

### Phase 3: Optional policy
- For critical sections only, optionally fail checks when locale files are missing.
- Keep "review-needed" as warning unless stricter governance is approved.

## Community operating model

- Define or invite locale maintainers (for example: `locale:fr`).
- Use labels:
  - `i18n`
  - `translation-needed`
  - `locale:<code>`
- Encourage small, frequent translation PRs.
- Add guidance in contributor docs for translation updates.

## Future enhancements

- Add frontmatter metadata in translated files (for example `source_commit`) for stronger stale detection.
- Integrate external translation platforms if translation volume outgrows repository-native workflow.
- Add dashboards (GitHub Projects) for locale-level progress tracking.

## Success metrics

- Percentage of source changes with visible translation report in PR.
- Median time between source merge and translation update.
- Number of open translation drift issues per locale over time.
- Contributor participation in locale-specific updates.

## Open questions for community review

- Should issue creation happen for every push or on a schedule (daily/weekly)?
- Should missing translations eventually become a merge gate for selected docs?
- Which teams or maintainers own each locale in CODEOWNERS?
