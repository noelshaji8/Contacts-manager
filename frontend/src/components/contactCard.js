import React from 'react';
import "../utils/styles/homePage.css"
import '@radix-ui/themes/styles.css';
import { Avatar } from '@radix-ui/themes';
import { readContactState, readSingleContactState } from '../redux/contactsSlice';
import { useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

function ContactCard({ contact }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSingleContact= ()=>{
 
        dispatch(readSingleContactState(contact))
        navigate("/home/contact")
    }

    return (
        <div onClick={handleSingleContact} className="contact-card">
            <Avatar src={contact.pfp} size="5" radius="full" fallback={contact.name[0]} />
            <div className="contact-info">
                <h2>{contact.name}</h2>
            </div>
        </div>
    );
}
export default ContactCard;



