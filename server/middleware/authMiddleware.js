// Importing the necessary modules for the code to work: jsonwebtoken, express-async-handler, and the User model.
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

// Defining an asynchronous function called protectRoute that takes three parameters: req, res, and next. This function is wrapped in asyncHandler, which is a middleware function that handles errors thrown from an async function.
const protectRoute = asyncHandler(async (req, res, next) => {
  // Declaring an empty token variable.
  let token;

  // Checking if the request headers include an Authorization header that starts with "Bearer". If this condition is true, we proceed to the try block.
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    // In the try block, we split the authorization header to extract the token from it. Then, we verify the token using the jsonwebtoken module and the secret stored in the process.env.TOKEN_SECRET environment variable. If the verification succeeds, we use the User model to find the user with the ID in the decoded token and attach it to the request object (req.user). Finally, we call the next() function to move on to the next middleware in the stack.
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

      req.user = User.findById(decoded.id);

      next();

      // If an error is thrown in the try block (e.g. if the token is invalid), we catch it in the catch block and send a 401 (Unauthorized) status code with an error message.
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  }

  // If there is no token found (i.e. the if statement in the beginning evaluates to false), we throw a 401 error with a message.
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

// Exporting the protectRoute function so it can be used in other files.
export { protectRoute };
