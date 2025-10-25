# Vercel Deployment Guide

## 🚀 Deploy to Vercel (Serverless)

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Deploy Backend
```bash
# In your project root
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: expense-tracker-backend
# - Directory: ./backend
# - Override settings? No
```

### Step 3: Environment Variables
Set in Vercel dashboard or via CLI:
```bash
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add NODE_ENV production
```

### Step 4: Deploy Frontend
```bash
# Deploy frontend separately
cd frontend
vercel
```

## 🎯 Vercel Advantages
- ✅ Unlimited free tier
- ✅ Global edge network
- ✅ Automatic HTTPS
- ✅ Zero configuration
- ✅ Serverless functions

## 📝 Important Notes
- Vercel is serverless, so no persistent storage
- Use MongoDB Atlas for database
- Each API route becomes a serverless function