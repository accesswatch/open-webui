# Open WebUI Accessibility Remediation -- Status Report

Report Date: April 10, 2026
Prepared by: Jeff Bishop
Project: WCAG 2.2 AA Remediation for Open WebUI
Repository: [accesswatch/open-webui](https://github.com/accesswatch/open-webui) (fork of [open-webui/open-webui](https://github.com/open-webui/open-webui))
Project Board: [Open WebUI Accessibility (WCAG 2.2 AA)](https://github.com/users/accesswatch/projects/1)

---

## Executive Summary

Open WebUI is an open-source, self-hosted AI chat platform with over 60,000 GitHub stars. A comprehensive WCAG 2.2 AA audit identified **38 accessibility issues** that make the application largely unusable for people who depend on screen readers, keyboard navigation, or other assistive technologies.

In 12 days of development (March 29 through April 10, 2026), **30 of 38 issues (79%) have working code committed** across 5 implementation branches totaling 29 commits. The fixes span 7 user-journey sprints and touch the full stack of accessibility concerns: semantic HTML, form labeling, keyboard support, ARIA patterns, focus management, and animation control.

**Key achievements:**

- The core chat workflow (send a message, read the response, act on it, pick a model, browse history) is now fully accessible via keyboard and screen reader -- Sprints 1 through 5 are code-complete.
- Over 300 form inputs now have programmatic labels (previously 89% were unlabeled).
- 395 decorative SVG icons now have `aria-hidden="true"`.
- 15 `svelte-ignore` accessibility suppressions have been removed and their underlying issues fixed.
- A 33-test automated Playwright/axe-core test suite runs in CI on every push.

**What remains:**

- 8 issues still need implementation (mostly visual testing: color contrast, zoom/reflow, target sizes).
- Zero manual screen reader testing has been performed.
- Zero pull requests have been submitted to the upstream repository.
- The Definition of Done requires both manual testing and upstream acceptance -- the project is approximately 40% complete end-to-end.

**Top risks:**

- No screen reader testers beyond the project lead (NVDA on Windows only).
- Large PRs (form labels, decorative SVGs) may face pushback upstream for touching many files.
- Upstream may merge conflicting changes before our PRs land -- weekly rebasing is planned.

---

## Table of Contents

- [Executive Summary](#executive-summary)
- [Project Health Dashboard](#project-health-dashboard)
- [Sprint-by-Sprint Detail](#sprint-by-sprint-detail)
  - [Sprint 1: I can send a message](#sprint-1-i-can-send-a-message)
  - [Sprint 2: I can read the response](#sprint-2-i-can-read-the-response)
  - [Sprint 3: I can act on the response](#sprint-3-i-can-act-on-the-response)
  - [Sprint 4: I can pick a model](#sprint-4-i-can-pick-a-model)
  - [Sprint 5: I can browse my chat history](#sprint-5-i-can-browse-my-chat-history)
  - [Sprint 6: I can manage my settings](#sprint-6-i-can-manage-my-settings)
  - [Sprint 7: Cross-cutting polish](#sprint-7-cross-cutting-polish)
- [Testing Status](#testing-status)
  - [Automated Testing](#automated-testing)
  - [Manual Testing](#manual-testing)
- [Upstream PR Strategy](#upstream-pr-strategy)
- [Infrastructure and Tooling Delivered](#infrastructure-and-tooling-delivered)
- [WCAG 2.2 AA Coverage](#wcag-22-aa-coverage)
- [Risk Register](#risk-register)
- [Remaining Work](#remaining-work)
- [Timeline](#timeline)
- [Appendix: All Commits](#appendix-all-commits)
- [Appendix: Document Inventory](#appendix-document-inventory)

---

## Project Health Dashboard

The following table summarizes project status across five key metrics.

| Metric | Done | Total | Progress |
|---|---|---|---|
| Issues with code committed | 30 | 38 | 79% |
| Issues with automated tests | 12 | 38 | 32% |
| Issues manually tested (screen reader) | 0 | 38 | 0% |
| Issues manually tested (keyboard) | 0 | 38 | 0% |
| PRs submitted upstream | 0 | ~20 | 0% |

### Sprint Gate Status

Each sprint must clear four gates before it is considered fully complete.

The following table shows gate completion for each sprint.

| Sprint | User Story | Code | Auto Tests | Manual Test | Upstream |
|---|---|---|---|---|---|
| 1 | I can send a message | 3/3 DONE | 3/3 DONE | 0/3 | 0/3 |
| 2 | I can read the response | 3/3 DONE | 3/3 DONE | 0/3 | 0/3 |
| 3 | I can act on the response | 2/2 DONE | 1/2 | 0/2 | 0/2 |
| 4 | I can pick a model | 2/2 DONE | 1/2 | 0/2 | 0/2 |
| 5 | I can browse my chat history | 2/2 DONE | 2/2 DONE | 0/2 | 0/2 |
| 6 | I can manage my settings | 3/4 | 1/4 | 0/4 | 0/4 |
| 7 | Cross-cutting polish | 15/22 | 1/22 | 0/22 | 0/22 |
| **Total** | | **30/38** | **12/38** | **0/38** | **0/38** |

---

## Sprint-by-Sprint Detail

### Sprint 1: I can send a message

**Status: Code complete. Automated tests complete. Manual testing not started.**

This sprint makes the most fundamental interaction -- typing a message and pressing Enter -- accessible via keyboard and screen reader. All three issues are implemented.

The following table lists Sprint 1 issues and their current status.

| Issue | Title | WCAG | Code | Tests | Commit |
|---|---|---|---|---|---|
| [#8](https://github.com/accesswatch/open-webui/issues/8) | Add semantic landmarks to app layout | 1.3.1, 2.4.1, 4.1.2 | Done | Done | `4696ca36c` |
| [#9](https://github.com/accesswatch/open-webui/issues/9) | Label the chat input | 1.3.1, 4.1.2 | Done | Done | `12dd0df97` |
| [#10](https://github.com/accesswatch/open-webui/issues/10) | Add page heading to empty chat state | 1.3.1, 2.4.6 | Done | Done | `7971bd593` |

**What changed:**
- The app layout now has `<main>`, `<header>`, and `<aside>` landmarks. Screen reader users can press D to jump between them.
- The chat message input (TipTap editor) has `aria-label="Message"` -- previously announced as just "edit" or "text field."
- The empty chat placeholder uses `<h1>` instead of `<div>` -- screen readers announce it as a page heading.

**Visual impact:** Zero. All changes swap HTML elements while preserving the exact Tailwind CSS classes.

---

### Sprint 2: I can read the response

**Status: Code complete. Automated tests complete. Manual testing not started.**

After sending a message, the user needs to know when the response arrives and navigate through it. This sprint adds heading navigation, a skip link, and a completion announcement.

The following table lists Sprint 2 issues and their current status.

| Issue | Title | WCAG | Code | Tests | Commit |
|---|---|---|---|---|---|
| [#11](https://github.com/accesswatch/open-webui/issues/11) | Make message sender names headings | 1.3.1, 2.4.6 | Done | Done | `7971bd593` |
| [#12](https://github.com/accesswatch/open-webui/issues/12) | Add skip navigation link | 2.4.1 | Done | Done | `3a83fae2f` |
| [#13](https://github.com/accesswatch/open-webui/issues/13) | Announce response completion | 4.1.3 | Done | Done | `fc2477005` |

**What changed:**
- Message sender names ("You", "Assistant") are now `<h3>` headings. Press H in a screen reader to jump between messages.
- A visually-hidden "Skip to main content" link appears first on Tab. Visible on keyboard focus, bypasses the entire sidebar.
- A debounced `aria-live="polite"` announcer says "Response complete" when streaming finishes -- fires once at end, not during each token.

---

### Sprint 3: I can act on the response

**Status: Code complete. Partial automated tests. Manual testing not started.**

Response action buttons (copy, edit, regenerate, read aloud) were invisible to keyboard users because they only appeared on mouse hover. This sprint fixes that and adds J/K message navigation.

The following table lists Sprint 3 issues and their current status.

| Issue | Title | WCAG | Code | Tests | Commit |
|---|---|---|---|---|---|
| [#14](https://github.com/accesswatch/open-webui/issues/14) | Make action buttons visible on keyboard focus | 2.1.1, 2.4.7 | Done | Partial | `d182a6e13` |
| [#15](https://github.com/accesswatch/open-webui/issues/15) | Add keyboard navigation between messages | 2.1.1, 2.4.3 | Done | Partial | `491a5e17a` |

**What changed:**
- Action buttons now appear on `focus-within` (CSS-only change). Tab into any action button and the entire row appears.
- J/K keys move focus between message containers. Each container is `tabindex="-1"` and announces the model name.

---

### Sprint 4: I can pick a model

**Status: Code complete. Partial automated tests. Manual testing not started.**

The model selector dropdown was a custom `<div>` with no ARIA attributes. Screen readers could not announce options, and keyboard users could not navigate them.

The following table lists Sprint 4 issues and their current status.

| Issue | Title | WCAG | Code | Tests | Commit |
|---|---|---|---|---|---|
| [#16](https://github.com/accesswatch/open-webui/issues/16) | Add basic keyboard support to model selector | 2.1.1 | Done | Partial | `4b938a893` |
| [#17](https://github.com/accesswatch/open-webui/issues/17) | Add ARIA combobox pattern to model selector | 4.1.2 | Done | Partial | `4b938a893` |

**What changed:**
- Full ARIA combobox: `role="combobox"`, `aria-expanded`, `aria-activedescendant`, `role="listbox"` on options.
- Arrow keys navigate options. Enter selects. Escape closes. Type to filter.
- Screen readers announce the active option name as the user arrows through the list.

---

### Sprint 5: I can browse my chat history

**Status: Code complete. Automated tests complete. Manual testing not started.**

The sidebar had no headings, no labeled search input, and no structural landmark. Screen reader users could not distinguish sections.

The following table lists Sprint 5 issues and their current status.

| Issue | Title | WCAG | Code | Tests | Commit |
|---|---|---|---|---|---|
| [#18](https://github.com/accesswatch/open-webui/issues/18) | Add sidebar section headings | 1.3.1 | Done | Done | `edc61a340` |
| [#19](https://github.com/accesswatch/open-webui/issues/19) | Label the sidebar search input | 1.3.1, 4.1.2 | Done | Done | `edc61a340` / `68d659ca1` |

**What changed:**
- Sidebar now has `<h2>` section headings for "Chats", "Pinned", "Today", "Yesterday", etc.
- Search input has `aria-label="Search chats"`.

---

### Sprint 6: I can manage my settings

**Status: 3 of 4 issues code-complete. 1 remaining (#23). Manual testing not started.**

Settings modals used `<div>` titles (invisible to screen readers) and form inputs had no labels (screen readers just say "edit" or "text field").

The following table lists Sprint 6 issues and their current status.

| Issue | Title | WCAG | Code | Tests | Commit |
|---|---|---|---|---|---|
| [#20](https://github.com/accesswatch/open-webui/issues/20) | Convert modal titles to headings | 1.3.1, 2.4.6 | Done | Partial | `4f627a0e5` |
| [#21](https://github.com/accesswatch/open-webui/issues/21) | Add heading hierarchy to settings sections | 1.3.1, 2.4.6 | Done | Partial | `4f627a0e5` |
| [#22](https://github.com/accesswatch/open-webui/issues/22) | Label settings form inputs | 1.3.1, 4.1.2, 3.3.2 | Done | Partial | `f375f21ac` |
| [#23](https://github.com/accesswatch/open-webui/issues/23) | Complete settings tab ARIA pattern | 4.1.2 | **Not started** | None | -- |

**What remains:** The settings modal uses visual tabs but lacks `role="tablist"`, `role="tab"`, `role="tabpanel"`, and `aria-selected`. This is a medium-complexity ARIA pattern.

---

### Sprint 7: Cross-cutting polish

**Status: 15 of 22 issues code-complete. 7 remaining. Manual testing not started.**

Sprint 7 covers issues that span the entire application: motion, focus rings, alt text, ARIA patterns, color contrast, responsive design, and WCAG 2.2 new criteria.

The following table lists all Sprint 7 issues with their current status.

| Issue | Title | WCAG | Status | Commit |
|---|---|---|---|---|
| [#24](https://github.com/accesswatch/open-webui/issues/24) | prefers-reduced-motion support | 2.3.3 | Done | `6be79c006` |
| [#25](https://github.com/accesswatch/open-webui/issues/25) | Auth page heading | 1.3.1 | Done | `4f627a0e5` |
| [#26](https://github.com/accesswatch/open-webui/issues/26) | Add alt text to images (72 images) | 1.1.1 | **Not started** | -- |
| [#27](https://github.com/accesswatch/open-webui/issues/27) | Collapsible button fix | 4.1.2, 2.1.1 | Done | `07b3f5766` |
| [#28](https://github.com/accesswatch/open-webui/issues/28) | Dropdown ARIA menu | 4.1.2, 2.1.1, 1.3.1 | Done | `60ad4432c` |
| [#29](https://github.com/accesswatch/open-webui/issues/29) | Modal aria-labelledby | 4.1.2 | Done | `8246f9992` |
| [#30](https://github.com/accesswatch/open-webui/issues/30) | Tooltip focus behavior | 1.3.1, 4.1.2 | Done | `90ce0b3bd` |
| [#31](https://github.com/accesswatch/open-webui/issues/31) | Resolve svelte-ignore suppressions | Multiple | Partial (toast done) | `2e60664ba` |
| [#32](https://github.com/accesswatch/open-webui/issues/32) | Form validation errors | 3.3.1, 3.3.3 | Done | `740f7f89e` |
| [#33](https://github.com/accesswatch/open-webui/issues/33) | Focus-visible indicators | 2.4.7 | Done | `ce775f21d` |
| [#34](https://github.com/accesswatch/open-webui/issues/34) | Sidebar panel focus management | 2.1.1, 4.1.2 | Done | `b42350d1e` |
| [#35](https://github.com/accesswatch/open-webui/issues/35) | Add captions/tracks to media | 1.2.1 | Done | `0b1c18912` |
| [#36](https://github.com/accesswatch/open-webui/issues/36) | Label admin form inputs (221 controls) | 1.3.1, 4.1.2 | Done | `f375f21ac` |
| [#38](https://github.com/accesswatch/open-webui/issues/38) | Label workspace/modal form inputs (83 controls) | 1.3.1, 4.1.2 | Done | `f375f21ac` |
| [#40](https://github.com/accesswatch/open-webui/issues/40) | aria-hidden on decorative SVGs (395 icons) | 1.1.1 | Done | `edc61a340` |
| [#41](https://github.com/accesswatch/open-webui/issues/41) | Color contrast audit | 1.4.3, 1.4.11 | **Not started** | -- |
| [#42](https://github.com/accesswatch/open-webui/issues/42) | Resize/reflow at 200% zoom | 1.4.4, 1.4.10, 1.4.12 | **Not started** | -- |
| [#43](https://github.com/accesswatch/open-webui/issues/43) | Focus not obscured by sticky elements | 2.4.11 | **Not started** | -- |
| [#44](https://github.com/accesswatch/open-webui/issues/44) | Keyboard alternative for drag-and-drop | 2.5.7 | Done | `a0d9546b1` |
| [#45](https://github.com/accesswatch/open-webui/issues/45) | Minimum target size for controls | 2.5.8 | **Not started** | -- |
| [#46](https://github.com/accesswatch/open-webui/issues/46) | WCAG 2.2 new criteria audit | Multiple | **Not started** | -- |
| [#47](https://github.com/accesswatch/open-webui/issues/47) | Table captions | 1.3.1 | Done | `edc61a340` |

---

## Testing Status

### Automated Testing

A Playwright + axe-core test suite runs on every push via GitHub Actions CI.

**Coverage:**

The following table shows automated test coverage by spec file.

| Spec File | Tests | What It Covers |
|---|---|---|
| auth.spec.ts | 6 | Auth page: axe-core scan, heading hierarchy, form labels, validation errors, landmark structure |
| chat.spec.ts | 8 | Chat page: axe-core scan, landmarks, heading hierarchy, chat input label, model selector ARIA |
| chat-messages.spec.ts | 11 | Message rendering: role="log", aria-live, sender headings, listitem roles, action button labels, response completion announcement |
| settings.spec.ts | 4 | Settings modal: axe-core scan, heading hierarchy, tab structure |
| sidebar.spec.ts | 4 | Sidebar: axe-core scan, headings, search label, chat list structure |
| **Total** | **33** | |

**CI configuration:** GitHub Actions workflow ([.github/workflows/a11y-tests.yaml](https://github.com/accesswatch/open-webui/blob/a11y/phase-5-interactive-patterns/.github/workflows/a11y-tests.yaml)) triggers on pushes to `main`, `dev`, and `a11y/**` branches and on all pull requests. Test artifacts are uploaded on failure.

### Manual Testing

**Manual testing has not started.** This is the biggest gap in the project right now.

The [ACCESSIBILITY-TEST-MATRIX.md](ACCESSIBILITY-TEST-MATRIX.md) document contains 200+ test checkboxes organized by issue, covering six testing categories:

The following table describes the six manual testing categories.

| Category | Abbreviation | Tool/Method | Status |
|---|---|---|---|
| Screen Reader | SR | NVDA (Windows) or VoiceOver (macOS) | 0/38 tested |
| Keyboard | KB | Tab, Enter, Space, Escape, Arrow keys | 0/38 tested |
| Low Vision | LV | 200% browser zoom | 0/38 tested |
| Zoom/Reflow | ZR | 320px viewport width | 0/38 tested |
| Automated (axe) | AX | Playwright axe-core scans | 12/38 tested |
| Visual Regression | VR | Before/after screenshots | 0/38 tested |

**Next steps for testing:**
1. Prioritize Sprints 1-2 (core chat flow) for manual SR and KB testing.
2. Record results using the `/a11y-mark-test` slash command or the `a11y-test-tracker` Copilot agent.
3. Recruit a VoiceOver tester for macOS coverage.

---

## Upstream PR Strategy

No PRs have been submitted to the upstream [open-webui/open-webui](https://github.com/open-webui/open-webui) repository. The planned approach:

1. **Submit in sprint order.** Sprint 1 PRs go first because they are the simplest (HTML element swaps, zero visual change) and establish credibility with maintainers.
2. **One logical change per PR.** Most issues map 1:1 to PRs. Closely related issues that touch the same file (e.g., #10 and #11) may be combined.
3. **Target the `dev` branch.** PRs targeting `main` are auto-closed per upstream policy.
4. **Include CLA checkbox.** Required by the upstream PR template bot.
5. **Reference the upstream discussion.** Every PR description links to [Discussion #23212](https://github.com/open-webui/open-webui/discussions/23212) where the maintainer approved the approach.

**Estimated PR count:** approximately 20 PRs (some issues combined, some large issues may split).

**Prerequisite before submitting:** Each sprint should have manual keyboard and screen reader testing completed so the PR description can include test evidence.

---

## Infrastructure and Tooling Delivered

Beyond the accessibility fixes themselves, the project has built a reusable infrastructure:

### Documentation

The following table lists all project documents that have been created or significantly updated.

| Document | Purpose | Lines |
|---|---|---|
| [ACCESSIBILITY-AUDIT-PLAN.md](ACCESSIBILITY-AUDIT-PLAN.md) | Full WCAG 2.2 AA audit, 38-issue backlog, sprint structure, WCAG coverage map, contributor onboarding, progress dashboard, risk register, Definition of Done | 1400+ |
| [A11Y-CHANGELOG.md](A11Y-CHANGELOG.md) | Keep a Changelog format, every issue with WCAG criteria and commit hashes, organized by phase and sprint | 150+ |
| [ACCESSIBILITY-TEST-MATRIX.md](ACCESSIBILITY-TEST-MATRIX.md) | 200+ test checkboxes, progress dashboard, end-to-end walkthroughs, theme contrast matrix, browser compatibility matrix | 1200+ |
| [ACCESSIBILITY-TESTING.md](ACCESSIBILITY-TESTING.md) | Setup guide for Windows, Linux, macOS, and Codespaces; manual testing checklist; troubleshooting | 200+ |
| [ACCESSIBILITY-STATUS-REPORT.md](ACCESSIBILITY-STATUS-REPORT.md) | This report -- executive summary with drill-down sections | This file |

### Automation

The following table lists automation tools created for the project.

| Tool | Purpose |
|---|---|
| [.github/copilot-instructions.md](https://github.com/accesswatch/open-webui/blob/a11y/phase-5-interactive-patterns/.github/copilot-instructions.md) | Copilot workspace instructions: accessibility rules, changelog enforcement, Definition of Done, PR conventions |
| [.github/agents/a11y-test-tracker.agent.md](https://github.com/accesswatch/open-webui/blob/a11y/phase-5-interactive-patterns/.github/agents/a11y-test-tracker.agent.md) | Copilot agent for recording test results in the test matrix |
| [.github/prompts/a11y-mark-test.prompt.md](https://github.com/accesswatch/open-webui/blob/a11y/phase-5-interactive-patterns/.github/prompts/a11y-mark-test.prompt.md) | `/a11y-mark-test` slash command for quick test recording |
| [.github/workflows/a11y-tests.yaml](https://github.com/accesswatch/open-webui/blob/a11y/phase-5-interactive-patterns/.github/workflows/a11y-tests.yaml) | CI workflow running 33 Playwright/axe-core tests on every push |
| [.devcontainer/](https://github.com/accesswatch/open-webui/tree/a11y/phase-5-interactive-patterns/.devcontainer) | GitHub Codespaces config for zero-setup cloud testing |

---

## WCAG 2.2 AA Coverage

The following table maps WCAG 2.2 AA success criteria to their coverage status in this project.

| WCAG Criterion | Title | Covered By | Status |
|---|---|---|---|
| 1.1.1 | Non-text Content | #26 (alt text), #40 (decorative SVGs) | Partial (#40 done, #26 not started) |
| 1.2.1 | Audio/Video Prerecorded | #35 (media tracks) | Done |
| 1.3.1 | Info and Relationships | #8, #10, #11, #18, #20, #21, #47 | Done |
| 1.3.2 | Meaningful Sequence | #46 (WCAG 2.2 audit) | Not started |
| 1.4.3 | Contrast Minimum | #41 (color contrast audit) | Not started |
| 1.4.4 | Resize Text | #42 (zoom/reflow) | Not started |
| 1.4.10 | Reflow | #42 (zoom/reflow) | Not started |
| 1.4.11 | Non-text Contrast | #41 (color contrast audit) | Not started |
| 1.4.12 | Text Spacing | #42 (zoom/reflow) | Not started |
| 2.1.1 | Keyboard | #15, #16, #27, #28, #34 | Done |
| 2.3.3 | Animation from Interactions | #24 (reduced motion) | Done |
| 2.4.1 | Bypass Blocks | #8 (landmarks), #12 (skip link) | Done |
| 2.4.3 | Focus Order | #15 (message navigation) | Done |
| 2.4.6 | Headings and Labels | #10, #11, #18, #20, #21 | Done |
| 2.4.7 | Focus Visible | #14, #33 (focus indicators) | Done |
| 2.4.11 | Focus Not Obscured | #43 | Not started |
| 2.5.7 | Dragging Movements | #44 (keyboard folder move) | Done |
| 2.5.8 | Target Size | #45 | Not started |
| 3.2.6 | Consistent Help | #46 (WCAG 2.2 audit) | Not started |
| 3.3.1 | Error Identification | #32 (form validation) | Done |
| 3.3.2 | Labels or Instructions | #9, #19, #22, #36, #38 | Done |
| 3.3.3 | Error Suggestion | #32 (form validation) | Done |
| 3.3.7 | Redundant Entry | #46 (WCAG 2.2 audit) | Not started |
| 3.3.8 | Accessible Authentication | #46 (WCAG 2.2 audit) | Not started |
| 4.1.2 | Name, Role, Value | #9, #17, #22, #27, #28, #29, #30, #34 | Done |
| 4.1.3 | Status Messages | #13 (response announcement), #31 (toasts) | Done |

**Coverage summary:** 16 of 26 applicable WCAG 2.2 AA criteria have at least one issue with code committed. 10 criteria depend on the 8 remaining issues.

---

## Risk Register

The following table lists active risks to project completion.

| ID | Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|---|
| R1 | Upstream maintainer rejects PRs or goes unresponsive | High | Medium | Maintainer approved approach in Discussion #23212. Keep PRs small. Follow up at 2-week intervals. |
| R2 | Upstream merges conflicting changes before our PRs land | Medium | High | Rebase phase branches weekly. Monitor upstream CHANGELOG.md. |
| R3 | Color contrast audit (#41) reveals widespread theme issues | High | Medium | Run across all 4 themes. Propose fixes using existing Tailwind tokens. |
| R4 | No screen reader testers beyond project lead | High | High | Jeff Bishop tests with NVDA. Recruit VoiceOver tester from community. Document exact test steps. |
| R5 | Large PRs (form labels, decorative SVGs) rejected for scope | Medium | Medium | Pre-split if needed. Reference Discussion #23212 approval. |
| R6 | Scope creep from WCAG 2.2 new criteria audit (#46) | Medium | Low | Timebox to 8 hours. File new issues. Do not block existing merges. |

---

## Remaining Work

The following table lists the 8 issues that still need code implementation, in priority order.

| Priority | Issue | Title | Sprint | Complexity | Blocker? |
|---|---|---|---|---|---|
| 1 | [#23](https://github.com/accesswatch/open-webui/issues/23) | Complete settings tab ARIA pattern | 6 | Medium | No |
| 2 | [#26](https://github.com/accesswatch/open-webui/issues/26) | Add alt text to images (72 images) | 7 | Low (bulk) | No |
| 3 | [#31](https://github.com/accesswatch/open-webui/issues/31) | Resolve remaining svelte-ignore suppressions (57) | 7 | Mixed | No |
| 4 | [#41](https://github.com/accesswatch/open-webui/issues/41) | Color contrast audit and fixes | 7 | High | Needs all 4 themes running |
| 5 | [#42](https://github.com/accesswatch/open-webui/issues/42) | Resize/reflow testing at 200% and 320px | 7 | Medium | Needs visual testing |
| 6 | [#43](https://github.com/accesswatch/open-webui/issues/43) | Focus not obscured by sticky elements | 7 | Low | Needs visual testing |
| 7 | [#45](https://github.com/accesswatch/open-webui/issues/45) | Minimum target size for interactive controls | 7 | Low | Needs visual testing |
| 8 | [#46](https://github.com/accesswatch/open-webui/issues/46) | WCAG 2.2 new criteria audit | 7 | Unknown | Manual review |

**After code is complete**, the project still needs:
- Manual screen reader testing across all 38 issues
- Manual keyboard testing across all 38 issues
- Before/after screenshots for visual regression verification
- Upstream PR submission and review cycles (approximately 20 PRs)

---

## Timeline

The following table shows the project timeline from inception through the current date.

| Date | Milestone |
|---|---|
| March 29, 2026 | Audit complete. Discussion #23212 posted. Maintainer approval received. |
| March 30, 2026 | GitHub Project board created. 45 issues filed. |
| April 6, 2026 | Phase 1 through 5 branches complete. 29 commits across 5 branches. |
| April 6, 2026 | Automated test suite (33 tests) and CI workflow deployed. |
| April 10, 2026 | Documentation suite complete: audit plan, changelog, test matrix, testing guide, status report, Copilot instructions. |
| TBD | Manual testing begins (Sprints 1-2 first). |
| TBD | Remaining 8 issues implemented. |
| TBD | First upstream PRs submitted (Sprint 1). |

---

## Appendix: All Commits

The following table lists every commit on accessibility branches, in reverse chronological order.

| Hash | Date | Branch | Message |
|---|---|---|---|
| `874c5515e` | 2026-04-06 | phase-5 | fix: sync package-lock.json with devDependencies (playwright, axe-core) |
| `7b1f94ea6` | 2026-04-06 | phase-5 | docs: comprehensive testing guide with exact commands and troubleshooting |
| `543549162` | 2026-04-06 | phase-5 | test: add chat-messages spec with mocked model and streaming response |
| `d1afeb85f` | 2026-04-06 | phase-5 | test: add Playwright + axe-core accessibility test suite |
| `7be43bc23` | 2026-04-06 | phase-5 | ci: add GitHub Codespaces devcontainer for manual a11y testing |
| `6eb3b1504` | 2026-04-06 | phase-5 | docs: update audit plan status (30/38 issues fix-committed) |
| `4f627a0e5` | 2026-04-06 | phase-5 | a11y: add semantic heading hierarchy (h1/h2/h3) |
| `edc61a340` | 2026-04-06 | phase-5 | a11y: add table captions, sidebar headings, search label, icon aria-hidden |
| `0b1c18912` | 2026-04-06 | phase-5 | a11y: add track elements to video/audio for media captions |
| `a0d9546b1` | 2026-04-06 | phase-5 | a11y: add Move submenu to FolderMenu for keyboard folder reorganization |
| `ce775f21d` | 2026-04-06 | phase-5 | fix: add visible focus indicators for keyboard navigation |
| `d182a6e13` | 2026-04-06 | phase-5 | fix: show message actions on keyboard focus, not just mouse hover |
| `491a5e17a` | 2026-04-06 | phase-5 | fix: enable keyboard navigation through chat messages |
| `fc2477005` | 2026-04-06 | phase-5 | feat: announce streamed response completion to screen readers |
| `4b938a893` | 2026-04-06 | phase-5 | fix: implement ARIA combobox pattern for model selector |
| `740f7f89e` | 2026-04-06 | phase-4 | fix: add accessible form validation errors to auth page |
| `b42350d1e` | 2026-04-06 | phase-4 | fix: add ARIA and keyboard support to Sidebar panel |
| `60ad4432c` | 2026-04-06 | phase-4 | fix: add ARIA menu pattern to Dropdown component |
| `07b3f5766` | 2026-04-06 | phase-3 | fix: make Collapsible component keyboard-accessible |
| `2e60664ba` | 2026-04-06 | phase-3 | fix: ensure toast notifications are announced by screen readers |
| `90ce0b3bd` | 2026-04-06 | phase-3 | fix: show tooltips on keyboard focus |
| `8246f9992` | 2026-04-06 | phase-3 | fix: add aria-labelledby to Modal component |
| `f375f21ac` | 2026-04-06 | phase-2 | fix: add missing labels to settings and admin form inputs |
| `68d659ca1` | 2026-04-06 | phase-2 | fix: add missing labels to chat UI inputs |
| `12dd0df97` | 2026-04-06 | phase-2 | fix: add accessible label to chat message input |
| `6be79c006` | 2026-04-06 | phase-1 | feat: respect prefers-reduced-motion for all transitions |
| `7971bd593` | 2026-04-06 | phase-1 | fix: add proper heading hierarchy for screen reader navigation |
| `3a83fae2f` | 2026-04-06 | phase-1 | feat: add skip-to-content link for keyboard users |
| `4696ca36c` | 2026-04-06 | phase-1 | fix: add semantic HTML landmarks for screen reader navigation |

---

## Appendix: Document Inventory

The following table lists every file created or significantly modified as part of this accessibility effort.

| File | Type | Created | Purpose |
|---|---|---|---|
| ACCESSIBILITY-AUDIT-PLAN.md | Documentation | March 29 | Master audit and project plan |
| A11Y-CHANGELOG.md | Documentation | April 10 | Change history with WCAG mapping |
| ACCESSIBILITY-TEST-MATRIX.md | Documentation | April 10 | Manual and automated test tracking |
| ACCESSIBILITY-TESTING.md | Documentation | April 6 | Test runner setup guide |
| ACCESSIBILITY-STATUS-REPORT.md | Documentation | April 10 | This executive status report |
| .github/copilot-instructions.md | Automation | April 10 | Copilot workspace rules |
| .github/agents/a11y-test-tracker.agent.md | Automation | April 10 | Test result recording agent |
| .github/prompts/a11y-mark-test.prompt.md | Automation | April 10 | Test marking slash command |
| .github/workflows/a11y-tests.yaml | CI | April 6 | Playwright/axe-core CI workflow |
| .devcontainer/devcontainer.json | CI | April 6 | Codespaces configuration |
| tests/a11y/auth.spec.ts | Test | April 6 | Auth page accessibility tests |
| tests/a11y/chat.spec.ts | Test | April 6 | Chat page accessibility tests |
| tests/a11y/chat-messages.spec.ts | Test | April 6 | Message rendering accessibility tests |
| tests/a11y/settings.spec.ts | Test | April 6 | Settings modal accessibility tests |
| tests/a11y/sidebar.spec.ts | Test | April 6 | Sidebar accessibility tests |
| tests/a11y/helpers.ts | Test | April 6 | Shared test utilities |
