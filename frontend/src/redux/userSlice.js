import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  username: "",
  uid: 0,
  info: {}
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.username = action.payload.requiredUser.username;
      state.uid = action.payload.requiredUser.uid;
      state.info = action.payload.requiredUser
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = "";
      state.uid = 0;
    }
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;