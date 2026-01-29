@echo off
setlocal
title BhashaRakshak AI - One-Click Launcher

echo ===================================================
echo   BhashaRakshak AI - Multi-Service Launcher
echo ===================================================
echo.
echo Please ensure you have Java (JDK 17+), Node.js, and Python installed.
echo.

:: 1. Check Dependencies
echo [INFO] Checking environment...
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Java is not installed or not in PATH!
    pause
    exit /b
)

node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    pause
    exit /b
)

python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in PATH!
    pause
    exit /b
)

echo [INFO] Environment looks good! 
echo.

:: 2. Setup AI Services
echo [STEP 1/3] Setting up AI Services (Python)...
cd ai-services
if not exist "venv" (
    echo [INFO] Creating Python virtual environment...
    python -m venv venv
)
call venv\Scripts\activate
echo [INFO] Installing Python dependencies...
pip install -r requirements.txt
start "BhashaRakshak AI Service" /min cmd /k "echo AI Service Running... & python main.py"
cd ..
echo [SUCCESS] AI Service started in background.
echo.

:: 3. Setup Backend
echo [STEP 2/3] Setting up Backend (Spring Boot)...
cd backend\springapp
echo [INFO] Building Backend (this may take a minute)...
call mvnw clean package -DskipTests
if %errorlevel% neq 0 (
    echo [ERROR] Maven build failed!
    pause
    exit /b
)
echo [INFO] Starting Backend Server...
start "BhashaRakshak Backend" /min cmd /k "echo Backend Running... & java -jar target\bhasharakshak-0.0.1-SNAPSHOT.jar"
cd ..\..
echo [SUCCESS] Backend Server started in background.
echo.

:: 4. Setup Frontend
echo [STEP 3/3] Setting up Frontend (React)...
cd frontend\reactapp
echo [INFO] Installing Frontend dependencies...
call npm install
echo [INFO] Starting Frontend Dev Server...
start "BhashaRakshak Frontend" cmd /k "npm run dev"
cd ..\..

echo.
echo ===================================================
echo   ALL SERVICES STARTED!
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:8080
echo   AI API:   http://localhost:8000
echo ===================================================
echo.
echo Don't close the background windows!
pause
