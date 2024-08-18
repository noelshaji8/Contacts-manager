import React, { useEffect, useState } from 'react';
import "../utils/styles/homePage.css"
import '@radix-ui/themes/styles.css';
import ContactCard from "../components/contactCard"
import NavBar from "../components/navBar";
import SearchBar from '../components/searchBar';
import AddContact from '../components/addContact';
import ContactDisplayCard from '../components/contactDisplayCard';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import UserDisplayCard from '../components/userDisplayCard';


function HomePage() {

    // Obtains the list of contacts from the Redux store
    const contacts = useSelector((state) => state.contacts.contacts)

    // State variable to keep track of the current page number
    const [pgNo, setPgNo] = useState(0)

    // Constant to determine how many contacts should be displayed on each page
    const contactsPerPage = 8

    // Calculates the starting index of the contacts to be displayed on the current page
    const pagesVisited = pgNo * contactsPerPage

    // Calculates the total number of pages needed to display all the contacts
    const pageCount = Math.ceil(contacts.length / contactsPerPage)

    // Conditional rendering of the contacts
    // If there are contacts, it slices the contacts array based on the pagesVisited and contactsPerPage variables
    // and maps over the sliced array to render each contact as a ContactCard component
    // If there are no contacts, it displays a message asking the user to add some contacts
    const displayContacts = contacts.length > 0 ? contacts
        .slice(pagesVisited, pagesVisited + contactsPerPage)
        .map((contact, i) => (<ContactCard key={i} contact={contact} />))
        : (<h2 style={{ margin: "15vh 0 " }}>Add some contacts</h2>)

    // Function to update the pgNo state variable with the selected page number
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

