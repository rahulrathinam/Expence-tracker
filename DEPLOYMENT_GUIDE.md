# 🚀 Deployment Guide: Railway + Vercel + MongoDB Atlas

This guide will help you deploy your expense tracker application using Railway for the backend, Vercel for the frontend, and MongoDB Atlas for the database.

## 📋 Prerequisites

- GitHub repository with your code
- MongoDB Atlas account (free)
- Railway account (free)
- Vercel account (free)

## 🗄️ Step 1: Set Up MongoDB Atlas Database

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new project

### 1.2 Create Free Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0 Sandbox)
3. Select a region close to you
4. Name your cluster (e.g., "expense-tracker-cluster")
5. Click "Create"

### 1.3 Set Up Database Access
1. Go to "Database Access" → "Add New Database User"
2. Create username and password (save these!)
3. Set permissions to "Read and write to any database"
4. Click "Add User"

### 1.4 Configure Network Access
1. Go to "Network Access" → "Add IP Address"
2. Click "Allow access from anywhere" (0.0.0.0/0)
3. Click "Confirm"

### 1.5 Get Connection String
1. Go to "Database" → "Connect"
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database password
5. Replace `<dbname>` with `expense-tracker`

**Example connection string:**
```
mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
```

## 🚂 Step 2: Deploy Backend to Railway

### 2.1 Create Railway Account
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Connect your GitHub account

### 2.2 Deploy Repository
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your "Expence-tracker" repository
4. Railway will auto-detect it's a Node.js project

### 2.3 Configure Environment Variables
Go to your Railway project → Variables tab and add:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=your-super-secret-jwt-key-for-production
```

### 2.4 Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. **Save your Railway URL** (e.g., `https://your-app-name.railway.app`)

## ⚡ Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account
1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Connect your GitHub account

### 3.2 Import Repository
1. Click "New Project"
2. Import your "Expence-tracker" repository
3. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3.3 Set Environment Variables
Go to your Vercel project → Settings → Environment Variables and add:

```
VITE_API_URL=https://your-railway-url.railway.app/api
```

### 3.4 Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. **Save your Vercel URL** (e.g., `https://your-app-name.vercel.app`)

## 🔧 Step 4: Update CORS Configuration

After getting your Vercel URL, update the CORS configuration in your backend:

1. Go to your GitHub repository
2. Edit `backend/src/server.ts`
3. Update line 20 with your actual Vercel URL:
   ```typescript
   origin: process.env.NODE_ENV === 'production' 
     ? ['https://your-actual-vercel-url.vercel.app'] 
     : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
   ```
4. Commit and push changes to GitHub
5. Railway will automatically redeploy with the updated CORS settings

## 🧪 Step 5: Test Your Deployment

### 5.1 Test Backend (Railway)
- **Health Check**: `https://your-railway-url.railway.app/api/health`
- **Expected Response**: `{"status":"OK","timestamp":"...","environment":"production"}`

### 5.2 Test Frontend (Vercel)
- **Visit your Vercel URL**
- **Test user registration**
- **Test user login**
- **Test adding expenses**
- **Test viewing analytics**

## 📊 Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel        │    │   Railway       │    │   MongoDB Atlas │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
│                 │    │                 │    │                 │
│ • React App     │    │ • Node.js API   │    │ • MongoDB       │
│ • Static Files  │    │ • Express.js    │    │ • Free Tier     │
│ • Global CDN    │    │ • JWT Auth      │    │ • 512MB Storage │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 Environment Variables Summary

### Railway (Backend)
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=your-super-secret-jwt-key-for-production
```

### Vercel (Frontend)
```
VITE_API_URL=https://your-railway-url.railway.app/api
```

## 🎉 Benefits of This Setup

### Railway (Backend)
- ✅ Free tier with generous limits
- ✅ Automatic deployments from GitHub
- ✅ Environment variables management
- ✅ Logs and monitoring
- ✅ Custom domains support

### Vercel (Frontend)
- ✅ Free tier with global CDN
- ✅ Automatic deployments from GitHub
- ✅ Preview deployments for pull requests
- ✅ Edge functions support
- ✅ Analytics included

### MongoDB Atlas (Database)
- ✅ Free tier (512MB storage)
- ✅ Global clusters
- ✅ Automatic backups
- ✅ Security features
- ✅ Monitoring tools

## 🚀 Continuous Deployment

Once set up, both platforms will automatically deploy your application whenever you push changes to your GitHub repository:

- **Railway**: Automatically redeploys backend on git push
- **Vercel**: Automatically redeploys frontend on git push
- **Preview Deployments**: Vercel creates preview deployments for pull requests

## 🔍 Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your Vercel URL is added to the CORS configuration
2. **Database Connection**: Verify your MongoDB connection string
3. **Environment Variables**: Check that all required variables are set
4. **Build Errors**: Check the deployment logs in Railway/Vercel

### Debug Steps:

1. **Check Railway Logs**: Go to your Railway project → Logs tab
2. **Check Vercel Logs**: Go to your Vercel project → Functions tab
3. **Test API Endpoints**: Use tools like Postman or curl
4. **Verify Environment Variables**: Check both platforms

## 📞 Support

If you encounter any issues:
1. Check the deployment logs
2. Verify environment variables
3. Test API endpoints individually
4. Check CORS configuration

Your expense tracker is now ready for production use! 🎉
