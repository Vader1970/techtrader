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
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    getUsers: (state, { payload }) => {
      state.userList = payload;
      state.error = null;
      state.loading = false;
    },
    getOrders: (state, { payload }) => {
      state.orders = payload;
      state.error = null;
      state.loading = false;
    },
    orderDelete: (state) => {
      state.error = null;
      state.loading = false;
      state.orderRemoval = true;
    },

    resetError: (state) => {
      state.error = null;
      state.loading = false;
      state.userRemoval = false;
      state.deliveredFlag = false;
      state.orderRemoval = false;
    },
    setDeliveredFlag: (state) => {
      state.deliveredFlag = true;
      state.loading = false;
    },
  },
});

export const { setLoading, orderDelete, getOrders, resetError, setDeliveredFlag, setError, getUsers } =
  listingsSlice.actions;
export default listingsSlice.reducer;

export const listingsSelector = (state) => state.listings;
