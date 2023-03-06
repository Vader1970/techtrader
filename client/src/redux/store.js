import { combineReducers, configureStore } from "@reduxjs/toolkit";

// **Coded by Supriya Sharma**//
// Import the products slice
import products from "./slices/products";

// **Coded by Daniel Wilkey** //
// Import the cart slice
import cart from "./slices/cart";

// **Coded by Supriya Sharma**//
// Import the user slice
import user from "./slices/user";

// **Coded by Daniel Wilkey**//
// Import the order slice
import order from "./slices/order";

// **Coded by Daniel Wilkey**//
// Import the listings slice
import listings from "./slices/listings";

// Combine all the slices into a root reducer
const reducer = combineReducers({
  products,
  cart,
  user,
  order,
  listings,
});

// Configure and create the Redux store using the root reducer
export default configureStore({
  // Set the root reducer for the store
  reducer,
});
