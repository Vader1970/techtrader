// **Coded by Supriya Sharma**//

import express from "express";
import Product from "../models/Products.js";
const productRoutes = express.Router();
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { protectRoute, admin } from "../middleware/authMiddleware.js";

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
};

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, userId, title } = req.body;

  const product = await Product.findById(req.params.id);

  const user = await User.findById(userId);

  if (product) {
    const alreadyReviewed = product.reviews.find((rev) => rev.user.toString() === user._id.toString());

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed.");
    }

    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      title,
      user: user._id,
    };

    product.reviews.push(review);

    product.numberOfReviews = product.reviews.length;
    product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review has been saved." });
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

const createQuestionsReview = asyncHandler(async (req, res) => {
  const { questionsComment, questionsTitle, userId } = req.body;

  const product = await Product.findById(req.params.id);

  const user = await User.findById(userId);

  const question = {
    questionsName: user.name,
    questionsComment,
    questionsTitle,
    user: user._id,
  };

  product.questions.push(question);

  await product.save();
  res.status(201).json({ message: "Question has been saved" });
});

// **Coded by Daniel Wilkey** //
// Create a product
const createNewProduct = asyncHandler(async (req, res) => {
  const { brand, name, category, stock, price, image, productIsNew, description } = req.body;

  const newProduct = await Product.create({
    brand,
    name,
    category,
    stock,
    price,
    image: image, // Now using Cloudflare URL directly
    productIsNew,
    description,
  });
  await newProduct.save();

  const products = await Product.find({});

  if (newProduct) {
    res.json(products);
  } else {
    res.status(404);
    throw new Error("Product could not be uploaded.");
  }
});

// **Coded by Daniel Wilkey** //
// delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// **Coded by Daniel Wilkey** //
// update a product
const updateProduct = asyncHandler(async (req, res) => {
  const { brand, name, image, category, stock, price, id, productIsNew, description } = req.body;

  const product = await Product.findById(id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.brand = brand;
    product.image = image; // Now using Cloudflare URL directly
    product.category = category;
    product.stock = stock;
    product.productIsNew = productIsNew;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

productRoutes.route("/").get(getProducts);
productRoutes.route("/:id").get(getProduct);
productRoutes.route("/reviews/:id").post(protectRoute, createProductReview);
productRoutes.route("/questions/:id").post(protectRoute, createQuestionsReview);
// **Coded by Daniel Wilkey** //
productRoutes.route("/").put(protectRoute, admin, updateProduct);
productRoutes.route("/:id").delete(protectRoute, admin, deleteProduct);
productRoutes.route("/").post(protectRoute, admin, createNewProduct);

export default productRoutes;
