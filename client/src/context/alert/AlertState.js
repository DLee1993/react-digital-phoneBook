import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../Types";

//info - this is the inital state of our app
const AlertState = (props) => {
    const initialState = [];
    const [state, dispatch] = useReducer(AlertReducer, initialState);

    //! Authentication Alert Operations

    //info - Set Alert
    const setAlert = (msg, type) => {
        const id = uuidv4();
        dispatch({ type: SET_ALERT, payload: { msg, type, id } });
        setTimeout(() => {
            dispatch({ type: REMOVE_ALERT, payload: id });
        }, 3000);
    };

    return (
        //info - Add all functions here to be used
        <AlertContext.Provider
            value={{
                alerts: state,
                setAlert,
            }}
        >
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
