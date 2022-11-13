import React, { useReducer } from "react";
import axios from 'axios';
import ContactContext from "./ContactContext";
import ContactReducer from "./ContactReducer";
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from "../Types";

//info - this is the inital state of our app
const ContactState = (props) => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null
    };
    const [state, dispatch] = useReducer(ContactReducer, initialState);

    //! CRUD Operations

    //info - Add a new contact
    const addContact = async(contact) => {
        try {
            const res = await axios.post('/api/contacts', contact)
            dispatch({type: ADD_CONTACT, payload: res.data})
        } catch (error) {
            dispatch({type: CONTACT_ERROR, payload: error.response.msg})   
        }
    };

    //info - Set current contact
    const setCurrent = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    //info - update contact
    const updateContact = (contact) => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    };

    //info - delete contact
    //info - use the id from contact to identify which contact to delete
    const deleteContact = (id) => {
        dispatch({ type: DELETE_CONTACT, payload: id });
    };

    //! Additional operations for application

    //info - Clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    //info - Filter contacts
    const filterContacts = (text) => {
        dispatch({ type: FILTER_CONTACTS, payload: text });
    };

    //info - clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        //info - Add all functions here to be used
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter
            }}
        >
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
