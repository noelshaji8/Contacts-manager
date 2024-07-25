import React, { useState } from 'react';
import { Cross1Icon } from '@radix-ui/react-icons';
import "../utils/styles/homePage.css"
import { TextField, IconButton } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { useSelector } from 'react-redux';
import ContactCard from './contactCard';

function SearchBar() {

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


    return (

        <div className='search-components'>
            <TextField.Root value={searchTerm} onChange={(e) => handleChange(e.target.value)} className='searchbar' radius='large' variant='surface' color='teal' placeholder="Search for contact…">
                <TextField.Slot side='right'>
                    <IconButton onClick={()=>handleChange("")} id='iconbtn' variant='ghost' color='teal' >
                        <Cross1Icon height="16" width="16" />
                    </IconButton>
                </TextField.Slot>
            </TextField.Root>
            {
                results && results.length > 0 &&
                (<div className="results-list">
                    {results.map((result, id) => {
                        console.log(result);
                        return (<div className="search-result" onClick={(e) => alert(`You selected ${result}!`)}>
                            {result.name}
                        </div>);
                    })}
                </div>)
            }
        </div>

    );
}

export default SearchBar;



