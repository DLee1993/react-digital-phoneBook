import React, { Fragment, useContext, useEffect } from "react";
    import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";

//info - This is where we loop through the current list of contacts and map (loop) through and add each to a contactItem
const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered, getContacts } = contactContext;

    useEffect(() => {
        getContacts();
    });

    if (!contacts) return <h4>Please add a contact</h4>;

    return (
        <Fragment>
            {filtered
                ? filtered.map((contact) => <ContactItem key={contact._id} contact={contact} />)
                : contacts.map((contact) => <ContactItem key={contact._id} contact={contact} />)}
        </Fragment>
    );
};

export default Contacts;
