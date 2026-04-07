# Accessibility Testing Guide

This guide covers two testing modes for the Open WebUI accessibility remediation: interactive manual testing via GitHub Codespaces, and automated regression testing via Playwright and axe-core.

## Table of Contents

- [Manual Testing with GitHub Codespaces](#manual-testing-with-github-codespaces)
  - [Launch a Codespace](#launch-a-codespace)
  - [Start the App](#start-the-app)
  - [What to Test](#what-to-test)
- [Automated Accessibility Tests](#automated-accessibility-tests)
  - [What the Tests Cover](#what-the-tests-cover)
  - [Run Locally](#run-locally)
  - [CI Integration](#ci-integration)
- [Adding New Tests](#adding-new-tests)

---

## Manual Testing with GitHub Codespaces

The repository includes a devcontainer configuration that sets up a full development environment in the cloud. No local dependencies required.

### Launch a Codespace

1. Go to the repository on GitHub.
2. Switch to the branch you want to test (for example, `a11y/phase-5-interactive-patterns`).
3. Select **Code**, then **Codespaces**, then **Create codespace on [branch name]**.
4. Wait 2-3 minutes for the container to build and `postCreateCommand` to finish.

The devcontainer installs Node 22, Python 3.11, frontend npm packages, and backend pip packages automatically.

### Start the App

Open two terminals in the Codespace:

**Terminal 1 -- Backend:**

```bash
source .venv/bin/activate
cd backend
uvicorn open_webui.main:app --host 0.0.0.0 --port 8080 --forwarded-allow-ips '*' --reload
```

**Terminal 2 -- Frontend:**

```bash
npm run dev
```

Port 5173 (frontend dev server) auto-opens in your browser. On first visit, create an admin account at the signup screen.

No LLM backend is required. The app boots fully without Ollama or any API keys configured. The entire UI shell -- auth, sidebar, settings, modals, admin panel -- is available for testing.

### What to Test

| Area | What to verify |
|------|----------------|
| Keyboard navigation | Tab through all controls; verify visible focus indicators |
| Screen reader | Test with NVDA, JAWS, or VoiceOver; verify announcements |
| Headings | Use a heading navigator (H key in screen readers) to verify hierarchy |
| Landmarks | Verify main, nav, complementary, and banner landmarks |
| Forms | Every input, select, and textarea should announce its label |
| Modals | Focus should trap inside; Escape should close and return focus |
| Skip link | First Tab stop should be "Skip to main content" |
| Settings tabs | Arrow keys should navigate between tabs |

---

## Automated Accessibility Tests

The `tests/a11y/` directory contains Playwright tests that run axe-core against live pages and verify specific accessibility patterns.

### What the Tests Cover

| Test file | Scenarios |
|-----------|-----------|
| `auth.spec.ts` | Auth page has h1, labeled inputs, submit button text, no axe violations |
| `chat.spec.ts` | Chat page has landmarks, heading hierarchy, labeled chat input, model selector label, named buttons, no axe violations |
| `settings.spec.ts` | Settings modal has role/aria-modal, h2 title, h3 section headings, labeled search, close button, focus trap, Escape key, scoped axe scan |
| `sidebar.spec.ts` | Sidebar toggle/new-chat/search buttons labeled, section headings, profile menu label, link text, no axe violations |

Each test runs a full axe-core WCAG 2.2 AA scan and also checks specific structural expectations (heading levels, landmark roles, label associations).

### Run Locally

Install the test dependencies (one time):

```bash
npm install
npx playwright install chromium
```

Start the app (backend + frontend), then run:

```bash
npx playwright test tests/a11y/
```

Or run a single test file:

```bash
npx playwright test tests/a11y/auth.spec.ts
```

### CI Integration

The workflow `.github/workflows/a11y-tests.yaml` runs these tests automatically on every push and pull request. It:

1. Builds the frontend and starts the backend.
2. Runs all `tests/a11y/*.spec.ts` files against the live app.
3. Fails the check if any axe-core violation or structural assertion fails.
4. Uploads test results as an artifact on failure.

---

## Adding New Tests

Create a new `.spec.ts` file in `tests/a11y/`. Follow this pattern:

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Feature Name', () => {
  test('page has no axe violations', async ({ page }) => {
    await page.goto('/your-page');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('specific structural check', async ({ page }) => {
    await page.goto('/your-page');
    // Verify headings, labels, landmarks, etc.
    const heading = page.locator('h2');
    await expect(heading).toBeVisible();
  });
});
```

Run `npx playwright test tests/a11y/your-file.spec.ts` to validate before pushing.
