// **Coded by Daniel Wilkey** //
// Vercel API route for image upload to Cloudflare

import dotenv from "dotenv";
import FormData from "form-data";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";

dotenv.config();

const CLOUDFLARE_ACCOUNT_HASH = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH;
const CLOUDFLARE_IMAGES_TOKEN = process.env.CLOUDFLARE_IMAGES_TOKEN;
const TOKEN_SECRET = process.env.TOKEN_SECRET;

// Simple auth middleware
const authenticateToken = (req) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    return decoded;
  } catch (error) {
    return null;
  }
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Parse JSON body if it's a string
  if (typeof req.body === 'string') {
    try {
      req.body = JSON.parse(req.body);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid JSON in request body' });
    }
  }

  // Check authentication
  const user = authenticateToken(req);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Check if user is admin (you can adjust this logic based on your user model)
  if (!user.isAdmin) {
    return res.status(403).json({ message: 'Admin access required' });
  }

  try {
    // Check if image data is provided
    if (!req.body.imageData) {
      return res.status(400).json({ message: 'No image data provided' });
    }

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(req.body.imageData, 'base64');
    const filename = req.body.filename || 'uploaded-image.jpg';

    // Upload to Cloudflare Images
    const formData = new FormData();
    formData.append('file', imageBuffer, {
      filename: filename,
      contentType: 'image/jpeg'
    });

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_HASH}/images/v1`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${CLOUDFLARE_IMAGES_TOKEN}`,
        },
        body: formData
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudflare upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(`Cloudflare upload failed: ${result.errors?.[0]?.message || 'Unknown error'}`);
    }

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      imageId: result.result.id,
      imageUrl: `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/${result.result.id}/public`,
      variants: result.result.variants
    });

  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
