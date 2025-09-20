// **Coded by Daniel Wilkey** //
// Vercel API route for individual products

import dotenv from "dotenv";
import connectToDatabase from "../../../server/database.js";
import Product from "../../../server/models/Products.js";

dotenv.config();
connectToDatabase();

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { id } = req.query;
      
      if (id) {
        // Get individual product by ID
        const product = await Product.findById(id);
        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404).json({ message: "Product not found" });
        }
      } else {
        res.status(400).json({ message: "Product ID is required" });
      }
    } else if (req.method === "DELETE") {
      const { id } = req.query;
      
      if (id) {
        // Delete product by ID
        const product = await Product.findByIdAndDelete(id);
        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404).json({ message: "Product not found" });
        }
      } else {
        res.status(400).json({ message: "Product ID is required" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
