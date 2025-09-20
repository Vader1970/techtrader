# Deploy Express Server to Railway

## Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Connect your repository

## Step 2: Deploy Express Server
1. In Railway dashboard, click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `techtrader` repository
4. Set the **Root Directory** to `server`
5. Railway will automatically detect it's a Node.js app

## Step 3: Environment Variables
Add these in Railway dashboard:
```
MONGODB_URI=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret
NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH=9tq_QYlfJRXOyhlPNUexnA
CLOUDFLARE_IMAGES_TOKEN=wLC6-arSx1u549tDP99sIjm_C712uKuY2VA22doC
NODE_ENV=production
```

## Step 4: Get Server URL
Railway will give you a URL like: `https://your-app-name.railway.app`

## Step 5: Update Frontend
Update your frontend to use the Railway server URL for API calls.
