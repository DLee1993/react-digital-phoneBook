import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import {
    ADD_CONTACT,
    // DELETE_CONTACT,
    // SET_CURRENT,
    // CLEAR_CURRENT,
    // UPDATE_CONTACT,
    // FILTER_CONTACTS,
    // CLEAR_FILTER,
} from "../Types";

const ContactState = (props) => {
    const initialState = {
        contacts: [
            {
                id: 1,
                name: "Jill Johnson",
                email: "jill@gmail.com",
                phone: "111-111-1111",
                type: "personal",
            },
            {
                id: 2,
                name: "Sara Watson",
                email: "sara@gmail.com",
                phone: "222-222-2222",
                type: "personal",
            },
            {
                id: 3,
                name: "Harry White",
                email: "harry@gmail.com",
                phone: "333-333-3333",
                type: "professional",
            },
        ],
    };
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    //! CRUD Operations

    //info - Add a new contact 
    const addContact = (contact) => {
        contact.id = uuidv4(); 
        dispatch({type: ADD_CONTACT, payload: contact})
    }

    //info - Set current contact

    //info - update contact

    //info - delete contact 

    //! Additional operations for application

    //info - Clear contact

    //info - Filter contacts

    //info - clear filter

    return (
        <ContactContext.Provider value={{ contacts: state.contacts, addContact }}>
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState; 