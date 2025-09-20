// **Coded by Supriya Sharma**//

import express from "express";
import User from "../models/User.js";
import Order from "../models/Order.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { protectRoute } from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

//TODO: redefine expiresIn
const genToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.TOKEN_SECRET, { expiresIn: "60d" });
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id, user.isAdmin),
      createdAt: user.createdAt,
    });
  } else {
    res.status(401).json("Invalid Email or Password");
  }
});

// POST register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json("We already have an account with that email address.");
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
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: genToken(updatedUser._id, updatedUser.isAdmin),
      createdAt: updatedUser.createdAt,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

// **Coded by Daniel Wilkey** //
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.params.id });
  if (orders) {
    res.json(orders);
  } else {
    res.status(404);
    throw new Error("No Orders found");
  }
});

userRoutes.route("/login").post(loginUser);
userRoutes.route("/register").post(registerUser);
userRoutes.route("/profile/:id").put(protectRoute, updateUserProfile);
userRoutes.route("/:id").get(protectRoute, getUserOrders);

export default userRoutes;
