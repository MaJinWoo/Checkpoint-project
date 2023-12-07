import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  isMember: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeLoginStatus: (state, action) => {
      state.isLogin = !!action.payload;
    },
    changeMemberStatus: (state, action) => {
      state.isMember = !!action.payload;
    }
  }
});

export default authSlice.reducer;
export const { changeLoginStatus, changeMemberStatus } = authSlice.actions;
