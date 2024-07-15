import React from 'react';
import "../utils/styles/homePage.css"
import '@radix-ui/themes/styles.css';
import ContactCard from "../components/contactCard"
import NavBar from "../components/navBar";
import SearchBar from '../components/searchBar';
import { Button } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

function HomePage() {
    return (
        <div class="container">
            <NavBar />
            <SearchBar />
            <div className='under-searchbar'>            
                <h3>Contact List (19)</h3>
                <Button id='btn' radius='large'>
                    Add Contact
                </Button>
            </div>
            <div class="contact-list">
                <ContactCard />
                <ContactCard />
                <ContactCard />
                <ContactCard />
                <ContactCard />
                <ContactCard />
                <ContactCard />
                <ContactCard />
                <ContactCard />
                <ContactCard />
                <ContactCard />
                <ContactCard />
            </div>
        </div>
    );
}

export default HomePage;