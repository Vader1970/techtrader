// **Coded by Supriya Sharma**//

// Importing the required modules
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Creating a new schema for users
const userSchema = new mongoose.Schema(
  {
    // User's name is required
    name: {
      type: String,
      required: true,
    },
    // User's email is required and should be unique
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // User's password is required
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      type: String,
      default: false,
    },
  },
  // Adding timestamps to the schema
  { timestamps: true }
);

// Adding a method to the user schema to compare passwords
userSchema.methods.matchPasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Adding a pre-save hook to hash the password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  // Generating a salt to be used in password hashing, with a factor of 10
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Creating a User model using the user schema
const User = mongoose.model("User", userSchema);

// Exporting the User model
export default User;
