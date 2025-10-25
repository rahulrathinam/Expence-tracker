@echo off
echo 🚀 Setting up Expense Tracker Development Environment
echo ==================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18 or higher.
    echo    Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected
echo.

echo 📦 Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed

echo.
echo 📦 Installing Frontend Dependencies...
cd ..\frontend
call npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed

echo.
echo 🔧 Setting up Environment Variables...
cd ..\backend
if not exist .env (
    copy env.example .env
    echo ✅ Created .env file for backend
    echo ⚠️  Please update the JWT_SECRET in backend\.env with a secure value
) else (
    echo ✅ Backend .env file already exists
)

cd ..\frontend
if not exist .env (
    copy env.example .env
    echo ✅ Created .env file for frontend
) else (
    echo ✅ Frontend .env file already exists
)

echo.
echo 🏗️  Building Backend...
cd ..\backend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Failed to build backend
    pause
    exit /b 1
)
echo ✅ Backend built successfully

echo.
echo 🏗️  Building Frontend...
cd ..\frontend
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Failed to build frontend
    pause
    exit /b 1
)
echo ✅ Frontend built successfully

echo.
echo 🎉 Setup Complete!
echo ==================
echo.
echo To start the development servers:
echo.
echo Terminal 1 (Backend):
echo   cd backend ^&^& npm run dev
echo.
echo Terminal 2 (Frontend):
echo   cd frontend ^&^& npm run dev
echo.
echo Or use Docker Compose:
echo   docker-compose up
echo.
echo Access the application:
echo   Frontend: http://localhost:5173
echo   Backend API: http://localhost:5000
echo.
echo 📚 For more information, see the README.md file
echo.
pause


