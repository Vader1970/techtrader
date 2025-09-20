// **Coded by Daniel Wilkey** //
// Vercel API route for users

import dotenv from "dotenv";
import connectToDatabase from "../../server/database.js";
import express from "express";
import userRoutes from "../../server/routes/userRoutes.js";

dotenv.config();
connectToDatabase();

const app = express();
app.use(express.json());
app.use("/", userRoutes);

export default app;
