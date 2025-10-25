# Render.com Deployment Guide

## 🚀 Deploy to Render.com (Free Alternative to Railway)

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Connect your repository

### Step 2: Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select your repository
4. Configure:
   - **Name**: expense-tracker-backend
   - **Environment**: Node
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Environment Variables
Set these in Render dashboard:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=your-super-secret-jwt-key-for-production
FRONTEND_URL=https://your-frontend-domain.com
```

### Step 4: Database Setup
- Use **MongoDB Atlas** (free tier)
- Create cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
- Get connection string and set as MONGODB_URI

### Step 5: Deploy Frontend
- Deploy frontend to **Vercel** or **Netlify**
- Update API_URL in frontend to point to Render backend URL

## 🎯 Render.com Advantages
- ✅ 750 free hours/month
- ✅ Automatic deployments
- ✅ Custom domains
- ✅ SSL certificates
- ✅ No credit card required
- ✅ Persistent storage

## 🔧 Troubleshooting
- **Build fails**: Check build logs in Render dashboard
- **Database connection**: Verify MONGODB_URI format
- **CORS issues**: Update FRONTEND_URL environment variable
