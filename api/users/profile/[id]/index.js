// **Coded by Daniel Wilkey** //
// Vercel API route for updating user profile

import dotenv from "dotenv";
import connectToDatabase from "../../../../server/database.js";
import User from "../../../../server/models/User.js";
import jwt from "jsonwebtoken";

dotenv.config();
connectToDatabase();

export default async function handler(req, res) {
  try {
    if (req.method === "PUT") {
      const { id } = req.query;
      const { name, email, password } = req.body;
      
      if (!id) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.name = name || user.name;
      user.email = email || user.email;
      if (password) {
        user.password = password;
      }

      const updatedUser = await user.save();
      const token = jwt.sign({ id: updatedUser._id }, process.env.TOKEN_SECRET, { expiresIn: "60d" });

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: token,
        createdAt: updatedUser.createdAt,
      });
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
