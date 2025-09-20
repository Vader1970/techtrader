// **Coded by Daniel Wilkey** //
// Vercel API route for user registration

import dotenv from "dotenv";
import connectToDatabase from "../../../server/database.js";
import User from "../../../server/models/User.js";
import jwt from "jsonwebtoken";

dotenv.config();
connectToDatabase();

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { name, email, password } = req.body;
      
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, and password are required" });
      }

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "We already have an account with that email address." });
      }

      const user = await User.create({
        name,
        email,
        password,
      });

      if (user) {
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "60d" });
        
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: token,
          createdAt: user.createdAt,
        });
      } else {
        res.status(400).json({ message: "Invalid user data" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
