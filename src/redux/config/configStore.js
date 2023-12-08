import authSlice from '../modules/authSlice';
import mapSlice from '../modules/mapSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    authSlice,
    mapSlice
  }
});
export default store;
