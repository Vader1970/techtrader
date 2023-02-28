import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  userList: null,
  orders: null,
  orderRemoval: false,
  deliveredFlag: false,
};

export const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    resetError: (state) => {
      state.error = null;
      state.loading = false;
    },
  },
});

export const { setError, resetError } = listingsSlice.actions;
export default listingsSlice.reducer;

export const listingsSelector = (state) => state.listings;
