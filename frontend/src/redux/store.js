import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import contactsReducer from './contactsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    contacts: contactsReducer
  }
});

export default store;