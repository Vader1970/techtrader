// This code implements a Redux store slice for managing a shopping cart. The code imports createSlice from the @reduxjs/toolkit library. This library provides utilities for creating and working with Redux stores in a simpler and more efficient manner.

// The calculateSubtotal function takes an array of cart items as input, iterates over the items, and calculates the subtotal by summing up the product of the quantity and price of each item. The subtotal is returned as a string with two decimal places.

// The initialState object defines the initial state of the store slice. It contains properties such as loading, error, cart, expressShipping, and subtotal. The cart property is initialized by parsing the value stored in local storage with the key "cartItems". If the value is not found, an empty array is used as the default. The subtotal property is initialized by calling the calculateSubtotal function with the cart items, or by using 0 as the default if the cart items are not found in local storage.

// The updateLocalSorage function updates the "cartItems" and "subtotal" values in local storage with the latest cart items and subtotal.

// The cartSlice object is created by calling createSlice with an object that defines the slice's name, initial state, and reducers. The reducers object defines four actions: setLoading, cartItemAdd, setError, and cartItemRemoval. These actions can be used to update the state of the store slice in response to events such as adding an item to the cart, removing an item from the cart, or setting an error message.

// Finally, the code exports the four actions and the reducer function, as well as a selector function cartSelector that returns the cart property of the store state.

import { createSlice } from "@reduxjs/toolkit";

// Function to calculate the subtotal of items in the cart
const calculateSubtotal = (cartState) => {
  let result = 0;
  // Iterate over the items in the cart and calculate the subtotal
  cartState.map((item) => (result += item.qty * item.price));
  // Return the subtotal as a string with 2 decimal places
  return Number(result).toFixed(2);
};

// Define the initial state of the store slice
export const initialState = {
  loading: false,
  error: null,
  // Initialize the cart items from local storage or use an empty array
  cart: JSON.parse(localStorage.getItem("cartItems")) ?? [],
  expressShipping: JSON.parse(localStorage.getItem("expressShipping")) ?? false,
  // Calculate the initial subtotal or use 0 as the default
  subtotal: localStorage.getItem("cartItems") ? calculateSubtotal(JSON.parse(localStorage.getItem("cartItems"))) : 0,
};

// Function to update the cart items and subtotal in local storage
const updateLocalSorage = (cart) => {
  localStorage.setItem("cartItems", JSON.stringify(cart));
  localStorage.setItem("subtotal", JSON.stringify(calculateSubtotal(cart)));
};

// Create the cart store slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to set the loading state to true
    setLoading: (state) => {
      state.loading = true;
    },
    // Action to add an item to the cart
    cartItemAdd: (state, { payload }) => {
      const existingItem = state.cart.find((item) => item.id === payload.id);

      if (existingItem) {
        // Replace the existing item with the updated item
        state.cart = state.cart.map((item) => (item.id === existingItem.id ? payload : item));
      } else {
        // Add the new item to the cart
        state.cart = [...state.cart, payload];
      }
      // Update the loading and error states
      state.loading = false;
      state.error = null;
      // Update the cart items and subtotal in local storage
      updateLocalSorage(state.cart);
      // Calculate the updated subtotal
      state.subtotal = calculateSubtotal(state.cart);
    },
    // Action to set an error message
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    // Action to remove an item from the cart
    cartItemRemoval: (state, { payload }) => {
      // Remove the item from the cart
      state.cart = [...state.cart].filter((item) => item.id !== payload);
      // Update the cart items and subtotal in local storage
      updateLocalSorage(state.cart);
      // Calculate the updated subtotal
      state.subtotal = calculateSubtotal(state.cart);
      // Update the loading and error states
      state.loading = false;
      state.error = null;
    },
    setExpressShipping: (state, { payload }) => {
      state.expressShipping = payload;
      localStorage.setItem("expressShipping", payload);
    },
    clearCart: (state) => {
      localStorage.removeItem("cartItems");
      state.cart = [];
    },
  },
});

// Export the actions created by the slice
export const { setLoading, setError, cartItemAdd, cartItemRemoval, setExpressShipping, clearCart } = cartSlice.actions;

// Export the cart slice as the default export
export default cartSlice.reducer;

// Export a selector for the cart state
export const cartSelector = (state) => state.cart;
