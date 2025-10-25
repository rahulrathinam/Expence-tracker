# Vercel Deployment Guide

## 🚀 Deploy Your Full-Stack Expense Tracker to Vercel

This guide will help you deploy both your React frontend and Node.js backend to Vercel as a single application.

## 📋 Prerequisites

1. **GitHub Repository**: Your code should be pushed to GitHub
2. **MongoDB Atlas**: Set up a free MongoDB Atlas database
3. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)

## 🗄️ Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Set up database access:
   - Go to "Database Access" → "Add New Database User"
   - Create username and password
   - Set permissions to "Read and write to any database"
4. Configure network access:
   - Go to "Network Access" → "Add IP Address"
   - Choose "Allow access from anywhere" (0.0.0.0/0)
5. Get your connection string:
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy the connection string

## 🔧 Step 2: Configure Environment Variables

Before deploying, you'll need to set these environment variables in Vercel:

### Required Environment Variables:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=your-super-secret-jwt-key-for-production
NODE_ENV=production
```

### Frontend Environment Variables:
```
VITE_API_URL=/api
```

## 🚀 Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Add Environment Variables**:
   - Go to Project Settings → Environment Variables
   - Add all the required variables listed above
6. **Deploy!**

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Set Environment Variables**:
   ```bash
   vercel env add MONGODB_URI
   vercel env add JWT_SECRET
   vercel env add NODE_ENV
   vercel env add VITE_API_URL
   ```

## 📁 Project Structure for Vercel

Your project is now configured with the following structure:

```
expense-tracker/
├── api/                          # Vercel API routes
│   ├── auth/
│   │   ├── register.ts
│   │   ├── login.ts
│   │   └── profile.ts
│   ├── expenses/
│   │   ├── index.ts
│   │   ├── create.ts
│   │   ├── [id].ts
│   │   └── stats.ts
│   └── health.ts
├── frontend/                      # React frontend
├── backend/                       # Node.js backend (models, utils)
├── vercel.json                    # Vercel configuration
└── package.json                   # Root package.json
```

## 🔄 How It Works

1. **Frontend**: Served as static files from the `frontend/dist` directory
2. **Backend**: Runs as serverless functions in the `/api` directory
3. **Database**: Connected to MongoDB Atlas
4. **Authentication**: JWT tokens stored in localStorage

## 🧪 Testing Your Deployment

After deployment, test these endpoints:

### API Endpoints:
- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `GET /api/expenses` - Get expenses
- `POST /api/expenses/create` - Create expense
- `PUT /api/expenses/[id]` - Update expense
- `DELETE /api/expenses/[id]` - Delete expense
- `GET /api/expenses/stats` - Get statistics

### Frontend:
- Visit your Vercel URL
- Test user registration and login
- Test adding, editing, and deleting expenses
- Test analytics and charts

## 🔧 Troubleshooting

### Common Issues:

1. **Database Connection Error**:
   - Check your MongoDB Atlas connection string
   - Ensure network access is configured correctly
   - Verify environment variables are set

2. **Build Errors**:
   - Check that all dependencies are installed
   - Verify TypeScript compilation
   - Check for missing environment variables

3. **API Route Errors**:
   - Ensure all API routes are in the `/api` directory
   - Check function exports
   - Verify request/response handling

### Debug Steps:

1. **Check Vercel Function Logs**:
   - Go to your project dashboard
   - Click on "Functions" tab
   - Check logs for errors

2. **Test API Endpoints**:
   - Use tools like Postman or curl
   - Test each endpoint individually

3. **Check Environment Variables**:
   - Verify all required variables are set
   - Check for typos in variable names

## 🚀 Advanced Configuration

### Custom Domain:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records

### Performance Optimization:
1. Enable Vercel Analytics
2. Configure caching headers
3. Optimize images and assets

### Monitoring:
1. Set up Vercel Analytics
2. Monitor function performance
3. Set up error tracking

## 📊 Vercel Limits (Free Tier)

- **Bandwidth**: 100GB per month
- **Function Executions**: 100GB-hours per month
- **Build Minutes**: 6,000 minutes per month
- **Serverless Functions**: 10 seconds execution time

## 🎉 Success!

Your full-stack expense tracker is now live on Vercel! 

- **Frontend**: Served as static files
- **Backend**: Running as serverless functions
- **Database**: Connected to MongoDB Atlas
- **Authentication**: JWT-based security
- **Deployment**: Automatic deployments on git push

## 🔄 Continuous Deployment

Once set up, Vercel will automatically deploy your application whenever you push changes to your GitHub repository. You can also set up preview deployments for pull requests.

## 📞 Support

If you encounter any issues:
1. Check the Vercel documentation
2. Review the function logs
3. Test your API endpoints
4. Verify environment variables

Your expense tracker is now ready for production use! 🚀
