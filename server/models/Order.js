// Import the Mongoose library
import mongoose from "mongoose";

// Define the order schema
const orderSchema = new mongoose.Schema(
  {
    // Reference to the user who placed the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // Username of the user who placed the order
    username: {
      type: String,
      required: true,
      ref: "User",
    },
    // Email of the user who placed the order
    email: {
      type: String,
      required: true,
      ref: "User",
    },
    // List of items included in the order
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
      },
    ],
    // Shipping address for the order
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    // Payment method used for the order
    paymentMethod: {
      type: String,
      default: false,
    },
    // Payment details for the order
    paymentDetails: {
      orderId: { type: String },
      payerId: { type: String },
    },
    // Shipping price for the order
    shippingPrice: {
      type: Number,
      default: 0.0,
    },
    // Total price of the order
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    // Date and time the payment was made for the order
    paidAt: {
      type: Date,
    },
    // Whether the order has been delivered
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    // Date and time the order was delivered
    deliveredAt: {
      type: Date,
    },
  },
  // Add timestamp fields to the schema for when the order is created and updated
  { timestamps: true }
);

// Create the Order model using the order schema
const Order = mongoose.model("Order", orderSchema);

// Export the Order model
export default Order;
