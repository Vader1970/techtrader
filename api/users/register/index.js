// **Coded by Daniel Wilkey** //
// Vercel API route for user registration

import dotenv from "dotenv";
import connectToDatabase from "../../../server/database.js";
import User from "../../../server/models/User.js";
import jwt from "jsonwebtoken";

dotenv.config();
connectToDatabase();

const genToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.TOKEN_SECRET, { expiresIn: "60d" });
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === "POST") {
      const { name, email, password } = req.body;

      const userExists = await User.findOne({ email });
      if (userExists) {
        res.status(400).json("We already have an account with that email address.");
        return;
      }

      const user = await User.create({
        name,
        email,
        password,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: genToken(user._id, user.isAdmin),
          createdAt: user.createdAt,
        });
      } else {
        res.status(400).json("Invalid user data");
      }
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
