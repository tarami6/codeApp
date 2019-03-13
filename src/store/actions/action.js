import {CHANGE_LANGUAGE, EDIT_USER} from "./actionType";

export const changeLanguage = (language) => {
    return {
        type: CHANGE_LANGUAGE,
        payload: language
    }
};

export const editUser = (user) => {
    return {
        type: EDIT_USER,
        payload: user
    }
};

