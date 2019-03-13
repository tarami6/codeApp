import {CHANGE_LANGUAGE, EDIT_USER} from "../actions/actionType";

const initialState = {
    user: {
        firstName: "",
        lastName: '',
        phone: '',
        fax: '',
        work: '',
        email: '',
        address: '',
        city: '',
        age:''
    },
    language: 'ENG'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.payload
            }

        case EDIT_USER:
            return {
                ...state,
                user: action.payload,
            }


        default:
            return state;
    }
}

export default reducer;