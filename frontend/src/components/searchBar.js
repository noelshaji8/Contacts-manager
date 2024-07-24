import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import "../utils/styles/homePage.css"
import { TextField, IconButton } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { useSelector } from 'react-redux';
import ContactCard from './contactCard';

function SearchBar() {

    const contacts = useSelector((state) => state.contacts)
    const [searchTerm, setSearchTerm] = useState('');

    const searchContacts = () =>{contacts.contacts
        .map((contact, i) => {
            if (contact === searchTerm) {
                (<ContactCard key={i} contact={contact} />)
            }
            else {
                (<h1>No contacts found</h1>)
            }
        })}
        
    return (

        <TextField.Root value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className='searchbar' radius='large' variant='surface' color='teal' placeholder="Search for contact…">
            <TextField.Slot side='right'>
                <IconButton onClick={searchContacts} id='iconbtn' variant='ghost' color='teal' >
                    <MagnifyingGlassIcon height="16" width="16" />
                </IconButton>
            </TextField.Slot>
        </TextField.Root>

    );
}

export default SearchBar;
