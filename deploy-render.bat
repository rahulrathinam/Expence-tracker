@echo off
echo 🚀 Deploying to Render.com...
echo.
echo 1. Go to https://render.com
echo 2. Sign up with GitHub
echo 3. Click "New +" → "Web Service"
echo 4. Connect your repository
echo 5. Configure:
echo    - Name: expense-tracker-backend
echo    - Environment: Node
echo    - Build Command: npm run build
echo    - Start Command: npm start
echo    - Plan: Free
echo.
echo 6. Set Environment Variables:
echo    - NODE_ENV=production
echo    - PORT=5000
echo    - MONGODB_URI=your-mongodb-connection-string
echo    - JWT_SECRET=your-jwt-secret
echo    - FRONTEND_URL=your-frontend-url
echo.
echo 7. Click "Create Web Service"
echo.
echo ✅ Your backend will be deployed automatically!
pause
