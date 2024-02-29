import {
  changePasswordUrl,
  fcmTokenUpdateUrl,
  forgotPasswordUrl,
  getAllCollageUrl,
  resendVerifyEmailUrl,
  signInUrl,
  signUpUrl,
  userCheckUrl,
  userResetPinUrl,
  verifyUserAccountUrl,
} from '../../configurations/urlConfigurations';
import {httpGet, httpPost} from '../services/httpServices';
import {
  changePasswordActionTypes,
  fcmTokenUpdateActionTypes,
  forgotPasswordActionTypes,
  getCollageActionTypes,
  resendVerifyEmailActionTypes,
  resetAuthActionTypes,
  resetPinActionTypes,
  resetUserCheckActionTypes,
  signInActionTypes,
  signUpActionTypes,
  tokenActionTypes,
  userCheckActionTypes,
  userResetPinActionTypes,
  userSaveTypes,
  userTypeActionTypes,
  verifyUserAccountActionTypes,
} from '../types';

// ** Auth
export const signInAction = data => {
  return httpPost({
    url: signInUrl,
    actionTypes: signInActionTypes,
    data,
  });
};

export const userTypeAction = isMerchant => {
  return {
    type: userTypeActionTypes.USER_TYPE_ACTION,
    value: isMerchant,
  };
};

export const userSaveAction = data => {
  return {
    type: userSaveTypes.USER_SAVE_ACTION,
    value: data,
  };
};

export const signUpAction = data => {
  return httpPost({
    url: signUpUrl,
    actionTypes: signUpActionTypes,
    data,
  });
};

export const userCheckAction = data => {
  return httpPost({
    url: userCheckUrl,
    actionTypes: userCheckActionTypes,
    data,
    isAuth: true,
  });
};

export const userResetPinAction = data => {
  return httpPost({
    url: userResetPinUrl,
    actionTypes: userResetPinActionTypes,
    data,
    isAuth: true,
  });
};

export const fcmTokenUpdateAction = data => {
  return httpPost({
    url: fcmTokenUpdateUrl,
    actionTypes: fcmTokenUpdateActionTypes,
    data,
    isAuth: true,
  });
};

export const resetAuthAction = () => {
  return {
    type: resetAuthActionTypes.RESET_ACTION,
  };
};

export const resetPinAction = () => {
  return {
    type: resetPinActionTypes.RESET_ACTION,
  };
};

export const resetUserCheckAction = () => {
  return {
    type: resetUserCheckActionTypes.RESET_ACTION,
  };
};

export const verifyUserAccountAction = data => {
  return httpPost({
    url: verifyUserAccountUrl,
    actionTypes: verifyUserAccountActionTypes,
    data,
  });
};

export const resendVerifyEmailAction = mail => {
  return httpPost({
    url: resendVerifyEmailUrl + mail,
    actionTypes: resendVerifyEmailActionTypes,
  });
};

export const forgotPasswordAction = email => {
  return httpPost({
    url: forgotPasswordUrl + email,
    actionTypes: forgotPasswordActionTypes,
  });
};

export const changePasswordAction = data => {
  return httpPost({
    url: changePasswordUrl,
    actionTypes: changePasswordActionTypes,
    data,
  });
};

export const storeTokenAuthAction = token => {
  return {
    type: signInActionTypes.STORE_TOKEN_ACTION,
    value: token,
  };
};

export const storeIsPackageExpireAuthAction = isExpired => {
  return {
    type: signInActionTypes.PACKAGE_EXPIRED_ACTION,
    value: isExpired,
  };
};

//
// export const signUpAction = data => {
//     const formData = new FormData();
//
//     formData.append('email', data.email);
//     formData.append('password', data.password);
//     formData.append('role', data.role);
//     formData.append('name', data.name);
//     // formData.append("gender", data.gender);
//     // formData.append("weight", data.weight);
//     // formData.append("height", data.height);
//     // formData.append("dob", data.dob);
//     // formData.append("fbUserId", data.fbUserId);
//     formData.append('userLoginType', data.userLoginType);
//     // formData.append("imageFile", null);
//
//
//     return httpPost({
//         url: signUpUrl,
//         actionTypes: signUpActionTypes,
//         isFormData: true,
//         data: formData,
//     });
// };
