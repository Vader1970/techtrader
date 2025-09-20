// **Coded by Daniel Wilkey** //
// Vercel API route for getting user orders

import dotenv from "dotenv";
import connectToDatabase from "../../../server/database.js";
import Order from "../../../server/models/Order.js";
import jwt from "jsonwebtoken";

dotenv.config();
connectToDatabase();

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
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

        // Get all orders for this user
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        
        res.status(200).json(orders);
      } catch (jwtError) {
        res.status(401).json({ message: "Invalid token" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
