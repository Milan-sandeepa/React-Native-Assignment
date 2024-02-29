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
import {ROLES} from '../../utilitys/role';

const initialState = {
  token: null,
  sessionExpired: null,
  userId: null,
  isMerchant: false,
  userSave: null,

  signInLoading: false,
  signInSuccess: null,
  signInFailed: null,

  signUpLoading: false,
  signUpSuccess: null,
  signUpFailed: null,

  packageExpired: null,

  forgotPasswordLoading: false,
  forgotPasswordSuccess: null,
  forgotPasswordFailed: null,

  verifyUserAccountLoading: false,
  verifyUserAccountSuccess: null,
  verifyUserAccountFailed: null,

  resendVerifyEmailLoading: false,
  resendVerifyEmailSuccess: null,
  resendVerifyEmailFailed: null,

  changePasswordLoading: false,
  changePasswordSuccess: null,
  changePasswordFailed: null,

  userCheckLoading: false,
  userCheckSuccess: null,
  userCheckFailed: null,

  userResetPinLoading: false,
  userResetPinSuccess: null,
  userResetPinFailed: null,

  fcmTokenUpdateLoading: false,
  fcmTokenUpdateSuccess: null,
  fcmTokenUpdateFailed: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    // ** core
    case signInActionTypes.SESSION_EXPIRED_ACTION:
      return {
        ...state,
        sessionExpired: action.value,
      };

    // ** store token
    case signInActionTypes.STORE_TOKEN_ACTION:
      return {
        ...state,
        token: action.value,
      };

    //  ** sign in
    case signInActionTypes.REQUEST_ACTION:
      return {
        ...state,
        signInLoading: true,
        signInSuccess: null,
        signInFailed: null,
      };
    case signInActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        signInLoading: false,
        signInSuccess: action.value,
        signInFailed: null,
        userId: action.value ? action.value.result.email : null,
        // token: action.value ? action.value.result.token : null, // dont use
        isMerchant: action.value
          ? action.value.result.role === ROLES.MERCHANT
          : null,
      };
    case signInActionTypes.FAILED_ACTION:
      return {
        ...state,
        signInLoading: false,
        signInSuccess: null,
        signInFailed: action.value,
      };

    // **
    case userTypeActionTypes.USER_TYPE_ACTION:
      return {
        ...state,
        isMerchant: action.value,
      };

    // **
    case userSaveTypes.USER_SAVE_ACTION:
      return {
        ...state,
        userSave: action.value,
      };

    //  ** sign up
    case signUpActionTypes.REQUEST_ACTION:
      return {
        ...state,
        signUpLoading: true,
        signUpSuccess: null,
        signUpFailed: null,
      };
    case signUpActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        signUpLoading: false,
        signUpSuccess: action.value,
        signUpFailed: null,
      };
    case signUpActionTypes.FAILED_ACTION:
      return {
        ...state,
        signUpLoading: false,
        signUpSuccess: null,
        signUpFailed: action.value,
      };

    //  **
    case verifyUserAccountActionTypes.REQUEST_ACTION:
      return {
        ...state,
        verifyUserAccountLoading: true,
        verifyUserAccountSuccess: null,
        verifyUserAccountFailed: null,
      };
    case verifyUserAccountActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        verifyUserAccountLoading: false,
        verifyUserAccountSuccess: action.value,
        verifyUserAccountFailed: null,
      };
    case verifyUserAccountActionTypes.FAILED_ACTION:
      return {
        ...state,
        verifyUserAccountLoading: false,
        verifyUserAccountSuccess: null,
        verifyUserAccountFailed: action.value,
      };

    //  **
    case resendVerifyEmailActionTypes.REQUEST_ACTION:
      return {
        ...state,
        resendVerifyEmailLoading: true,
        resendVerifyEmailSuccess: null,
        resendVerifyEmailFailed: null,
      };
    case resendVerifyEmailActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        resendVerifyEmailLoading: false,
        resendVerifyEmailSuccess: action.value,
        resendVerifyEmailFailed: null,
      };
    case resendVerifyEmailActionTypes.FAILED_ACTION:
      return {
        ...state,
        resendVerifyEmailLoading: false,
        resendVerifyEmailSuccess: null,
        resendVerifyEmailFailed: action.value,
      };

    //  **
    case forgotPasswordActionTypes.REQUEST_ACTION:
      return {
        ...state,
        forgotPasswordLoading: true,
        forgotPasswordSuccess: null,
        forgotPasswordFailed: null,
      };
    case forgotPasswordActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordSuccess: action.value,
        forgotPasswordFailed: null,
      };
    case forgotPasswordActionTypes.FAILED_ACTION:
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordSuccess: null,
        forgotPasswordFailed: action.value,
      };

    //  **
    case changePasswordActionTypes.REQUEST_ACTION:
      return {
        ...state,
        changePasswordLoading: true,
        changePasswordSuccess: null,
        changePasswordFailed: null,
      };
    case changePasswordActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordSuccess: action.value,
        changePasswordFailed: null,
      };
    case changePasswordActionTypes.FAILED_ACTION:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordSuccess: null,
        changePasswordFailed: action.value,
      };

    //  ** user check
    case userCheckActionTypes.REQUEST_ACTION:
      return {
        ...state,
        userCheckLoading: true,
        userCheckSuccess: null,
        userCheckFailed: null,
      };
    case userCheckActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        userCheckLoading: false,
        userCheckSuccess: action.value,
        userCheckFailed: null,
      };
    case userCheckActionTypes.FAILED_ACTION:
      return {
        ...state,
        userCheckLoading: false,
        userCheckSuccess: null,
        userCheckFailed: action.value,
      };

    //  ** user reset pin
    case userResetPinActionTypes.REQUEST_ACTION:
      return {
        ...state,
        userResetPinLoading: true,
        userResetPinSuccess: null,
        userResetPinFailed: null,
      };
    case userResetPinActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        userResetPinLoading: false,
        userResetPinSuccess: action.value,
        userResetPinFailed: null,
      };
    case userResetPinActionTypes.FAILED_ACTION:
      return {
        ...state,
        userResetPinLoading: false,
        userResetPinSuccess: null,
        userResetPinFailed: action.value,
      };

    //  ** fcmToken Update
    case fcmTokenUpdateActionTypes.REQUEST_ACTION:
      return {
        ...state,
        fcmTokenUpdateLoading: true,
        fcmTokenUpdateSuccess: null,
        fcmTokenUpdateFailed: null,
      };
    case fcmTokenUpdateActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        fcmTokenUpdateLoading: false,
        fcmTokenUpdateSuccess: action.value,
        fcmTokenUpdateFailed: null,
      };
    case fcmTokenUpdateActionTypes.FAILED_ACTION:
      return {
        ...state,
        fcmTokenUpdateLoading: false,
        fcmTokenUpdateSuccess: null,
        fcmTokenUpdateFailed: action.value,
      };

    // ** Reset
    case resetAuthActionTypes.RESET_ACTION:
      return {
        ...state,
        sessionExpired: null,

        signInLoading: false,
        signInSuccess: null,
        signInFailed: null,

        signUpLoading: false,
        signUpSuccess: null,
        signUpFailed: null,

        forgotPasswordLoading: false,
        forgotPasswordSuccess: null,
        forgotPasswordFailed: null,

        verifyUserAccountLoading: false,
        verifyUserAccountSuccess: null,
        verifyUserAccountFailed: null,

        resendVerifyEmailLoading: false,
        resendVerifyEmailSuccess: null,
        resendVerifyEmailFailed: null,

        changePasswordLoading: false,
        changePasswordSuccess: null,
        changePasswordFailed: null,
      };

    case resetUserCheckActionTypes.RESET_ACTION:
      return {
        ...state,

        userCheckLoading: false,
        userCheckSuccess: null,
        userCheckFailed: null,
      };

    case resetPinActionTypes.RESET_ACTION:
      return {
        ...state,

        userResetPinLoading: false,
        userResetPinSuccess: null,
        userResetPinFailed: null,
      };

    default:
      return state;
  }
};
