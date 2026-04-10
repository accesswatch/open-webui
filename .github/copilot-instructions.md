# Open WebUI -- Copilot Workspace Instructions

## Project Overview

Open WebUI is an extensible, self-hosted AI interface. The frontend is SvelteKit 2 with Tailwind CSS. The backend is Python (FastAPI + Uvicorn). The repository targets Node 18-22 and Python 3.11-3.12.

Repository: `open-webui/open-webui`
Default upstream branch: `main`
PR target branch: `dev` (PRs targeting `main` are auto-closed)

## Branch Conventions

| Branch pattern | Purpose |
|---|---|
| `a11y/phase-*` | Accessibility remediation (WCAG 2.2 AA). See ACCESSIBILITY-AUDIT-PLAN.md |
| `dev` | Integration branch. All PRs target here |
| `main` | Release branch. Never target PRs here |

When working on an accessibility branch, check ACCESSIBILITY-AUDIT-PLAN.md for the issue map and sprint structure before making changes.

## Build and Run Commands

| Task | Command |
|---|---|
| Install frontend dependencies | `npm ci --force` |
| Build frontend | `npm run build` |
| Run frontend dev server | `npm run dev` |
| Run backend (Windows) | `.\.venv\Scripts\python.exe -m uvicorn open_webui.main:app --host 0.0.0.0 --port 8080 --forwarded-allow-ips '*' --reload` |
| Svelte type and a11y check | `npm run check` |
| Frontend unit tests (Vitest) | `npm run test:frontend` |
| Accessibility tests (Playwright) | `npm run test:a11y` |
| Backend format check | `.\.venv\Scripts\python.exe -m ruff format --check . --exclude .venv --exclude venv` |
| Backend smoke test | `.\.venv\Scripts\python.exe -m pytest test -q` |

## Code Style

### Frontend (Svelte/TypeScript)

- SvelteKit 2 with TypeScript. Files are `.svelte` and `.ts`.
- Tailwind CSS for styling. No separate CSS files per component.
- Use `$lib/` path alias for imports under `src/lib/`.
- Prefer Svelte 5 runes syntax where the codebase already uses it.
- Run `npm run check` before committing. Fix all errors.

### Backend (Python)

- FastAPI with Pydantic models. Async handlers where possible.
- Format with Ruff: `ruff format . --exclude .venv --exclude venv`.
- Run `pytest test -q` to verify nothing is broken.

## Accessibility Rules

Every change to user-facing frontend code MUST follow these rules. These are non-negotiable.

### Semantic HTML First

- Use `<button>` for clickable actions, not `<div on:click>` or `<span on:click>`.
- Use `<a href>` for navigation, not click handlers on non-link elements.
- Use `<main>`, `<header>`, `<nav>`, `<aside>`, `<footer>` for landmarks.
- Use heading elements (`<h1>` through `<h6>`) for section titles, not styled `<div>` or `<p>`.
- Use `<label>` or `aria-label` for every form input, select, and textarea.

### Keyboard Accessibility

- Every interactive element must be keyboard accessible (Tab, Enter, Space, Escape, Arrow keys as appropriate).
- Never use `on:click` without also handling `on:keydown` (or use a `<button>` which handles both).
- Never remove focus outlines (`outline-none`) without providing a replacement (`focus-visible:ring-*`).
- Test with Tab key. Verify logical focus order and no keyboard traps.

### Screen Reader Support

- Add `aria-label` to icon-only buttons (buttons with no visible text).
- Add `aria-expanded` to toggle buttons that control collapsible content.
- Add `aria-hidden="true"` to decorative SVG icons.
- Use `aria-live="polite"` for dynamic content updates that screen readers should announce.
- Never put meaningful text only in `title` attributes (screen readers may skip them).

### No New Suppressions

- Never add `<!-- svelte-ignore a11y-* -->` directives. Fix the underlying issue instead.
- If you encounter an existing suppression, fix it and remove the directive as part of your PR.
- Run `npm run check` to verify your change does not introduce new a11y warnings.

### Visual Regression Prevention for Heading Changes

When converting a `<div>` to a heading element (`<h1>` through `<h6>`):
1. Keep every existing Tailwind class.
2. Add `m-0` if needed to neutralize browser heading margins (check if a flex/grid parent already suppresses them).
3. Verify the before/after screenshots are pixel-identical.

### Motion and Animation

- All animations and transitions must respect `prefers-reduced-motion`. The global CSS rule handles Svelte transitions, but if you add CSS animations or JS-driven motion, wrap them in a `prefers-reduced-motion` check.

## Definition of Done

An accessibility issue is **not complete** until ALL of the following are true. Do not close an issue or mark it done until every box can be checked.

1. **Code merged**: The fix is committed on the appropriate `a11y/phase-*` branch.
2. **`npm run check` passes**: Zero new Svelte a11y warnings or TypeScript errors.
3. **Automated tests pass**: `npm run test:a11y` passes (if tests exist for this issue).
4. **Changelog updated**: Entry added to the `[Unreleased]` section of [A11Y-CHANGELOG.md](A11Y-CHANGELOG.md) with issue link, WCAG criterion, and commit hash.
5. **Test matrix updated**: Relevant checkboxes marked in [ACCESSIBILITY-TEST-MATRIX.md](ACCESSIBILITY-TEST-MATRIX.md). At minimum, Keyboard (KB) and Screen Reader (SR) categories must show Pass or N/A.
6. **Screen reader tested**: Manually verified with NVDA (Windows) or VoiceOver (macOS). Record tester name and date in the test matrix.
7. **No visual regression**: Before/after screenshots confirm pixel-identical rendering (or document intentional visual changes).
8. **Audit plan status updated**: The issue's row in the "Current Status" section of [ACCESSIBILITY-AUDIT-PLAN.md](ACCESSIBILITY-AUDIT-PLAN.md) reflects the current state.

When Copilot completes work on an issue, it must verify steps 2-4 before reporting the task as done. Steps 5-7 require human action but Copilot should remind the developer.

## Changelog Maintenance

**This is mandatory for every PR on an accessibility branch.**

When you make changes on any `a11y/*` branch, update [A11Y-CHANGELOG.md](A11Y-CHANGELOG.md):

1. Add entries under the `[Unreleased]` section at the top of the file.
2. Use the Keep a Changelog format: Added, Changed, Fixed, Removed.
3. Each entry must include:
   - The issue number as a link: `([#8](https://github.com/accesswatch/open-webui/issues/8))`
   - A one-sentence description of what changed
   - The WCAG criterion addressed: `WCAG 1.3.1 Info and Relationships`
   - The short commit hash if available
4. Group entries by sprint (for example "Added - Sprint 1: I can send a message").
5. When a phase branch is merged, move its entries from `[Unreleased]` to a dated section.

**Do not modify the upstream CHANGELOG.md.** That file tracks upstream Open WebUI releases. Accessibility work is tracked separately in A11Y-CHANGELOG.md until PRs are accepted upstream.

## Test Matrix Maintenance

When completing manual or automated testing:

1. Use the `a11y-test-tracker` agent or the `/a11y-mark-test` slash command to update [ACCESSIBILITY-TEST-MATRIX.md](ACCESSIBILITY-TEST-MATRIX.md).
2. Record Pass/Fail/N/A in the Progress Dashboard tables.
3. Check the specific test checkboxes in the Per-Issue Test Scenarios section.
4. Record tester name and date.
5. Update the Summary Statistics table at the bottom.

## PR Conventions

### Title Prefixes

Use the upstream convention: `fix:`, `feat:`, `docs:`, `test:`, `ci:`, `chore:`, `refactor:`.

For accessibility PRs, the title should describe the accessibility fix:

```
fix: add semantic HTML landmarks for screen reader navigation
fix: add accessible label to chat message input
feat: add skip-to-content link for keyboard users
```

### PR Checklist

Every PR must include:
- Target: `dev` branch
- Description with WCAG criteria addressed
- Before/after screenshots (for visual changes) or screen reader announcement text (for semantic changes)
- `npm run check` passing with no new a11y warnings
- Manual testing with keyboard navigation at minimum
- For accessibility PRs: screen reader testing with NVDA (Windows) or VoiceOver (macOS)
- CLA agreement checkbox

### Atomic PRs

One logical change per PR. For accessibility work, follow the sprint/issue structure in ACCESSIBILITY-AUDIT-PLAN.md. Do not combine multiple unrelated issues in one PR.

## Key Files

| File | Purpose |
|---|---|
| [ACCESSIBILITY-AUDIT-PLAN.md](ACCESSIBILITY-AUDIT-PLAN.md) | Full audit, issue map, sprint structure, WCAG coverage map |
| [A11Y-CHANGELOG.md](A11Y-CHANGELOG.md) | Changelog for all accessibility work |
| [ACCESSIBILITY-TEST-MATRIX.md](ACCESSIBILITY-TEST-MATRIX.md) | Manual and automated test scenarios, progress tracking |
| [ACCESSIBILITY-TESTING.md](ACCESSIBILITY-TESTING.md) | How to run the automated Playwright/axe-core test suite |
| [ACCESSIBILITY-STATUS-REPORT.md](ACCESSIBILITY-STATUS-REPORT.md) | Executive status report with sprint drill-downs |
| [tests/a11y/](tests/a11y/) | Playwright accessibility test specs |
| [.github/workflows/a11y-tests.yaml](.github/workflows/a11y-tests.yaml) | CI workflow for accessibility tests |
| [.github/agents/a11y-test-tracker.agent.md](.github/agents/a11y-test-tracker.agent.md) | Copilot agent for marking test results |
| [.github/prompts/a11y-mark-test.prompt.md](.github/prompts/a11y-mark-test.prompt.md) | `/a11y-mark-test` slash command |

## Project Tracking

| Resource | URL |
|---|---|
| Project board | [Open WebUI Accessibility (WCAG 2.2 AA)](https://github.com/users/accesswatch/projects/1) |
| Fork | [accesswatch/open-webui](https://github.com/accesswatch/open-webui) |
| Upstream discussion | [Discussion #23212](https://github.com/open-webui/open-webui/discussions/23212) |
| Upstream tracking issue | [open-webui/open-webui#2790](https://github.com/open-webui/open-webui/issues/2790) |
