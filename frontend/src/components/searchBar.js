import React, { useState } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import "../utils/styles/homePage.css"
import { TextField, IconButton } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import ContactCard from './contactCard';
import { readSingleContactState } from '../redux/contactsSlice';
import { useNavigate } from 'react-router-dom';

function SearchBar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const contacts = useSelector((state) => state.contacts.contacts)
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const handleChange = (value) => {
        setSearchTerm(value)
        fetchData(value)
    }

    const fetchData = (value) => {
        const results = contacts.filter((contact) => {
            return (value && contact && contact.name && contact.name.toLowerCase().includes(value))
        })
        setResults(results)
    }

    const handleSingleContact = (contact) => {

        dispatch(readSingleContactState(contact))
        setSearchTerm("")
        setResults([])
        navigate("/home/contact")
    }


    return (

        <div className='search-components'>
            <TextField.Root value={searchTerm} onChange={(e) => handleChange(e.target.value)} className='searchbar' radius='large' variant='surface' color='teal' placeholder="Search for contact…">
                <TextField.Slot side='right'>
                    <IconButton onClick={() => handleChange("")} id='iconbtn' variant='ghost' color='teal' >
                        <Cross1Icon height="16" width="16" />
                    </IconButton>
                </TextField.Slot>
            </TextField.Root>
            {results && results.length > 0 ? (
                <div className="results-list">
                    {results.map((result, id) => (
                        <div className="search-result" key={id} onClick={() => { handleSingleContact(result) }}>
                            {result.name}
                        </div>
                    ))}
                </div>
            ) : searchTerm && (
                <div className='results-list'>
                    <div style={{ padding: "25px" }}>
                        No contacts found
                    </div>
                </div>
            )}
        </div>

    );
}

export default SearchBar;



