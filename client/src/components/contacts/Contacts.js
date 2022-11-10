import React, {Fragment, useContext} from 'react'; 
import ContactContext from '../../context/contact/ContactContext'; 
import ContactItem from './ContactItem'; 

//info - This is where we loop through the current list of contacts and map (loop) through and add each to a contactItem
const Contacts = () => {
    const contactContext = useContext(ContactContext); 
    const {contacts} = contactContext; 
  return (
    <Fragment>
        {contacts.map(contact => <ContactItem key={contact.id} contact={contact}/>)}
    </Fragment>
  )
}

export default Contacts