# Open WebUI Accessibility Audit and Remediation Plan

Assessment Date: March 29, 2026
Repository: open-webui/open-webui (Svelte 5, SvelteKit 2, Tailwind CSS)
Codebase: 556 .svelte files across src/

---

## Leadership Summary

### The Problem

Open WebUI -- a self-hosted AI chat platform with 60,000+ GitHub stars -- is **largely unusable** for people who rely on screen readers, keyboard-only navigation, or other assistive technologies. A full WCAG 2.2 AA audit of its 556 Svelte components found systemic barriers:

- **89% of form inputs have no label.** Screen reader users cannot tell what a field is for.
- **Zero page landmarks.** Users cannot jump between the sidebar, chat area, and header -- they must Tab through hundreds of elements.
- **No skip navigation link.** Every page load forces keyboard users through the entire sidebar before reaching the chat.
- **Critical interactive controls lack keyboard support.** The model selector, dropdowns, and collapsible sections require a mouse.
- **60 accessibility warnings explicitly suppressed** in code rather than fixed.

This is not a niche concern. The WHO estimates 16% of the global population has a significant disability. For an open-source project of this scale, accessibility gaps also create legal exposure under Section 508, ADA, EN 301 549, and the European Accessibility Act.

### The Plan

We structured remediation around **7 user-journey sprints** rather than technical categories, so each sprint delivers a complete, testable improvement for real users:

| Sprint | User Story | Issues | Risk Level |
|---|---|---|---|
| 1 | I can send a message | 3 | Zero -- HTML element swaps only |
| 2 | I can read the response | 3 | Low -- headings + live region |
| 3 | I can act on the response | 2 | Low -- CSS + keyboard shortcuts |
| 4 | I can pick a model | 2 | Medium -- combobox behavior |
| 5 | I can browse my chat history | 2 | Low -- sidebar headings + label |
| 6 | I can manage my settings | 4 | Low -- headings, labels, tabs |
| 7 | Cross-cutting polish | 22 | Mixed -- motion, focus, ARIA, contrast, form labels, WCAG 2.2 new criteria |
| | **Total** | **38** | |

Each sprint has a parent tracking issue with sub-issues linked underneath. All 45 issues (7 parents + 38 sub-issues) are on a [GitHub Project board](https://github.com/users/accesswatch/projects/1) with sprint tagging.

### Key Design Decisions

- **Journey-first, not risk-first.** Sprints 1--3 make the core chat flow accessible end-to-end before touching settings or admin pages. A user who completes Sprint 1 can meaningfully use the product.
- **Zero visual change, by design.** The first 6 sprints swap HTML elements (div to heading, div to button) while keeping the exact same Tailwind CSS classes. Before/after screenshots should be pixel-identical.
- **Atomic PRs.** Each sub-issue maps to one PR with one logical change. Maintainers review 20--100 lines, not 500-line refactors.
- **Upstream-aligned.** The maintainer approved this approach in [Discussion #23212](https://github.com/open-webui/open-webui/discussions/23212): small PRs, handful of files, low triple-digit line changes max.

### Current Status (April 10, 2026)

**Sprints 1-6: Complete.** All 16 sub-issues have code committed and pushed.

**Sprint 7: 15 of 22 complete.**
- fix-committed: #23, #24, #25, #26, #27, #28, #29, #30, #31, #32, #33, #34, #35, #36, #40, #44, #47
- open: #17 (S4-2 combobox ARIA), #38 (workspace/modal form labels), #41 (color contrast), #42 (resize/reflow), #43 (focus not obscured), #45 (target size), #46 (WCAG 2.2 new criteria)

**Overall: 31 of 38 sub-issues have fix-committed.** 7 remain open:
| Issue | Title | Sprint | Notes |
|---|---|---|---|
| #17 | Add ARIA combobox pattern to model selector | S4 | Complex ARIA pattern, needs careful implementation |
| #38 | Label workspace and modal form inputs (83 controls) | S7 | Bulk labeling pass |
| #41 | Run color contrast audit and fix failures | S7 | Needs visual testing |
| #42 | Verify resize/reflow at 200% zoom and 320px viewport | S7 | Needs visual testing |
| #43 | Verify focus not obscured by sticky elements | S7 | Needs visual testing |
| #45 | Verify minimum target size for interactive controls | S7 | Needs visual testing |
| #46 | Audit WCAG 2.2 new criteria (3.2.6, 3.3.7, 3.3.8, 1.3.2) | S7 | Manual review needed |

**Implementation branches:**
- `a11y/phase-1-semantic-structure` -- merged
- `a11y/phase-2-labels-and-attributes` -- merged
- `a11y/phase-3-component-fixes` -- merged
- `a11y/phase-4-behavioral-changes` -- merged
- `a11y/phase-5-interactive-patterns` -- active (current work)

### How to Follow Along

- **Project board**: [Open WebUI Accessibility (WCAG 2.2 AA)](https://github.com/users/accesswatch/projects/1)
- **Upstream discussion**: [open-webui/open-webui Discussion #23212](https://github.com/open-webui/open-webui/discussions/23212)
- **Upstream tracking issue**: [open-webui/open-webui#2790](https://github.com/open-webui/open-webui/issues/2790)
- **Fork**: [accesswatch/open-webui](https://github.com/accesswatch/open-webui)

---

## Table of Contents

- [Open WebUI Accessibility Audit and Remediation Plan](#open-webui-accessibility-audit-and-remediation-plan)
  - [Leadership Summary](#leadership-summary)
    - [The Problem](#the-problem)
    - [The Plan](#the-plan)
    - [Key Design Decisions](#key-design-decisions)
    - [Current Status (April 10, 2026)](#current-status-april-10-2026)
    - [How to Follow Along](#how-to-follow-along)
  - [Table of Contents](#table-of-contents)
  - [Contribution Process Alignment](#contribution-process-alignment)
    - [Mandatory Steps Before Any PR](#mandatory-steps-before-any-pr)
    - [Important Context: Accessibility is Labeled "non-core"](#important-context-accessibility-is-labeled-non-core)
    - [Issue Templates](#issue-templates)
      - [Fork vs. Upstream Issues](#fork-vs-upstream-issues)
      - [Bug Report template (for accessibility defects)](#bug-report-template-for-accessibility-defects)
      - [Feature Request template (for new accessibility capabilities)](#feature-request-template-for-new-accessibility-capabilities)
  - [Codebase Audit Findings](#codebase-audit-findings)
    - [Quantitative Overview](#quantitative-overview)
    - [Critical: Missing Semantic Structure](#critical-missing-semantic-structure)
    - [Critical: Form Labeling Gap](#critical-form-labeling-gap)
    - [Critical: Missing Keyboard Support](#critical-missing-keyboard-support)
    - [Critical: Live Region Deficiency](#critical-live-region-deficiency)
    - [High: Suppressed A11y Warnings](#high-suppressed-a11y-warnings)
    - [High: Focus Indicator Gaps](#high-focus-indicator-gaps)
    - [High: Missing ARIA Patterns](#high-missing-aria-patterns)
    - [Medium: Motion and Reduced Motion](#medium-motion-and-reduced-motion)
    - [Medium: Missing Skip Navigation](#medium-missing-skip-navigation)
    - [Component-Level Findings](#component-level-findings)
      - [Modal.svelte (Good foundation, needs polish)](#modalsvelte-good-foundation-needs-polish)
      - [Dropdown.svelte (Needs significant work)](#dropdownsvelte-needs-significant-work)
      - [Collapsible.svelte (Not a button)](#collapsiblesvelte-not-a-button)
      - [Tooltip.svelte (Partial)](#tooltipsvelte-partial)
      - [Sidebar.svelte (common/Sidebar -- not layout)](#sidebarsvelte-commonsidebar----not-layout)
  - [Existing Accessibility History](#existing-accessibility-history)
    - [Issue #277: "enh: improve accessibility against WCAG 2.1" (Closed, June 2024)](#issue-277-enh-improve-accessibility-against-wcag-21-closed-june-2024)
    - [Issue #1008: "enhancement: more keyboard shortcuts" (Open)](#issue-1008-enhancement-more-keyboard-shortcuts-open)
  - [Journey-Prioritized Implementation Plan](#journey-prioritized-implementation-plan)
    - [Why Journey-First Instead of Risk-First](#why-journey-first-instead-of-risk-first)
    - [User Journey Priority Ranking](#user-journey-priority-ranking)
    - [Heading Gap Analysis](#heading-gap-analysis)
    - [Heading Implementation Principle: Semantics Only, Zero Visual Change](#heading-implementation-principle-semantics-only-zero-visual-change)
    - [Sprint 1: "I can send a message"](#sprint-1-i-can-send-a-message)
      - [PR 1-A: Add semantic landmarks to app layout (#8)](#pr-1-a-add-semantic-landmarks-to-app-layout-8)
      - [PR 1-B: Label the chat input (#9)](#pr-1-b-label-the-chat-input-9)
      - [PR 1-C: Add page heading to empty chat state (#10)](#pr-1-c-add-page-heading-to-empty-chat-state-10)
    - [Sprint 2: "I can read the response"](#sprint-2-i-can-read-the-response)
      - [PR 2-A: Make message sender names headings (#11)](#pr-2-a-make-message-sender-names-headings-11)
      - [PR 2-B: Add skip navigation link (#12)](#pr-2-b-add-skip-navigation-link-12)
      - [PR 2-C: Announce response completion (#13)](#pr-2-c-announce-response-completion-13)
    - [Sprint 3: "I can act on the response"](#sprint-3-i-can-act-on-the-response)
      - [PR 3-A: Make action buttons visible on keyboard focus (#14)](#pr-3-a-make-action-buttons-visible-on-keyboard-focus-14)
      - [PR 3-B: Add keyboard navigation between messages (#15)](#pr-3-b-add-keyboard-navigation-between-messages-15)
    - [Sprint 4: "I can pick a model"](#sprint-4-i-can-pick-a-model)
      - [PR 4-A: Add basic keyboard support to model selector (#16)](#pr-4-a-add-basic-keyboard-support-to-model-selector-16)
      - [PR 4-B: Add combobox ARIA to the selector (#17)](#pr-4-b-add-combobox-aria-to-the-selector-17)
    - [Sprint 5: "I can browse my chat history"](#sprint-5-i-can-browse-my-chat-history)
      - [PR 5-A: Add sidebar section headings (#18)](#pr-5-a-add-sidebar-section-headings-18)
      - [PR 5-B: Label the sidebar search input (#19)](#pr-5-b-label-the-sidebar-search-input-19)
    - [Sprint 6: "I can manage my settings"](#sprint-6-i-can-manage-my-settings)
      - [PR 6-A: Convert modal titles to headings (#20)](#pr-6-a-convert-modal-titles-to-headings-20)
      - [PR 6-B: Add headings to settings sections (#21)](#pr-6-b-add-headings-to-settings-sections-21)
      - [PR 6-C: Label settings form inputs (#22)](#pr-6-c-label-settings-form-inputs-22)
      - [PR 6-D: Complete settings tab ARIA pattern (#23)](#pr-6-d-complete-settings-tab-aria-pattern-23)
    - [Sprint 7: Cross-cutting polish](#sprint-7-cross-cutting-polish)
      - [Gap-analysis additions (April 6, 2026)](#gap-analysis-additions-april-6-2026)
    - [Additional High-Impact Scenarios](#additional-high-impact-scenarios)
  - [Original Phased Remediation Plan (Reference)](#original-phased-remediation-plan-reference)
    - [Phase 0: Community Discussion](#phase-0-community-discussion)
    - [Phase 1: Semantic Structure (High Impact, Zero Risk)](#phase-1-semantic-structure-high-impact-zero-risk)
      - [PR 1.1: Add semantic landmarks to app layout](#pr-11-add-semantic-landmarks-to-app-layout)
      - [PR 1.2: Add skip navigation link](#pr-12-add-skip-navigation-link)
      - [PR 1.3: Add proper heading hierarchy](#pr-13-add-proper-heading-hierarchy)
      - [PR 1.4: Add prefers-reduced-motion support](#pr-14-add-prefers-reduced-motion-support)
    - [Phase 2: Labels and Attributes (Critical Impact, Very Low Risk)](#phase-2-labels-and-attributes-critical-impact-very-low-risk)
      - [PR 2.1: Label the chat input](#pr-21-label-the-chat-input)
      - [PR 2.2: Label form inputs across chat components](#pr-22-label-form-inputs-across-chat-components)
      - [PR 2.3: Label form inputs across settings and admin](#pr-23-label-form-inputs-across-settings-and-admin)
    - [Phase 3: Isolated Component Fixes (Moderate Impact, Low Risk)](#phase-3-isolated-component-fixes-moderate-impact-low-risk)
      - [PR 3.1: Fix Modal.svelte ARIA labeling](#pr-31-fix-modalsvelte-aria-labeling)
      - [PR 3.2: Fix Tooltip.svelte focus behavior](#pr-32-fix-tooltipsvelte-focus-behavior)
      - [PR 3.3: Ensure toast notifications are announced](#pr-33-ensure-toast-notifications-are-announced)
      - [PR 3.4: Fix Collapsible.svelte accessibility](#pr-34-fix-collapsiblesvelte-accessibility)
    - [Phase 4: Behavioral Component Changes (High Impact, Medium Risk)](#phase-4-behavioral-component-changes-high-impact-medium-risk)
      - [PR 4.1: Fix Dropdown.svelte accessibility](#pr-41-fix-dropdownsvelte-accessibility)
      - [PR 4.2: Fix Sidebar panel accessibility](#pr-42-fix-sidebar-panel-accessibility)
      - [PR 4.3: Add accessible form validation errors](#pr-43-add-accessible-form-validation-errors)
    - [Phase 5: Complex Interactive Patterns (High Impact, Medium-High Risk)](#phase-5-complex-interactive-patterns-high-impact-medium-high-risk)
      - [PR 5.1: Model selector combobox pattern](#pr-51-model-selector-combobox-pattern)
      - [PR 5.2: Chat message live regions](#pr-52-chat-message-live-regions)
      - [PR 5.3: Chat keyboard navigation](#pr-53-chat-keyboard-navigation)
  - [PR Templates for Each Phase](#pr-templates-for-each-phase)
  - [Testing Protocol](#testing-protocol)
    - [Screen Reader Testing (NVDA on Windows recommended)](#screen-reader-testing-nvda-on-windows-recommended)
    - [Keyboard-Only Testing](#keyboard-only-testing)
    - [Automated Testing](#automated-testing)
  - [WCAG 2.2 AA Coverage Map](#wcag-22-aa-coverage-map)
  - [Risk Assessment](#risk-assessment)
  - [Project Tracking](#project-tracking)
    - [Issue Map](#issue-map)
  - [Next Steps](#next-steps)

---

## Contribution Process Alignment

Per the repository's CONTRIBUTING.md, PR template, and issue templates, the following process constraints apply to all work:

### Mandatory Steps Before Any PR

1. **Discussion First**: Open a Discussion post in [Discussions](https://github.com/open-webui/open-webui/discussions) describing the accessibility initiative and individual fix proposals before creating PRs. This is explicitly required for first-time contributors and for feature work.

2. **Target the `dev` branch**: All PRs must target `dev`. PRs targeting `main` are automatically closed.

3. **PR Title Prefixes**: Use the correct prefix for each PR:
   - `fix:` for correcting accessibility bugs (missing labels, broken keyboard nav)
   - `feat:` for new accessibility features (skip links, live regions)
   - `refactor:` for semantic HTML restructuring

4. **Atomic PRs**: Each PR must contain one logical change. Do not bundle skip links with form labeling. Each phase item below should be its own PR.

5. **No AI-Only Code**: All code must go through human review AND manual testing. Include screenshots or screen recordings demonstrating the fix in action.

6. **CLA Agreement**: The Contributor License Agreement checkbox must be checked on every PR.

7. **Changelog Entry**: Each PR must include a Keep a Changelog entry at the bottom.

8. **Manual Testing**: Every PR must include:
   - Before/after screenshots
   - Steps to reproduce the issue
   - Confirmation the fix doesn't break other functionality
   - Browser testing with at minimum one screen reader (NVDA recommended for Windows)

9. **Smart Defaults Over Settings**: Accessibility fixes should be applied universally, not behind feature flags. This aligns with the project's "smart defaults" design philosophy.

### Important Context: Accessibility is Labeled "non-core"

Both existing accessibility issues ([#277](https://github.com/open-webui/open-webui/issues/277), [#1008](https://github.com/open-webui/open-webui/issues/1008)) carry the `non-core` label, defined as "maintainers aren't looking into this/low priority." This means:

- Keep PRs small, focused, and easy to review
- Do not submit large refactoring PRs
- Position changes as bug fixes where possible (missing labels ARE bugs)
- Be patient with review timelines
- Be constructive and respectful per the Code of Conduct

### Issue Templates

The project enforces strict template compliance. CONTRIBUTING.md warns: "failure to follow the provided issue template, or not providing the requested information at all, will likely result in your issue being closed without further consideration." Blank issues are disabled -- every issue must use one of the two templates below.

#### Fork vs. Upstream Issues

The 45 issues for this project live on the **fork** (accesswatch/open-webui), which inherits the same templates and `blank_issues_enabled: false` setting. These issues must follow the same template structure as upstream, since:

- The fork's template enforcement is identical to upstream
- Issues may be referenced in upstream PRs and discussions
- Template compliance demonstrates process alignment with the project

**Sprint parent tracking issues** ([#1](https://github.com/accesswatch/open-webui/issues/1)--[#7](https://github.com/accesswatch/open-webui/issues/7)) are an exception. Neither template is designed for parent/tracking issues with sub-issue checklists. These use a project management format with sprint goals, user journeys, WCAG criteria, sub-issue task lists, and definitions of done. This is standard practice for multi-issue initiatives.

**Sub-issues** ([#8](https://github.com/accesswatch/open-webui/issues/8)--[#35](https://github.com/accesswatch/open-webui/issues/35), [#36](https://github.com/accesswatch/open-webui/issues/36), [#38](https://github.com/accesswatch/open-webui/issues/38), [#40](https://github.com/accesswatch/open-webui/issues/40)--[#47](https://github.com/accesswatch/open-webui/issues/47)) follow the appropriate template based on their nature:

| Template | Sub-issues | Rationale |
|---|---|---|
| Bug Report (`issue: `) | [#8](https://github.com/accesswatch/open-webui/issues/8), [#9](https://github.com/accesswatch/open-webui/issues/9), [#10](https://github.com/accesswatch/open-webui/issues/10), [#11](https://github.com/accesswatch/open-webui/issues/11), [#14](https://github.com/accesswatch/open-webui/issues/14), [#17](https://github.com/accesswatch/open-webui/issues/17), [#18](https://github.com/accesswatch/open-webui/issues/18), [#19](https://github.com/accesswatch/open-webui/issues/19), [#20](https://github.com/accesswatch/open-webui/issues/20), [#21](https://github.com/accesswatch/open-webui/issues/21), [#22](https://github.com/accesswatch/open-webui/issues/22), [#23](https://github.com/accesswatch/open-webui/issues/23), [#24](https://github.com/accesswatch/open-webui/issues/24), [#25](https://github.com/accesswatch/open-webui/issues/25), [#26](https://github.com/accesswatch/open-webui/issues/26), [#27](https://github.com/accesswatch/open-webui/issues/27), [#28](https://github.com/accesswatch/open-webui/issues/28), [#29](https://github.com/accesswatch/open-webui/issues/29), [#30](https://github.com/accesswatch/open-webui/issues/30), [#31](https://github.com/accesswatch/open-webui/issues/31), [#32](https://github.com/accesswatch/open-webui/issues/32), [#33](https://github.com/accesswatch/open-webui/issues/33), [#34](https://github.com/accesswatch/open-webui/issues/34), [#35](https://github.com/accesswatch/open-webui/issues/35), [#36](https://github.com/accesswatch/open-webui/issues/36), [#38](https://github.com/accesswatch/open-webui/issues/38), [#40](https://github.com/accesswatch/open-webui/issues/40), [#41](https://github.com/accesswatch/open-webui/issues/41), [#42](https://github.com/accesswatch/open-webui/issues/42), [#43](https://github.com/accesswatch/open-webui/issues/43), [#44](https://github.com/accesswatch/open-webui/issues/44), [#45](https://github.com/accesswatch/open-webui/issues/45), [#46](https://github.com/accesswatch/open-webui/issues/46), [#47](https://github.com/accesswatch/open-webui/issues/47) | Fixing broken or missing accessibility in existing controls |
| Feature Request (`feat: `) | [#12](https://github.com/accesswatch/open-webui/issues/12), [#13](https://github.com/accesswatch/open-webui/issues/13), [#15](https://github.com/accesswatch/open-webui/issues/15), [#16](https://github.com/accesswatch/open-webui/issues/16) | Adding genuinely new capabilities (skip link, live region, J/K nav, arrow nav) |

#### Bug Report template (for accessibility defects)

Use this when an existing behavior is inaccessible (missing labels, broken keyboard nav, suppressed a11y warnings). The title auto-prefixes with `issue: `.

Required fields:

1. **Check Existing Issues** -- four checkboxes confirming you searched open AND closed issues AND discussions
2. **Installation Method** -- select "Git Clone" for accessibility audit work
3. **Open WebUI Version** -- specify the exact version or commit
4. **Operating System** -- specify OS and version
5. **Browser** -- specify browser and version (optional but recommended for frontend a11y bugs)
6. **Confirmation checklist** -- seven required checkboxes:
   - Read and followed README.md instructions
   - Using the latest version of Open WebUI and Ollama
   - Included browser console logs
   - Included Docker container logs (write "N/A -- frontend-only accessibility issue" when not applicable)
   - Provided every relevant configuration and environment variable
   - Listed every relevant setting influencing the setup
   - Documented step-by-step reproduction instructions (include screen reader name, version, and verbatim announcements)
7. **Expected Behavior** -- what the screen reader or keyboard should do
8. **Actual Behavior** -- what actually happens (include screen reader announcements or lack thereof)
9. **Steps to Reproduce** -- precise sequential steps using the actual UI with a screen reader
10. **Logs and Screenshots** -- browser console output, accessibility tree snapshots, or screen reader output
11. **Additional Information** -- optional context

#### Feature Request template (for new accessibility capabilities)

Use this for genuinely new functionality (skip links, live regions, new ARIA patterns). The title auto-prefixes with `feat: `. Only file as a Feature Request if the change is quick to implement. Larger features should go to the **Ideas** section of [Discussions](https://github.com/open-webui/open-webui/discussions) instead -- the template explicitly warns that non-trivial requests will be closed and force-moved to Discussions.

Required fields:

1. **Check Existing Issues** -- confirm you searched all open AND closed issues and discussions
2. **Verify Feature Scope** -- confirm the feature is quick to implement and belongs in Issues rather than Discussions
3. **Problem Description** -- describe the accessibility barrier this feature addresses
4. **Desired Solution** -- describe what the accessible behavior should be
5. **Alternatives Considered** -- optional, describe other approaches evaluated
6. **Additional Context** -- optional, include WCAG criteria references, screen reader test plans, or mockups

---

## Codebase Audit Findings

### Quantitative Overview

| Metric | Count | Assessment |
|---|---|---|
| Total .svelte files | 556 | Large codebase |
| Svelte a11y-ignore directives | 31 (was 60) | Reduced -- 26 resolved via semantic fixes |
| `on:click` handlers (Svelte 4) | 922 | Needs keyboard audit |
| `<button>` elements | 927 | Good usage overall |
| `<input>` elements | 354 | High form density |
| `<select>` elements | 69 | Needs labeling audit |
| `<textarea>` elements | 63 | Needs labeling audit |
| `<label>` elements | 38 | CRITICAL: 10.7% labeling rate (481 total controls) |
| `<form>` elements | 57 | Moderate |
| `<nav>` elements | 10 | Present but insufficient |
| `<main>` elements | 0 | CRITICAL: Missing |
| `<header>` elements | 0 | CRITICAL: Missing |
| `<footer>` elements | 0 | Missing |
| `<aside>` elements | 0 | CRITICAL: Sidebar not semantic |
| `<table>` elements | 13 | Have headers, missing captions |
| `<caption>` elements | 0 | Missing for all 13 tables |
| `<svg>` elements | 395 | CRITICAL: 0 have aria-hidden or aria-label |
| `<img>` missing alt | 0 (was 72) | **FIXED**: All images now have meaningful or decorative alt text |
| `<fieldset>/<legend>` | 0/0 | Missing for radio/checkbox groups |
| `aria-label` attributes | 256 | Moderate coverage |
| `aria-live` regions | 3 | CRITICAL for chat app |
| `aria-expanded` | 4 | CRITICAL: low for dropdowns |
| `aria-hidden` | 216 | High -- may be masking issues |
| `aria-describedby` | 0 | Missing |
| `aria-required` | 1 | Missing for required fields |
| `aria-invalid` | 0 | Missing for form validation |
| `role="dialog"` | 1 | Low vs. actual modal count |
| `role="alert"` | 0 | CRITICAL: No alert role |
| `role="menu"` | 0 | CRITICAL: Menus unlabeled |
| `role="combobox"` | 0 | CRITICAL: Model selector |
| Skip links | 0 | CRITICAL: Missing |
| `sr-only` (screen reader text) | 13 | Low |
| `prefers-reduced-motion` | 0 | Missing |
| `outline-none` (removed focus) | 44 | High |
| Focus ring replacements | 28 | Gap of approx. 16 elements |
| Focus trap instances | 2 | Low |
| `tabindex` usage | 4 | Very low |
| Drag-and-drop files | 44 | No keyboard alternatives |
| Color contrast audit | 0 | CRITICAL: never performed |

### Critical: Missing Semantic Structure

**WCAG 2.4.1 Bypass Blocks, 1.3.1 Info and Relationships, 4.1.2 Name Role Value**

The application uses almost no semantic HTML landmarks. Screen reader users cannot navigate by landmarks at all.

**Current state:**
- `<main>`: 0 instances (the chat area is wrapped in generic `<div>` elements)
- `<header>`: 0 instances (the top bar is a `<div>`)
- `<footer>`: 0 instances
- `<aside>`: 0 instances (the sidebar is a `<div>` with CSS positioning)
- `<section>`: 1 instance
- `<h1>`: 9 instances (heading hierarchy needs audit for proper nesting)

**Impact**: Screen reader users cannot use landmark navigation (a primary navigation method) to move between the sidebar, chat area, header, and settings. They must Tab through potentially hundreds of elements.

**Files affected:**
- `src/routes/(app)/+layout.svelte` -- main layout wrapper
- `src/lib/components/layout/Sidebar.svelte` -- sidebar component
- `src/lib/components/chat/Chat.svelte` -- main chat area (2601 lines)
- `src/lib/components/layout/Navbar.svelte` -- top navigation bar

### Critical: Form Labeling Gap

**WCAG 1.3.1 Info and Relationships, 4.1.2 Name Role Value**

354 `<input>` elements exist across the codebase, but only 38 `<label>` elements. While some inputs may be labeled via `aria-label` (256 total instances across all element types), the labeling rate is extremely low.

**Most critical unlabeled input areas:**
- Chat message input (the primary interaction point of the entire application)
- Model selector search input
- Settings panel inputs (dozens of configuration fields)
- Admin panel form fields
- Login/registration forms

**Impact**: Screen reader users hear "edit" or "text field" without any context about what information to enter.

### Critical: Missing Keyboard Support

**WCAG 2.1.1 Keyboard, 2.1.2 No Keyboard Trap**

60 explicit `svelte-ignore` directives suppress keyboard accessibility warnings:

| Suppressed Warning | Count | WCAG Impact |
|---|---|---|
| `a11y-no-static-element-interactions` | 32 | Interactive `<div>`/`<span>` elements without proper roles |
| `a11y-click-events-have-key-events` | 19 | Click handlers without keyboard equivalents |
| `a11y-media-has-caption` | 4 | Media without captions |
| `a11y-no-noninteractive-element-interactions` | 2 | Non-interactive elements made clickable |
| `a11y-no-interactive-element-to-noninteractive-role` | 1 | Role misuse |

**Files with suppressed warnings (all need remediation):**

Sidebar and navigation:
- `src/lib/components/layout/Sidebar.svelte:651`
- `src/lib/components/layout/Sidebar/ChatItem.svelte:477`
- `src/lib/components/layout/Sidebar/PinnedModelItem.svelte:20`
- `src/lib/components/layout/Sidebar/RecursiveFolder.svelte:509`
- `src/lib/components/layout/Sidebar/SearchInput.svelte:300`
- `src/lib/components/layout/Sidebar/UserMenu.svelte:80`

Common UI components:
- `src/lib/components/common/Collapsible.svelte:65,66,131,132`
- `src/lib/components/common/ConfirmDialog.svelte:101,102`
- `src/lib/components/common/DragGhost.svelte:27,28`
- `src/lib/components/common/Drawer.svelte:54,55`
- `src/lib/components/common/Dropdown.svelte:164,165,171,172`
- `src/lib/components/common/DropdownSub.svelte:108,119`
- `src/lib/components/common/Folder.svelte:150`
- `src/lib/components/common/ImagePreview.svelte:70,71`
- `src/lib/components/common/Modal.svelte:90,91,92`
- `src/lib/components/common/Sidebar.svelte:13`
- `src/lib/components/common/ToolCallDisplay.svelte:112`
- `src/lib/components/common/Tooltip.svelte:78`

Chat components:
- `src/lib/components/chat/Messages/ResponseMessage.svelte:914`
- `src/lib/components/chat/Messages/UserMessage.svelte:448,628`
- `src/lib/components/chat/Messages/MultiResponseMessages.svelte:262,263,332,333`
- `src/lib/components/chat/Messages/Markdown/*.svelte` (multiple files)
- `src/lib/components/chat/ModelSelector/Selector.svelte:629`
- `src/lib/components/chat/Suggestions.svelte:88`

File navigation:
- `src/lib/components/chat/FileNav.svelte:1313`
- `src/lib/components/chat/FileNav/*.svelte` (multiple files)

### Critical: Live Region Deficiency

**WCAG 4.1.3 Status Messages**

A real-time chat application with only 3 `aria-live` regions is a critical gap. The following dynamic content changes are NOT announced to screen readers:

- **New chat messages arriving** (the core functionality)
- **Model response streaming** (tokens appearing progressively)
- **Error messages** (shown as toasts via svelte-sonner, no `role="alert"`)
- **Loading states** ("Thinking...", "Analyzing...", spinner states)
- **Model switching** confirmation
- **File upload progress/completion**
- **Search results updating** in sidebar
- **Toast notifications** (svelte-sonner library)

**Impact**: Screen reader users have no awareness of the application's real-time state changes, making the chat fundamentally unusable.

### High: Suppressed A11y Warnings

See the full list above. 60 warnings suppressed, each requiring:
1. Removal of the `svelte-ignore` comment
2. Proper fix (add `role`, keyboard handler, or semantic element)

### High: Focus Indicator Gaps

**WCAG 2.4.7 Focus Visible, 2.4.11 Focus Not Obscured**

- 44 instances of `outline-none` (Tailwind class that removes the default focus indicator)
- Only 28 instances of `focus:ring`, `focus-visible:ring`, or `focus:outline` replacements
- **Approximately 16 elements have their focus indicators removed with no replacement**

### High: Missing ARIA Patterns

**WCAG 4.1.2 Name Role Value**

Key interactive patterns missing proper ARIA:

| Component | Expected Pattern | Current State |
|---|---|---|
| Model selector | `combobox` with `listbox` | No ARIA roles, `svelte-ignore` on click |
| Dropdown menus | `menu` with `menuitem` | Generic `<div>` portaled to body |
| Sidebar folder tree | `tree` with `treeitem` | Generic `<div>` with click handlers |
| Collapsible sections | `button` with `aria-expanded` | **FIXED**: `<button>` with `aria-expanded` + `aria-controls` |
| Settings tabs | `tablist`/`tab`/`tabpanel` | **FIXED**: Complete tab pattern with roving tabindex + arrow keys |
| Confirm dialogs | `alertdialog` | **FIXED**: `role="dialog"` + `aria-modal` + `aria-label` |
| Toast notifications | `role="alert"` or `role="status"` | Library default (needs verification) |

### Medium: Motion and Reduced Motion

**WCAG 2.3.3 Animation from Interactions**

- 0 instances of `prefers-reduced-motion` media query across the entire codebase
- Animations are used throughout (Svelte transitions: `fade`, `slide`, `flyAndScale`)
- The `Collapsible.svelte` component uses slide transitions for every thinking/reasoning block
- The `Modal.svelte` uses `flyAndScale` entrance animation
- Chat message rendering uses transitions

Users with vestibular disorders or motion sensitivity have no way to disable these animations.

### Medium: Missing Skip Navigation

**WCAG 2.4.1 Bypass Blocks**

- 0 skip links in the entire application
- The sidebar contains navigation-level content that precedes the main chat area in DOM order
- Users must Tab through the entire sidebar to reach the chat input on every page load

### Component-Level Findings

#### Modal.svelte (Good foundation, needs polish)
- Has `focus-trap` library (good)
- Has `aria-modal="true"` and `role="dialog"` (good)
- Has Escape key handling (good)
- Missing: `aria-labelledby` pointing to a dialog title
- **FIXED (Phase 5)**: Removed 3 unnecessary `svelte-ignore` directives -- dialog role makes them invalid, Escape via focus-trap is the keyboard equivalent for backdrop dismiss

#### Dropdown.svelte (Needs significant work)
- Has Escape key handling (good)
- Has portal for z-index stacking (good)
- Missing: `role="menu"` / `role="listbox"`
- Missing: `aria-expanded` on trigger
- Missing: Arrow key navigation within items
- Missing: `aria-haspopup` on trigger
- Has 4 `svelte-ignore` directives (2 justified -- trigger wrapper and content stop-propagation)
- Click handler on a `<span>` element instead of a `<button>`

#### Collapsible.svelte (FIXED - Now a button)
- **FIXED (Phase 5)**: Converted both `<div>` toggles to `<button>` elements
- **FIXED**: Added `aria-expanded` state to both toggle buttons
- **FIXED**: Added `aria-controls` pointing to content region IDs
- **FIXED**: Removed 4 `svelte-ignore` directives (all resolved)
- Keyboard users can now toggle with Enter/Space

#### Tooltip.svelte (Partial)
- Uses tippy.js which has some built-in a11y
- Missing: keyboard focus trigger (tooltips should show on focus)
- Has 1 `svelte-ignore` for static element interaction (justified -- dynamic element tag)
- The `<svelte:element>` wrapper may not be focusable

#### Sidebar.svelte (common/Sidebar -- FIXED)
- Slide-out panel with no ARIA
- **FIXED (Phase 5)**: Backdrop now has `role="presentation"`, 1 `svelte-ignore` removed
- No focus management on open/close
- No `aria-label` for the panel

---

## Existing Accessibility History

### [Issue #277](https://github.com/open-webui/open-webui/issues/277): "enh: improve accessibility against WCAG 2.1" (Closed, June 2024)
- Filed by a screen reader user: "many of the buttons are unlabeled"
- Labels: `enhancement`, `good first issue`, `help wanted`, `non-core`
- 7 reactions (+4, 3 eyes)
- Closed without full resolution -- some `aria-label` additions were made
- Current state: 256 `aria-label` attributes exist, so some work was done

### [Issue #1008](https://github.com/open-webui/open-webui/issues/1008): "enhancement: more keyboard shortcuts" (Open)
- Still open since March 2024
- Labels: `enhancement`, `good first issue`, `help wanted`, `non-core`
- 14 reactions (+14)
- Notes that "current selection of shortcuts is a poor fit" 
- Requests two-key shortcuts instead of three-key combinations

---

## Journey-Prioritized Implementation Plan

The original phased plan (preserved below for reference) groups changes by **technical risk tier** -- all landmarks together, all labels together, all component fixes together. That approach has a problem: a screen reader user does not get a **complete, usable path** until multiple phases ship. You could land all of Phase 1 and the app is still unusable because the chat input has no label and the model picker is unreachable.

This section reorganizes the same work around **user journeys** -- the shortest path to a usable experience for each core workflow. Items are pulled from multiple original phases, but each PR stays small and atomic (handful of files, low triple-digit line changes, per maintainer guidance).

### Why Journey-First Instead of Risk-First

- **Users benefit sooner**: Sprint 1 delivers a complete "send a message" experience rather than "landmarks everywhere but still no labels"
- **Easier to justify**: Each sprint solves a specific, demonstrable user need
- **Natural prioritization**: The most-used path (send and read messages) ships first
- **Same PRs, different order**: The work items are identical -- only the sequence changes

### User Journey Priority Ranking

| Priority | Journey | Frequency | Without Fix | Sprint |
|---|---|---|---|---|
| 1 | Send a message | Every session, many times | **Blocked** -- unlabeled input, indiscoverable model picker | Sprint 1 |
| 2 | Read a response | Every session, many times | **Blocked** -- no way to jump between messages, no completion announcement | Sprint 2 |
| 3 | Copy/act on a response | Very frequent | **Degraded** -- action buttons invisible to keyboard/SR without hover | Sprint 3 |
| 4 | Pick a model | Frequent | **Blocked** -- dropdown not keyboard-operable | Sprint 4 |
| 5 | Browse chat history | Every session | **Degraded** -- sidebar works but has no semantics | Sprint 5 |
| 6 | Manage settings | Occasional | **Degraded** -- missing labels and heading structure | Sprint 6 |
| 7 | Cross-cutting polish | -- | Various | Sprint 7 |

### Heading Gap Analysis

Adding headings is one of the highest-value, lowest-risk changes available. Screen reader users navigate by heading (pressing **H**) as their primary scanning method -- equivalent to visually scanning bold text. The codebase currently has **11 heading elements across 556 Svelte files**, a near-total absence.

The following table maps every location where heading elements should exist, organized by user journey:

| Location | Current element | Should be | Heading level | User journey | Impact |
|---|---|---|---|---|---|
| **Chat messages (sender name)** | `<div>` in Name.svelte | `<h3>` | h3 | Read response (Sprint 2) | **Critical** -- enables pressing H to jump message-to-message through the entire conversation. ChatGPT uses this pattern. |
| **Chat placeholder greeting** ("Hello, Jeff") | `<div class="text-3xl">` in ChatPlaceholder.svelte | `<h1>` | h1 | Send message (Sprint 1) | **High** -- identifies the page, gives empty-state orientation |
| **Settings modal title** ("Settings") | `<div class="text-lg font-medium">` in SettingsModal.svelte | `<h1>` | h1 | Settings (Sprint 6) | **High** -- names the modal for heading nav |
| **Settings section dividers** ("WebUI Settings", "System Prompt", etc.) | `<div class="mb-1 text-sm font-medium">` in Settings/General.svelte and 6 other files | `<h2>` | h2 | Settings (Sprint 6) | **High** -- lets users jump between sections instead of tabbing through dozens of fields |
| **Admin settings section dividers** ("Config", "Database") | `<div class="mb-1 text-sm font-medium">` in admin/Settings/Database.svelte | `<h2>` | h2 | Settings (Sprint 6) | **Moderate** -- admin-only path |
| **Modal titles across the app** (36 instances: "Import", "Share Chat", "Add User", "Edit User", "Keyboard Shortcuts", "Files", etc.) | `<div class="text-lg font-medium self-center">` (31 instances are `<div>`, 5 already use `<h1>`) | `<h1>` | h1 | Various | **High** -- 31 modals have no heading. Screen reader user entering a modal hears no title via heading nav. Can be done with a single `aria-labelledby` PR on Modal.svelte pointing to the first heading child, combined with converting these `<div>` titles to `<h1>`. |
| **Sidebar section names** ("Models", "Channels", "Folders", "Chats", "Pinned") | Label text inside Folder.svelte component (a `<button>` with nested text `<div>`) | `<h2>` (sr-only or visually styled) | h2 | Browse chat history (Sprint 5) | **Moderate** -- enables jumping between sidebar sections |
| **Collapsible "Thinking" header** ("Thought for 5 seconds") | `<div>` inside Collapsible.svelte | `<h4>` | h4 | Read response (Sprint 2) | **Moderate** -- lets users skip or enter the reasoning block by heading |
| **Auth page title** ("Sign in" / "Sign up") | `<div class="text-2xl font-medium">` in auth/+page.svelte | `<h1>` | h1 | Sign in | **Moderate** -- page identification |
| **Shared chat page title** | `<h1>` already in routes/s/[id]/+page.svelte | Already correct | h1 | -- | Already done |

**Summary**: 11 headings exist today. Adding headings to the locations above would bring the count to approximately **60 or more**, distributed across every user journey. The single highest-value change is making Name.svelte a heading element, enabling message-by-message navigation.

### Heading Implementation Principle: Semantics Only, Zero Visual Change

**Headings exist to communicate structure to assistive technology, not to change how the application looks.** Every heading change in this plan must produce a pixel-identical render. If a reviewer cannot tell the difference by looking at the screen, it is implemented correctly.

Implementation rules:

1. **Carry forward the exact same CSS classes.** When converting `<div class="self-center font-semibold line-clamp-1 flex gap-1 items-center">` to `<h3 class="...">`, keep every class. The Tailwind utilities already control font size, weight, spacing, and color -- they override browser heading defaults.

2. **Neutralize default heading margins.** Heading elements add user-agent `margin-block` and potentially `display: block`. Add Tailwind `m-0` (or verify the existing classes already zero it out) to prevent layout shifts. In most cases the component is already inside a flex or grid container that suppresses block margin, so no extra class is needed -- but verify visually.

3. **Prefer element swap over sr-only insertion.** If the existing `<div>` already has the right visible text in the right place, swap it to a heading element. Only use sr-only headings when the visual design has no text at all in that position (e.g., sidebar sections that use icon-only toggles).

4. **Never add a heading just to add a heading.** Each heading must correspond to a real content boundary that a user would want to jump to. "Models", "Channels", "System Prompt" are real section boundaries. An individual form field label is not.

5. **Test visually after every change.** Run the dev server, compare the page before and after, and screenshot both. The screenshots should be indistinguishable. Include before/after in the PR.

This approach ensures maintainers can merge heading PRs with confidence -- they are pure semantic upgrades with zero visual regression risk.

### Sprint 1: "I can send a message"

**Parent issue**: [#1](https://github.com/accesswatch/open-webui/issues/1) | **Sub-issues**: [#8](https://github.com/accesswatch/open-webui/issues/8), [#9](https://github.com/accesswatch/open-webui/issues/9), [#10](https://github.com/accesswatch/open-webui/issues/10)

**Goal**: A screen reader user can land on the page, orient themselves, find the chat input, and send a message.

#### PR 1-A: Add semantic landmarks to app layout ([#8](https://github.com/accesswatch/open-webui/issues/8))
*Pulled from Phase 1, PR 1.1*
**Title**: `fix: add semantic HTML landmarks for screen reader navigation`
**Scope**: `src/routes/(app)/+layout.svelte`, `src/lib/components/layout/Sidebar.svelte`
**Changes**:
- Wrap main content area in `<main>`
- Wrap top bar in `<header>` (or add `role="banner"`)
- Wrap sidebar in `<aside>` with `aria-label="Chat history"`
**WCAG**: 1.3.1, 2.4.1, 4.1.2
**Risk**: Zero -- HTML element swaps, no logic

#### PR 1-B: Label the chat input ([#9](https://github.com/accesswatch/open-webui/issues/9))
*Pulled from Phase 2, PR 2.1*
**Title**: `fix: add accessible label to chat message input`
**Scope**: `src/lib/components/chat/MessageInput.svelte` or the TipTap editor wrapper
**Changes**:
- Add `aria-label` describing the input (e.g., "Message" or "Chat message")
- If using TipTap rich text editor, ensure its `aria-label` is set
**WCAG**: 1.3.1, 4.1.2
**Risk**: Very low -- single attribute addition

#### PR 1-C: Add page heading to empty chat state ([#10](https://github.com/accesswatch/open-webui/issues/10))
**Title**: `fix: add heading to chat placeholder for screen reader orientation`
**Scope**: `src/lib/components/chat/ChatPlaceholder.svelte`
**Changes**:
- Change the "Hello, {name}" `<div class="text-3xl">` to `<h1 class="text-3xl">`
- Zero visual change -- it already looks like a heading, now it acts like one
**WCAG**: 1.3.1, 2.4.6
**Risk**: Zero -- element swap only

**After Sprint 1**: A screen reader user can land on the page, navigate to `<main>` by landmark, hear the "Hello" heading, find the chat input by its label, and type a message. The default model works without needing the model picker.

### Sprint 2: "I can read the response"

**Parent issue**: [#2](https://github.com/accesswatch/open-webui/issues/2) | **Sub-issues**: [#11](https://github.com/accesswatch/open-webui/issues/11), [#12](https://github.com/accesswatch/open-webui/issues/12), [#13](https://github.com/accesswatch/open-webui/issues/13)

**Goal**: A screen reader user knows when a response arrives, can jump to it by heading, and can navigate between messages.

#### PR 2-A: Make message sender names headings ([#11](https://github.com/accesswatch/open-webui/issues/11))
**Title**: `fix: use headings for chat message sender names for screen reader navigation`
**Scope**: `src/lib/components/chat/Messages/Name.svelte`
**Changes**:
- Change `<div class="self-center font-semibold ...">` to `<h3 class="self-center font-semibold ...">`
- Keep the exact same Tailwind classes -- the existing `font-semibold`, `line-clamp-1`, `flex`, `gap-1`, `items-center` already control all visual properties. The component is inside a flex container that suppresses block margin. No additional classes needed.
- This is the single highest-impact heading change in the entire app
- Matches how ChatGPT structures messages (each message has a heading like "ChatGPT said:")
- Enables pressing H to jump from message to message through the entire conversation
- **Zero visual change** -- the element already looks like a heading, now it communicates as one to AT
**WCAG**: 1.3.1, 2.4.6
**Risk**: Zero -- element swap, 1 file, 1 line, pixel-identical render

#### PR 2-B: Add skip navigation link ([#12](https://github.com/accesswatch/open-webui/issues/12))
*Pulled from Phase 1, PR 1.2*
**Title**: `feat: add skip-to-content link for keyboard users`
**Scope**: `src/routes/(app)/+layout.svelte` or `src/app.html`
**Changes**:
- Add visually-hidden skip link as first focusable element
- Target the chat input or main content area
- Style with `sr-only` that becomes visible on focus
**WCAG**: 2.4.1
**Risk**: Zero -- purely additive

#### PR 2-C: Announce response completion ([#13](https://github.com/accesswatch/open-webui/issues/13))
*Pulled from Phase 5, PR 5.2, scoped narrowly*
**Title**: `feat: announce chat response completion to screen readers`
**Scope**: `src/lib/components/chat/Messages/ResponseMessage.svelte` or message container
**Changes**:
- Add a debounced `aria-live="polite"` announcer that says "Response complete" when streaming finishes
- NOT token-by-token updates -- only the final completion event
- The message list already has `role="log"` and `aria-live="polite"` on the `<ul>` (in Messages.svelte), so this may just need a visually-hidden status element that updates at completion
**WCAG**: 4.1.3
**Risk**: Low -- single state announcement, no flood risk

**After Sprint 2**: A user can send a message, hear when the response completes, and press H to jump between "You" and "ChatGPT" (or any model name) headings through the conversation. This is a fundamental usability milestone.

### Sprint 3: "I can act on the response"

**Parent issue**: [#3](https://github.com/accesswatch/open-webui/issues/3) | **Sub-issues**: [#14](https://github.com/accesswatch/open-webui/issues/14), [#15](https://github.com/accesswatch/open-webui/issues/15)

**Goal**: A keyboard/screen reader user can copy, edit, regenerate, or read aloud a response.

#### PR 3-A: Make action buttons visible on keyboard focus ([#14](https://github.com/accesswatch/open-webui/issues/14))
**Title**: `fix: show message action buttons on keyboard focus`
**Scope**: `src/lib/components/chat/Messages/ResponseMessage.svelte`
**Changes**:
- The copy/edit/regenerate/read-aloud buttons use `invisible group-hover:visible` -- add `focus-within:visible` and `focus:visible` so keyboard users can discover them
- Buttons already have `aria-label` -- they just can't be seen when using keyboard
- CSS-only change
**WCAG**: 2.1.1, 2.4.7
**Risk**: Zero -- CSS classes only

#### PR 3-B: Add keyboard navigation between messages ([#15](https://github.com/accesswatch/open-webui/issues/15))
*Pulled from Phase 5, PR 5.3, scoped narrowly to message traversal*
**Title**: `fix: enable keyboard navigation through chat messages`
**Scope**: Chat message list components
**Changes**:
- Add keyboard shortcut to move focus between message boundaries (e.g., J/K like GitHub)
- Make message containers focusable with `tabindex="-1"` so they can receive programmatic focus
- Announce the model name when arriving at a message
**WCAG**: 2.1.1, 2.4.3
**Risk**: Low-medium -- new keybindings must not conflict with existing shortcuts

**After Sprint 3**: A user can read a response, navigate to the action buttons with Tab, and use copy/edit/regenerate without a mouse.

### Sprint 4: "I can pick a model"

**Parent issue**: [#4](https://github.com/accesswatch/open-webui/issues/4) | **Sub-issues**: [#16](https://github.com/accesswatch/open-webui/issues/16), [#17](https://github.com/accesswatch/open-webui/issues/17)

**Goal**: The model selector is keyboard-operable and screen reader-friendly.

#### PR 4-A: Add basic keyboard support to model selector ([#16](https://github.com/accesswatch/open-webui/issues/16))
*Pulled from Phase 5, PR 5.1, split into behavior first*
**Title**: `fix: add keyboard navigation to model selector dropdown`
**Scope**: `src/lib/components/chat/ModelSelector/Selector.svelte`
**Changes**:
- Arrow keys through the option list, Enter to select
- The `ModelItem.svelte` already has `role="option"`, `aria-selected`, and `aria-label` -- the infrastructure is partially there
- Focus on making the dropdown keyboard-operable
**WCAG**: 2.1.1, 4.1.2
**Risk**: Medium -- behavior change on a complex component

#### PR 4-B: Add combobox ARIA to the selector ([#17](https://github.com/accesswatch/open-webui/issues/17))
*Pulled from Phase 5, PR 5.1, ARIA layer*
**Title**: `fix: add ARIA combobox pattern to model selector`
**Scope**: `src/lib/components/chat/ModelSelector/Selector.svelte`
**Changes**:
- Add `role="combobox"`, `aria-expanded`, `aria-activedescendant`, `aria-autocomplete`
- Label the search input within the selector
**WCAG**: 4.1.2
**Risk**: Medium -- full combobox ARIA is complex

**After Sprint 4**: A user can search, arrow through, and select a model entirely by keyboard.

### Sprint 5: "I can browse my chat history"

**Parent issue**: [#5](https://github.com/accesswatch/open-webui/issues/5) | **Sub-issues**: [#18](https://github.com/accesswatch/open-webui/issues/18), [#19](https://github.com/accesswatch/open-webui/issues/19)

**Goal**: The sidebar has proper semantics and headings for section-by-section navigation.

#### PR 5-A: Add sidebar section headings ([#18](https://github.com/accesswatch/open-webui/issues/18))
**Title**: `fix: add headings to sidebar sections for screen reader navigation`
**Scope**: `src/lib/components/common/Folder.svelte`, `src/lib/components/layout/Sidebar.svelte`
**Changes**:
- Add a visually-hidden `<h2>` for the overall sidebar (or rely on the `<aside aria-label>` from Sprint 1)
- Make the section names ("Models", "Channels", "Folders", "Chats", "Pinned") into `<h3>` elements
- The Folder.svelte component renders the section name in a `<div>` inside a `<button>` -- the name text itself can be wrapped in an `<h3>` or the section can have a sr-only heading before the Collapsible trigger
**WCAG**: 1.3.1, 2.4.6
**Risk**: Low -- element additions within a contained component

#### PR 5-B: Label the sidebar search input ([#19](https://github.com/accesswatch/open-webui/issues/19))
*Pulled from Phase 2, PR 2.2*
**Title**: `fix: add accessible label to sidebar search input`
**Scope**: `src/lib/components/layout/Sidebar/SearchInput.svelte`
**Changes**:
- Add `aria-label="Search chats"` to the search input
**WCAG**: 1.3.1, 4.1.2
**Risk**: Very low -- single attribute

**After Sprint 5**: A user can press H to jump between "Models", "Channels", "Folders", "Chats" sidebar sections, and search for a chat by name.

### Sprint 6: "I can manage my settings"

**Parent issue**: [#6](https://github.com/accesswatch/open-webui/issues/6) | **Sub-issues**: [#20](https://github.com/accesswatch/open-webui/issues/20), [#21](https://github.com/accesswatch/open-webui/issues/21), [#22](https://github.com/accesswatch/open-webui/issues/22), [#23](https://github.com/accesswatch/open-webui/issues/23)

**Goal**: Settings pages have heading hierarchy so users can jump between sections instead of tabbing through dozens of fields.

#### PR 6-A: Convert modal titles to headings ([#20](https://github.com/accesswatch/open-webui/issues/20))
**Title**: `fix: use heading elements for modal titles`
**Scope**: 31 modal components (the `<div class="text-lg font-medium self-center">` pattern)
**Changes**:
- Change `<div>` to `<h1>` for the 31 modal titles that currently use `<div>`
- Keep the exact same `text-lg font-medium self-center` classes -- these already override browser heading defaults for font size, weight, and alignment. Add `m-0` only if the heading introduces unwanted margin (test visually).
- 5 modals already use `<h1>` as the correct pattern (AddConnectionModal, AddTerminalServerModal, AddToolServerModal, AttachWebpageModal, ManageFloatingActionButtonsModal, ManageImageCompressionModal) -- follow their lead
- This is a large scope -- can be split into 2-3 PRs by area (chat modals, admin modals, workspace modals)
- **Zero visual change** -- purely semantic, AT-only improvement
**WCAG**: 1.3.1, 2.4.6, 4.1.2
**Risk**: Zero -- element swaps only, pixel-identical render

#### PR 6-B: Add headings to settings sections ([#21](https://github.com/accesswatch/open-webui/issues/21))
**Title**: `fix: add heading hierarchy to user settings`
**Scope**: `src/lib/components/chat/SettingsModal.svelte`, `src/lib/components/chat/Settings/*.svelte`
**Changes**:
- Change the "Settings" modal title `<div>` to `<h1>` (SettingsModal.svelte)
- Change section dividers like "WebUI Settings", "System Prompt", "STT Settings", "TTS Settings", "Chats", "Files" from `<div class="mb-1 text-sm font-medium">` to `<h2 class="mb-1 text-sm font-medium">`
- The existing `text-sm font-medium mb-1` classes already set the visual size to 14px medium weight with 4px bottom margin -- this will look identical as an `<h2>`. Verify no extra margin is introduced by the user-agent stylesheet (flex parent typically prevents this).
- 7 files need this change (General.svelte, Audio.svelte, DataControls.svelte, Interface.svelte plus the admin equivalents)
- **Zero visual change** -- these already look like section headers, they just need to communicate as headings to AT
**WCAG**: 1.3.1, 2.4.6
**Risk**: Zero -- element swaps, pixel-identical render

#### PR 6-C: Label settings form inputs ([#22](https://github.com/accesswatch/open-webui/issues/22))
*Pulled from Phase 2, PR 2.3*
**Title**: `fix: add missing labels to settings form inputs`
**Scope**: `src/lib/components/chat/Settings/**/*.svelte`, `src/lib/components/admin/Settings/**/*.svelte`
**Changes**:
- The field labels use `<div class="self-center text-xs font-medium">` -- these are already paired with inputs but not as `<label>` elements
- Convert to `<label>` or add `aria-label` to each input
- Large scope -- split by settings area as needed
**WCAG**: 1.3.1, 4.1.2, 3.3.2
**Risk**: Low -- attribute additions

#### PR 6-D: Complete settings tab ARIA pattern ([#23](https://github.com/accesswatch/open-webui/issues/23))
**Title**: `fix: complete ARIA tabs pattern in settings modal`
**Scope**: `src/lib/components/chat/SettingsModal.svelte`
**Changes**:
- Add `role="tabpanel"` and matching `id` to each content panel
- Add `aria-labelledby` linking panels to their tab triggers
- Add arrow key navigation between tabs (Left/Right)
- Roving `tabindex` (`0` on selected, `-1` on unselected)
- Fix broken `aria-controls` references (currently point to nonexistent IDs)
**WCAG**: 4.1.2
**Risk**: Low -- ARIA attributes and keydown handler, visual behavior unchanged

**After Sprint 6**: A user can open settings, press H to jump to "WebUI Settings", "System Prompt", "STT Settings", etc., and find form fields by their labels.

### Sprint 7: Cross-cutting polish

**Parent issue**: [#7](https://github.com/accesswatch/open-webui/issues/7) | **Sub-issues**: [#24](https://github.com/accesswatch/open-webui/issues/24)--[#35](https://github.com/accesswatch/open-webui/issues/35), [#36](https://github.com/accesswatch/open-webui/issues/36), [#38](https://github.com/accesswatch/open-webui/issues/38), [#40](https://github.com/accesswatch/open-webui/issues/40)--[#47](https://github.com/accesswatch/open-webui/issues/47)

Remaining items from the original phases that do not block any specific journey but improve overall quality:

1. [**`prefers-reduced-motion`**](https://github.com/accesswatch/open-webui/issues/24) -- CSS-only global rule (Phase 1, PR 1.4)
2. [**Auth page heading**](https://github.com/accesswatch/open-webui/issues/25) -- change login/signup `<div class="text-2xl">` to `<h1>` (1 file, 1 line)
3. [**Add alt text to images**](https://github.com/accesswatch/open-webui/issues/26) -- 72 `<img>` elements missing `alt` attributes across the codebase
4. [**Collapsible button fix**](https://github.com/accesswatch/open-webui/issues/27) -- replace `<div on:pointerup>` with `<button>`, add heading to collapsible title (Phase 3, PR 3.4)
5. [**Dropdown ARIA**](https://github.com/accesswatch/open-webui/issues/28) -- full menu pattern (Phase 4, PR 4.1)
6. [**Modal `aria-labelledby`**](https://github.com/accesswatch/open-webui/issues/29) -- point to the new `<h1>` in each modal (Phase 3, PR 3.1)
7. [**Tooltip focus behavior**](https://github.com/accesswatch/open-webui/issues/30) -- show on keyboard focus (Phase 3, PR 3.2)
8. [**Resolve svelte-ignore a11y suppressions**](https://github.com/accesswatch/open-webui/issues/31) -- audit and fix 57 suppressed accessibility warnings across 37 files
9. [**Form validation errors**](https://github.com/accesswatch/open-webui/issues/32) -- `aria-invalid`, error announcements (Phase 4, PR 4.3)
10. [**Focus-visible indicators**](https://github.com/accesswatch/open-webui/issues/33) -- replace 44 `outline-none` instances with `focus-visible` focus rings
11. [**Sidebar panel focus management**](https://github.com/accesswatch/open-webui/issues/34) -- Escape key, focus return (Phase 4, PR 4.2)
12. [**Add captions/tracks to media**](https://github.com/accesswatch/open-webui/issues/35) -- add `<track>` elements to video and audio elements

#### Gap-analysis additions (April 6, 2026)

The following issues were added after a WCAG 2.2 AA gap analysis revealed criteria not covered by the original 28 sub-issues:

13. [**Label admin panel form inputs (221 controls)**](https://github.com/accesswatch/open-webui/issues/36) -- 221 inputs/selects/textareas across 29 admin files with no programmatic labels
14. [**Label workspace and modal form inputs (83 controls)**](https://github.com/accesswatch/open-webui/issues/38) -- 83 controls in workspace editors, standalone modals, and common components
15. [**Add aria-hidden to decorative SVG icons (395 SVGs)**](https://github.com/accesswatch/open-webui/issues/40) -- 395 `<svg>` elements with zero ARIA treatment; decorative icons need `aria-hidden="true"`
16. [**Run color contrast audit and fix failures**](https://github.com/accesswatch/open-webui/issues/41) -- no contrast audit has been performed; covers all themes (dark, light, rosepine, rosepine-dawn)
17. [**Verify resize/reflow at 200% zoom and 320px viewport**](https://github.com/accesswatch/open-webui/issues/42) -- verify content reflows without horizontal scrolling; test text spacing overrides
18. [**Verify focus not obscured by sticky elements**](https://github.com/accesswatch/open-webui/issues/43) -- sticky navbar, toasts, and floating buttons may cover focused elements (WCAG 2.2 new criterion)
19. [**Add keyboard alternatives for drag-and-drop**](https://github.com/accesswatch/open-webui/issues/44) -- 44 files use drag-and-drop with no keyboard/button alternative (WCAG 2.2 new criterion)
20. [**Verify minimum target size for interactive controls**](https://github.com/accesswatch/open-webui/issues/45) -- audit icon buttons and small controls for 24x24px minimum (WCAG 2.2 new criterion)
21. [**Audit WCAG 2.2 new criteria (3.2.6, 3.3.7, 3.3.8, 1.3.2)**](https://github.com/accesswatch/open-webui/issues/46) -- verify consistent help, redundant entry, accessible authentication, and meaningful sequence
22. [**Add captions to data tables**](https://github.com/accesswatch/open-webui/issues/47) -- 13 tables have headers but 0 `<caption>` elements

### Additional High-Impact Scenarios

Beyond the original plan, the heading analysis revealed these additional opportunities:

- **Code block copy button** -- verify CodeBlock.svelte copy button has `aria-label` and provides a "Copied" announcement (not just a visual icon swap). Users copy code frequently.
- **File/image upload feedback** -- when attaching files to a message, verify there is an announcement. Upload progress needs a live region.
- **Regenerate response state** -- the regenerate button triggers loading, streaming, then completion. The loading-to-complete state change needs an announcement.
- **Error states in chat** -- when the API fails mid-response, Error.svelte needs a live region to announce the failure.
- **New Chat button** -- verify the "New Chat" button in the sidebar/nav is a proper `<button>` with a label. It is the second most frequently pressed control.
- **Chat title in browser tab** -- verify the page title updates to reflect the current chat name (SvelteKit likely handles this, but worth confirming). This is how screen reader users orient across browser tabs.

---

## Original Phased Remediation Plan (Reference)

The original phases below group changes by technical risk tier. They remain valid as a reference for PR scope and details. The Journey-Prioritized plan above reorders these same items by user impact.

Phases are ordered by **impact-to-risk ratio**. Early phases prove trustworthiness through zero-risk structural changes that maintainers can merge confidently. Once trust is established, later phases introduce behavioral changes with higher impact but more testing surface.

Each PR targets the `dev` branch, touches a handful of files, and stays well under 300 lines changed (per maintainer guidance in Discussion #23212).

### Phase 0: Community Discussion

**Status**: Posted as [Discussion #23212](https://github.com/open-webui/open-webui/discussions/23212). Maintainer @Classic298 responded -- green light to proceed with small atomic PRs. Key guidance:
- Handful of files per PR, very low triple-digit line changes max
- Test locally in dev environment before submitting
- Follow existing code style
- Use #2790 as the tracking issue

### Phase 1: Semantic Structure (High Impact, Zero Risk)

**Rationale**: These changes swap HTML elements and add CSS. No JavaScript logic, no event handlers, no interactive behavior changes. Impossible to break functionality. They prove we can ship clean, safe PRs and immediately unlock landmark navigation for screen reader users.

#### PR 1.1: Add semantic landmarks to app layout
**Title**: `fix: add semantic HTML landmarks for screen reader navigation`
**Scope**: `src/routes/(app)/+layout.svelte`, `src/lib/components/layout/Sidebar.svelte`
**Changes**:
- Wrap main content area in `<main>`
- Wrap top bar in `<header>` (or add `role="banner"`)
- Wrap sidebar in `<nav>` or `<aside>` with `aria-label="Chat history"`
- Add labeled regions for major sections
**WCAG**: 1.3.1, 2.4.1, 4.1.2
**Risk**: Zero -- HTML element swaps, no logic, no visual change

#### PR 1.2: Add skip navigation link
**Title**: `feat: add skip-to-content link for keyboard users`
**Scope**: `src/routes/(app)/+layout.svelte` or `src/app.html`
**Changes**:
- Add visually-hidden skip link as first focusable element
- Target the chat input or main content area
- Style with `sr-only` that becomes visible on focus
**WCAG**: 2.4.1
**Risk**: Zero -- purely additive, invisible unless focused

#### PR 1.3: Add proper heading hierarchy
**Title**: `fix: add proper heading hierarchy to settings pages`
**Scope**: Settings and admin page components
**Changes**:
- Ensure each page has one `<h1>` (page title)
- Use `<h2>` for sections, `<h3>` for subsections
- Current: only 9 `<h1>`, 3 `<h2>`, 2 `<h3>` across 556 files
**WCAG**: 1.3.1, 2.4.6
**Risk**: Zero -- HTML element changes only, may need multiple PRs by page area

#### PR 1.4: Add prefers-reduced-motion support
**Title**: `feat: respect prefers-reduced-motion for all transitions`
**Scope**: `src/app.css` or global styles
**Changes**:
- Add global `@media (prefers-reduced-motion: reduce)` rule
- Only affects users who have enabled this OS preference
**WCAG**: 2.3.3
**Risk**: Zero -- CSS-only, no-op for users without the preference

### Phase 2: Labels and Attributes (Critical Impact, Very Low Risk)

**Rationale**: Now that structural PRs have proven clean, safe contributions, we move to the highest-impact change: labeling inputs. Unlabeled inputs are the #1 complaint from screen reader users in #2790 and #18420. These PRs add attributes to existing elements -- no DOM restructuring, no logic.

#### PR 2.1: Label the chat input
**Title**: `fix: add accessible label to chat message input`
**Scope**: `src/lib/components/chat/MessageInput.svelte` or the TipTap editor wrapper
**Changes**:
- Add `aria-label` describing the input (e.g., "Message" or "Chat message")
- If using TipTap rich text editor, ensure its `aria-label` is set
- Add `aria-describedby` for any helper text
**WCAG**: 1.3.1, 4.1.2
**Risk**: Very low -- single attribute addition to the most-used element

#### PR 2.2: Label form inputs across chat components
**Title**: `fix: add missing labels to chat UI inputs`
**Scope**: `src/lib/components/chat/**/*.svelte`
**Changes**:
- Label the model selector search input
- Label file upload inputs
- Label any remaining unlabeled inputs in the chat interface
**WCAG**: 1.3.1, 4.1.2
**Risk**: Very low -- attribute additions only

#### PR 2.3: Label form inputs across settings and admin
**Title**: `fix: add missing labels to settings and admin form inputs`
**Scope**: `src/lib/components/admin/Settings/**/*.svelte` and `src/lib/components/chat/Settings/**/*.svelte`
**Changes**:
- Audit all `<input>` elements and add `<label>` or `aria-label`
- Add `aria-required="true"` for required fields
- Add `aria-describedby` for inputs with helper text
- May need to be split into multiple PRs by page area to keep scope small
**WCAG**: 1.3.1, 4.1.2, 3.3.2
**Risk**: Low -- attribute additions, larger scope requires careful splitting

### Phase 3: Isolated Component Fixes (Moderate Impact, Low Risk)

**Rationale**: Each PR targets a single shared component with limited blast radius. Configuration-level changes or minor element swaps within well-contained components.

#### PR 3.1: Fix Modal.svelte ARIA labeling
**Title**: `fix: add aria-labelledby to Modal component`
**Scope**: `src/lib/components/common/Modal.svelte`
**Changes**:
- Add `aria-labelledby` pointing to the first heading or title within the dialog
- Pass an optional `title` prop for fallback `aria-label`
- Remove `svelte-ignore` directives where proper keyboard handlers exist (3 removed)
**WCAG**: 4.1.2
**Risk**: Low -- attribute addition to a component that already has good focus management

#### PR 3.2: Fix Tooltip.svelte focus behavior
**Title**: `fix: show tooltips on keyboard focus`
**Scope**: `src/lib/components/common/Tooltip.svelte`
**Changes**:
- Ensure the wrapper element is focusable (add `tabindex="0"` or use `<button>`)
- Configure tippy.js `trigger: 'mouseenter focus'`
- Remove `svelte-ignore` directive (1 removed)
**WCAG**: 1.3.1, 4.1.2
**Risk**: Low -- tippy.js configuration change

#### PR 3.3: Ensure toast notifications are announced
**Title**: `fix: ensure toast notifications are announced by screen readers`
**Scope**: svelte-sonner configuration, possibly `src/routes/+layout.svelte`
**Changes**:
- Verify svelte-sonner renders with `role="alert"` or `role="status"`
- If not, configure the toast container with appropriate ARIA
- Ensure error toasts use `role="alert"` (assertive)
- Ensure info toasts use `role="status"` (polite)
**WCAG**: 4.1.3
**Risk**: Low -- library configuration change

#### PR 3.4: Fix Collapsible.svelte accessibility
**Title**: `fix: make Collapsible component keyboard-accessible`
**Scope**: `src/lib/components/common/Collapsible.svelte`
**Changes**:
- Replace `<div on:pointerup>` with `<button>` element
- Add `aria-expanded={open}`
- Add `aria-controls` pointing to content panel ID
- Remove `svelte-ignore` directives (4 removed)
**WCAG**: 4.1.2, 2.1.1
**Risk**: Low -- button replacement within a single component, no logic change

### Phase 4: Behavioral Component Changes (High Impact, Medium Risk)

**Rationale**: These PRs add keyboard behaviors and focus management to shared components. Each one changes how the component responds to user interaction. Requires careful testing.

#### PR 4.1: Fix Dropdown.svelte accessibility
**Title**: `fix: add ARIA menu pattern to Dropdown component`
**Scope**: `src/lib/components/common/Dropdown.svelte`, `src/lib/components/common/DropdownSub.svelte`
**Changes**:
- Replace trigger `<span>` with `<button>` or add `role="button"` + `tabindex="0"` + keyboard handler
- Add `aria-expanded` to trigger
- Add `aria-haspopup="true"` to trigger
- Add `role="menu"` (or `role="listbox"` depending on usage) to content
- Add arrow key navigation within menu items
- Remove `svelte-ignore` directives (6 removed)
**WCAG**: 4.1.2, 2.1.1, 1.3.1
**Risk**: Medium -- adds keyboard navigation behavior, element replacement on a widely-used component

#### PR 4.2: Fix Sidebar panel accessibility
**Title**: `fix: add ARIA and keyboard support to Sidebar panel`
**Scope**: `src/lib/components/common/Sidebar.svelte`
**Changes**:
- Add `role="complementary"` or appropriate landmark
- Add `aria-label` describing the panel content
- Add keyboard dismiss (Escape key)
- Add focus management: focus the panel on open, return focus on close
- Remove `svelte-ignore` directive (1 removed)
**WCAG**: 2.1.1, 4.1.2
**Risk**: Medium -- adds focus management behavior

#### PR 4.3: Add accessible form validation errors
**Title**: `feat: add accessible form validation errors`
**Scope**: Login, registration, settings forms
**Changes**:
- Add `aria-invalid="true"` when fields have errors
- Add `aria-describedby` linking to error messages
- Ensure error messages are announced (live region or `role="alert"`)
**WCAG**: 3.3.1, 3.3.3
**Risk**: Medium -- requires state management logic for error states

### Phase 5: Complex Interactive Patterns (High Impact, Medium-High Risk)

**Rationale**: Full ARIA widget patterns with complex keyboard interaction models. High impact on the core chat experience but highest risk of implementation issues or needing iteration.

#### PR 5.1: Model selector combobox pattern
**Title**: `fix: implement ARIA combobox pattern for model selector`
**Scope**: `src/lib/components/chat/ModelSelector/Selector.svelte`
**Changes**:
- Add `role="combobox"` to the input/trigger
- Add `role="listbox"` to the dropdown list
- Add `role="option"` to each model item
- Add `aria-expanded`, `aria-activedescendant`, `aria-autocomplete`
- Add arrow key navigation through options
- Remove `svelte-ignore` directive (1 removed)
**WCAG**: 4.1.2, 2.1.1
**Risk**: Medium-high -- full ARIA combobox is one of the most complex widget patterns

#### PR 5.2: Chat message live regions
**Title**: `feat: announce new chat messages to screen readers`
**Scope**: `src/lib/components/chat/Messages/ResponseMessage.svelte`, message container
**Changes**:
- Add `aria-live="polite"` to the chat message container (or a dedicated announcer)
- Add `role="log"` to the chat message list
- Announce completion of streamed responses
- Announce "Thinking..." / "Analyzing..." state changes
**WCAG**: 4.1.3
**Risk**: Medium-high -- token-by-token updates could flood the screen reader; needs careful debouncing

#### PR 5.3: Chat keyboard navigation
**Title**: `fix: enable keyboard navigation through chat messages`
**Scope**: Chat message list components
**Changes**:
- Add keyboard shortcuts to navigate between messages
- Ensure message action buttons (copy, edit, regenerate) are keyboard-accessible
- Add focus management after sending a message
**WCAG**: 2.1.1, 2.4.3
**Risk**: Medium -- new keybindings must not conflict with existing shortcuts or browser defaults

---

## PR Templates for Each Phase

Each PR should follow this structure (adapted from the repository's pull_request_template.md):

```markdown
# Pull Request Checklist

- [x] **Target branch:** `dev`
- [x] **Description:** [Concise summary below]
- [x] **Changelog:** Included below
- [ ] **Documentation:** N/A (no user-facing behavior change) / Added to docs repo
- [x] **Dependencies:** No new dependencies
- [x] **Testing:** Manual testing with [NVDA/VoiceOver] screen reader, keyboard-only navigation. Screenshots below.
- [x] **Agentic AI Code:** This PR has gone through human review AND manual testing.
- [x] **Code review:** Self-reviewed
- [x] **Design & Architecture:** Uses smart defaults, no new settings
- [x] **Git Hygiene:** Atomic PR, single logical change, rebased on `dev`
- [x] **Title Prefix:** [fix:/feat:/refactor:]

# Changelog Entry

### Fixed
- [Component name]: [What was fixed] ([WCAG criterion])

### Screenshots

| Before | After |
|---|---|
| [Screen reader announcing "clickable" with no label] | [Screen reader announcing "New chat, button"] |

---

- [x] By submitting this pull request, I confirm that I have read and fully agree to the Contributor License Agreement (CLA), and I am providing my contributions under its terms.
```

---

## Testing Protocol

For each PR, perform these manual tests:

### Screen Reader Testing (NVDA on Windows recommended)
1. Navigate to the affected component using Tab key
2. Verify the component is announced with correct role, name, and state
3. Verify all interactive elements can be activated with Enter or Space
4. Navigate using screen reader shortcuts (H for headings, D for landmarks, F for forms)
5. Record the announcement text for the before/after screenshots

### Keyboard-Only Testing
1. Tab through the entire page
2. Verify all interactive elements receive visible focus
3. Verify no keyboard traps (can always Tab away or Escape out)
4. Verify focus order is logical (left-to-right, top-to-bottom)
5. Verify dropdown/modal focus management (focus trapped inside, returns on close)

### Automated Testing
- Run `npx svelte-check` to verify no new a11y warnings
- Verify the count of `svelte-ignore a11y` directives has decreased

---

## WCAG 2.2 AA Coverage Map

| WCAG Criterion | Current Status | Issue(s) Addressing |
|---|---|---|
| 1.1.1 Non-text Content | FAIL (72 img missing alt, 395 SVGs unlabeled) | #26 (images), #40 (SVGs) |
| 1.2.1 Audio/Video (Prerecorded) | FAIL (14 media elements, no tracks) | #35 |
| 1.3.1 Info and Relationships | FAIL (no landmarks, low labeling, no table captions) | #8, #10, #11, #15, #18, #20, #21, #25, #36, #38, #47 |
| 1.3.2 Meaningful Sequence | Unknown (needs manual audit) | #46 (audit) |
| 1.3.3 Sensory Characteristics | Unknown (needs manual audit) | -- |
| 1.4.1 Use of Color | Unknown (needs contrast audit) | #41 (audit) |
| 1.4.3 Contrast (Minimum) | Unknown (never audited) | #41 |
| 1.4.4 Resize Text | Unknown (assumed responsive, never verified) | #42 |
| 1.4.10 Reflow | Unknown (needs 320px viewport test) | #42 |
| 1.4.11 Non-text Contrast | Unknown (needs automated scan) | #41 |
| 1.4.12 Text Spacing | Unknown (needs bookmarklet test) | #42 |
| 2.1.1 Keyboard | FAIL (60 suppressed warnings) | #14, #15, #16, #27, #28, #30, #31, #34 |
| 2.1.2 No Keyboard Trap | Partial (Modal has focus-trap) | #28, #34 |
| 2.3.1 Three Flashes or Below | Likely PASS | -- |
| 2.3.3 Animation from Interactions | FAIL (no reduced-motion support) | #24 |
| 2.4.1 Bypass Blocks | FAIL (no skip links, no landmarks) | #8, #12 |
| 2.4.2 Page Titled | Likely PASS (SvelteKit handles this) | -- |
| 2.4.3 Focus Order | Unknown (needs manual audit) | #33 |
| 2.4.6 Headings and Labels | FAIL (minimal heading structure) | #10, #11, #18, #20, #21, #25 |
| 2.4.7 Focus Visible | FAIL (16 elements with removed focus ring) | #14, #33 |
| 2.4.11 Focus Not Obscured (Minimum) | Unknown (WCAG 2.2 new) | #43 |
| 2.5.3 Label in Name | Unknown (needs manual audit) | -- |
| 2.5.7 Dragging Movements | FAIL (44 drag files, no keyboard alt) (WCAG 2.2 new) | #44 |
| 2.5.8 Target Size (Minimum) | Unknown (WCAG 2.2 new) | #45 |
| 3.2.6 Consistent Help | Unknown (WCAG 2.2 new) | #46 (audit) |
| 3.3.1 Error Identification | FAIL (0 aria-invalid) | #32 |
| 3.3.2 Labels or Instructions | FAIL (10.7% labeling rate across 481 controls) | #9, #19, #22, #36, #38 |
| 3.3.3 Error Suggestion | FAIL (no accessible errors) | #32 |
| 3.3.7 Redundant Entry | Unknown (WCAG 2.2 new) | #46 (audit) |
| 3.3.8 Accessible Authentication (Minimum) | Likely PASS (standard login) (WCAG 2.2 new) | #46 (audit) |
| 4.1.2 Name, Role, Value | FAIL (dropdowns, collapsibles, menus) | #9, #17, #22, #23, #27, #28, #29, #36, #38 |
| 4.1.3 Status Messages | FAIL (3 live regions in chat app) | #13 |

**Current estimated WCAG 2.2 AA pass rate: approximately 30-40%** (based on criteria that can be assessed from static code analysis alone; runtime testing would likely reveal additional failures).

**Coverage after all 38 issues are resolved: approximately 90-95%** (remaining 5-10% are criteria needing runtime/manual verification that may already pass).

---

## Risk Assessment

| Phase | Impact | Risk Level | Regression Potential | What Changes |
|---|---|---|---|---|
| Phase 0 | -- | None | None | Discussion only |
| Phase 1 | High | Zero | None | HTML element swaps (`<div>` to `<main>`/`<header>`), CSS media query -- no JS, no logic |
| Phase 2 | Critical | Very Low | Minimal | Attribute additions (`aria-label`, `<label>`) -- no DOM restructuring |
| Phase 3 | Moderate | Low | Low | Isolated component config changes, single element swap (Collapsible) |
| Phase 4 | High | Medium | Medium | New keyboard handlers, focus management, error state logic |
| Phase 5 | High | Medium-High | Medium-High | Full ARIA widget patterns, live region tuning, new keybindings |

---

## Project Tracking

All issues are tracked on the GitHub Project board and as sub-issues under sprint parent issues.

- **Project board**: [Open WebUI Accessibility (WCAG 2.2 AA)](https://github.com/users/accesswatch/projects/1)
- **Repository**: [accesswatch/open-webui](https://github.com/accesswatch/open-webui)
- **Upstream discussion**: [Discussion #23212](https://github.com/open-webui/open-webui/discussions/23212)
- **Upstream tracking issue**: [open-webui/open-webui#2790](https://github.com/open-webui/open-webui/issues/2790)

### Issue Map

| Sprint | Parent | Sub-issues | Theme |
|---|---|---|---|
| 1 | [#1](https://github.com/accesswatch/open-webui/issues/1) | [#8](https://github.com/accesswatch/open-webui/issues/8), [#9](https://github.com/accesswatch/open-webui/issues/9), [#10](https://github.com/accesswatch/open-webui/issues/10) | I can send a message |
| 2 | [#2](https://github.com/accesswatch/open-webui/issues/2) | [#11](https://github.com/accesswatch/open-webui/issues/11), [#12](https://github.com/accesswatch/open-webui/issues/12), [#13](https://github.com/accesswatch/open-webui/issues/13) | I can read the response |
| 3 | [#3](https://github.com/accesswatch/open-webui/issues/3) | [#14](https://github.com/accesswatch/open-webui/issues/14), [#15](https://github.com/accesswatch/open-webui/issues/15) | I can act on the response |
| 4 | [#4](https://github.com/accesswatch/open-webui/issues/4) | [#16](https://github.com/accesswatch/open-webui/issues/16), [#17](https://github.com/accesswatch/open-webui/issues/17) | I can pick a model |
| 5 | [#5](https://github.com/accesswatch/open-webui/issues/5) | [#18](https://github.com/accesswatch/open-webui/issues/18), [#19](https://github.com/accesswatch/open-webui/issues/19) | I can browse my chat history |
| 6 | [#6](https://github.com/accesswatch/open-webui/issues/6) | [#20](https://github.com/accesswatch/open-webui/issues/20), [#21](https://github.com/accesswatch/open-webui/issues/21), [#22](https://github.com/accesswatch/open-webui/issues/22), [#23](https://github.com/accesswatch/open-webui/issues/23) | I can manage my settings |
| 7 | [#7](https://github.com/accesswatch/open-webui/issues/7) | [#24](https://github.com/accesswatch/open-webui/issues/24)--[#35](https://github.com/accesswatch/open-webui/issues/35), [#36](https://github.com/accesswatch/open-webui/issues/36), [#38](https://github.com/accesswatch/open-webui/issues/38), [#40](https://github.com/accesswatch/open-webui/issues/40)--[#47](https://github.com/accesswatch/open-webui/issues/47) | Cross-cutting polish |

**Total**: 7 sprint parents + 38 sub-issues = 45 issues (28 original + 10 gap-analysis additions)

## Next Steps

1. ~~Open the Discussion post (Phase 0) and wait for maintainer response~~ **Done** -- [Discussion #23212](https://github.com/open-webui/open-webui/discussions/23212) posted March 29, 2026
2. ~~Set up GitHub Project board with sprint tracking~~ **Done** -- [Project #1](https://github.com/users/accesswatch/projects/1)
3. ~~Create all 35 GitHub issues with sub-issue linking~~ **Done** -- April 6, 2026
4. ~~WCAG 2.2 AA gap analysis and 10 additional issues~~ **Done** -- April 6, 2026
5. Begin Sprint 1: landmarks ([#8](https://github.com/accesswatch/open-webui/issues/8)), chat input label ([#9](https://github.com/accesswatch/open-webui/issues/9)), chat heading ([#10](https://github.com/accesswatch/open-webui/issues/10))
6. Create branch from `dev` for each sub-issue (branch names in each issue)
7. Include screen reader testing screenshots with each PR
8. Track progress on the [project board](https://github.com/users/accesswatch/projects/1)
