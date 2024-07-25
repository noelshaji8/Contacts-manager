import React, { useState } from 'react';
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
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import UserDisplayCard from '../components/userDisplayCard';

function HomePage() {

    const contactsFromDB = useSelector((state) => state.contacts)
    const [contacts, setContacts] = useState(contactsFromDB.contacts)
    const [pgNo, setPgNo] = useState(0)

    const contactsPerPage = 12
    const pagesVisited = pgNo * contactsPerPage
    const pageCount = Math.ceil(contacts.length / contactsPerPage)

    const displayContacts = contacts
        .slice(pagesVisited, pagesVisited + contactsPerPage)
        .map((contact, i) => (<ContactCard key={i} contact={contact} />))

    const pageChangeHandle = ({ selected }) => { setPgNo(selected) }

    return (

        <div class="container">
            <NavBar />
            <Routes>
                <Route exact path='/' element={
                    <div>
                        <h1>Contacts</h1>
                        <div className='under-searchbar'>
                            <h3>Contact List (19)</h3>
                            <AddContact />
                        </div>
                        <div class="contact-list">
                            {displayContacts}
                        </div>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="Next"
                            onPageChange={pageChangeHandle}
                            pageCount={pageCount}
                            previousLabel="Previous"
                            renderOnZeroPageCount={null}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previousBttn"}
                            nextLinkClassName={"nextBttn"}
                            disabledClassName={"paginationDisabled"}
                            activeClassName={"paginationActive"}
                        />

                    </div>
                }>
                </Route>
                <Route path='/contact' element={<ContactDisplayCard />}>
                </Route>
                <Route path='/user' element={<UserDisplayCard />}>
                </Route>
            </Routes>
        </div>
    );
}

export default HomePage;