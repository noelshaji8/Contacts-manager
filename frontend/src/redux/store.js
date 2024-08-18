import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import contactsReducer from './contactsSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from '@reduxjs/toolkit';
import { version } from 'react';

// Set the key and version for the persisted state
const persistConfig = {
  key: "root",
  version: 1,
  // Use the session storage to store the state
  storage: storageSession
}

// Combine the two reducers into a single reducer
const reducer = combineReducers({
  user: userReducer,
  contacts: contactsReducer
})

// Create a new reducer that resets the state when the 'RESET' action is dispatched
const appReducer = (state, action) => {
  if (action.type === 'RESET') {
    // Reset the state to the initial state
    return reducer(undefined, action)
  }

  // Return the state as is
  return reducer(state, action)
}

// Create the final persisted reducer by wrapping the appReducer with the persistReducer
const persistedReducer = persistReducer(persistConfig, appReducer);

// Create the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer
});

export default store;