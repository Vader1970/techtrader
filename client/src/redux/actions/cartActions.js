// **Coded by Daniel Wilkey** //

import axios from "axios";
import { setLoading, setError, cartItemAdd, cartItemRemoval, setExpressShipping, clearCart } from "../slices/cart";

// Action creator to add an item to the cart
export const addCartItem = (id, qty) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Retrieve product data from the server
    const { data } = await axios.get(`/api/products/${id}`);
    // Create a new item to add to the cart
    const itemToAdd = {
      id: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      stock: data.stock,
      qty,
    };
    // Add the new item to the cart
    dispatch(cartItemAdd(itemToAdd));
  } catch (error) {
    // Set error message if there is an error retrieving product data from the server
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
  }
};

// Action creator to remove an item from the cart
export const removeCartItem = (id) => async (dispatch) => {
  // Set loading state to true
  dispatch(setLoading(true));
  // Remove the item from the cart
  dispatch(cartItemRemoval(id));
};

// Action creator to set express shipping option for the cart
export const setExpress = (value) => async (dispatch) => {
  // Set express shipping option
  dispatch(setExpressShipping(value));
};

// Action creator to reset the cart to an empty state
export const resetCart = () => (dispatch) => {
  // Clear the cart
  dispatch(clearCart());
};
