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

### Optional (for PayPal payments):
- `REACT_APP_PAYPAL_CLIENT_ID` - Your PayPal client ID

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
- The root package.json now has a `build` script that builds the client

## Build Process:

1. **Root package.json** runs `postinstall` to install dependencies in both client and server
2. **Client build** runs `cd client && npm run build` 
3. **Server** is deployed as a Node.js function
4. **Routing** sends `/api/*` to server, everything else to client build

## Troubleshooting:

- **404 Error**: Check that vercel.json is in the root directory
- **Build Failures**: The root package.json now handles building the client properly
- **Database Connection**: Ensure MONGODB_URI is correct and accessible
- **Dependencies**: Both client and server dependencies are installed via postinstall script
