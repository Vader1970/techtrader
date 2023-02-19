import { combineReducers, configureStore } from "@reduxjs/toolkit";

import products from "./slices/products";
import cart from "./slices/cart";
import user from "./slices/user";
import order from "./slices/order";

// Combine all the slices into a root reducer
const reducer = combineReducers({
  products,
  cart,
  user,
  order,
});

// Configure and create the Redux store using the root reducer
export default configureStore({
  reducer,
});
