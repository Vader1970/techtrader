// **Coded by Daniel Wilkey** //
// Simple test script to verify Cloudflare Images integration

import dotenv from 'dotenv';
import { uploadImageToCloudflare } from './server/services/cloudflareService.js';

dotenv.config();

async function testCloudflareConnection() {
  console.log('Testing Cloudflare Images connection...');
  console.log('Account Hash:', process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH);
  console.log('Token:', process.env.CLOUDFLARE_IMAGES_TOKEN ? 'Set' : 'Not set');
  
  if (!process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH || !process.env.CLOUDFLARE_IMAGES_TOKEN) {
    console.log('❌ Cloudflare environment variables not set');
    console.log('Please add them to your .env file:');
    console.log('NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH=9tq_QYlfJRXOyhlPNUexnA');
    console.log('CLOUDFLARE_IMAGES_TOKEN=wLC6-arSx1u549tDP99sIjm_C712uKuY2VA22doC');
    return;
  }

  try {
    // Create a simple test image buffer (1x1 pixel PNG)
    const testImageBuffer = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
      0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0xD7, 0x63, 0xF8, 0x0F, 0x00, 0x00,
      0x01, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE,
      0x42, 0x60, 0x82
    ]);

    console.log('Uploading test image...');
    const result = await uploadImageToCloudflare(testImageBuffer, 'test-image.png');
    
    if (result.success) {
      console.log('✅ Cloudflare connection successful!');
      console.log('Image ID:', result.imageId);
      console.log('Image URL:', result.imageUrl);
    } else {
      console.log('❌ Upload failed');
    }
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

testCloudflareConnection();
