import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  geocode: {
    lat: null,
    lng: null
  }
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setLatLng: (state, action) => {
      state.geocode = action.payload;
    }
  }
});

export default mapSlice.reducer;
export const { setLatLng } = mapSlice.actions;
