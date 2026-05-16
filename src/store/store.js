import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import productReducer from '../redux/slices/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
});
