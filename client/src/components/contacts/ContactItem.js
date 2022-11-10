import React from "react";
// import ContactContext from "../../context/contact/ContactContext";
import PropTypes from 'prop-types'

//info - Contact item is used as a template of what each contact should look like when rendered
const ContactItem = ({ contact }) => {
    const { name, email, phone, type } = contact;
    return (
        <div className='card bg-light'>
            <h3 className='text-primary text-left'>
                {name}{" "}
                <span style={{float: 'right'}}
                    className={
                        "badge " + (type === "professional" ? "badge-success" : "badge-primary")
                    }
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className="list">
                {email && (<li><i className="fas fa-envelope-open" style={{marginRight: '10px'}}></i>{email}</li>)}
                {phone && (<li><i className="fas fa-phone" style={{marginRight: '10px'}}></i>{phone}</li>)}
            </ul>
            <button className="btn btn-dark btn-sm">Edit</button>
            <button className="btn btn-danger btn-sm">Delete</button>
        </div>
    );
};

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem;
