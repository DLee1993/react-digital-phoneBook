import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import authReducer from "./AuthReducer";

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from "../types";

const AuthState = (props) => {
    const initialState = {
        user: null,
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        loading: true,
        error: null,
    };
    const [state, dispatch] = useReducer(authReducer, initialState);

    // load user
    // Register user
    // login user
    // logout
    // clear errors

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error,
                user: state.user,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
