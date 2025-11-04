@echo off
echo Starting SILVI as Background Service...
cd /d "c:\Users\joyma\Downloads\SILVI.CLOTHING\SILVI"

taskkill /f /im node.exe >nul 2>&1
timeout /t 2 >nul

start /B npx http-server -p 8080 --silent
echo SILVI Website is now running at http://localhost:8080
echo This will continue running even after closing VS Code
echo To stop, run: taskkill /f /im node.exe
pause