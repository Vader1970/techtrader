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
      // Get all products
      const products = await Product.find({});
      res.status(200).json(products);
    } else if (req.method === "POST") {
      // Create new product
      const { brand, name, category, stock, price, productIsNew, description, image } = req.body;
      
      if (!brand || !name || !category || !stock || !price || !description) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newProduct = await Product.create({
        brand,
        name,
        category,
        stock,
        price,
        image: image || "/images/default-product.jpg",
        productIsNew: productIsNew || false,
        description,
      });

      // Return all products after creating new one
      const products = await Product.find({});
      res.status(201).json(products);
    } else if (req.method === "PUT") {
      // Update product
      const { id, brand, name, category, stock, price, productIsNew, description, image } = req.body;
      
      if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.brand = brand || product.brand;
      if (image) {
        product.image = image;
      }
      product.category = category || product.category;
      product.stock = stock || product.stock;
      product.productIsNew = productIsNew !== undefined ? productIsNew : product.productIsNew;

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
