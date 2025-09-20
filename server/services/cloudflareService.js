// **Coded by Daniel Wilkey** //
// Cloudflare Images service for handling image uploads

import FormData from 'form-data';
import fetch from 'node-fetch';

const CLOUDFLARE_ACCOUNT_HASH = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH;
const CLOUDFLARE_IMAGES_TOKEN = process.env.CLOUDFLARE_IMAGES_TOKEN;

/**
 * Upload an image to Cloudflare Images
 * @param {Buffer} imageBuffer - The image file buffer
 * @param {string} filename - The original filename
 * @returns {Promise<Object>} - Upload result with image ID and URL
 */
export const uploadImageToCloudflare = async (imageBuffer, filename) => {
  try {
    const formData = new FormData();
    formData.append('file', imageBuffer, {
      filename: filename,
      contentType: 'image/jpeg' // You can detect this from the file
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

    return {
      success: true,
      imageId: result.result.id,
      imageUrl: `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/${result.result.id}/public`,
      variants: result.result.variants
    };
  } catch (error) {
    console.error('Cloudflare upload error:', error);
    throw new Error(`Failed to upload image to Cloudflare: ${error.message}`);
  }
};

/**
 * Delete an image from Cloudflare Images
 * @param {string} imageId - The Cloudflare image ID
 * @returns {Promise<Object>} - Deletion result
 */
export const deleteImageFromCloudflare = async (imageId) => {
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_HASH}/images/v1/${imageId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${CLOUDFLARE_IMAGES_TOKEN}`,
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudflare delete failed: ${response.statusText}`);
    }

    const result = await response.json();
    return {
      success: result.success,
      message: result.success ? 'Image deleted successfully' : 'Failed to delete image'
    };
  } catch (error) {
    console.error('Cloudflare delete error:', error);
    throw new Error(`Failed to delete image from Cloudflare: ${error.message}`);
  }
};

/**
 * Get image details from Cloudflare
 * @param {string} imageId - The Cloudflare image ID
 * @returns {Promise<Object>} - Image details
 */
export const getImageDetails = async (imageId) => {
  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_HASH}/images/v1/${imageId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${CLOUDFLARE_IMAGES_TOKEN}`,
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudflare get failed: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Cloudflare get error:', error);
    throw new Error(`Failed to get image details from Cloudflare: ${error.message}`);
  }
};
