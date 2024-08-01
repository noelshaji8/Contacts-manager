import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import UserDisplayCard from '../components/userDisplayCard';
import { readContacts } from '../utils/api';
import { readContactState } from '../redux/contactsSlice';

function HomePage() {

    const dispatch = useDispatch()
    const contacts = useSelector((state) => state.contacts.contacts)

    const [pgNo, setPgNo] = useState(0)

    const contactsPerPage = 8
    const pagesVisited = pgNo * contactsPerPage
    const pageCount = Math.ceil(contacts.length / contactsPerPage)

    console.log(contacts);

    const displayContacts = contacts.length > 0 ? contacts
        .slice(pagesVisited, pagesVisited + contactsPerPage)
        .map((contact, i) => (<ContactCard key={i} contact={contact} />))
        : (<h2 style={{ margin: "15vh 0 " }}>Add some contacts</h2>)

    const pageChangeHandle = ({ selected }) => { setPgNo(selected) }

    return (

        <div className="container">
            <NavBar />
            <Routes>
                <Route exact path='/' element={
                    <div>
                        <h1>Contacts</h1>
                        <div className='under-searchbar'>
                            <h3>Contact List ({contacts.length})</h3>
                            <AddContact />
                        </div>
                        <div className="contact-list">
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