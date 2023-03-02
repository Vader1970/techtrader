// Importing createSlice function from the Redux Toolkit library
import { createSlice } from "@reduxjs/toolkit";

// Initializing the initial state of the productsSlice reducer
export const initialState = {
  // Loading state for the products data to false
  loading: false,
  // Error state for the products data
  error: null,
  // Array of product objects
  products: [],
  // Individual product object
  product: null,
  // Flag indicating whether the review has been sent
  reviewSend: false,
  // Flag indicating whether the question has been sent
  questionSend: false,
  // Flag indicating whether the product has been updated
  productUpdate: false,
};

// Creating a productsSlice reducer with a name and a set of reducers
export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Reducer to set the loading state to true
    setLoading: (state) => {
      state.loading = true;
    },
    // Reducer to set the products state to an array of products
    setProducts: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.products = payload;
    },
    // Reducer to set the product state to an individual product object
    setProduct: (state, { payload }) => {
      state.product = payload;
      state.loading = false;
      state.error = null;
    },
    // Reducer to set the error state and the loading state to false
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    // Reducer to set the reviewSend flag to true
    productReviewed: (state) => {
      state.loading = false;
      state.error = null;
      state.reviewSend = true;
    },
    // Reducer to reset the error state, reviewSend flag, and productUpdate flag
    resetError: (state) => {
      state.error = null;
      state.reviewSend = false;
      state.productUpdate = false;
    },
    // Reducer to set the questionSend flag to true
    questionReviewed: (state) => {
      state.loading = false;
      state.error = null;
      state.questionSend = true;
    },
    // Reducer to reset the error state and questionSend flag
    questionResetError: (state) => {
      state.error = null;
      state.questionSend = false;
    },
    // Reducer to set the productUpdate flag to true
    setProductUpdateFlag: (state) => {
      state.productUpdate = true;
      state.loading = false;
    },
  },
});

// Exporting the actions from the productsSlice reducer
export const {
  setLoading,
  setError,
  setProducts,
  setProduct,
  productReviewed,
  resetError,
  questionReviewed,
  questionResetError,
  setProductUpdateFlag,
} = productsSlice.actions;

// Exporting the productsSlice reducer
export default productsSlice.reducer;

// Exporting the productsSelector function to select the state of the productsSlice reducer
export const productsSelector = (state) => state.products;
