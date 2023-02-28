import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  reviewSend: false,
  questionSend: false,
  productUpdate: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setProducts: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.products = payload;
    },
    setProduct: (state, { payload }) => {
      state.product = payload;
      state.loading = false;
      state.error = null;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    productReviewed: (state) => {
      state.loading = false;
      state.error = null;
      state.reviewSend = true;
    },
    resetError: (state) => {
      state.error = null;
      state.reviewSend = false;
      state.productUpdate = false;
    },
    questionReviewed: (state) => {
      state.loading = false;
      state.error = null;
      state.questionSend = true;
    },
    questionResetError: (state) => {
      state.error = null;
      state.questionSend = false;
    },
    setProductUpdateFlag: (state) => {
      state.productUpdate = true;
      state.loading = false;
    },
  },
});

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
export default productsSlice.reducer;

export const productsSelector = (state) => state.products;
