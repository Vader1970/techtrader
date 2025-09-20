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
3. **API** is deployed from `api/index.js` as a Node.js function
4. **Routing** sends `/api/*` to API function, everything else to client build

## New Architecture:

- **Frontend**: React app built from `client/` directory
- **Backend**: Express API in `api/` directory (Vercel serverless functions)
- **Routing**: `/api/*` → API functions, `/*` → React app
- **Simplified**: Uses Vercel's automatic detection for API routes

## Troubleshooting:

- **404 Error**: Check that vercel.json is in the root directory and routes are configured correctly
- **Build Failures**: The root package.json now handles building the client properly
- **Database Connection**: Ensure MONGODB_URI is correct and accessible
- **Dependencies**: Both client and server dependencies are installed via postinstall script
- **Routing Issues**: Make sure API routes start with `/api/` and all other routes serve the React app
- **Server Export**: The server/index.js now exports the app for Vercel compatibility

## Common Issues:

1. **404 on all routes**: Check vercel.json routing configuration
2. **API routes not working**: Ensure server/index.js exports the app
3. **Static files not loading**: Check that static file routes are configured in vercel.json
4. **React Router not working**: Make sure catch-all route serves index.html
