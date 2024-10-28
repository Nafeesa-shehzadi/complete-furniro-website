import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice"; // Import your product slice
import cartReducer from "./cartSlice";
export const store = configureStore({
  reducer: {
    products: productReducer, // Add the product slice to the store
    cart: cartReducer, // Add the cart slice to the store
  },
});
