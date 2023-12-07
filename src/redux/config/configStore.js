import authSlice from '../modules/authSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    authSlice
  }
});
export default store;
