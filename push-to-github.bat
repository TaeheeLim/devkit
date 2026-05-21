@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion
title DevToolKit - Push to GitHub (Private)

echo ===================================================
echo  DevToolKit - Push to GitHub private repository
echo ===================================================
echo.

cd /d "%~dp0"
echo Working directory: %CD%
echo.

REM ---- 1. Git check ----
where git >nul 2>&1
if errorlevel 1 (
  echo [X] Git not found.
  echo     Install from https://git-scm.com/download/win and re-run.
  pause
  exit /b 1
)
echo [OK] git available

REM ---- 2. Git user config check ----
for /f "delims=" %%v in ('git config --global user.name 2^>nul') do set GN=%%v
for /f "delims=" %%v in ('git config --global user.email 2^>nul') do set GE=%%v
if "!GN!"=="" (
  set /p GN=Enter your Git user name (e.g. thlim): 
  git config --global user.name "!GN!"
)
if "!GE!"=="" (
  set /p GE=Enter your Git email (e.g. thlim@nkia.co.kr): 
  git config --global user.email "!GE!"
)
echo [OK] git user: !GN! ^<!GE!^>

REM ---- 3. Init repo if needed ----
if not exist ".git" (
  echo [1/4] git init ...
  git init -b main
)

echo [2/4] staging files ...
git add .

echo [3/4] committing ...
git -c commit.gpgsign=false commit -m "feat: DevToolKit deploy" 2>nul
if errorlevel 1 (
  echo [INFO] nothing new to commit or already committed - continuing
)

REM ---- 4. Choose path: gh CLI vs manual ----
echo.
where gh >nul 2>&1
if not errorlevel 1 (
  echo [OK] GitHub CLI detected - using automatic mode
  echo.
  echo [4/4] creating private repo and pushing ...
  echo.
  echo If this is your first time, gh will ask you to log in via browser.
  echo Answer:
  echo   - What account?              GitHub.com
  echo   - Protocol?                  HTTPS
  echo   - Authenticate Git?          Y
  echo   - How to authenticate?       Login with a web browser
  echo.
  pause

  gh auth status >nul 2>&1
  if errorlevel 1 (
    call gh auth login
  )

  set /p REPONAME=Repository name (default: devtoolkit): 
  if "!REPONAME!"=="" set REPONAME=devtoolkit

  call gh repo create "!REPONAME!" --private --source=. --remote=origin --push
  if errorlevel 1 (
    echo.
    echo [X] gh repo create failed. The repo name may already be taken.
    echo     Try a different name and re-run.
    pause
    exit /b 1
  )

  echo.
  echo ===================================================
  echo  DONE. Private repo created and pushed.
  echo  Next: connect this repo to Vercel - see VERCEL_CONNECT.md
  echo ===================================================
  call gh repo view --web
  pause
  exit /b 0
)

REM ---- gh CLI not installed: manual path ----
echo [INFO] GitHub CLI (gh) is not installed.
echo        Falling back to manual mode.
echo.
echo STEP A. Create a PRIVATE repository on GitHub:
echo         1) Open https://github.com/new in your browser
echo         2) Repository name: devtoolkit
echo         3) Select PRIVATE
echo         4) Do NOT add README, .gitignore, or license (we already have them)
echo         5) Click "Create repository"
echo         6) Copy the URL it shows, e.g.:
echo            https://github.com/YOUR_USERNAME/devtoolkit.git
echo.
set /p REPOURL=Paste the repository URL here: 

if "!REPOURL!"=="" (
  echo [X] No URL provided.
  pause
  exit /b 1
)

echo.
echo [4/4] adding remote and pushing ...
git remote remove origin 2>nul
git remote add origin "!REPOURL!"
git push -u origin main
if errorlevel 1 (
  echo.
  echo [X] Push failed. Common causes:
  echo     - Wrong URL.
  echo     - Not logged in: install GitHub CLI (https://cli.github.com)
  echo       OR set up a Personal Access Token (https://github.com/settings/tokens)
  echo       and use it as password when Git prompts.
  pause
  exit /b 1
)

echo.
echo ===================================================
echo  DONE. Code pushed to !REPOURL!
echo  Next: connect this repo to Vercel - see VERCEL_CONNECT.md
echo ===================================================
pause
endlocal
