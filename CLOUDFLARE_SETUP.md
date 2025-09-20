# Cloudflare Images Setup Guide

## Environment Variables

Add these environment variables to your `.env` file:

```bash
# Cloudflare Images Configuration

```

## For Vercel Deployment

Add these environment variables in your Vercel dashboard:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the following variables:
   - `NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH`: `9tq_QYlfJRXOyhlPNUexnA`
   - `CLOUDFLARE_IMAGES_TOKEN`: `wLC6-arSx1u549tDP99sIjm_C712uKuY2VA22doC`

## How It Works

1. **Image Upload**: When an admin selects an image, it's automatically uploaded to Cloudflare Images
2. **Unique URLs**: Each image gets a unique Cloudflare URL like `https://imagedelivery.net/9tq_QYlfJRXOyhlPNUexnA/[image-id]/public`
3. **Database Storage**: The Cloudflare URL is stored in MongoDB instead of local paths
4. **Existing Products**: Products with local image paths (`/images/...`) will continue to work, but new uploads will use Cloudflare

## Migration (Optional)

If you want to migrate existing local images to Cloudflare, you can use the migration utility:

```javascript
import { migrateExistingImages } from './server/utils/migrateImages.js';
await migrateExistingImages();
```

## Benefits

- **Global CDN**: Images are served from Cloudflare's global network
- **Automatic Optimization**: Cloudflare automatically optimizes images
- **Scalability**: No server storage needed for images
- **Performance**: Faster image loading worldwide
