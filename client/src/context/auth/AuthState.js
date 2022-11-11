import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS, 
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
  } from '../Types';

//info - this is the inital state of our app
const AuthState = (props) => {
    const initialState = {
        //info - This will be filled when the user is logged in so we know which user we are dealing with
        user: null,
        //info - get the authentication token from localstorage
        token: localStorage.getItem('token'), 
        //info - isAuthenticated tells us if we are logged in or not
        isAuthenticated: null,
        loading: true,
        //info - this will change if there are any errors
        error: null
    };
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //! Authentication Operations

    //info - Load User - Check which user is logged in

    //info - Register User - Register a new user and return a token

    //info - Log in User - Retrieve the token from localstorage and Log in user

    //info - Logout User - Destroy the token and log out the user

    //info - Clear Errors - Clear out any errors in the state
   

    return (
        //info - Add all functions here to be used
        <AuthContext.Provider
            value={{
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated, 
                loading: state.loading,
                error: state.error
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
