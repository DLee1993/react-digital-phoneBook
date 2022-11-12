import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import setAuthToken from "../../utils/SetAuthToken";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERRORS,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    // USER_LOADED,
    // AUTH_ERROR,
    // LOGIN_SUCCESS,
    // LOGIN_FAIL,
    // LOGOUT,
} from "../Types";

//info - this is the inital state of our app
const AuthState = (props) => {
    const initialState = {
        //info - This will be filled when the user is logged in so we know which user we are dealing with
        user: null,
        //info - get the authentication token from localstorage
        token: localStorage.getItem("token"),
        //info - isAuthenticated tells us if we are logged in or not
        isAuthenticated: null,
        loading: true,
        //info - this will change if there are any errors
        error: null,
    };
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    //! Authentication Operations

    //info - Load User - Check which user is logged in
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get("/api/auth");
            dispatch({ type: USER_LOADED, payload: res.data });
        } catch (error) {
            dispatch({ type: AUTH_ERROR });
        }
    };

    //info - Register User - Register a new user and return a token
    const register = async (formData) => {

        try {
            const res = await axios.post("/api/users", formData);
            dispatch({ type: REGISTER_SUCCESS, payload: res.data });
            setAuthToken(res.data.token);
            loadUser();
        } catch (error) {
            dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg });
        }
    };

    //info - Log in User - Retrieve the token from localstorage and Log in user
    const logInUser = async (formData) => {

        try {
            const res = await axios.post("/api/auth", formData);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            setAuthToken(res.data.token);
            loadUser();
        } catch (error) {
            dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
        }
    };

    //info - Logout User - Destroy the token and log out the user
    const logOutUser = () => {
        console.log("shell code");
    };

    //info - Clear Errors - Clear out any errors in the state
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        //info - Add all functions here to be used
        <AuthContext.Provider
            value={{
                user: state.user,
                loadUser,
                register,
                logInUser,
                logOutUser,
                clearErrors,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
