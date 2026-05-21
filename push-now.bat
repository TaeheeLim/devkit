@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion
title DevToolKit - Push to github.com/TaeheeLim/devkit

set REPO_URL=https://github.com/TaeheeLim/devkit.git
set REPO_NAME=TaeheeLim/devkit

echo ===================================================
echo  Pushing DevToolKit to %REPO_NAME%
echo ===================================================
echo.

cd /d "%~dp0"
echo Working dir: %CD%
echo.

REM ---- 1. Git check ----
where git >nul 2>&1
if errorlevel 1 (
  echo [X] Git not installed.
  echo     https://git-scm.com/download/win
  pause
  exit /b 1
)
echo [OK] git available

REM ---- 2. Git user config (set if missing) ----
for /f "delims=" %%v in ('git config --global user.name 2^>nul') do set GN=%%v
for /f "delims=" %%v in ('git config --global user.email 2^>nul') do set GE=%%v
if "!GN!"=="" (
  git config --global user.name "TaeheeLim"
  echo [OK] git user.name set to TaeheeLim
) else (
  echo [OK] git user.name = !GN!
)
if "!GE!"=="" (
  git config --global user.email "thlim@nkia.co.kr"
  echo [OK] git user.email set to thlim@nkia.co.kr
) else (
  echo [OK] git user.email = !GE!
)

echo.

REM ---- 3. Init repo if needed ----
if not exist ".git" (
  echo [1/5] git init -b main ...
  git init -b main
  if errorlevel 1 (
    echo [X] git init failed.
    pause
    exit /b 1
  )
) else (
  echo [1/5] .git already exists - skip init
  REM ensure branch is main
  git symbolic-ref HEAD refs/heads/main 2>nul
)

REM ---- 4. Stage files ----
echo [2/5] git add . ...
git add .

REM ---- 5. Commit (skip if nothing to commit) ----
echo [3/5] git commit ...
git -c commit.gpgsign=false commit -m "feat: DevToolKit initial deploy" 2>nul
if errorlevel 1 (
  echo [INFO] no new changes to commit - continuing
)

REM ---- 6. Set / replace remote ----
echo [4/5] setting remote origin ...
git remote remove origin 2>nul
git remote add origin %REPO_URL%
echo [OK] remote: %REPO_URL%

REM ---- 7. Push ----
echo.
echo [5/5] pushing to GitHub ...
echo  - A login window may pop up on first push.
echo  - Sign in with your GitHub account (TaeheeLim).
echo.
git push -u origin main
set RC=%ERRORLEVEL%

echo.
if %RC% NEQ 0 (
  echo ===================================================
  echo  [X] push failed with exit code %RC%
  echo ===================================================
  echo.
  echo Most likely causes:
  echo   A^) The remote repo is NOT empty. If you added a README or
  echo      .gitignore when creating the repo, run:
  echo          git pull origin main --allow-unrelated-histories
  echo          git push -u origin main
  echo.
  echo   B^) Authentication. Use Git Credential Manager (default) or
  echo      a Personal Access Token: https://github.com/settings/tokens
  echo      (Use the token as your password when Git asks.)
  echo.
  pause
  exit /b %RC%
)

echo ===================================================
echo  SUCCESS! Pushed to %REPO_URL%
echo ===================================================
echo.
echo NEXT STEP - connect to Vercel (about 2 minutes):
echo   1) Open: https://vercel.com/new
echo   2) Import "TaeheeLim/devkit" (private repo)
echo   3) Framework Preset: Other (auto), leave all build fields blank
echo   4) Click "Deploy"
echo.
echo If the repo doesn't show up in Vercel:
echo   - Click "Adjust GitHub App Permissions"
echo   - Select "devkit" and Save
echo.
echo Opening GitHub repo page in your browser ...
start "" https://github.com/TaeheeLim/devkit
echo.
echo Opening Vercel import page in your browser ...
start "" https://vercel.com/new
echo.
pause
endlocal
