import {getProfileDataUrl, updatePasswordUrl, updateProfileUrl} from '../../configurations/urlConfigurations';
import {httpGet, httpPost} from '../services/httpServices';
import {
    getProfileDataActionTypes,
    resetProfileActionTypes,
    updatePasswordActionTypes,
    updateProfileActionTypes,
} from '../types';


// ** Profile
export const updatePasswordAction = data => {
    return httpPost({
        url: updatePasswordUrl,
        actionTypes: updatePasswordActionTypes,
        data,
        isAuth: true,
    });
};


export const updateProfileAction = data => {
    return httpPost({
        url: updateProfileUrl,
        actionTypes: updateProfileActionTypes,
        data,
        isAuth: true,
    });
};

export const getProfileDataAction = mail => {
    return httpGet({
        url: getProfileDataUrl + mail,
        actionTypes: getProfileDataActionTypes,
        isAuth: true,
    });
};


// ** profile
export const resetProfileAction = () => {
    return {
        type: resetProfileActionTypes.RESET_ACTION,
    };
};


