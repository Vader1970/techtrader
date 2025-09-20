// **Coded by Daniel Wilkey** //
// Vercel API route for products

import dotenv from "dotenv";
import connectToDatabase from "../../server/database.js";
import express from "express";
import productRoutes from "../../server/routes/productRoutes.js";

dotenv.config();
connectToDatabase();

const app = express();
app.use(express.json());
app.use("/", productRoutes);

export default app;
