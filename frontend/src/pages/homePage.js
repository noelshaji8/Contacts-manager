import React from 'react';
import "../utils/styles/homePage.css"
import '@radix-ui/themes/styles.css';
import ContactCard from "../components/contactCard"
import NavBar from "../components/navBar";
import SearchBar from '../components/searchBar';

function HomePage() {
    return (
        <div class="container">
           <NavBar />
           <SearchBar />
            <h3>Contact List (19)</h3>
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