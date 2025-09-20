// **Coded by Daniel Wilkey** //
// Vercel API route for orders

import dotenv from "dotenv";
import connectToDatabase from "../../server/database.js";
import express from "express";
import orderRoutes from "../../server/routes/orderRoutes.js";

dotenv.config();
connectToDatabase();

const app = express();
app.use(express.json());
app.use("/", orderRoutes);

export default app;
