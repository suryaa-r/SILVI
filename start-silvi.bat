@echo off
echo Starting SILVI Website on localhost:8080...
cd /d "c:\Users\joyma\Downloads\SILVI.CLOTHING\SILVI"

:retry
echo Attempting to start server...
npx http-server -p 8080 -o --silent
if errorlevel 1 (
    echo Port 8080 is busy, killing existing processes...
    taskkill /f /im node.exe >nul 2>&1
    timeout /t 2 >nul
    goto retry
)
pause