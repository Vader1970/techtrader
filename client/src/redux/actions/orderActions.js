// **Coded by Daniel Wilkey**//

// Import the Axios library for making HTTP requests
import axios from "axios";

// Import the action creators from the order slice
import { setError, shippingAddressAdd, clearOrder } from "../slices/order";

// Action creator to add a shipping address to the order slice
export const setShippingAddress = (data) => (dispatch) => {
  dispatch(shippingAddressAdd(data));
};

// Action creator to set an error message in the order slice
export const setShippingAddressError = (value) => (dispatch) => {
  dispatch(setError(value));
};

// Async action creator to create a new order
export const createOrder = (order) => async (dispatch, getState) => {
  // Get the shipping address and user info from the order and user slices
  const {
    order: { shippingAddress },
    user: { userInfo },
  } = getState();

  // Add the shipping address and user information to the order
  const preparedOrder = { 
    ...order, 
    shippingAddress,
    user: userInfo._id,
    username: userInfo.name,
    email: userInfo.email
  };
  try {
    // Set the authorization header and content type for the request
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };
    // Send a POST request to create a new order and return the created order
    const { data } = await axios.post("/api/orders", preparedOrder, config);
    return data; // Return the created order data
  } catch (error) {
    // Set an error message in the order slice if the request fails
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
          ? error.message
          : "An unexpected error has occured. Please try again later."
      )
    );
    throw error; // Re-throw the error so it can be handled by the caller
  }
};

// Action creator to reset the order slice to its initial state
export const resetOrder = () => async (dispatch) => {
  dispatch(clearOrder());
};
