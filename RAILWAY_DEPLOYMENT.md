# Railway Deployment Guide

## Environment Variables Required

Set these environment variables in your Railway project settings:

### Database Configuration
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
```

### JWT Configuration
```
JWT_SECRET=your-super-secret-jwt-key-for-production
```

### Application Configuration
```
NODE_ENV=production
PORT=5000
```

## Deployment Steps

1. **Connect your GitHub repository to Railway**
2. **Set the environment variables above in Railway dashboard**
3. **Railway will automatically detect the configuration and deploy**

## Common Issues and Solutions

### Issue 1: Build Failures
- **Solution**: Ensure all dependencies are properly installed
- **Check**: Verify package.json scripts are correct

### Issue 2: Database Connection Issues
- **Solution**: Use MongoDB Atlas for production database
- **Check**: Verify MONGODB_URI is correctly set

### Issue 3: Port Issues
- **Solution**: Railway automatically assigns PORT, use process.env.PORT
- **Check**: Ensure PORT is used in server configuration

### Issue 4: Frontend Build Issues
- **Solution**: Ensure frontend build completes successfully
- **Check**: Verify all frontend dependencies are installed

## Railway Configuration Files

- `railway.json`: Railway-specific configuration
- `Procfile`: Process definition for Railway
- `Dockerfile`: Container configuration (optional, Railway can auto-detect)
- `.railwayignore`: Files to exclude from deployment

## Health Check

The application includes a health check endpoint at `/api/health` that Railway will use to monitor the application status.
