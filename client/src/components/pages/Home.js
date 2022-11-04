import React from "react";
import Contacts from "../contacts/Contacts";

const Home = () => {
    return (
        <div className='grid-2'>
            {/* Contact form */}
            <div></div>
            {/* Contacts list */}
            <div><Contacts/></div>
        </div>
    );
};

export default Home;
