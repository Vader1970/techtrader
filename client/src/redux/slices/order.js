// Import the createSlice function from the Redux Toolkit library
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the order slice
export const initialState = {
  loading: false,
  error: true,
  shippingAddress: null,
  orderInfo: null,
};

// Create a slice for the order state
export const orderSlice = createSlice({
  // Name of the slice
  name: "order",
  // Initial state of the slice
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    shippingAddressAdd: (state, { payload }) => {
      state.shippingAddress = payload;
      state.loading = false;
    },
    clearOrder: (state) => {
      state = initialState;
    },
  },
});

// Export the action creators from the slice
export const { setLoading, setError, shippingAddressAdd, clearOrder } = orderSlice.actions;

// Export the reducer function for the slice
export default orderSlice.reducer;

// Selector function to get the order slice from the state
export const orderSelector = (state) => state.order;
