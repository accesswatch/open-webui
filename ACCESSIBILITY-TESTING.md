# Accessibility Testing Guide

This guide covers everything you need to run the Open WebUI accessibility test suite: prerequisites, local setup, GitHub Codespaces, automated Playwright/axe-core tests, CI integration, and troubleshooting.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Option A: Run Locally (Windows)](#option-a-run-locally-windows)
  - [1. Clone and install](#1-clone-and-install)
  - [2. Start the backend](#2-start-the-backend)
  - [3. Run the accessibility tests](#3-run-the-accessibility-tests)
- [Option B: Run Locally (Linux or macOS)](#option-b-run-locally-linux-or-macos)
  - [1. Clone and install](#1-clone-and-install-1)
  - [2. Start the backend](#2-start-the-backend-1)
  - [3. Run the accessibility tests](#3-run-the-accessibility-tests-1)
- [Option C: GitHub Codespaces (zero local setup)](#option-c-github-codespaces-zero-local-setup)
  - [Launch a Codespace](#launch-a-codespace)
  - [Start the app](#start-the-app)
  - [Run tests in the Codespace](#run-tests-in-the-codespace)
  - [Manual testing checklist](#manual-testing-checklist)
- [Automated Accessibility Tests](#automated-accessibility-tests)
  - [Test coverage](#test-coverage)
  - [Environment variables](#environment-variables)
  - [Running a single test file](#running-a-single-test-file)
  - [Running tests in headed mode](#running-tests-in-headed-mode)
  - [Viewing the HTML report](#viewing-the-html-report)
- [CI Integration](#ci-integration)
  - [What the CI workflow does](#what-the-ci-workflow-does)
  - [Checking CI results](#checking-ci-results)
- [Adding New Tests](#adding-new-tests)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

| Dependency | Version | Notes |
|------------|---------|-------|
| Node.js | 18 through 22 (22 recommended) | Node 23+ requires `--force` flag for npm |
| Python | 3.11 or 3.12 | 3.13+ not yet supported |
| pip | latest | Upgraded during setup |
| Git | any recent version | For cloning the repo |
| OS | Windows 10+, Ubuntu 22.04+, or macOS 13+ | Playwright needs a supported OS |

**No AI model or API key is required.** The app boots fully without Ollama or any LLM configured. The entire UI shell (auth, sidebar, settings, modals, admin panel) is available. Chat-message tests mock the LLM API internally.

---

## Option A: Run Locally (Windows)

### 1. Clone and install

Open PowerShell and run:

```powershell
# Clone the repo (or your fork)
git clone https://github.com/accesswatch/open-webui.git
cd open-webui
git checkout a11y/phase-5-interactive-patterns

# Run the automated setup script (installs Node + Python deps)
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts/setup-local.ps1
```

The setup script will:
- Run `npm ci --force` to install all frontend dependencies (including Playwright and axe-core)
- Create a `.venv` virtual environment with Python 3.12
- Install backend dependencies from `backend/requirements-min.txt`

After the setup script completes, install the Playwright browser:

```powershell
npx playwright install chromium
```

> **Note:** On Windows you do NOT need `--with-deps` because Chromium ships its own dependencies. The `--with-deps` flag is for Linux only.

### 2. Start the backend

Open a **separate PowerShell terminal** and run:

```powershell
cd open-webui
.\.venv\Scripts\python.exe -m uvicorn open_webui.main:app --host 0.0.0.0 --port 8080 --forwarded-allow-ips '*' --reload
```

Wait until you see output like:

```
INFO:     Uvicorn running on http://0.0.0.0:8080
INFO:     Application startup complete.
```

> **Important:** Leave this terminal running. The backend must be live on port 8080 before tests will pass.

### 3. Run the accessibility tests

In your **original** PowerShell terminal:

```powershell
cd open-webui
npx playwright test tests/a11y/
```

Expected output on success:

```
Running 33 tests using 1 worker

  33 passed (45s)
```

---

## Option B: Run Locally (Linux or macOS)

### 1. Clone and install

```bash
# Clone the repo (or your fork)
git clone https://github.com/accesswatch/open-webui.git
cd open-webui

# Install frontend dependencies
npm ci --force

# Install Playwright Chromium with system dependencies
npx playwright install chromium --with-deps

# Create Python virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install backend dependencies
pip install --upgrade pip
pip install -r backend/requirements-min.txt
```

### 2. Start the backend

```bash
source .venv/bin/activate
cd backend
WEBUI_SECRET_KEY=test-secret-key python -m uvicorn open_webui.main:app --host 0.0.0.0 --port 8080 --forwarded-allow-ips '*' --reload
```

Wait for `Application startup complete`, then open a new terminal.

### 3. Run the accessibility tests

```bash
cd open-webui
npx playwright test tests/a11y/
```

---

## Option C: GitHub Codespaces (zero local setup)

No installs needed on your machine. Everything runs in the cloud.

### Launch a Codespace

1. Go to the repository on GitHub.
2. Switch to the branch you want to test (for example, `a11y/phase-5-interactive-patterns`).
3. Select **Code**, then **Codespaces**, then **Create codespace on [branch name]**.
4. Wait 3-5 minutes for the container to build and `postCreateCommand` to finish.

The devcontainer automatically installs:
- Node 22
- Python 3.11 with `.venv`
- All npm packages (including Playwright and axe-core)
- Chromium browser for Playwright
- Backend pip packages

### Start the app

Open two terminals in the Codespace:

**Terminal 1 -- Backend:**

```bash
source .venv/bin/activate
cd backend
uvicorn open_webui.main:app --host 0.0.0.0 --port 8080 --forwarded-allow-ips '*' --reload
```

**Terminal 2 -- Frontend (for manual browser testing only; not needed for automated tests):**

```bash
npm run dev
```

Port 5173 (frontend dev server) auto-opens in your browser. On first visit, create an admin account at the signup screen.

### Run tests in the Codespace

Open a third terminal:

```bash
npx playwright test tests/a11y/
```

### Manual testing checklist

With the app running (both terminals), open port 5173 in the browser for manual inspection:

| Area | What to verify |
|------|----------------|
| Keyboard navigation | Tab through all controls; verify visible focus indicators |
| Screen reader | Test with NVDA (Windows), VoiceOver (macOS), or Orca (Linux); verify announcements |
| Headings | Use heading navigator (H key in screen readers) to verify hierarchy |
| Landmarks | Verify main, nav, complementary, and banner landmarks exist |
| Forms | Every input, select, and textarea should announce its label |
| Modals | Focus should trap inside; Escape should close and return focus |
| Skip link | First Tab stop should be "Skip to main content" |
| Settings tabs | Arrow keys should navigate between tabs |

---

## Automated Accessibility Tests

The `tests/a11y/` directory contains Playwright tests that run axe-core WCAG 2.2 AA scans against live pages and verify specific structural accessibility patterns.

### Test coverage

| Test file | Tests | What it verifies |
|-----------|-------|------------------|
| `auth.spec.ts` | 5 | Auth page has single h1, labeled email and password inputs, submit button with visible text, no axe violations |
| `chat.spec.ts` | 6 | Chat page has proper landmarks (main, nav, complementary), heading hierarchy with no skipped levels, labeled chat textarea, model selector with aria-label, all buttons have accessible names, no axe violations |
| `chat-messages.spec.ts` | 7 | Mocked LLM streaming: user and assistant messages render correctly, message area has `role="log"` with `aria-live="polite"`, conversation has sr-only h2 heading, messages use `role="listitem"`, action buttons (copy, regenerate) have accessible labels, sr-only completion announcement appears, no axe violations after exchange |
| `settings.spec.ts` | 8 | Settings modal has `role="dialog"` with `aria-modal`, h2 title, h3 section headings, labeled search input, close button with aria-label, focus trap (Tab stays inside), Escape closes modal, scoped axe scan within dialog |
| `sidebar.spec.ts` | 7 | Sidebar toggle button labeled, New Chat button labeled, Search button labeled, section headings present, profile menu button labeled, workspace/playground links have descriptive text, no axe violations |
| **Total** | **33** | |

### Environment variables

The test helper (`tests/a11y/helpers.ts`) creates an admin account on first run. You can override the defaults:

| Variable | Default | Purpose |
|----------|---------|---------|
| `TEST_ADMIN_EMAIL` | `admin@example.com` | Email for the test admin account |
| `TEST_ADMIN_PASSWORD` | `password` | Password for the test admin account |
| `TEST_ADMIN_NAME` | `Test Admin` | Display name for the test admin account |

Set them before running tests if you want different credentials:

```bash
# Linux/macOS
TEST_ADMIN_EMAIL=me@test.com TEST_ADMIN_PASSWORD=secret123 npx playwright test tests/a11y/

# Windows PowerShell
$env:TEST_ADMIN_EMAIL = 'me@test.com'
$env:TEST_ADMIN_PASSWORD = 'secret123'
npx playwright test tests/a11y/
```

### Running a single test file

```bash
npx playwright test tests/a11y/auth.spec.ts
```

### Running tests in headed mode

Watch the browser while tests execute (useful for debugging):

```bash
npx playwright test tests/a11y/ --headed
```

### Viewing the HTML report

After a test run, generate and view the report:

```bash
npx playwright show-report
```

This opens a local server with an interactive HTML report showing pass/fail for each test, screenshots, and traces.

---

## CI Integration

### What the CI workflow does

The file `.github/workflows/a11y-tests.yaml` runs on every push to `main`, `dev`, or `a11y/**` branches and on pull requests to `main` or `dev`.

Steps:
1. Checks out the code.
2. Sets up Node 22 and Python 3.11.
3. Runs `npm ci --force` to install frontend dependencies.
4. Installs Playwright Chromium with system dependencies.
5. Builds the frontend (`npm run build`).
6. Installs backend pip dependencies.
7. Starts the backend on port 8080 with `WEBUI_SECRET_KEY=test-secret-key`.
8. Waits up to 60 seconds for the backend `/health` endpoint to respond.
9. Runs all `tests/a11y/*.spec.ts` tests.
10. Uploads test artifacts (screenshots, traces, report) on failure with 14-day retention.

### Checking CI results

1. Go to the repository on GitHub.
2. Select the **Actions** tab.
3. Find the most recent **Accessibility Tests** workflow run.
4. If it failed, select the job to see which tests failed and download the `a11y-test-results` artifact for screenshots and traces.

---

## Adding New Tests

1. Create a new `.spec.ts` file in `tests/a11y/`.
2. Import the test framework and axe-core:

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { signInAsAdmin } from './helpers';
```

3. Follow this pattern:

```typescript
test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Sign in if the page requires authentication
    await signInAsAdmin(page);
  });

  test('page has no axe violations', async ({ page }) => {
    await page.goto('/your-page');
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test('specific structural check', async ({ page }) => {
    await page.goto('/your-page');
    const heading = page.locator('h2');
    await expect(heading).toBeVisible();
  });
});
```

4. Run your new test to verify:

```bash
npx playwright test tests/a11y/your-file.spec.ts
```

5. Commit and push. CI will run it automatically.

---

## Troubleshooting

### Backend fails to start

**Symptom:** `ModuleNotFoundError: No module named 'open_webui'` or similar import error.

**Fix:** Make sure you are running the command from the repository root and using the virtual environment Python:

```powershell
# Windows
.\.venv\Scripts\python.exe -m uvicorn open_webui.main:app --host 0.0.0.0 --port 8080 --forwarded-allow-ips '*' --reload

# Linux/macOS
source .venv/bin/activate
cd backend
python -m uvicorn open_webui.main:app --host 0.0.0.0 --port 8080 --forwarded-allow-ips '*' --reload
```

---

### Tests fail with "page.goto: NS_ERROR_CONNECTION_REFUSED"

**Symptom:** All tests fail immediately with connection errors.

**Fix:** The backend is not running on port 8080. Start it in a separate terminal and wait for `Application startup complete` before running tests.

Verify the backend is reachable:

```bash
curl http://localhost:8080/health
# Should return: {"status":true}
```

On Windows PowerShell:

```powershell
Invoke-RestMethod http://localhost:8080/health
# Should return: status: True
```

---

### "npm ci" fails with ERESOLVE or peer dependency errors

**Symptom:** `npm ci` exits with dependency resolution errors.

**Fix:** Use the `--force` flag:

```bash
npm ci --force
```

This is expected when running Node versions newer than 22.

---

### "npx playwright install chromium" fails or times out

**Symptom:** Download hangs or fails with a network error.

**Fix:** Retry the command. If behind a proxy, set the `HTTPS_PROXY` environment variable:

```bash
# Linux/macOS
export HTTPS_PROXY=http://your-proxy:port
npx playwright install chromium

# Windows PowerShell
$env:HTTPS_PROXY = 'http://your-proxy:port'
npx playwright install chromium
```

If Chromium is already installed but tests still fail with browser-not-found, run:

```bash
npx playwright install chromium --with-deps   # Linux only
```

---

### Tests fail with "Timed out waiting for element"

**Symptom:** One or more tests time out waiting for a selector.

**Possible causes:**
1. **Slow backend startup** -- The backend may not have finished loading. Wait for the `Application startup complete` message before running tests.
2. **First-run onboarding mismatch** -- If a previous test run partially created an account, the test helper may expect sign-in but encounter sign-up (or vice versa). Reset the database:

```bash
# Delete the SQLite database to start fresh
rm -f backend/data/webui.db

# Windows PowerShell
Remove-Item -Force backend\data\webui.db
```

Then restart the backend and run tests again.

---

### Tests pass locally but fail in CI

**Symptom:** CI workflow shows failing tests that pass on your machine.

**Possible causes:**
1. **Timing differences** -- CI runners may be slower. The tests use `waitForLoadState('networkidle')` and generous timeouts, but edge cases can occur. Check the uploaded `a11y-test-results` artifact for screenshots and traces.
2. **Port conflict** -- Another process is using port 8080 in CI. Check the workflow logs for backend startup errors.
3. **Missing environment variable** -- The CI workflow sets `WEBUI_SECRET_KEY=test-secret-key`. If you added new env-dependent behavior, make sure the variable is in `.github/workflows/a11y-tests.yaml`.

---

### axe-core reports false positives

**Symptom:** axe-core flags elements that you believe are accessible (common with third-party rendered content like KaTeX math).

**Fix:** Exclude the specific container from the scan:

```typescript
const results = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
  .exclude('.katex')      // Exclude KaTeX math rendering
  .exclude('.third-party') // Exclude other known containers
  .analyze();
```

---

### Codespace setup fails

**Symptom:** The `postCreateCommand` script errors out during Codespace creation.

**Fix:**
1. Open the Codespace terminal.
2. Run the setup script manually:

```bash
bash .devcontainer/setup.sh
```

3. If a specific step fails (e.g., pip install), check the error message and install the missing system dependency.
4. Common fix: Node or Python version mismatch. The devcontainer uses Python 3.11 and Node 22, which are pinned in `.devcontainer/devcontainer.json`.

---

### How to completely reset test state

If tests are in a strange state, do a full reset:

```bash
# 1. Delete the test database
rm -f backend/data/webui.db

# 2. Kill any running backend
# Linux/macOS:
pkill -f uvicorn
# Windows PowerShell:
Get-Process python | Where-Object { $_.CommandLine -like '*uvicorn*' } | Stop-Process -Force

# 3. Restart the backend
# (use the start command from your OS section above)

# 4. Run tests fresh
npx playwright test tests/a11y/
```

---

### File structure reference

```
open-webui/
  .devcontainer/
    devcontainer.json       # Codespace configuration (Python 3.11, Node 22)
    setup.sh                 # Post-create script for Codespace
  .github/
    workflows/
      a11y-tests.yaml        # CI workflow for accessibility tests
  scripts/
    setup-local.ps1          # Windows local setup script
  tests/
    a11y/
      helpers.ts              # signInAsAdmin() shared helper
      auth.spec.ts            # Auth page tests (5 tests)
      chat.spec.ts            # Chat page structural tests (6 tests)
      chat-messages.spec.ts   # Chat message flow with mocked LLM (7 tests)
      settings.spec.ts        # Settings modal tests (8 tests)
      sidebar.spec.ts         # Sidebar tests (7 tests)
  playwright.config.ts        # Playwright configuration
  package.json                # Has "test:a11y" script and Playwright/axe-core devDependencies
```
