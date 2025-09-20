// **Coded by Daniel Wilkey** //
// Vercel API handler

// Importing the necessary packages
import dotenv from "dotenv";
import connectToDatabase from "../server/database.js";
import express from "express";

// Importing the routes for our API
import productRoutes from "../server/routes/productRoutes.js";
import userRoutes from "../server/routes/userRoutes.js";
import orderRoutes from "../server/routes/orderRoutes.js";

// Loading environment variables from a .env file
dotenv.config();

// Connecting to the database
connectToDatabase();

// Creating an instance of the Express application
const app = express();

// Allowing the application to parse JSON request bodies
app.use(express.json());

// Mounting the routes for our API
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// Export the app for Vercel
export default app;
