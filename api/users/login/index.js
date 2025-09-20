// **Coded by Daniel Wilkey** //
// Vercel API route for user login

import dotenv from "dotenv";
import connectToDatabase from "../../../server/database.js";
import User from "../../../server/models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config();
connectToDatabase();

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await User.findOne({ email });
      
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "60d" });
        
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: token,
          createdAt: user.createdAt,
        });
      } else {
        res.status(401).json({ message: "Invalid Email or Password" });
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
