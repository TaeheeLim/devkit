@echo off
chcp 65001 > nul
title DevToolKit - Vercel Deploy

echo ===================================================
echo  DevToolKit - Vercel 1-click deploy
echo ===================================================
echo.

cd /d "%~dp0"
echo Working directory:
echo   %CD%
echo.

REM ---- 1. Node.js check ----
node --version >nul 2>&1
if errorlevel 1 (
  echo [X] Node.js not found.
  echo     Install LTS from https://nodejs.org and re-run.
  pause
  exit /b 1
)
for /f "delims=" %%v in ('node --version') do set NODEV=%%v
echo [OK] Node.js %NODEV%

REM ---- 2. npm check (npx ships with npm) ----
where npm >nul 2>&1
if errorlevel 1 (
  echo [X] npm not found. Reinstall Node.js LTS.
  pause
  exit /b 1
)
echo [OK] npm available

echo.
echo ---------------------------------------------------
echo  Starting Vercel deploy (no Git required).
echo  - First run will open a browser for login.
echo  - Accept all default prompts ^(press Enter^).
echo ---------------------------------------------------
echo.

call npx --yes vercel@latest --prod --yes
set RC=%ERRORLEVEL%

echo.
if %RC% NEQ 0 (
  echo [X] Vercel deploy failed with exit code %RC%.
  echo     Try the debug version: deploy-debug.bat
  pause
  exit /b %RC%
)

echo ===================================================
echo  Done. The URL above is your live site.
echo ===================================================
pause
