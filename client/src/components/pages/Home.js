import React from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";

//info - This is the home component that renders the contact form and the users contacts list
const Home = () => {
    return (
        <div className='grid-2'>
            {/* Contact Form */}
            <div>
                {/* Once imported you add your component to the app to be rendered */}
                <ContactForm />
            </div>
            {/* Contacts List */}
            <div>
                {/* Once imported you add your component to the app to be rendered */}
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    );
};

export default Home;
