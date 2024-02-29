import {
    getProfileDataActionTypes,
    resetProfileActionTypes,
    updatePasswordActionTypes,
    updateProfileActionTypes,
} from '../types';

const initialState = {


    updatePasswordLoading: false,
    updatePasswordSuccess: null,
    updatePasswordFailed: null,

    updateProfileLoading: false,
    updateProfileSuccess: null,
    updateProfileFailed: null,

    getProfileDataLoading: false,
    getProfileDataSuccess: null,
    getProfileDataFailed: null,


};

export default (state = initialState, action) => {
    switch (action.type) {
        //  **
        case updatePasswordActionTypes.REQUEST_ACTION:
            return {
                ...state,
                updatePasswordLoading: true,
                updatePasswordSuccess: null,
                updatePasswordFailed: null,
            };
        case updatePasswordActionTypes.SUCCESS_ACTION:
            return {
                ...state,
                updatePasswordLoading: false,
                updatePasswordSuccess: action.value,
                updatePasswordFailed: null,
            };
        case updatePasswordActionTypes.FAILED_ACTION:
            return {
                ...state,
                updatePasswordLoading: false,
                updatePasswordSuccess: null,
                updatePasswordFailed: action.value,
            };


        // **
        case updateProfileActionTypes.REQUEST_ACTION:
            return {
                ...state,
                updateProfileLoading: true,
                updateProfileSuccess: null,
                updateProfileFailed: null,
            };
        case updateProfileActionTypes.SUCCESS_ACTION:
            return {
                ...state,
                updateProfileLoading: false,
                updateProfileSuccess: action.value,
                updateProfileFailed: null,
            };
        case updateProfileActionTypes.FAILED_ACTION:
            return {
                ...state,
                updateProfileLoading: false,
                updateProfileSuccess: null,
                updateProfileFailed: action.value,
            };

 // **
        case getProfileDataActionTypes.REQUEST_ACTION:
            return {
                ...state,
                getProfileDataLoading: true,
                getProfileDataSuccess: null,
                getProfileDataFailed: null,
            };
        case getProfileDataActionTypes.SUCCESS_ACTION:
            return {
                ...state,
                getProfileDataLoading: false,
                getProfileDataSuccess: action.value,
                getProfileDataFailed: null,
            };
        case getProfileDataActionTypes.FAILED_ACTION:
            return {
                ...state,
                getProfileDataLoading: false,
                getProfileDataSuccess: null,
                getProfileDataFailed: action.value,
            };










        // ** Reset
        case resetProfileActionTypes.RESET_ACTION:
            return {
                ...state,
                updatePasswordLoading: false,
                updatePasswordSuccess: null,
                updatePasswordFailed: null,

                updateProfileLoading: false,
                updateProfileSuccess: null,
                updateProfileFailed: null,

                getProfileDataLoading: false,
                getProfileDataSuccess: null,
                getProfileDataFailed: null,

            };


        default:
            return state;
    }
}
