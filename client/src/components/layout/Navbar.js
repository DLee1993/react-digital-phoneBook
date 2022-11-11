import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//info - This is the navbar component, all the below code gets rendered to the page
const Navbar = ({ title, icon }) => {
    return (
        <div className='navbar bg-primary'>
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
            </ul>
        </div>
    );
};

export default Navbar;

//info - the below proptypes ensure the value passed to the key (i.e. title) is the correct datatype (i.e. string)
Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
};

Navbar.defaultProps = {
    title: "Contact Keeper",
    icon: "fas fa-id-card-alt",
};
