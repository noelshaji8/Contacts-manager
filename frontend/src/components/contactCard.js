import React from 'react';
import "../utils/styles/homePage.css"
import '@radix-ui/themes/styles.css';
import {  Avatar } from '@radix-ui/themes';


function ContactCard() {

    return (
    <div class="contact-card">
            <Avatar size="5" radius="full" fallback="N" />
            <div class="contact-info">
                <h2>Shankar Mahaassdfsdfs</h2>
                
            </div>
        </div>


    );
}
export default ContactCard;



