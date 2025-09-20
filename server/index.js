// **Coded by Daniel Wilkey**//

// Importing the necessary packages

// Package for managing environment variables
import dotenv from "dotenv";

// Function for connecting to the MongoDB database
import connectToDatabase from "./database.js";

// Framework for building web applications
import express from "express";

// Importing the routes for our API
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

// Loading environment variables from a .env file
dotenv.config();

// Connecting to the database
connectToDatabase();

// Creating an instance of the Express application
const app = express();

// Allowing the application to parse JSON request bodies
app.use(express.json());

// Specifying the port on which the server should run
const port = process.env.PORT || 5000;

// Mounting the routes for our API
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/images", imageRoutes);

// Only start the server if not in Vercel environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server runs on port ${port}.`);
  });
}

// Export the app for Vercel
export default app;