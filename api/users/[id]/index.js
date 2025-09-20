// **Coded by Daniel Wilkey** //
// Vercel API route for getting user by ID

import dotenv from "dotenv";
import connectToDatabase from "../../../server/database.js";
import User from "../../../server/models/User.js";

dotenv.config();
connectToDatabase();

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { id } = req.query;
      
      if (!id) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const user = await User.findById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
