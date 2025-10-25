# Railway Deployment Guide

## Environment Variables Required

Set these environment variables in your Railway project dashboard:

### Required Environment Variables:
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
JWT_SECRET=your-super-secret-jwt-key-for-production
```

### Optional Environment Variables:
```
CORS_ORIGIN=https://your-frontend-domain.com
```

## Railway Configuration

The following files have been configured for Railway deployment:

1. **railway.json** - Railway-specific configuration
2. **Procfile** - Process file for Railway
3. **package.json** - Updated with proper build scripts
4. **Dockerfile** - Optimized for Railway deployment

## Deployment Steps

1. **Connect your GitHub repository to Railway**
2. **Set up MongoDB Atlas** (recommended for production)
3. **Configure environment variables** in Railway dashboard
4. **Deploy your application**

## Common Issues and Solutions

### Issue 1: Build Failures
- **Solution**: Ensure all dependencies are properly installed
- **Check**: Node.js version compatibility (>=18.0.0)

### Issue 2: Database Connection
- **Solution**: Use MongoDB Atlas connection string
- **Format**: `mongodb+srv://username:password@cluster.mongodb.net/database`

### Issue 3: Port Configuration
- **Solution**: Railway automatically assigns PORT environment variable
- **Backend**: Use `process.env.PORT || 5000`

### Issue 4: CORS Issues
- **Solution**: Set CORS_ORIGIN environment variable
- **Backend**: Configure CORS middleware properly

## Health Check

The application includes a health check endpoint at `/api/health` that Railway will use to monitor the application status.

## Build Process

Railway will automatically:
1. Install dependencies for root, backend, and frontend
2. Build the backend TypeScript code
3. Build the frontend React application
4. Start the backend server

## Monitoring

Monitor your deployment in the Railway dashboard for:
- Build logs
- Runtime logs
- Health check status
- Resource usage
