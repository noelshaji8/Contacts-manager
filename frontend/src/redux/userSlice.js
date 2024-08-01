import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  username: "",
  uid: 0,
  info: {},
  isUpdated: {}
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
      state.isUpdated = { title: `Welcome ${action.payload.requiredUser.username}` }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = "";
      state.uid = 0;
      state.isUpdated = {}
    },
    info: (state, action) => {
      state.info = action.payload
      state.isUpdated = { title: "User Information Updated" }
    }
  }
});

export const { login, logout, info } = userSlice.actions;

export default userSlice.reducer;