// **Coded by Daniel Wilkey** //
// Image upload routes for Cloudflare Images

import express from "express";
import { uploadImageToCloudflare, deleteImageFromCloudflare } from "../services/cloudflareService.js";
import { protectRoute, admin } from "../middleware/authMiddleware.js";
import asyncHandler from "express-async-handler";

const imageRoutes = express.Router();

// Upload image to Cloudflare
imageRoutes.route("/upload").post(
  protectRoute,
  admin,
  asyncHandler(async (req, res) => {
    // Check if image data is provided
    if (!req.body.imageData) {
      return res.status(400).json({ message: "No image data provided" });
    }

    try {
      // Convert base64 to buffer
      const imageBuffer = Buffer.from(req.body.imageData, 'base64');
      const filename = req.body.filename || 'uploaded-image.jpg';
      
      const result = await uploadImageToCloudflare(imageBuffer, filename);
      
      res.status(200).json({
        success: true,
        message: "Image uploaded successfully",
        imageId: result.imageId,
        imageUrl: result.imageUrl,
        variants: result.variants
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  })
);

// Delete image from Cloudflare
imageRoutes.route("/delete/:imageId").delete(
  protectRoute,
  admin,
  asyncHandler(async (req, res) => {
    const { imageId } = req.params;

    if (!imageId) {
      return res.status(400).json({ message: "Image ID is required" });
    }

    try {
      const result = await deleteImageFromCloudflare(imageId);
      
      res.status(200).json({
        success: result.success,
        message: result.message
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  })
);

export default imageRoutes;
