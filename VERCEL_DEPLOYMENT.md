# Vercel Full-Stack Deployment Guide

## 🚀 Deploy Both Backend & Frontend to Vercel

### Method 1: One-Click Deploy (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign up with GitHub**
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Vercel will auto-detect the configuration**
6. **Click "Deploy"**

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: expense-tracker
# - Directory: ./
# - Override settings? No
```

### Step 3: Environment Variables
Set in Vercel dashboard:

**Required Variables:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=your-super-secret-jwt-key-for-production
NODE_ENV=production
```

**Optional Variables:**
```
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### Step 4: Database Setup
1. **Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)**
2. **Create free cluster**
3. **Get connection string**
4. **Set as MONGODB_URI in Vercel**

## 🎯 Vercel Configuration

The project includes:
- `vercel.json` - Full-stack configuration
- Auto-routing for API calls to backend
- Static frontend serving
- Serverless backend functions

## 🚀 Deployment Features

### Backend (Serverless Functions)
- ✅ API routes: `/api/*`
- ✅ Automatic scaling
- ✅ Global edge network
- ✅ 30-second timeout

### Frontend (Static Site)
- ✅ React build optimization
- ✅ Automatic CDN
- ✅ Instant global deployment
- ✅ Automatic HTTPS

## 🔧 Troubleshooting

### Build Issues
- **Frontend build fails**: Check `frontend/package.json` scripts
- **Backend build fails**: Ensure TypeScript compilation works
- **Dependencies**: All dependencies are auto-installed

### Runtime Issues
- **Database connection**: Verify MONGODB_URI format
- **CORS errors**: Check FRONTEND_URL environment variable
- **API not found**: Verify API routes in `backend/src/routes/`

## 📊 Vercel Advantages
- ✅ **Unlimited free tier**
- ✅ **Global edge network**
- ✅ **Automatic HTTPS**
- ✅ **Zero configuration**
- ✅ **Serverless functions**
- ✅ **Automatic deployments**
- ✅ **Custom domains**

## 🎯 Production URLs
After deployment, you'll get:
- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://your-app.vercel.app/api/*`

## 🔄 Automatic Deployments
- Push to `main` branch = automatic deployment
- Preview deployments for pull requests
- Instant rollbacks