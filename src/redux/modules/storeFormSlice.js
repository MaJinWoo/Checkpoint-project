import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '',
    name: '',
    address: '',
    instagram: '',
    homepage: '',
    hashtag: [],
    checklist: { alcohol: false, coffee: false, seats: false },
    geocode: { lat: null, lng: null }
  }
];

export const storeFormSlice = createSlice({
  name: 'storeForm',
  initialState,
  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setInstagram: (state, action) => {
      state.instagram = action.payload;
    },
    setHomepage: (state, action) => {
      state.homepage = action.payload;
    },
    setHashtag: (state, action) => {
      state.hashtag = action.payload;
    },
    setChecklist: (state, action) => {
      state.checklist = action.payload;
    },
    setGeocode: (state, action) => {
      state.geocode = action.payload;
    }
  }
});

export const { setName, setAddress, setInstagram, setHomepage, setHashtag, setChecklist, setGeocode } =
  storeFormSlice.actions;
export default storeFormSlice.reducer;
