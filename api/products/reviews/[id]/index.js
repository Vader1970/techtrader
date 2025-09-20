// **Coded by Daniel Wilkey** //
// Vercel API route for product reviews (converted from Express route)

import dotenv from "dotenv";
import connectToDatabase from "../../../../server/database.js";
import Product from "../../../../server/models/Products.js";
import User from "../../../../server/models/User.js";
import jwt from "jsonwebtoken";

dotenv.config();
connectToDatabase();

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      // Get the product ID from the URL
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      // Get the authorization header
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "No token provided" });
      }

      // Extract the token
      const token = authHeader.substring(7);
      
      try {
        // Verify the token and get the user ID
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decoded.id;

        // Get the review data from the request body
        const { rating, comment, userId: requestUserId, title } = req.body;

        if (!rating || !comment || !requestUserId || !title) {
          return res.status(400).json({ message: "All review fields are required" });
        }

        // Find the product
        const product = await Product.findById(id);
        
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }

        // Get the user
        const user = await User.findById(requestUserId);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // Check if user already reviewed this product
        const alreadyReviewed = product.reviews.find((rev) => rev.user.toString() === user._id.toString());

        if (alreadyReviewed) {
          return res.status(400).json({ message: "Product already reviewed" });
        }

        // Create the review object
        const review = {
          name: user.name,
          rating: Number(rating),
          comment,
          title,
          user: user._id,
        };

        // Add the review to the product's reviews array
        product.reviews.push(review);

        // Update the product's rating and number of reviews
        product.numberOfReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

        // Save the updated product
        await product.save();

        res.status(201).json({ message: "Review has been saved" });

      } catch (jwtError) {
        res.status(401).json({ message: "Invalid token" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ 
      error: error.message,
      details: error.toString()
    });
  }
}
