@echo off
echo 🚀 Deploying to Vercel...
echo.
echo Method 1: One-Click Deploy (Recommended)
echo 1. Go to https://vercel.com
echo 2. Sign up with GitHub
echo 3. Click "New Project"
echo 4. Import your GitHub repository
echo 5. Vercel will auto-detect the configuration
echo 6. Click "Deploy"
echo.
echo Method 2: CLI Deploy
echo 1. Install Vercel CLI: npm i -g vercel
echo 2. Run: vercel
echo 3. Follow the prompts
echo.
echo Required Environment Variables:
echo - MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
echo - JWT_SECRET=your-super-secret-jwt-key-for-production
echo - NODE_ENV=production
echo.
echo ✅ Your full-stack app will be deployed automatically!
pause
