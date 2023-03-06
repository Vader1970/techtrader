// **Coded by Daniel Wilkey** //

// Import createSlice function from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state of the listings slice
export const initialState = {
  userList: null,
  orders: null,
  orderRemoval: false,
  deliveredFlag: false,
};

// Define the listings slice using createSlice function
export const listingsSlice = createSlice({
  // Provide a name for the slice
  name: "listings",

  // Set the initial state for the slice
  initialState,

  // Define reducers for the slice
  reducers: {
    // Define the setError reducer, which updates the error state and sets loading to false
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    // Define the resetError reducer, which resets the error state and sets loading to false
    resetError: (state) => {
      state.error = null;
      state.loading = false;
    },
  },
});

// Export the setError and resetError actions from the slice
export const { setError, resetError } = listingsSlice.actions;

// Export the listings reducer
export default listingsSlice.reducer;

// Define a selector to access the listings slice from the Redux store
export const listingsSelector = (state) => state.listings;

// In summary, this code defines a Redux slice for a listings feature with an initial state and two reducers (setError and resetError). The createSlice function from Redux Toolkit is used to create the slice. The setError reducer sets an error message and sets loading to false, while the resetError reducer resets the error message and sets loading to false. The setError and resetError actions are exported from the slice, as well as the reducer and a selector function to access the listings slice from the Redux store.
