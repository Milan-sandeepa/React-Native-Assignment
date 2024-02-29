import AsyncStorage from '@react-native-async-storage/async-storage';
import {baseUrl, refreshTokenUrl} from "../../configurations/urlConfigurations";
import axios from "axios";
import {signInActionTypes} from '../types';
import {storeIsPackageExpireAuthAction, storeTokenAuthAction} from "../actions/authAction";


const timeout = 25000;

export const handleDispatch = (dispatch, actionType, data) => {
    dispatch({
        type: actionType,
        value: data
    })
}

export const userLogout = async (dispatch) => {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
    dispatch(storeTokenAuthAction(null));
    // dispatch(storeIsPackageExpireAuthAction(null));

}

//use to handle the errors like timeout, session expirations and token refresh parts
export const handleErrors = async (error, dispatch, actionTypes, previousRequest) => {

    if (error.code === 'ECONNABORTED') {
        handleDispatch(dispatch, actionTypes.FAILED_ACTION, {code: 500, result: 'Request Timeout!'});
    } else if (error.response && error.response.status === 401) {

        const refreshToken = await getRefreshToken();
        console.log('refresh token is: ' + refreshToken)

        if (refreshToken) {
            await AsyncStorage.setItem('token', refreshToken);
            console.log('refresh token setup done, calling to previous method again...')
            return dispatch(previousRequest.forceRequest());

        } else {
            await userLogout(dispatch);
            handleDispatch(dispatch, signInActionTypes.SESSION_EXPIRED_ACTION, {code: 500, result: 'Session Expired!'});
        }

    } else {
        let message = error?.response?.data?.result
        console.log( message );
        handleDispatch(dispatch, actionTypes.FAILED_ACTION, {code: 500, result: message ? message : "Something is wrong!" });
    }
}

//use to get the request headers and other axios configurations
export const getConfigurations = async (httpMethod, url, data, isAuth, isFormData, givenTimeout) => {

    let headers = {
        'Accept': 'application/json',
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'
    }

    if (isAuth) {
        headers = {
            ...headers,
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('token')
        }
    }

    return {
        headers,
        data: data ? data : undefined,
        url,
        baseURL: baseUrl,
        timeout: givenTimeout ? givenTimeout : timeout,
        method: httpMethod
    }
}


//use to get the refresh token
const getRefreshToken = async () => {

    const configurations = await getConfigurations('post', refreshTokenUrl, null, true, null);
    configurations.headers['isRefreshToken'] = 'true';

    try {
        const res = await axios(configurations);
        if (res && res.data && res.data.code === '200') {
            return res.data.result;
        }
    } catch (error) {
        console.log(error)
    }
    return null;
}
