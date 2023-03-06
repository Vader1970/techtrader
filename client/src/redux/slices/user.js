// **Coded by Supriya Sharma**//

// Import createSlice from Redux Toolkit
import { createSlice } from "@reduxjs/toolkit";

// Set initial state for user slice
export const initialState = {
  loading: false,
  error: null,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) ?? null,
  updateSuccess: false,
  orders: [],
};

// Define the user slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set loading state to true
    setLoading: (state) => {
      state.loading = true;
    },
    // Update user info and reset error and loading states
    userLogin: (state, { payload }) => {
      state.userInfo = payload;
      state.error = null;
      state.loading = false;
    },
    // Remove user info and reset error and loading states
    userLogout: (state) => {
      state.loading = false;
      state.error = null;
      state.userInfo = null;
    },
    // Set error state and reset loading state
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    // Update user profile and set update success flag
    updateUserProfile: (state, { payload }) => {
      state.userInfo = payload;
      state.updateSuccess = true;
      state.loading = false;
      state.error = null;
    },
    // Reset update success flag
    resetUpdate: (state) => {
      state.updateSuccess = false;
    },
    // Set user orders and reset error and loading states
    setUserOrders: (state, { payload }) => {
      state.error = null;
      state.orders = payload;
      state.loading = false;
    },
  },
});

// Export user slice actions
export const { setLoading, setError, userLogin, userLogout, updateUserProfile, resetUpdate, setUserOrders } =
  userSlice.actions;

// Export user selector
export default userSlice.reducer;

// Exporting the userSelector function to select the state of the userSlice reducer
export const userSelector = (state) => state.user;
