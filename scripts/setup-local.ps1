$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

Write-Host '== Open WebUI local setup ==' -ForegroundColor Cyan

$nodeVersion = (& node --version).Trim()
$nodeMajor = [int](($nodeVersion -replace '^v', '').Split('.')[0])
if ($nodeMajor -lt 18 -or $nodeMajor -gt 22) {
    Write-Warning "Node $nodeVersion is outside the repo's supported range (18-22). Setup may still work, but Node 22 is the safe target."
}

if (-not (Test-Path '.env') -and (Test-Path '.env.example')) {
    Copy-Item '.env.example' '.env'
    Write-Host 'Created .env from .env.example' -ForegroundColor Green
}

Write-Host 'Installing frontend dependencies with npm ci --force' -ForegroundColor Yellow
npm ci --force

if (-not (Get-Command py -ErrorAction SilentlyContinue)) {
    throw 'Python launcher (py) is required. Install Python 3.12 with the launcher enabled.'
}

Write-Host 'Creating or updating .venv with Python 3.12' -ForegroundColor Yellow
py -3.12 -m venv .venv

$python = Join-Path $repoRoot '.venv\Scripts\python.exe'
if (-not (Test-Path $python)) {
    throw 'Expected virtual environment interpreter was not created at .venv\\Scripts\\python.exe'
}

Write-Host 'Upgrading pip in .venv' -ForegroundColor Yellow
& $python -m pip install --upgrade pip

Write-Host 'Installing backend runtime and review tooling' -ForegroundColor Yellow
& $python -m pip install -r backend/requirements-min.txt 'ruff>=0.15.5' pytest

Write-Host ''
Write-Host 'Setup complete.' -ForegroundColor Green
Write-Host 'Recommended local workflow:' -ForegroundColor Cyan
Write-Host '  1. Run task: Dev: Backend'
Write-Host '  2. Run task: Dev: Frontend'
Write-Host '  3. Run task: Review: Frontend Check (Svelte a11y + TS)'
Write-Host '  4. Use VS Code Accessible View and axe linter for page-level review'
