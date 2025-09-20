// **Coded by Daniel Wilkey** //
// Utility script to help migrate existing local images to Cloudflare
// This is a helper script that can be run manually if needed

import Product from "../models/Products.js";
import { uploadImageToCloudflare } from "../services/cloudflareService.js";
import fs from 'fs';
import path from 'path';

/**
 * Migrate existing local images to Cloudflare
 * This function should be run manually if you want to migrate existing products
 */
export const migrateExistingImages = async () => {
  try {
    console.log('Starting image migration...');
    
    // Find all products with local image paths
    const products = await Product.find({
      image: { $regex: '^/images/' }
    });

    console.log(`Found ${products.length} products with local images`);

    for (const product of products) {
      try {
        const localImagePath = product.image;
        const imageName = path.basename(localImagePath);
        const fullPath = path.join(process.cwd(), 'client', 'public', localImagePath);
        
        // Check if file exists
        if (fs.existsSync(fullPath)) {
          console.log(`Migrating image: ${imageName}`);
          
          // Read the file
          const imageBuffer = fs.readFileSync(fullPath);
          
          // Upload to Cloudflare
          const result = await uploadImageToCloudflare(imageBuffer, imageName);
          
          if (result.success) {
            // Update the product with the new Cloudflare URL
            product.image = result.imageUrl;
            await product.save();
            console.log(`✅ Migrated: ${product.name} -> ${result.imageUrl}`);
          } else {
            console.log(`❌ Failed to migrate: ${product.name}`);
          }
        } else {
          console.log(`⚠️  File not found: ${fullPath}`);
        }
      } catch (error) {
        console.error(`Error migrating product ${product.name}:`, error.message);
      }
    }

    console.log('Migration completed!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
};

/**
 * Get a list of products that still have local image paths
 */
export const getProductsWithLocalImages = async () => {
  try {
    const products = await Product.find({
      image: { $regex: '^/images/' }
    });
    
    console.log(`Products with local images:`);
    products.forEach(product => {
      console.log(`- ${product.name}: ${product.image}`);
    });
    
    return products;
  } catch (error) {
    console.error('Error getting products with local images:', error);
    return [];
  }
};
