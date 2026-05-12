import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import userReducer from './slices/userSlice';
import forgotPasswordReducer from './slices/forgotPasswordSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
  },
});
