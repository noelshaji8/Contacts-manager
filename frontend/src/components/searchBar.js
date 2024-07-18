import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import "../utils/styles/homePage.css"
import { TextField, IconButton} from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        // Handle the search logic here
        console.log('Searching for:', event.target.value);
    };

    return (
        
            <TextField.Root className='searchbar' radius='large' variant='surface' color='teal' placeholder="Search for contact…">
                <TextField.Slot side='right'>
                    <IconButton id='iconbtn' variant='ghost' color='teal' >
                        <MagnifyingGlassIcon height="16" width="16" />
                    </IconButton>
                </TextField.Slot>
            </TextField.Root>
  


    );
}

export default SearchBar;
