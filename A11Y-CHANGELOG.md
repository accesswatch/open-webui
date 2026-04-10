# Accessibility Changelog

All notable accessibility changes to Open WebUI are documented in this file. This changelog covers the WCAG 2.2 AA remediation effort tracked in [ACCESSIBILITY-AUDIT-PLAN.md](ACCESSIBILITY-AUDIT-PLAN.md).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

Related documents:

- Audit plan and issue map: [ACCESSIBILITY-AUDIT-PLAN.md](ACCESSIBILITY-AUDIT-PLAN.md)
- Test matrix (manual and automated): [ACCESSIBILITY-TEST-MATRIX.md](ACCESSIBILITY-TEST-MATRIX.md)
- Automated test runner guide: [ACCESSIBILITY-TESTING.md](ACCESSIBILITY-TESTING.md)
- Upstream discussion: [open-webui/open-webui#23212](https://github.com/open-webui/open-webui/discussions/23212)
- Upstream tracking issue: [open-webui/open-webui#2790](https://github.com/open-webui/open-webui/issues/2790)
- Project board: [Open WebUI Accessibility (WCAG 2.2 AA)](https://github.com/users/accesswatch/projects/1)

---

## [Unreleased]

### Added - Documentation and Tooling

- **Accessibility test matrix** ([ACCESSIBILITY-TEST-MATRIX.md](ACCESSIBILITY-TEST-MATRIX.md)): Comprehensive manual and automated testing scenarios for all 38 sub-issues across 7 sprints. Includes per-issue test steps, progress dashboard, cross-cutting end-to-end walkthroughs, theme contrast matrix, and browser compatibility matrix. All checkboxes start untested.
- **Test tracker agent** ([.github/agents/a11y-test-tracker.agent.md](.github/agents/a11y-test-tracker.agent.md)): GitHub Copilot agent for recording test results. Marks checkboxes, updates dashboard status cells, records tester names and dates. Invoke via the agent picker or the `/a11y-mark-test` prompt command.
- **Test marking prompt** ([.github/prompts/a11y-mark-test.prompt.md](.github/prompts/a11y-mark-test.prompt.md)): Slash command (`/a11y-mark-test`) that routes to the test tracker agent for quick test result recording.
- **Copilot workspace instructions** ([.github/copilot-instructions.md](.github/copilot-instructions.md)): Project-wide GitHub Copilot instructions covering branch conventions, PR format, accessibility-first development rules, changelog maintenance, and testing requirements.
- **Accessibility changelog** (this file): Dedicated changelog for all accessibility work, organized by sprint and issue.
- **Status report** ([ACCESSIBILITY-STATUS-REPORT.md](ACCESSIBILITY-STATUS-REPORT.md)): Email-ready executive status report with project health dashboard, sprint-by-sprint detail, WCAG 2.2 AA coverage map, risk register, upstream PR strategy, and full commit appendix.
- **Definition of Done**: Added to both [ACCESSIBILITY-AUDIT-PLAN.md](ACCESSIBILITY-AUDIT-PLAN.md) and [.github/copilot-instructions.md](.github/copilot-instructions.md). Eight-step checklist covering code, tests, changelog, test matrix, screen reader testing, visual regression, and audit plan update.
- **Progress dashboard**: Added to [ACCESSIBILITY-AUDIT-PLAN.md](ACCESSIBILITY-AUDIT-PLAN.md) with at-a-glance metrics, sprint gate status, and implementation branch table.
- **Contributor onboarding**: "Start Here" section added to top of [ACCESSIBILITY-AUDIT-PLAN.md](ACCESSIBILITY-AUDIT-PLAN.md) with 2-minute orientation, document map, key commands, and Definition of Done pointer.
- **Risk and blocker register**: Added to [ACCESSIBILITY-AUDIT-PLAN.md](ACCESSIBILITY-AUDIT-PLAN.md) with 6 active risks, mitigations, and owners.
- **Upstream PR tracking table**: Added to [ACCESSIBILITY-AUDIT-PLAN.md](ACCESSIBILITY-AUDIT-PLAN.md) with approximately 20 planned PRs mapped to issues.

---

## Phase 5: Interactive Patterns - 2026-04-10

Branch: `a11y/phase-5-interactive-patterns`

### Added - Sprint 2: "I can read the response"

- **Response completion announcements** ([#13](https://github.com/accesswatch/open-webui/issues/13)): Screen readers now hear "Response complete" when a streamed chat response finishes. Uses a debounced `aria-live="polite"` announcer that fires once at completion, not during token streaming. WCAG 4.1.3 Status Messages. `fc2477005`
- **Keyboard navigation between messages** ([#15](https://github.com/accesswatch/open-webui/issues/15)): Press J/K to move focus between chat messages. Message containers are focusable with `tabindex="-1"`. The model name is announced when arriving at a message. Only active when the chat input is not focused. WCAG 2.1.1 Keyboard, 2.4.3 Focus Order. `491a5e17a`

### Added - Sprint 3: "I can act on the response"

- **Message action buttons visible on keyboard focus** ([#14](https://github.com/accesswatch/open-webui/issues/14)): Copy, edit, regenerate, and read-aloud buttons now appear when any action button receives keyboard focus (`focus-within:visible`), not only on mouse hover. CSS-only change. WCAG 2.1.1 Keyboard, 2.4.7 Focus Visible. `d182a6e13`

### Added - Sprint 4: "I can pick a model"

- **ARIA combobox pattern for model selector** ([#16](https://github.com/accesswatch/open-webui/issues/16), [#17](https://github.com/accesswatch/open-webui/issues/17)): The model selector now uses the full ARIA combobox pattern with `role="combobox"`, `aria-expanded`, `aria-activedescendant`, and arrow key navigation. Screen readers announce the active option as the user navigates. Enter selects, Escape closes. WCAG 4.1.2 Name Role Value, 2.1.1 Keyboard. `4b938a893`

### Added - Sprint 7: Cross-cutting polish

- **Visible focus indicators** ([#33](https://github.com/accesswatch/open-webui/issues/33)): Replaced bare `outline-none` instances with `focus-visible:ring` focus rings. Every interactive element now shows a visible focus indicator on keyboard navigation. WCAG 2.4.7 Focus Visible. `ce775f21d`
- **Semantic heading hierarchy** ([#20](https://github.com/accesswatch/open-webui/issues/20), [#21](https://github.com/accesswatch/open-webui/issues/21), [#25](https://github.com/accesswatch/open-webui/issues/25)): Modal titles converted from `<div>` to heading elements. Settings section dividers converted to `<h2>`/`<h3>`. Auth page title converted to `<h1>`. All carry forward the original Tailwind classes for zero visual change. WCAG 1.3.1 Info and Relationships, 2.4.6 Headings and Labels. `4f627a0e5`
- **Table captions, sidebar headings, search label, icon aria-hidden** ([#18](https://github.com/accesswatch/open-webui/issues/18), [#19](https://github.com/accesswatch/open-webui/issues/19), [#40](https://github.com/accesswatch/open-webui/issues/40), [#47](https://github.com/accesswatch/open-webui/issues/47)): Added `<caption>` to 13 data tables. Added section headings to sidebar. Labeled sidebar search input. Added `aria-hidden="true"` to 395 decorative SVG icons. WCAG 1.1.1 Non-text Content, 1.3.1 Info and Relationships. `edc61a340`
- **Media captions** ([#35](https://github.com/accesswatch/open-webui/issues/35)): Added `<track>` elements to video and audio elements for media captions. WCAG 1.2.1 Audio/Video Prerecorded. `0b1c18912`
- **Keyboard alternative for drag-and-drop** ([#44](https://github.com/accesswatch/open-webui/issues/44)): Added Move submenu to FolderMenu providing a keyboard/button alternative for folder reorganization. WCAG 2.5.7 Dragging Movements. `a0d9546b1`

### Added - Testing Infrastructure

- **Playwright and axe-core test suite**: 33 automated accessibility tests across 5 spec files (auth, chat, chat-messages, settings, sidebar). Tests run axe-core WCAG 2.2 AA scans against live pages and verify structural patterns (landmarks, headings, labels, ARIA roles, focus management). `d1afeb85f`
- **Chat messages spec with mocked LLM streaming**: Tests message rendering, `role="log"` with `aria-live="polite"`, sender name headings, listitem roles, action button labels, response completion announcements, and post-exchange axe-core scan. Uses a mock model route to simulate streaming without requiring an actual LLM. `543549162`
- **CI workflow** ([.github/workflows/a11y-tests.yaml](.github/workflows/a11y-tests.yaml)): GitHub Actions workflow runs all accessibility tests on push to `main`, `dev`, or `a11y/**` branches and on PRs. Uploads test artifacts on failure. `d1afeb85f`
- **GitHub Codespaces devcontainer**: Zero-setup cloud development environment with Node 22, Python 3.11, Playwright Chromium, and all dependencies pre-installed. `7be43bc23`
- **Comprehensive testing guide** ([ACCESSIBILITY-TESTING.md](ACCESSIBILITY-TESTING.md)): Setup instructions for Windows, Linux/macOS, and Codespaces. Manual testing checklist, environment variables, troubleshooting. `7b1f94ea6`

---

## Phase 4: Behavioral Components - 2026-04-06

Branch: `a11y/phase-4-behavioral-components`

### Fixed - Sprint 7: Cross-cutting polish

- **Dropdown ARIA menu pattern** ([#28](https://github.com/accesswatch/open-webui/issues/28)): The Dropdown and DropdownSub components now use `role="menu"` with `role="menuitem"` children. Trigger uses `<button>` with `aria-expanded` and `aria-haspopup="true"`. Arrow key navigation within items. Escape closes and returns focus to trigger. Removed 6 `svelte-ignore` directives. WCAG 4.1.2 Name Role Value, 2.1.1 Keyboard, 1.3.1 Info and Relationships. `60ad4432c`
- **Sidebar panel ARIA and keyboard support** ([#34](https://github.com/accesswatch/open-webui/issues/34)): The common Sidebar panel now has `aria-label`, keyboard dismiss with Escape, and focus management on open/close. Focus returns to the trigger element when closed. Removed 1 `svelte-ignore` directive. WCAG 2.1.1 Keyboard, 4.1.2 Name Role Value. `b42350d1e`
- **Accessible form validation on auth page** ([#32](https://github.com/accesswatch/open-webui/issues/32)): Auth page form inputs now use `aria-invalid="true"` when validation fails, `aria-describedby` linking to error messages, and error announcements via live region. Error messages include text prefix, not color alone. WCAG 3.3.1 Error Identification, 3.3.3 Error Suggestion. `740f7f89e`

---

## Phase 3: Isolated Component Fixes - 2026-04-04

Branch: `a11y/phase-3-isolated-component-fixes`

### Fixed - Sprint 7: Cross-cutting polish

- **Modal aria-labelledby** ([#29](https://github.com/accesswatch/open-webui/issues/29)): Modal.svelte now has `aria-labelledby` pointing to the first heading or title within the dialog. An optional `title` prop provides a fallback `aria-label`. Removed 3 `svelte-ignore` directives. WCAG 4.1.2 Name Role Value. `8246f9992`
- **Tooltip focus behavior** ([#30](https://github.com/accesswatch/open-webui/issues/30)): Tooltips now show on keyboard focus via tippy.js `trigger: 'mouseenter focus'` configuration. Wrapper element is focusable. Removed 1 `svelte-ignore` directive. WCAG 1.3.1 Info and Relationships, 4.1.2 Name Role Value. `90ce0b3bd`
- **Toast notification announcements** ([#31 partial](https://github.com/accesswatch/open-webui/issues/31)): Verified svelte-sonner renders toasts with `role="status"`. Error toasts configured with `role="alert"` for assertive announcement. WCAG 4.1.3 Status Messages. `2e60664ba`
- **Collapsible button fix** ([#27](https://github.com/accesswatch/open-webui/issues/27)): Replaced `<div on:pointerup>` with `<button>` element. Added `aria-expanded` state and `aria-controls` pointing to content panel ID. Removed 4 `svelte-ignore` directives. Keyboard users can now toggle collapsible sections with Enter or Space. WCAG 4.1.2 Name Role Value, 2.1.1 Keyboard. `07b3f5766`

---

## Phase 2: Labels and Attributes - 2026-04-02

Branch: `a11y/phase-2-labels-and-attributes`

### Fixed - Sprint 1: "I can send a message"

- **Chat input label** ([#9](https://github.com/accesswatch/open-webui/issues/9)): The chat message input (TipTap editor) now has `aria-label="Message"`. Screen readers announce the input with a descriptive name instead of just "edit" or "text field." WCAG 1.3.1 Info and Relationships, 4.1.2 Name Role Value. `12dd0df97`

### Fixed - Sprint 5: "I can browse my chat history"

- **Chat UI input labels** ([#19 partial](https://github.com/accesswatch/open-webui/issues/19)): Model selector search input, file upload inputs, and other chat interface inputs now have `aria-label` attributes. WCAG 1.3.1 Info and Relationships, 4.1.2 Name Role Value. `68d659ca1`

### Fixed - Sprint 6: "I can manage my settings"

- **Settings and admin form input labels** ([#22](https://github.com/accesswatch/open-webui/issues/22), [#36](https://github.com/accesswatch/open-webui/issues/36), [#38](https://github.com/accesswatch/open-webui/issues/38)): Added `<label>` elements or `aria-label` attributes to form inputs across user settings, admin settings, workspace editors, and standalone modals. Over 300 controls now have programmatic labels. WCAG 1.3.1 Info and Relationships, 4.1.2 Name Role Value, 3.3.2 Labels or Instructions. `f375f21ac`

---

## Phase 1: Semantic Structure - 2026-03-30

Branch: `a11y/phase-1-semantic-structure`

### Added - Sprint 1: "I can send a message"

- **Semantic HTML landmarks** ([#8](https://github.com/accesswatch/open-webui/issues/8)): Main content area wrapped in `<main>`, top bar in `<header>` (banner landmark), sidebar in `<aside>` with `aria-label="Chat history"` (complementary landmark). Screen reader users can now press D to jump between landmarks. WCAG 1.3.1 Info and Relationships, 2.4.1 Bypass Blocks, 4.1.2 Name Role Value. `4696ca36c`

### Added - Sprint 2: "I can read the response"

- **Skip-to-content link** ([#12](https://github.com/accesswatch/open-webui/issues/12)): Visually-hidden skip link as the first focusable element. Becomes visible on keyboard focus. Targets the main content area. Keyboard users can bypass the sidebar on every page load. WCAG 2.4.1 Bypass Blocks. `3a83fae2f`
- **Heading hierarchy** ([#10](https://github.com/accesswatch/open-webui/issues/10), [#11](https://github.com/accesswatch/open-webui/issues/11)): Chat placeholder greeting changed from `<div>` to `<h1>`. Message sender names in Name.svelte changed from `<div>` to `<h3>`. Users can now press H to navigate between messages. Proper heading hierarchy established across the app. WCAG 1.3.1 Info and Relationships, 2.4.6 Headings and Labels. `7971bd593`

### Added - Sprint 7: Cross-cutting polish

- **prefers-reduced-motion support** ([#24](https://github.com/accesswatch/open-webui/issues/24)): Global CSS `@media (prefers-reduced-motion: reduce)` rule disables all Svelte transitions (fade, slide, flyAndScale). Users with vestibular disorders or motion sensitivity who have enabled reduced motion in their OS settings will see instant transitions with no animation. WCAG 2.3.3 Animation from Interactions. `6be79c006`

---

## Phase 0: Community Discussion - 2026-03-29

### Added

- **Accessibility audit plan** ([ACCESSIBILITY-AUDIT-PLAN.md](ACCESSIBILITY-AUDIT-PLAN.md)): Comprehensive audit of the Open WebUI codebase against WCAG 2.2 AA. Identified 38 issues across 7 user-journey sprints. Includes component-level findings, heading gap analysis, live region deficiency analysis, suppressed warning inventory, and a WCAG 2.2 AA coverage map. `53d704b4f`
- **Community discussion**: Posted [Discussion #23212](https://github.com/open-webui/open-webui/discussions/23212) proposing the accessibility roadmap. Maintainer responded with green light to proceed with small atomic PRs.
- **GitHub Project board**: Created [project board](https://github.com/users/accesswatch/projects/1) with all 45 issues (7 sprint parents + 38 sub-issues).

---

## Issues Not Yet Started

The following issues from the audit plan have not been implemented yet. They remain tracked on the [project board](https://github.com/users/accesswatch/projects/1).

The following table lists all issues that still need implementation.

| Issue | Title | Sprint | WCAG | Status |
|---|---|---|---|---|
| [#23](https://github.com/accesswatch/open-webui/issues/23) | Complete settings tab ARIA pattern | 6 | 4.1.2 | Not started |
| [#26](https://github.com/accesswatch/open-webui/issues/26) | Add alt text to images (72 `<img>` elements) | 7 | 1.1.1 | Not started |
| [#31](https://github.com/accesswatch/open-webui/issues/31) | Resolve remaining svelte-ignore a11y suppressions | 7 | Multiple | Partial (toast done, 57 remaining) |
| [#41](https://github.com/accesswatch/open-webui/issues/41) | Run color contrast audit and fix failures | 7 | 1.4.3, 1.4.11 | Not started |
| [#42](https://github.com/accesswatch/open-webui/issues/42) | Verify resize/reflow at 200% zoom and 320px viewport | 7 | 1.4.4, 1.4.10, 1.4.12 | Not started |
| [#43](https://github.com/accesswatch/open-webui/issues/43) | Verify focus not obscured by sticky elements | 7 | 2.4.11 | Not started |
| [#45](https://github.com/accesswatch/open-webui/issues/45) | Verify minimum target size for interactive controls | 7 | 2.5.8 | Not started |
| [#46](https://github.com/accesswatch/open-webui/issues/46) | Audit WCAG 2.2 new criteria (3.2.6, 3.3.7, 3.3.8, 1.3.2) | 7 | Multiple | Not started |
