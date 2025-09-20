// **Coded by Daniel Wilkey** //
// Vercel API route for product questions (converted from Express route)

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

        // Get the question data from the request body
        const { questionsComment, questionsTitle, userId: requestUserId } = req.body;

        if (!questionsComment || !questionsTitle || !requestUserId) {
          return res.status(400).json({ message: "All question fields are required" });
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

        // Create the question object
        const question = {
          questionsName: user.name,
          questionsComment,
          questionsTitle,
          user: user._id,
        };

        // Add the question to the product's questions array
        product.questions.push(question);

        // Save the updated product
        await product.save();

        res.status(201).json({ message: "Question has been saved" });

      } catch (jwtError) {
        res.status(401).json({ message: "Invalid token" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ 
      error: error.message,
      details: error.toString()
    });
  }
}
