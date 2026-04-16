#!/usr/bin/env bash
# .devcontainer/setup.sh — runs once after the Codespace container is created.
# Installs frontend and backend dependencies so both dev servers are ready to start.

set -euo pipefail

echo "=== Open WebUI Codespace Setup ==="

# ---------- Frontend ----------
echo "Installing frontend dependencies..."
npm ci --force

# ---------- Playwright ----------
echo "Installing Playwright browsers for accessibility tests..."
npx playwright install chromium --with-deps

# ---------- Backend ----------
echo "Creating Python virtual environment..."
python -m venv .venv
# shellcheck disable=SC1091
source .venv/bin/activate

echo "Upgrading pip..."
pip install --upgrade pip

echo "Installing backend dependencies (minimal set)..."
pip install -r backend/requirements-min.txt

echo ""
echo "=== Setup complete ==="
echo ""
echo "Start the app with two terminals:"
echo "  Terminal 1 (backend):  source .venv/bin/activate && cd backend && uvicorn open_webui.main:app --host 0.0.0.0 --port 8080 --forwarded-allow-ips '*' --reload"
echo "  Terminal 2 (frontend): npm run dev"
echo ""
echo "The frontend dev server (port 5173) will auto-open in your browser."
echo "First visit: create an admin account at the signup screen."
