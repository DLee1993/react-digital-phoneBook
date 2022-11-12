import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AuthContext from "../../context/auth/AuthContext";

//info - This is the navbar component, all the below code gets rendered to the page
const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);

    const { isAuthenticated, user } = authContext;

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a href='#!'>
                    <i className='fas fa-sign-out-alt'>
                        <span className='hide-sm'>Logout</span>
                    </i>
                </a>
            </li>
        </Fragment>
    );
    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
        </Fragment>
    );

    return (
        <div className='navbar bg-primary'>
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
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
