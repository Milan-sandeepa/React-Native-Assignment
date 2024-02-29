import {
  addNewPaymentActionTypes,
  chargeFromUserActionTypes,
  coinRequestCancelNotifyActionTypes,
  findCoinStatusActionTypes,
  merchantCoinRequestActionTypes,
  merchantCoinRequestSaveActionTypes,
  merchantCoinTransferActionTypes,
  merchantCoinTransferRejectActionTypes,
  paymentChargeStudentActionTypes,
  refreshCoinsActionTypes,
  resetPaymentActionTypes,
  withdrawCoinsActionTypes,
} from '../types';

const initialState = {
  getRefreshCoinLoading: false,
  getRefreshCoinSuccess: null,
  getRefreshCoinFailed: null,

  addNewPaymentLoading: false,
  addNewPaymentSuccess: null,
  addNewPaymentFailed: null,

  chargeFromUserLoading: false,
  chargeFromUserSuccess: null,
  chargeFromUserFailed: null,

  chargeFromStudentLoading: false,
  chargeFromStudentSuccess: null,
  chargeFromStudentFailed: null,

  merchantCoinRequestLoading: false,
  merchantCoinRequestSuccess: null,
  merchantCoinRequestFailed: null,

  merchantCoinRequestSaveLoading: false,
  merchantCoinRequestSaveSuccess: null,
  merchantCoinRequestSaveFailed: null,

  findCoinStatusLoading: false,
  findCoinStatusSuccess: null,
  findCoinStatusFailed: null,

  coinRequestCancelNotifyLoading: false,
  coinRequestCancelNotifySuccess: null,
  coinRequestCancelNotifyFailed: null,

  merchantCoinTransferLoading: false,
  merchantCoinTransferSuccess: null,
  merchantCoinTransferFailed: null,

  merchantCoinTransferRejectLoading: false,
  merchantCoinTransferRejectSuccess: null,
  merchantCoinTransferRejectFailed: null,

  withdrawCoinsLoading: false,
  withdrawCoinsSuccess: null,
  withdrawCoinsFailed: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    //  **
    case refreshCoinsActionTypes.REQUEST_ACTION:
      return {
        ...state,
        getRefreshCoinLoading: true,
        getRefreshCoinSuccess: null,
        getRefreshCoinFailed: null,
      };
    case refreshCoinsActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        getRefreshCoinLoading: false,
        getRefreshCoinSuccess: action.value,
        getRefreshCoinFailed: null,
      };
    case refreshCoinsActionTypes.FAILED_ACTION:
      return {
        ...state,
        getRefreshCoinLoading: false,
        getRefreshCoinSuccess: null,
        getRefreshCoinFailed: action.value,
      };

    //  **
    case addNewPaymentActionTypes.REQUEST_ACTION:
      return {
        ...state,
        addNewPaymentLoading: true,
        addNewPaymentSuccess: null,
        addNewPaymentFailed: null,
      };
    case addNewPaymentActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        addNewPaymentLoading: false,
        addNewPaymentSuccess: action.value,
        addNewPaymentFailed: null,
      };
    case addNewPaymentActionTypes.FAILED_ACTION:
      return {
        ...state,
        addNewPaymentLoading: false,
        getRefreshCoinSuccess: null,
        addNewPaymentFailed: action.value,
      };

    //  **
    case chargeFromUserActionTypes.REQUEST_ACTION:
      return {
        ...state,
        chargeFromUserLoading: true,
        chargeFromUserSuccess: null,
        chargeFromUserFailed: null,
      };
    case chargeFromUserActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        chargeFromUserLoading: false,
        chargeFromUserSuccess: action.value,
        chargeFromUserFailed: null,
      };
    case chargeFromUserActionTypes.FAILED_ACTION:
      return {
        ...state,
        chargeFromUserLoading: false,
        chargeFromUserSuccess: null,
        chargeFromUserFailed: action.value,
      };

    //  **
    case paymentChargeStudentActionTypes.REQUEST_ACTION:
      return {
        ...state,
        chargeFromStudentLoading: true,
        chargeFromStudentSuccess: null,
        chargeFromStudentFailed: null,
      };
    case paymentChargeStudentActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        chargeFromStudentLoading: false,
        chargeFromStudentSuccess: action.value,
        chargeFromStudentFailed: null,
      };
    case paymentChargeStudentActionTypes.FAILED_ACTION:
      return {
        ...state,
        chargeFromStudentLoading: false,
        chargeFromStudentSuccess: null,
        chargeFromStudentFailed: action.value,
      };

    //merchant coin request
    case merchantCoinRequestActionTypes.REQUEST_ACTION:
      return {
        ...state,
        merchantCoinRequestLoading: true,
        merchantCoinRequestSuccess: null,
        merchantCoinRequestFailed: null,
      };
    case merchantCoinRequestActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        merchantCoinRequestLoading: false,
        merchantCoinRequestSuccess: action.value,
        merchantCoinRequestFailed: null,
      };
    case merchantCoinRequestActionTypes.FAILED_ACTION:
      return {
        ...state,
        merchantCoinRequestLoading: false,
        merchantCoinRequestSuccess: null,
        merchantCoinRequestFailed: action.value,
      };

    //merchant coin request save
    case merchantCoinRequestSaveActionTypes.REQUEST_ACTION:
      return {
        ...state,
        merchantCoinRequestSaveLoading: true,
        merchantCoinRequestSaveSuccess: null,
        merchantCoinRequestSaveFailed: null,
      };
    case merchantCoinRequestSaveActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        merchantCoinRequestSaveLoading: false,
        merchantCoinRequestSaveSuccess: action.value,
        merchantCoinRequestSaveFailed: null,
      };
    case merchantCoinRequestSaveActionTypes.FAILED_ACTION:
      return {
        ...state,
        merchantCoinRequestSaveLoading: false,
        merchantCoinRequestSaveSuccess: null,
        merchantCoinRequestSaveFailed: action.value,
      };

    //merchant coin request status check
    case findCoinStatusActionTypes.REQUEST_ACTION:
      return {
        ...state,
        findCoinStatusLoading: true,
        findCoinStatusSuccess: null,
        findCoinStatusFailed: null,
      };
    case findCoinStatusActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        findCoinStatusLoading: false,
        findCoinStatusSuccess: action.value,
        findCoinStatusFailed: null,
      };
    case findCoinStatusActionTypes.FAILED_ACTION:
      return {
        ...state,
        findCoinStatusLoading: false,
        findCoinStatusSuccess: null,
        findCoinStatusFailed: action.value,
      };

    //user coin transfer to merchant
    case merchantCoinTransferActionTypes.REQUEST_ACTION:
      return {
        ...state,
        merchantCoinTransferLoading: true,
        merchantCoinTransferSuccess: null,
        merchantCoinTransferFailed: null,
      };
    case merchantCoinTransferActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        merchantCoinTransferLoading: false,
        merchantCoinTransferSuccess: action.value,
        merchantCoinTransferFailed: null,
      };
    case merchantCoinTransferActionTypes.FAILED_ACTION:
      return {
        ...state,
        merchantCoinTransferLoading: false,
        merchantCoinTransferSuccess: null,
        merchantCoinTransferFailed: action.value,
      };

    //user coin transfer to merchant Reject
    case merchantCoinTransferRejectActionTypes.REQUEST_ACTION:
      return {
        ...state,
        merchantCoinTransferRejectLoading: true,
        merchantCoinTransferRejectSuccess: null,
        merchantCoinTransferRejectFailed: null,
      };
    case merchantCoinTransferRejectActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        merchantCoinTransferRejectLoading: false,
        merchantCoinTransferRejectSuccess: action.value,
        merchantCoinTransferRejectFailed: null,
      };
    case merchantCoinTransferRejectActionTypes.FAILED_ACTION:
      return {
        ...state,
        merchantCoinTransferRejectLoading: false,
        merchantCoinTransferRejectSuccess: null,
        merchantCoinTransferRejectFailed: action.value,
      };

    //merchant coin request cancel notify
    case coinRequestCancelNotifyActionTypes.REQUEST_ACTION:
      return {
        ...state,
        coinRequestCancelNotifyLoading: true,
        coinRequestCancelNotifySuccess: null,
        coinRequestCancelNotifyFailed: null,
      };
    case coinRequestCancelNotifyActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        coinRequestCancelNotifyLoading: false,
        coinRequestCancelNotifySuccess: action.value,
        coinRequestCancelNotifyFailed: null,
      };
    case coinRequestCancelNotifyActionTypes.FAILED_ACTION:
      return {
        ...state,
        coinRequestCancelNotifyLoading: false,
        coinRequestCancelNotifySuccess: null,
        coinRequestCancelNotifyFailed: action.value,
      };

    //  **
    case withdrawCoinsActionTypes.REQUEST_ACTION:
      return {
        ...state,
        withdrawCoinsLoading: true,
        withdrawCoinsSuccess: null,
        withdrawCoinsFailed: null,
      };
    case withdrawCoinsActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        withdrawCoinsLoading: false,
        withdrawCoinsSuccess: action.value,
        withdrawCoinsFailed: null,
      };
    case withdrawCoinsActionTypes.FAILED_ACTION:
      return {
        ...state,
        withdrawCoinsLoading: false,
        withdrawCoinsSuccess: null,
        withdrawCoinsFailed: action.value,
      };

    // ** Reset
    case resetPaymentActionTypes.RESET_ACTION:
      return {
        ...state,
        addNewPaymentLoading: false,
        addNewPaymentSuccess: null,
        addNewPaymentFailed: null,

        chargeFromUserLoading: false,
        chargeFromUserSuccess: null,
        chargeFromUserFailed: null,

        chargeFromStudentLoading: false,
        chargeFromStudentSuccess: null,
        chargeFromStudentFailed: null,

        withdrawCoinsLoading: false,
        withdrawCoinsSuccess: null,
        withdrawCoinsFailed: null,

        merchantCoinRequestSaveLoading: false,
        merchantCoinRequestSaveSuccess: null,
        merchantCoinRequestSaveFailed: null,

        findCoinStatusLoading: false,
        findCoinStatusSuccess: null,
        findCoinStatusFailed: null,

        coinRequestCancelNotifyLoading: false,
        coinRequestCancelNotifySuccess: null,
        coinRequestCancelNotifyFailed: null,
      };

    default:
      return state;
  }
};
