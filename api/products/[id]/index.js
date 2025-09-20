// **Coded by Daniel Wilkey** //
// Vercel API route for single product

import dotenv from "dotenv";
import connectToDatabase from "../../../server/database.js";
import Product from "../../../server/models/Products.js";

dotenv.config();
connectToDatabase();

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { id } = req.query;

    if (req.method === "GET") {
      // Get single product
      const product = await Product.findById(id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } else if (req.method === "DELETE") {
      // Delete product
      const product = await Product.findByIdAndDelete(id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
