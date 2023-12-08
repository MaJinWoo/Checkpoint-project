import authSlice from '../modules/authSlice';
import storeFormSlice from '../modules/storeFormSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    authSlice,
    storeFormSlice
  }
});
export default store;
