// **Coded by Daniel Wilkey** //
// Vercel API route for products

import dotenv from "dotenv";
import connectToDatabase from "../../server/database.js";
import Product from "../../server/models/Products.js";

dotenv.config();
connectToDatabase();

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const products = await Product.find({});
      res.status(200).json(products);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
