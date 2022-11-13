import React, { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactContext from "../../context/contact/ContactContext";
import ContactItem from "./ContactItem";

//info - This is where we loop through the current list of contacts and map (loop) through and add each to a contactItem
const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const { contacts, filtered } = contactContext;

    if (!contacts) return <h4>Please add a contact</h4>;

    return (
        <Fragment>
            <TransitionGroup>
                {filtered
                    ? filtered.map((contact) => (
                          <CSSTransition key={contact._id} timeout={500} classNames='item'>
                              <ContactItem contact={contact} />
                          </CSSTransition>
                      ))
                    : contacts.map((contact) => (
                          <CSSTransition key={contact._id} timeout={500} classNames='item'>
                              <ContactItem contact={contact} />
                          </CSSTransition>
                      ))}
            </TransitionGroup>
        </Fragment>
    );
};

export default Contacts;
