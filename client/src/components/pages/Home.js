import React, { useContext, useEffect } from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import ContactFilter from "../contacts/ContactFilter";
import AuthContext from "../../context/auth/AuthContext";

//info - This is the home component that renders the contact form and the users contacts list
const Home = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
      }, []);

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
