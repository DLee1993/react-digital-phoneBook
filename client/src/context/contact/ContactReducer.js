import {
    ADD_CONTACT,
    // DELETE_CONTACT,
    // SET_CURRENT,
    // CLEAR_CURRENT,
    // UPDATE_CONTACT,
    // FILTER_CONTACTS,
    // CLEAR_FILTER,
} from "../Types";

//info - This is where you decide what to do with the state and payload depending on the type of action 
//info - i.e. addContact or updateContact
const formAction = (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return { ...state, contacts: [...state.contacts, action.payload] };
        default:
            return state;
    }
};

export default formAction;
