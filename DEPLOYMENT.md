# Vercel Deployment Guide for TechTrader

## Environment Variables Required

Add these to your Vercel project settings:

### Required Variables:
- `MONGODB_URI` - Your MongoDB connection string
- `TOKEN_SECRET` - JWT secret key (any random string)
- `NODE_ENV` - Set to "production"

### Optional (for image uploads):
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key  
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret

## Deployment Steps:

1. **Connect your GitHub repository to Vercel**
2. **Set the Root Directory**: Set to the root of your project (where vercel.json is located)
3. **Add Environment Variables** in Vercel dashboard
4. **Deploy**

## Important Notes:

- **DO NOT** add PORT to environment variables - Vercel handles this automatically
- Make sure your MongoDB URI is accessible from Vercel (not localhost)
- The vercel.json file handles routing between frontend and backend
- Frontend builds to `/client/build/`
- Backend API routes are served from `/server/index.js`

## Troubleshooting:

- **404 Error**: Check that vercel.json is in the root directory
- **Database Connection**: Ensure MONGODB_URI is correct and accessible
- **Build Failures**: Check that all dependencies are in package.json files
