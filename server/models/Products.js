// Import the Mongoose library
import mongoose from "mongoose";

// Define a schema for product reviews
const reviewSchema = new mongoose.Schema(
  {
    // Name of the reviewer
    name: { type: String, required: true },
    // Rating given to the product
    rating: { type: Number, required: true },
    // Comment left by the reviewer
    comment: { type: String, required: true },
    // Title of the review
    title: { type: String, required: true },
    // ID of the user who left the review
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  },
  // Include timestamps to track when the review was created and last updated
  { timestamps: true }
);

// Define a schema for product questions
const questionsSchema = new mongoose.Schema(
  {
    // Name of the person who asked the question
    questionsName: { type: String, required: true },
    // The actual question being asked
    questionsComment: { type: String, required: true },
    // Title of the question
    questionsTitle: { type: String, required: true },
    // ID of the user who asked the question
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  },
  // Include timestamps to track when the question was created and last updated
  { timestamps: true }
);

// Define the schema for products
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // An array of reviews for the product
    reviews: [reviewSchema],
    // The average rating of the product
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    // The number of reviews for the product
    numberOfReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    // Whether the product is new or not
    productIsNew: {
      type: Boolean,
      default: false,
    },
    // An array of questions for the product
    questions: [questionsSchema],
  },
  // Include timestamps to track when the product was created and last updated
  { timestamps: true }
);

// Create a Mongoose model based on the product schema and export it
const Product = mongoose.model("Product", productSchema);

export default Product;
