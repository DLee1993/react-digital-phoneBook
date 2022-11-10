import React, { useContext, useRef, useEffect } from "react";
import ContactContext from "../../context/contact/ContactContext";

//info - this filter is used to search through all the contacts in the users contacts list
const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const { clearFilter, filterContacts, filtered } = contactContext;

    const text = useRef("");

    useEffect(() => {
        if (!filtered) {
            text.current.value = "";
        }
    }, [filtered, text]);

    const onChange = (e) => {
        if (text.current.value !== "") {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    };
    return (
        <form>
            <input ref={text} type='text' placeholder='Filter contacts...' onChange={onChange} />
        </form>
    );
};

export default ContactFilter;
