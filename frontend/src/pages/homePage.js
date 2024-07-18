import React from 'react';
import "../utils/styles/homePage.css"
import '@radix-ui/themes/styles.css';
import ContactCard from "../components/contactCard"
import NavBar from "../components/navBar";
import SearchBar from '../components/searchBar';
import AddContact from '../components/addContact';
import ContactDisplayCard from '../components/contactDisplayCard';
import GroupCard from '../components/groupCard';
import AddGroup from '../components/addGroup';
import GroupDisplayCard from '../components/groupDisplayCard';

function HomePage() {
    return (
        <div class="container">
            <NavBar />
            <GroupDisplayCard/>
            {/* <SearchBar />
            <div className='under-searchbar'>            
                <h3>Contact List (19)</h3>
                <AddGroup/>
            </div>
            <div class="contact-list">
                <GroupCard />
                <GroupCard />
                <GroupCard />
                <GroupCard />
                <GroupCard />
                <GroupCard />
                <GroupCard />
                <GroupCard />
                <GroupCard />
                <GroupCard />
                <GroupCard />
                <GroupCard />
            </div> */}
        </div>
    );
}

export default HomePage;