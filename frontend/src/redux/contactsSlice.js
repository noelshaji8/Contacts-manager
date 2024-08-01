import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    contacts: [],
    singleContact:[],
    isUpdated:{}
};

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
     readContactState: (state, action)=>{
        state.contacts = action.payload
     },
     readSingleContactState: (state, action)=>{
        state.singleContact = action.payload
     },
     logoutContacts: (state, action)=>{
        state.contacts = []
     },
     update:(state, action)=>{
      state.isUpdated = action.payload
     }
    }
});

export const {readSingleContactState, readContactState, logoutContacts, update } = contactsSlice.actions;

export default contactsSlice.reducer;