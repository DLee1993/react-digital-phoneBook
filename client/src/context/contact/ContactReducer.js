import {
    GET_CONTACTS,
    ADD_CONTACT,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    DELETE_CONTACT,
    FILTER_CONTACTS,
    SET_CURRENT,
    UPDATE_CONTACT,
    CONTACT_ERROR,
} from "../Types";

//info - This is where you decide what to do with the state and payload depending on the type of action
//info - i.e. addContact or updateContact
const formAction = (state, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return { ...state, contacts: action.payload, loading: false };
        case ADD_CONTACT:
            return { ...state, contacts: [...state.contacts, action.payload], loading: false };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map((contact) =>
                    contact.id === action.payload.id ? action.payload : contact
                ),
                loading: false,
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter((contact) => contact.id !== action.payload),
                loading: false,
            };
        case SET_CURRENT:
            return { ...state, current: action.payload };
        case CLEAR_CURRENT:
            return { ...state, current: null };
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter((contact) => {
                    return (
                        contact.name.toLowerCase().includes(action.payload) ||
                        contact.email.toLowerCase().includes(action.payload) ||
                        contact.phone.toLowerCase().includes(action.payload)
                    );
                }),
            };
        case CLEAR_FILTER:
            return { ...state, filtered: null };
        case CONTACT_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default formAction;
