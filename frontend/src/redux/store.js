import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import contactsReducer from './contactsSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from '@reduxjs/toolkit';
import { version } from 'react';

const persistConfig = {
  key: "root",
  version: 1,
  storage
}

const reducer = combineReducers({
  user: userReducer,
  contacts: contactsReducer
})

const appReducer = (state, action) => {
  if (action.type === 'RESET') {
    return reducer(undefined, action)
  }

  return reducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
  reducer: persistedReducer
});

export default store;