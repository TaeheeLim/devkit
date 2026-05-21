@echo off
chcp 65001 > nul
title DevToolKit - DEBUG
set LOG=%~dp0deploy-debug.log
echo === DevToolKit deploy debug log === > "%LOG%"
echo Started: %DATE% %TIME% >> "%LOG%"
echo. >> "%LOG%"

echo Logging to: %LOG%
echo.

cd /d "%~dp0"
echo CWD: %CD% >> "%LOG%"

echo --- Environment --- >> "%LOG%"
echo PATH: >> "%LOG%"
echo %PATH% >> "%LOG%"
echo. >> "%LOG%"

echo [Test 1] node --version
node --version 2>>"%LOG%"
echo Exit code: %ERRORLEVEL% >> "%LOG%"
echo. >> "%LOG%"
pause

echo [Test 2] npm --version
call npm --version 2>>"%LOG%"
echo Exit code: %ERRORLEVEL% >> "%LOG%"
echo. >> "%LOG%"
pause

echo [Test 3] npx --version
call npx --version 2>>"%LOG%"
echo Exit code: %ERRORLEVEL% >> "%LOG%"
echo. >> "%LOG%"
pause

echo [Test 4] npx vercel --version
call npx --yes vercel@latest --version 2>>"%LOG%"
echo Exit code: %ERRORLEVEL% >> "%LOG%"
echo. >> "%LOG%"
pause

echo [Test 5] vercel deploy --prod
echo If prompted, answer:
echo   - Set up and deploy?  Y
echo   - Which scope?        ^(your account^)
echo   - Link to existing?   N
echo   - Project name?       devtoolkit ^(or Enter^)
echo   - Directory?          ./ ^(Enter^)
echo   - Modify settings?    N
echo.
call npx --yes vercel@latest --prod 2>>"%LOG%"
echo Exit code: %ERRORLEVEL% >> "%LOG%"

echo.
echo === Debug session ended ===
echo Log saved to: %LOG%
pause
