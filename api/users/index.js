// **Coded by Daniel Wilkey** //
// Vercel API route for users

import dotenv from "dotenv";
import connectToDatabase from "../../server/database.js";
import User from "../../server/models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
connectToDatabase();

const genToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.TOKEN_SECRET, { expiresIn: "60d" });
};

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === "GET") {
      // Get all users (admin only)
      const users = await User.find({}).select('-password');
      res.status(200).json(users);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
