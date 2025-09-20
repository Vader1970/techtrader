// **Coded by Daniel Wilkey** //
// Vercel API route for orders

import dotenv from "dotenv";
import connectToDatabase from "../../server/database.js";
import Order from "../../server/models/Order.js";

dotenv.config();
connectToDatabase();

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const orderData = req.body;
      
      if (!orderData) {
        return res.status(400).json({ message: "Order data is required" });
      }

      const order = await Order.create(orderData);
      res.status(201).json(order);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
