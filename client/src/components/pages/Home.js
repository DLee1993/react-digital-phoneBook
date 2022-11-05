import React from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";

const Home = () => {
    return (
        <div className='grid-2'>
            {/* Contact form */}
            <div>
                <ContactForm />
            </div>
            {/* Contacts list */}
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    );
};

export default Home;
