# Accessibility Test Matrix

Comprehensive testing scenarios for all 38 accessibility sub-issues across 7 sprints. Every checkbox starts unchecked. Use the `a11y-test-tracker` agent or the `/a11y-mark-test` prompt command to record results.

Cross-references:

- Audit plan: [ACCESSIBILITY-AUDIT-PLAN.md](ACCESSIBILITY-AUDIT-PLAN.md)
- Automated test runner guide: [ACCESSIBILITY-TESTING.md](ACCESSIBILITY-TESTING.md)
- Automated tests: [tests/a11y/](tests/a11y/)

---

## Progress Dashboard

The following table shows testing status for every sub-issue across all testing categories. Mark each cell as it is completed.

Status key: Untested (empty), Pass, Fail, N/A (not applicable to this issue).

### Sprint 1: "I can send a message"

The following table lists all Sprint 1 issues with their testing status across six categories.

| Issue | Title | SR | KB | LV | ZR | AX | VR | Tested By | Date |
|---|---|---|---|---|---|---|---|---|---|
| #8 | Add semantic landmarks to app layout | | | | | | | | |
| #9 | Label the chat input | | | | | | | | |
| #10 | Add page heading to empty chat state | | | | | | | | |

### Sprint 2: "I can read the response"

The following table lists all Sprint 2 issues with their testing status across six categories.

| Issue | Title | SR | KB | LV | ZR | AX | VR | Tested By | Date |
|---|---|---|---|---|---|---|---|---|---|
| #11 | Make message sender names headings | | | | | | | | |
| #12 | Add skip navigation link | | | | | | | | |
| #13 | Announce response completion | | | | | | | | |

### Sprint 3: "I can act on the response"

The following table lists all Sprint 3 issues with their testing status across six categories.

| Issue | Title | SR | KB | LV | ZR | AX | VR | Tested By | Date |
|---|---|---|---|---|---|---|---|---|---|
| #14 | Make action buttons visible on keyboard focus | | | | | | | | |
| #15 | Add keyboard navigation between messages | | | | | | | | |

### Sprint 4: "I can pick a model"

The following table lists all Sprint 4 issues with their testing status across six categories.

| Issue | Title | SR | KB | LV | ZR | AX | VR | Tested By | Date |
|---|---|---|---|---|---|---|---|---|---|
| #16 | Add basic keyboard support to model selector | | | | | | | | |
| #17 | Add ARIA combobox pattern to model selector | | | | | | | | |

### Sprint 5: "I can browse my chat history"

The following table lists all Sprint 5 issues with their testing status across six categories.

| Issue | Title | SR | KB | LV | ZR | AX | VR | Tested By | Date |
|---|---|---|---|---|---|---|---|---|---|
| #18 | Add sidebar section headings | | | | | | | | |
| #19 | Label the sidebar search input | | | | | | | | |

### Sprint 6: "I can manage my settings"

The following table lists all Sprint 6 issues with their testing status across six categories.

| Issue | Title | SR | KB | LV | ZR | AX | VR | Tested By | Date |
|---|---|---|---|---|---|---|---|---|---|
| #20 | Convert modal titles to headings | | | | | | | | |
| #21 | Add heading hierarchy to settings sections | | | | | | | | |
| #22 | Label settings form inputs | | | | | | | | |
| #23 | Complete settings tab ARIA pattern | | | | | | | | |

### Sprint 7: Cross-cutting polish

The following table lists all Sprint 7 issues with their testing status across six categories.

| Issue | Title | SR | KB | LV | ZR | AX | VR | Tested By | Date |
|---|---|---|---|---|---|---|---|---|---|
| #24 | Add prefers-reduced-motion support | | | | | | | | |
| #25 | Auth page heading | | | | | | | | |
| #26 | Add alt text to images | | | | | | | | |
| #27 | Collapsible button fix | | | | | | | | |
| #28 | Dropdown ARIA | | | | | | | | |
| #29 | Modal aria-labelledby | | | | | | | | |
| #30 | Tooltip focus behavior | | | | | | | | |
| #31 | Resolve svelte-ignore a11y suppressions | | | | | | | | |
| #32 | Form validation errors | | | | | | | | |
| #33 | Focus-visible indicators | | | | | | | | |
| #34 | Sidebar panel focus management | | | | | | | | |
| #35 | Add captions/tracks to media | | | | | | | | |
| #36 | Label admin panel form inputs (221 controls) | | | | | | | | |
| #38 | Label workspace and modal form inputs (83 controls) | | | | | | | | |
| #40 | Add aria-hidden to decorative SVG icons (395 SVGs) | | | | | | | | |
| #41 | Run color contrast audit and fix failures | | | | | | | | |
| #42 | Verify resize/reflow at 200% zoom and 320px | | | | | | | | |
| #43 | Verify focus not obscured by sticky elements | | | | | | | | |
| #44 | Add keyboard alternatives for drag-and-drop | | | | | | | | |
| #45 | Verify minimum target size for interactive controls | | | | | | | | |
| #46 | Audit WCAG 2.2 new criteria (3.2.6, 3.3.7, 3.3.8, 1.3.2) | | | | | | | | |
| #47 | Add captions to data tables | | | | | | | | |

---

## Testing Categories

The following table defines each testing category code used in the progress dashboard.

| Code | Category | Tools Required | Who Should Run |
|---|---|---|---|
| SR | Screen Reader | NVDA 2024.4+ on Windows (primary), VoiceOver on macOS (secondary) | Tester with screen reader experience |
| KB | Keyboard Only | Any modern browser, no mouse, no screen reader running | Any developer |
| LV | Low Vision / Color Contrast | axe DevTools, Chrome DevTools color picker, Windows High Contrast mode, text spacing bookmarklet | Any developer |
| ZR | Zoom / Reflow | Browser zoom at 200%, viewport resized to 320px width | Any developer |
| AX | Automated Scan | Playwright + axe-core (tests/a11y/), svelte-check, CI pipeline | CI or any developer |
| VR | Visual Regression | Before/after screenshots at identical viewport size | PR author |

### Screen Reader Testing (SR) -- How To

1. Install NVDA from [nvaccess.org](https://www.nvaccess.org/download/).
2. Open Chrome or Firefox with the app running locally.
3. Press Insert+Space to enter focus mode if needed.
4. Use these navigation commands during testing:

The following table lists the NVDA keyboard commands needed for testing.

| Action | NVDA Key Command |
|---|---|
| Next heading | H |
| Previous heading | Shift+H |
| Heading level N | 1 through 6 |
| Next landmark | D |
| Previous landmark | Shift+D |
| Next form field | F |
| Next button | B |
| Next link | K |
| Read current line | Insert+L |
| Read current element | Insert+Tab |
| Tab to next focusable | Tab |
| Activate | Enter or Space |
| Elements list | Insert+F7 |

5. Record what NVDA announces for each test step.
6. Enter the announcement text in the "Actual Result" area of the test scenario.

### Keyboard Only Testing (KB) -- How To

1. Turn off any screen reader.
2. Unplug or disable the mouse.
3. Use Tab, Shift+Tab, Enter, Space, Escape, and Arrow keys exclusively.
4. Verify a visible focus ring appears on every interactive element.
5. Verify no keyboard traps (can always Tab out or Escape).
6. Verify logical focus order (generally left-to-right, top-to-bottom).

### Low Vision / Color Contrast (LV) -- How To

1. Open Chrome DevTools (F12) and go to the Elements panel.
2. Select any text element and check the computed contrast ratio in Styles.
3. Use the Accessibility panel in DevTools to run a full page contrast scan.
4. Enable Windows High Contrast mode: Settings then Accessibility then Contrast themes, select a high contrast theme.
5. Apply the text spacing bookmarklet (see [WCAG 1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Techniques/css/C36)) and verify no content is clipped.
6. Test all four themes: dark, light, rosepine, rosepine-dawn.

### Zoom / Reflow (ZR) -- How To

1. Open the app in Chrome.
2. Press Ctrl+Plus to zoom to 200%. Verify no horizontal scrollbar appears and all content reflows.
3. Open DevTools, toggle device toolbar (Ctrl+Shift+M), set width to 320px. Verify content reflows.
4. Verify no text or controls are truncated or overlapping.

### Automated Scan (AX) -- How To

1. Follow [ACCESSIBILITY-TESTING.md](ACCESSIBILITY-TESTING.md) to set up the environment.
2. Run: `npx playwright test tests/a11y/`
3. Run: `npm run check` (svelte-check for compile-time a11y warnings).
4. Check CI results on the GitHub Actions "Accessibility Tests" workflow.

### Visual Regression (VR) -- How To

1. Start the dev server before your changes.
2. Take a screenshot of the affected area at 1280x720 viewport.
3. Apply your changes and take another screenshot at the same viewport.
4. Compare side by side. For semantic-only PRs, the screenshots must be pixel-identical.

---

## Per-Issue Test Scenarios

### Sprint 1: "I can send a message"

#### Issue #8: Add semantic landmarks to app layout

WCAG: 1.3.1, 2.4.1, 4.1.2

**Screen Reader (SR)**

- [ ] Navigate with D key (landmarks). NVDA announces "main landmark" for the chat content area.
- [ ] Navigate with D key. NVDA announces "navigation landmark" or "complementary landmark" for the sidebar.
- [ ] Navigate with D key. NVDA announces "banner landmark" for the top navigation bar.
- [ ] Open NVDA Elements List (Insert+F7), switch to Landmarks tab. All three landmarks appear: main, navigation/complementary, banner.

**Keyboard Only (KB)**

- [ ] Tab through the page. Focus moves logically from sidebar to main content (or skip link target).
- [ ] No keyboard traps exist in the landmark containers.

**Automated Scan (AX)**

- [ ] `npx playwright test tests/a11y/chat.spec.ts` -- "page has at least one landmark region" passes.
- [ ] `npx playwright test tests/a11y/chat.spec.ts` -- axe-core scan reports zero violations for landmark-related rules.

**Visual Regression (VR)**

- [ ] Before/after screenshots of the main chat page are pixel-identical.

Tested By: _______________  Date: _______________

---

#### Issue #9: Label the chat input

WCAG: 1.3.1, 4.1.2

**Screen Reader (SR)**

- [ ] Tab to the chat input. NVDA announces "Message, edit" or "Chat message, edit" (not just "edit" or "text field").
- [ ] Press Insert+Tab on the chat input. NVDA reads the accessible name.
- [ ] If using TipTap rich editor, focus the editor area. NVDA announces the label.

**Keyboard Only (KB)**

- [ ] Tab reaches the chat input without skipping it.
- [ ] After typing a message, pressing Enter (or Ctrl+Enter) submits it.

**Automated Scan (AX)**

- [ ] `npx playwright test tests/a11y/chat.spec.ts` -- "chat input textarea is labeled" passes.
- [ ] axe-core scan finds no "label" or "input-has-accessible-name" violations for the chat input.

**Visual Regression (VR)**

- [ ] Before/after screenshots are pixel-identical (label is visually hidden or `aria-label`).

Tested By: _______________  Date: _______________

---

#### Issue #10: Add page heading to empty chat state

WCAG: 1.3.1, 2.4.6

**Screen Reader (SR)**

- [ ] Load the app with no conversation selected. Press H. NVDA announces the greeting heading (for example "Hello, Test Admin, heading level 1").
- [ ] Press 1 (heading level 1 navigation). NVDA finds the greeting heading.

**Keyboard Only (KB)**

- [ ] Tab order is not disrupted by the heading change.

**Automated Scan (AX)**

- [ ] `npx playwright test tests/a11y/chat.spec.ts` -- heading hierarchy test passes.
- [ ] `npm run check` reports no new a11y warnings in ChatPlaceholder.svelte.

**Visual Regression (VR)**

- [ ] Before/after screenshots of the empty chat page are pixel-identical.

Tested By: _______________  Date: _______________

---

### Sprint 2: "I can read the response"

#### Issue #11: Make message sender names headings

WCAG: 1.3.1, 2.4.6

**Screen Reader (SR)**

- [ ] Send a message and wait for a response. Press H to navigate headings. NVDA announces "You, heading level 3" for the user message.
- [ ] Press H again. NVDA announces the model name heading (for example "Test Model, heading level 3") for the assistant message.
- [ ] Navigate through a conversation with multiple messages. Each sender name is a separate heading at level 3.

**Keyboard Only (KB)**

- [ ] Tab order between messages is not disrupted by heading change.

**Automated Scan (AX)**

- [ ] `npx playwright test tests/a11y/chat-messages.spec.ts` -- "chat conversation section has a heading" passes.
- [ ] `npm run check` reports no new a11y warnings in Name.svelte.

**Visual Regression (VR)**

- [ ] Before/after screenshots of a chat conversation are pixel-identical. Sender names look exactly the same.

Tested By: _______________  Date: _______________

---

#### Issue #12: Add skip navigation link

WCAG: 2.4.1

**Screen Reader (SR)**

- [ ] Load any page. Press Tab once. NVDA announces "Skip to main content, link."
- [ ] Press Enter on the skip link. Focus moves to the main content area.

**Keyboard Only (KB)**

- [ ] Reload the page. First Tab stop is the skip link, which becomes visible on focus.
- [ ] Press Enter. Focus jumps past the sidebar into the main content area.
- [ ] The skip link is invisible when not focused.

**Automated Scan (AX)**

- [ ] axe-core "bypass" rule passes.

**Visual Regression (VR)**

- [ ] Skip link is invisible by default. Screenshot without focus is pixel-identical to before.

Tested By: _______________  Date: _______________

---

#### Issue #13: Announce response completion

WCAG: 4.1.3

**Screen Reader (SR)**

- [ ] Send a message and wait for the response to finish streaming. NVDA announces "Response complete" (or similar) via live region after the last token arrives.
- [ ] The announcement does not repeat or spam during streaming -- only fires once at completion.
- [ ] If the response errors out, NVDA announces the error state.

**Keyboard Only (KB)**

- [ ] N/A (live region announcements are screen reader dependent).

**Automated Scan (AX)**

- [ ] `npx playwright test tests/a11y/chat-messages.spec.ts` -- "response complete triggers sr-only announcement" passes.
- [ ] `npx playwright test tests/a11y/chat-messages.spec.ts` -- "message list uses role=log with aria-live" passes.

Tested By: _______________  Date: _______________

---

### Sprint 3: "I can act on the response"

#### Issue #14: Make action buttons visible on keyboard focus

WCAG: 2.1.1, 2.4.7

**Screen Reader (SR)**

- [ ] Tab to a response message's action buttons (copy, edit, regenerate, read aloud). NVDA announces each button with its aria-label (for example "Copy response, button").
- [ ] Activate each button with Enter or Space. The action completes.

**Keyboard Only (KB)**

- [ ] Tab into a response message area. The action buttons become visible when the button container or any child button receives focus.
- [ ] Each button shows a visible focus ring.
- [ ] Tab through all action buttons; none are skipped.

**Low Vision (LV)**

- [ ] Action button icons meet 3:1 non-text contrast against their background in dark theme.
- [ ] Action button icons meet 3:1 non-text contrast in light theme.

**Automated Scan (AX)**

- [ ] `npx playwright test tests/a11y/chat-messages.spec.ts` -- "response action buttons have accessible labels" passes.

**Visual Regression (VR)**

- [ ] Screenshots of buttons in hovered state remain identical. Only keyboard focus behavior is added.

Tested By: _______________  Date: _______________

---

#### Issue #15: Add keyboard navigation between messages

WCAG: 2.1.1, 2.4.3

**Screen Reader (SR)**

- [ ] With focus in the chat area, press J. Focus moves to the next message. NVDA announces the sender name.
- [ ] Press K. Focus moves to the previous message. NVDA announces the sender name.
- [ ] At the first message, K does not move focus further (no wrap or trap).
- [ ] At the last message, J does not move focus further.

**Keyboard Only (KB)**

- [ ] J/K navigation shows a visible focus indicator on the current message.
- [ ] The focused message container has `tabindex="-1"` and receives programmatic focus.
- [ ] J/K shortcuts do not conflict with browser or existing application shortcuts.
- [ ] When the chat input is focused (typing a message), J/K type normally and do not trigger navigation.

**Automated Scan (AX)**

- [ ] `npx playwright test tests/a11y/chat-messages.spec.ts` -- "messages use listitem role" passes.

Tested By: _______________  Date: _______________

---

### Sprint 4: "I can pick a model"

#### Issue #16: Add basic keyboard support to model selector

WCAG: 2.1.1, 4.1.2

**Screen Reader (SR)**

- [ ] Tab to the model selector button. NVDA announces "Select a model, button" (or similar).
- [ ] Press Enter or Space. The dropdown opens. NVDA may announce "expanded."
- [ ] Press Down Arrow. NVDA announces the first model option name.
- [ ] Press Down Arrow again. NVDA announces the next model option.
- [ ] Press Enter. The model is selected. NVDA announces the selected model.
- [ ] Press Escape. The dropdown closes without changing selection.

**Keyboard Only (KB)**

- [ ] Tab to model selector button. A visible focus ring appears.
- [ ] Enter/Space opens the dropdown.
- [ ] Arrow keys move through model options with a visible highlight.
- [ ] Enter selects. Escape closes.
- [ ] Focus returns to the trigger button after closing.

**Automated Scan (AX)**

- [ ] `npx playwright test tests/a11y/chat.spec.ts` -- "model selector button has accessible label" passes.

Tested By: _______________  Date: _______________

---

#### Issue #17: Add ARIA combobox pattern to model selector

WCAG: 4.1.2

**Screen Reader (SR)**

- [ ] Tab to the model selector. NVDA announces it as a "combobox" role (not just "button").
- [ ] When open, NVDA announces the active option via `aria-activedescendant`.
- [ ] Type a filter string. NVDA announces the number of matching results or the first match.
- [ ] `aria-expanded` toggles. NVDA announces "expanded" on open and "collapsed" on close.

**Keyboard Only (KB)**

- [ ] Type in the search filter. Options filter immediately.
- [ ] Arrow keys move through filtered results.
- [ ] Home/End move to first/last option.

**Automated Scan (AX)**

- [ ] axe-core reports no combobox-related violations.
- [ ] `npm run check` reports no a11y warnings in Selector.svelte.

Tested By: _______________  Date: _______________

---

### Sprint 5: "I can browse my chat history"

#### Issue #18: Add sidebar section headings

WCAG: 1.3.1, 2.4.6

**Screen Reader (SR)**

- [ ] Open the sidebar (if collapsed). Press H to navigate headings. NVDA finds headings for sidebar sections (for example "Pinned", "Chats", "Folders").
- [ ] Press 3 (heading level 3 navigation). NVDA cycles through sidebar section headings.
- [ ] The sidebar heading for "Chat history" or equivalent is present at h2 level (or the aside `aria-label` from #8 suffices).

**Keyboard Only (KB)**

- [ ] Tab through the sidebar. Focus order follows the heading structure logically.

**Automated Scan (AX)**

- [ ] `npx playwright test tests/a11y/sidebar.spec.ts` -- "sidebar section headings use proper heading elements" passes.

**Visual Regression (VR)**

- [ ] Before/after screenshots of the sidebar are pixel-identical.

Tested By: _______________  Date: _______________

---

#### Issue #19: Label the sidebar search input

WCAG: 1.3.1, 4.1.2

**Screen Reader (SR)**

- [ ] Tab to the sidebar search input. NVDA announces "Search chats, edit" (or similar accessible name).
- [ ] The announcement includes a descriptive label, not just "edit" or "text field."

**Keyboard Only (KB)**

- [ ] Tab reaches the search input. A visible focus ring appears.
- [ ] Typing filters the chat list immediately.

**Automated Scan (AX)**

- [ ] `npx playwright test tests/a11y/sidebar.spec.ts` -- axe-core scan passes with no label violations for the search input.

**Visual Regression (VR)**

- [ ] Before/after screenshots are pixel-identical (label is `aria-label`).

Tested By: _______________  Date: _______________

---

### Sprint 6: "I can manage my settings"

#### Issue #20: Convert modal titles to headings

WCAG: 1.3.1, 2.4.6, 4.1.2

**Screen Reader (SR)**

- [ ] Open the Settings modal (Ctrl+Comma). Press 1 or 2 for heading navigation. NVDA announces "Settings, heading level 2."
- [ ] Open any other modal (for example Share Chat, Import). NVDA announces the modal title as a heading.
- [ ] Total of 31 modals converted from div to heading (spot check at least 5).

**Keyboard Only (KB)**

- [ ] Modal opens with keyboard shortcut or button. Focus moves into the modal.

**Automated Scan (AX)**

- [ ] `npx playwright test tests/a11y/settings.spec.ts` -- "settings modal has an h2 title" passes.
- [ ] `npm run check` reports no new a11y warnings in modal files.

**Visual Regression (VR)**

- [ ] Before/after screenshots of at least 3 modals are pixel-identical.

Tested By: _______________  Date: _______________

---

#### Issue #21: Add heading hierarchy to settings sections

WCAG: 1.3.1, 2.4.6

**Screen Reader (SR)**

- [ ] Open Settings modal and navigate to General tab. Press H. NVDA announces section headings (for example "WebUI Settings, heading level 3", "System Prompt, heading level 3").
- [ ] Navigate to Audio tab. Press H. NVDA announces "STT Settings, heading level 3", "TTS Settings, heading level 3."
- [ ] Every settings section divider is announced as a heading (7 files).

**Keyboard Only (KB)**

- [ ] Tab order within settings sections follows the heading structure logically.

**Automated Scan (AX)**

- [ ] `npx playwright test tests/a11y/settings.spec.ts` -- "settings sections use h3 headings" passes.

**Visual Regression (VR)**

- [ ] Before/after screenshots of settings panels are pixel-identical.

Tested By: _______________  Date: _______________

---

#### Issue #22: Label settings form inputs

WCAG: 1.3.1, 4.1.2, 3.3.2

**Screen Reader (SR)**

- [ ] Open Settings then General tab. Tab through each form control. Each input, select, and textarea announces its label (for example "Theme, combo box", "Default Model, edit").
- [ ] No input announces just "edit" or "text field" without a label.
- [ ] Repeat for Audio, Interface, DataControls, and other settings tabs.

**Keyboard Only (KB)**

- [ ] Clicking/tapping a label focuses its associated input (if using `<label for>`).

**Automated Scan (AX)**

- [ ] `npx playwright test tests/a11y/settings.spec.ts` -- axe-core scan scoped to dialog reports no "label" violations.

Tested By: _______________  Date: _______________

---

#### Issue #23: Complete settings tab ARIA pattern

WCAG: 4.1.2

**Screen Reader (SR)**

- [ ] Open Settings. Tab to the tab list. NVDA announces "General tab, selected, 1 of N" (or similar tablist announcement).
- [ ] Press Right Arrow. Focus moves to the next tab. NVDA announces the tab name and "tab."
- [ ] Press Enter or Space. The associated tab panel activates.
- [ ] The tab panel has `role="tabpanel"` and `aria-labelledby` pointing to its tab.
- [ ] Only the selected tab has `tabindex="0"`; others have `tabindex="-1"` (roving tabindex).

**Keyboard Only (KB)**

- [ ] Left/Right Arrow keys navigate between tabs.
- [ ] Tab key from the tablist moves focus into the tab panel content (not to the next tab).
- [ ] Shift+Tab from the panel returns focus to the selected tab.
- [ ] Home key moves to the first tab. End key moves to the last tab.

**Automated Scan (AX)**

- [ ] `npx playwright test tests/a11y/settings.spec.ts` -- "settings modal has role=dialog and aria-modal" passes.
- [ ] axe-core scan reports no tablist/tabpanel violations.

Tested By: _______________  Date: _______________

---

### Sprint 7: Cross-cutting polish

#### Issue #24: Add prefers-reduced-motion support

WCAG: 2.3.3

**Low Vision (LV)**

- [ ] Enable "Reduce motion" in OS settings (Windows: Settings then Accessibility then Visual effects then turn off Animation effects).
- [ ] Reload the app. All Svelte transitions (fade, slide, flyAndScale) are disabled or instant.
- [ ] Open/close a modal. No fly-in animation.
- [ ] Expand/collapse a "Thinking" section. No slide animation.
- [ ] Verify no motion occurs anywhere in the app with reduced motion enabled.

**Automated Scan (AX)**

- [ ] `npm run check` reports no a11y warnings related to animation.
- [ ] CSS source contains `@media (prefers-reduced-motion: reduce)` rule.

Tested By: _______________  Date: _______________

---

#### Issue #25: Auth page heading

WCAG: 1.3.1, 2.4.6

**Screen Reader (SR)**

- [ ] Navigate to /auth (sign in page). Press 1. NVDA announces the page heading at level 1 (for example "Sign in, heading level 1").
- [ ] Switch to sign up mode. The heading updates to "Sign up, heading level 1" (or "Create Account").

**Automated Scan (AX)**

- [ ] `npx playwright test tests/a11y/auth.spec.ts` -- "has a single h1 heading" passes.

**Visual Regression (VR)**

- [ ] Before/after screenshots of the auth page are pixel-identical.

Tested By: _______________  Date: _______________

---

#### Issue #26: Add alt text to images

WCAG: 1.1.1

**Screen Reader (SR)**

- [ ] Navigate through the app. For each image, press Insert+Tab. NVDA announces meaningful alt text (not a filename, not empty).
- [ ] Decorative images (pure ornamentation) have `alt=""` and are skipped by NVDA.
- [ ] The user avatar image has alt text containing the user's name.
- [ ] Logo images have alt text containing "Open WebUI" or equivalent.

**Automated Scan (AX)**

- [ ] axe-core "image-alt" rule passes on all pages (auth, chat, settings, admin).
- [ ] `npm run check` reports no a11y-missing-attribute warnings for img elements.

Tested By: _______________  Date: _______________

---

#### Issue #27: Collapsible button fix

WCAG: 4.1.2, 2.1.1

**Screen Reader (SR)**

- [ ] Navigate to a "Thinking" section in a response. NVDA announces the trigger as "button" (not "clickable" or "group").
- [ ] NVDA announces the aria-expanded state: "collapsed" or "expanded."
- [ ] Press Enter or Space. The section toggles. NVDA announces the updated expanded state.

**Keyboard Only (KB)**

- [ ] Tab reaches the collapsible trigger. A visible focus ring appears.
- [ ] Enter and Space both toggle the section.
- [ ] The collapsible content does not trap focus when expanded.

**Automated Scan (AX)**

- [ ] `npm run check` reports zero a11y-ignore suppressions remaining in Collapsible.svelte.
- [ ] axe-core finds no button-name violations for collapsible triggers.

**Visual Regression (VR)**

- [ ] Before/after screenshots of collapsed and expanded states are pixel-identical.

Tested By: _______________  Date: _______________

---

#### Issue #28: Dropdown ARIA

WCAG: 4.1.2, 2.1.1, 1.3.1

**Screen Reader (SR)**

- [ ] Tab to any dropdown trigger (for example user menu, chat actions menu). NVDA announces it as a "button" with "has popup menu."
- [ ] Open the dropdown. NVDA announces "menu" or "listbox."
- [ ] Arrow down through items. NVDA announces each item name and role ("menuitem").
- [ ] Press Escape. Menu closes. Focus returns to the trigger.

**Keyboard Only (KB)**

- [ ] Tab to dropdown trigger. Visible focus ring.
- [ ] Enter/Space opens. Arrow keys navigate. Enter activates item.
- [ ] Escape closes. Focus returns to trigger.
- [ ] Tab from inside the menu closes it (focus does not get stuck).

**Automated Scan (AX)**

- [ ] `npm run check` reports zero a11y-ignore suppressions in Dropdown.svelte and DropdownSub.svelte.
- [ ] axe-core finds no violations for dropdown instances.

Tested By: _______________  Date: _______________

---

#### Issue #29: Modal aria-labelledby

WCAG: 4.1.2

**Screen Reader (SR)**

- [ ] Open the Settings modal. NVDA announces "Settings dialog" (the dialog title via aria-labelledby).
- [ ] Open at least 3 other modals (Share Chat, Import, Keyboard Shortcuts). NVDA announces each dialog by its title.
- [ ] If a modal has no visible title, it has an aria-label fallback. NVDA announces it.

**Automated Scan (AX)**

- [ ] `npx playwright test tests/a11y/settings.spec.ts` -- "settings modal has role=dialog and aria-modal" passes.
- [ ] axe-core "aria-dialog-name" rule passes for all tested modals.

Tested By: _______________  Date: _______________

---

#### Issue #30: Tooltip focus behavior

WCAG: 1.3.1, 4.1.2

**Screen Reader (SR)**

- [ ] Tab to a control with a tooltip (for example an icon button with a tooltip label). The tooltip content is announced or accessible via the button's aria-label.
- [ ] The tooltip is not the sole source of the accessible name -- the button has its own label.

**Keyboard Only (KB)**

- [ ] Tab to a control with a tooltip. The tooltip appears on keyboard focus (same as mouse hover).
- [ ] Tab away. The tooltip disappears.
- [ ] Escape while tooltip is visible dismisses it (WCAG 1.4.13 Content on Hover or Focus).

**Automated Scan (AX)**

- [ ] `npm run check` reports zero a11y-ignore suppressions in Tooltip.svelte.

Tested By: _______________  Date: _______________

---

#### Issue #31: Resolve svelte-ignore a11y suppressions

WCAG: Multiple (2.1.1, 4.1.2, 1.2.1)

**Automated Scan (AX)**

- [ ] Run `npm run check`. Count the total svelte-ignore a11y directives. Verify the count is less than the original 60.
- [ ] Run `grep -r "svelte-ignore" src/ --include="*.svelte" | grep "a11y" | wc -l` and record the count.
- [ ] Each removed suppression has been replaced with a proper fix (verified by spot-checking 5 files).

**Screen Reader (SR)**

- [ ] Spot check 5 files that had suppressions removed. Verify the interactive elements now announce their role and name correctly.

Tested By: _______________  Date: _______________

---

#### Issue #32: Form validation errors

WCAG: 3.3.1, 3.3.3

**Screen Reader (SR)**

- [ ] On the auth page, submit with an empty email. NVDA announces the error message via live region or aria-invalid change.
- [ ] The error message text is associated with the input via `aria-describedby`.
- [ ] The invalid input has `aria-invalid="true"`. NVDA announces "invalid entry."
- [ ] After correcting the error and resubmitting, `aria-invalid` is removed.

**Keyboard Only (KB)**

- [ ] After a validation error, focus moves to the first invalid field (or stays on submit if showing inline errors).
- [ ] Error messages are visible on screen near their associated input.

**Low Vision (LV)**

- [ ] Error messages are not communicated by color alone. An icon or text prefix like "Error:" accompanies the color change.
- [ ] Error text meets 4.5:1 contrast ratio against its background.

**Automated Scan (AX)**

- [ ] axe-core finds no "aria-valid-attr-value" violations after form submission.

Tested By: _______________  Date: _______________

---

#### Issue #33: Focus-visible indicators

WCAG: 2.4.7, 2.4.11

**Keyboard Only (KB)**

- [ ] Tab through the entire chat page. Every interactive element (button, link, input, select, textarea) shows a visible focus indicator.
- [ ] No element has a removed focus ring with no replacement (the original 16-element gap is closed).
- [ ] Focus rings use `focus-visible` (not `focus`), so mouse clicks do not show rings but keyboard Tab does.
- [ ] Focus rings have at least 2px thickness and sufficient contrast against the background.

**Low Vision (LV)**

- [ ] Focus rings are visible in dark theme.
- [ ] Focus rings are visible in light theme.
- [ ] Focus rings are visible in Windows High Contrast mode.

**Automated Scan (AX)**

- [ ] Search for `outline-none` in the codebase. Every instance has a corresponding `focus-visible:ring` or `focus-visible:outline` replacement.

Tested By: _______________  Date: _______________

---

#### Issue #34: Sidebar panel focus management

WCAG: 2.1.1, 4.1.2

**Screen Reader (SR)**

- [ ] Open the sidebar panel (if using a slide-out on mobile viewport). NVDA announces the panel (label or landmark).
- [ ] Press Escape. The panel closes. NVDA focus returns to the element that opened it.

**Keyboard Only (KB)**

- [ ] Open the sidebar panel. Focus moves into the panel.
- [ ] Press Escape. Panel closes. Focus returns to the trigger button.
- [ ] Tab does not escape the panel while it is open (focus is managed, though not necessarily trapped like a modal).

**Automated Scan (AX)**

- [ ] `npm run check` reports zero a11y-ignore suppressions in common/Sidebar.svelte.

Tested By: _______________  Date: _______________

---

#### Issue #35: Add captions/tracks to media

WCAG: 1.2.1

**Screen Reader (SR)**

- [ ] Navigate to any page with audio or video elements. NVDA announces the media player controls.
- [ ] If a `<track>` element is present, NVDA can access captions.

**Automated Scan (AX)**

- [ ] `npm run check` reports zero a11y-media-has-caption suppressions.
- [ ] axe-core "video-caption" and "audio-caption" rules pass. (Note: if no media is present on tested pages, mark N/A.)

Tested By: _______________  Date: _______________

---

#### Issue #36: Label admin panel form inputs (221 controls)

WCAG: 1.3.1, 4.1.2, 3.3.2

**Screen Reader (SR)**

- [ ] Navigate to admin settings (/admin/settings or equivalent). Tab through every input, select, and textarea. Each announces its label.
- [ ] Spot check at least 20 controls across Database, Config, and other admin sections.
- [ ] No control announces just "edit" or "text field" without a label.

**Keyboard Only (KB)**

- [ ] All 221 controls are keyboard reachable.
- [ ] Labels that use `<label for>` are clickable and focus their associated input.

**Automated Scan (AX)**

- [ ] axe-core scan of admin pages reports zero "label" violations.

Tested By: _______________  Date: _______________

---

#### Issue #38: Label workspace and modal form inputs (83 controls)

WCAG: 1.3.1, 4.1.2, 3.3.2

**Screen Reader (SR)**

- [ ] Open workspace editors (Functions, Tools, Knowledge, etc.). Tab through form controls. Each announces its label.
- [ ] Open standalone modals (Add Connection, etc.). Tab through form controls. Each announces its label.
- [ ] Spot check at least 15 controls.

**Automated Scan (AX)**

- [ ] axe-core scan reports zero "label" violations on workspace pages and modals.

Tested By: _______________  Date: _______________

---

#### Issue #40: Add aria-hidden to decorative SVG icons (395 SVGs)

WCAG: 1.1.1, 4.1.2

**Screen Reader (SR)**

- [ ] Navigate through the chat page with NVDA. No SVG icon announces as "image" or reads out SVG path data.
- [ ] Decorative SVGs are completely invisible to NVDA (skipped during Tab and heading/element navigation).
- [ ] Informational SVGs (if any) have an accessible name via `aria-label` or `<title>`.

**Automated Scan (AX)**

- [ ] axe-core "svg-img-alt" rule passes across all tested pages.
- [ ] Run `grep -r "<svg" src/ --include="*.svelte" -l | wc -l` and verify every file's SVGs have `aria-hidden="true"` or an accessible name.

Tested By: _______________  Date: _______________

---

#### Issue #41: Run color contrast audit and fix failures

WCAG: 1.4.1, 1.4.3, 1.4.11

**Low Vision (LV)**

- [ ] Run axe DevTools on the chat page in dark theme. Zero contrast violations.
- [ ] Run axe DevTools on the chat page in light theme. Zero contrast violations.
- [ ] Run axe DevTools on the chat page in rosepine theme. Zero contrast violations.
- [ ] Run axe DevTools on the chat page in rosepine-dawn theme. Zero contrast violations.
- [ ] All text meets 4.5:1 contrast ratio (normal text) or 3:1 (large text, 18pt+ or 14pt bold+).
- [ ] All non-text UI components (borders, icons, focus rings) meet 3:1 contrast ratio (1.4.11).
- [ ] Placeholder text in inputs meets 4.5:1 contrast (or has a visible label that is sufficient).

**Screen Reader (SR)**

- [ ] N/A (color contrast is a visual concern).

**Automated Scan (AX)**

- [ ] axe-core "color-contrast" rule passes on auth page.
- [ ] axe-core "color-contrast" rule passes on chat page.
- [ ] axe-core "color-contrast" rule passes on settings modal.

Tested By: _______________  Date: _______________

---

#### Issue #42: Verify resize/reflow at 200% zoom and 320px viewport

WCAG: 1.4.4, 1.4.10, 1.4.12

**Zoom / Reflow (ZR)**

- [ ] Set browser zoom to 200%. No horizontal scrollbar appears on the chat page.
- [ ] All text, buttons, and inputs reflow to fit the viewport. No content is clipped.
- [ ] Set viewport width to 320px (DevTools device toolbar). Content reflows to single column. No horizontal scrollbar.
- [ ] Sidebar collapses or is accessible via a toggle at 320px.
- [ ] Chat input, send button, and model selector are all usable at 320px.
- [ ] Settings modal is usable at 320px without horizontal scroll.

**Low Vision (LV)**

- [ ] Apply the text spacing bookmarklet (letter-spacing 0.12em, word-spacing 0.16em, line-height 1.5, paragraph-spacing 2em). No content is clipped or overlaps.
- [ ] Text spacing override does not break layout in chat messages.
- [ ] Text spacing override does not break layout in settings.

Tested By: _______________  Date: _______________

---

#### Issue #43: Verify focus not obscured by sticky elements

WCAG: 2.4.11

**Keyboard Only (KB)**

- [ ] Tab through the entire chat page. No focused element is fully hidden behind the sticky navbar at the top.
- [ ] Tab through the page with a toast notification visible. No focused element is fully hidden behind the toast.
- [ ] If a floating action button exists, tab through the page. No focused element is fully hidden behind it.
- [ ] When using the skip link, the skip target is not obscured by the sticky navbar.

**Zoom / Reflow (ZR)**

- [ ] At 200% zoom, repeat the above checks. Sticky elements may take up more proportional space.

Tested By: _______________  Date: _______________

---

#### Issue #44: Add keyboard alternatives for drag-and-drop

WCAG: 2.5.7

**Keyboard Only (KB)**

- [ ] Wherever a drag-and-drop interaction exists (file ordering, chat folder organization), verify a button/keyboard alternative is present.
- [ ] The keyboard alternative allows the same reordering/action without a mouse.
- [ ] Spot check at least 3 drag-and-drop locations.

**Screen Reader (SR)**

- [ ] The keyboard alternative is announced by NVDA with a meaningful label (for example "Move up, button" or "Reorder, button").

Tested By: _______________  Date: _______________

---

#### Issue #45: Verify minimum target size for interactive controls

WCAG: 2.5.8

**Low Vision (LV)**

- [ ] Measure icon-only buttons in the chat action bar. Each is at least 24x24 CSS pixels.
- [ ] Measure close buttons (X) on modals. Each is at least 24x24 CSS pixels.
- [ ] Measure sidebar toggle button. At least 24x24 CSS pixels.
- [ ] Measure any small icon buttons in settings. At least 24x24 CSS pixels.
- [ ] If any control is below 24x24px, verify it has at least 24px of spacing to adjacent targets (the spacing exception).

Tested By: _______________  Date: _______________

---

#### Issue #46: Audit WCAG 2.2 new criteria (3.2.6, 3.3.7, 3.3.8, 1.3.2)

WCAG: 3.2.6, 3.3.7, 3.3.8, 1.3.2

**Screen Reader (SR)**

- [ ] 1.3.2 Meaningful Sequence: Read the chat page in NVDA reading order (Insert+Down Arrow). Content order matches visual order.
- [ ] 3.3.8 Accessible Authentication: The login page does not require transcribing or memorizing a code/puzzle. Standard email/password is used.

**Keyboard Only (KB)**

- [ ] 3.2.6 Consistent Help: If a help link or support mechanism exists, it appears in the same relative location on every page.
- [ ] 3.3.7 Redundant Entry: If the user entered information previously in a session (for example, a name in settings), it is pre-filled when needed again and not re-requested.

Tested By: _______________  Date: _______________

---

#### Issue #47: Add captions to data tables

WCAG: 1.3.1

**Screen Reader (SR)**

- [ ] Navigate to a page with a data table (for example admin user list). NVDA announces the table caption or summary before reading rows.
- [ ] Press T (NVDA table navigation). The table is recognized as a data table with a caption.
- [ ] Column headers are announced when navigating cells with Ctrl+Alt+Arrow keys.

**Automated Scan (AX)**

- [ ] axe-core "table-fake-caption" and "td-headers-attr" rules pass.
- [ ] All 13 tables in the codebase have `<caption>` elements (or `aria-label` on `<table>`).

Tested By: _______________  Date: _______________

---

## Cross-Cutting Test Scenarios

These scenarios span multiple issues and verify the end-to-end accessibility experience.

### Full Keyboard Walkthrough: Send and Read a Message

- [ ] 1. Load the app. Press Tab. First stop is the skip link ("Skip to main content").
- [ ] 2. Press Enter on skip link. Focus moves to the main content area.
- [ ] 3. Tab to the chat input. Focus ring is visible. The input is labeled.
- [ ] 4. Type a message and press Ctrl+Enter (or Enter if that submits). Message is sent.
- [ ] 5. Wait for response. The response completion is announced (if screen reader is on).
- [ ] 6. Press J to move to the assistant response message. Focus ring visible.
- [ ] 7. Tab to action buttons (copy, edit, regenerate). Each has a visible focus ring and label.
- [ ] 8. Press Escape or Tab away. Focus returns to a logical position. No traps.
- [ ] 9. Press K to navigate back to the user message.
- [ ] 10. Tab to the sidebar. Navigate using headings (H key with NVDA). Find "Chats" section.

Tested By: _______________  Date: _______________

---

### Full Screen Reader Walkthrough: Send and Read a Message (NVDA)

- [ ] 1. Turn on NVDA. Open the app in Chrome.
- [ ] 2. NVDA announces the page title.
- [ ] 3. Press D. NVDA cycles through landmarks: banner, navigation/complementary (sidebar), main.
- [ ] 4. Press H from main landmark. NVDA announces the page heading.
- [ ] 5. Press F. NVDA moves to the chat input and announces its label.
- [ ] 6. Type a message and submit.
- [ ] 7. Wait for response. NVDA announces "Response complete" (or similar).
- [ ] 8. Press H. NVDA announces the model name heading in the response.
- [ ] 9. Tab to action buttons. NVDA announces each button's label.
- [ ] 10. Press Escape or close any open popups. No focus is lost.

Tested By: _______________  Date: _______________

---

### Full Screen Reader Walkthrough: Settings (NVDA)

- [ ] 1. Press Ctrl+Comma to open settings. NVDA announces "Settings dialog."
- [ ] 2. Tab to the tab list. NVDA announces "General tab, selected."
- [ ] 3. Press Right Arrow. NVDA announces the next tab.
- [ ] 4. Press Tab to enter the tab panel. NVDA announces the panel content.
- [ ] 5. Press H. NVDA cycles through section headings (h3) within the settings.
- [ ] 6. Press F. NVDA moves through form inputs, each with a label.
- [ ] 7. Press Escape. NVDA announces the dialog closed. Focus returns to the element that opened settings.

Tested By: _______________  Date: _______________

---

### Theme Contrast Matrix

Test the following pages against all four themes for color contrast.

The following table tracks contrast testing status for each page-theme combination.

| Page | Dark | Light | Rosepine | Rosepine-Dawn |
|---|---|---|---|---|
| Auth (login) | [ ] | [ ] | [ ] | [ ] |
| Chat (empty) | [ ] | [ ] | [ ] | [ ] |
| Chat (with messages) | [ ] | [ ] | [ ] | [ ] |
| Settings modal | [ ] | [ ] | [ ] | [ ] |
| Sidebar | [ ] | [ ] | [ ] | [ ] |
| Admin panel | [ ] | [ ] | [ ] | [ ] |

Tested By: _______________  Date: _______________

---

### Browser Compatibility Matrix

Run the automated test suite and spot-check keyboard navigation in each browser.

The following table tracks browser compatibility testing status.

| Browser | Automated Tests Pass | Keyboard Navigation OK | Screen Reader Tested |
|---|---|---|---|
| Chrome (latest) | [ ] | [ ] | [ ] NVDA |
| Firefox (latest) | [ ] | [ ] | [ ] NVDA |
| Edge (latest) | [ ] | [ ] | [ ] Narrator |
| Safari (latest, macOS only) | [ ] | [ ] | [ ] VoiceOver |

Tested By: _______________  Date: _______________

---

## Summary Statistics

The following table summarizes total test checkboxes per testing category.

| Category | Total Checkboxes | Passed | Failed | N/A | Remaining |
|---|---|---|---|---|---|
| Screen Reader (SR) | -- | 0 | 0 | 0 | -- |
| Keyboard Only (KB) | -- | 0 | 0 | 0 | -- |
| Low Vision (LV) | -- | 0 | 0 | 0 | -- |
| Zoom / Reflow (ZR) | -- | 0 | 0 | 0 | -- |
| Automated Scan (AX) | -- | 0 | 0 | 0 | -- |
| Visual Regression (VR) | -- | 0 | 0 | 0 | -- |
| **Total** | -- | 0 | 0 | 0 | -- |

Update this table as testing progresses.

---

Document version: 1.0
Created: April 10, 2026
Last updated: April 10, 2026
