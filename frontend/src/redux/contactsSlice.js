import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    contacts: [],
    singleContact:[]
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
     }
    }
});

export const {readSingleContactState, readContactState, logoutContacts } = contactsSlice.actions;

export default contactsSlice.reducer;