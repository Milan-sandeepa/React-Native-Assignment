import {
  FindOrderPaymentRequestStatusMerchantActionTypes,
  FindOrderPaymentRequestUserActionTypes,
  findOrderDetailsActionTypes,
  findOrderStoreDetailActionTypes,
  getAllActiveOrderActionTypes,
  getAllStoreActiveOrderActionTypes,
  getAllStoreStationaryActiveOrderActionTypes,
  orderPaymentChargeActionTypes,
  orderPaymentRequestActionTypes,
  orderPaymentRequestCancelActionTypes,
  orderPaymentRequestCancelNotifyActionTypes,
  orderPaymentRequestUpdateActionTypes,
  orderStatusUpdateActionTypes,
  qrUpdateActionTypes,
  qrValidateActionTypes,
  resetFindOrderPaymentRequestStatusMerchantActionTypes,
  resetFindOrderPaymentRequestUserActionTypes,
  resetOrderPaymentChargeActionTypes,
  resetOrderPaymentRequestAcceptActionTypes,
  resetOrderPaymentRequestCancelActionTypes,
  resetOrderPaymentRequestCancelNotifyActionTypes,
  resetQrValidateActionTypes,
  resetfindOrderDetailsActionTypes,
  resetfindOrderStoreDetailActionTypes,
  resetorderPaymentRequestMerchantActionTypes,
} from '../types';

const initialState = {
  getAllActiveOrdersLoading: false,
  getAllActiveOrdersSuccess: null,
  getAllActiveOrdersFailed: null,

  getAllStoreActiveOrdersLoading: false,
  getAllStoreActiveOrdersSuccess: null,
  getAllStoreActiveOrdersFailed: null,

  getAllStoreStationaryActiveOrdersLoading: false,
  getAllStoreStationaryActiveOrdersSuccess: null,
  getAllStoreStationaryActiveOrdersFailed: null,

  findOrderDetailsLoading: false,
  findOrderDetailsSuccess: null,
  findOrderDetailsFailed: null,

  orderPaymentRequestLoading: false,
  orderPaymentRequestSuccess: null,
  orderPaymentRequestFailed: null,

  findOrderPaymentRequestLoading: false,
  findOrderPaymentRequestSuccess: null,
  findOrderPaymentRequestFailed: null,

  orderPaymentRequestUpdateLoading: false,
  orderPaymentRequestUpdateSuccess: null,
  orderPaymentRequestUpdateFailed: null,

  orderStatusUpdateSuccess: null,
  orderStatusUpdateFailed: null,
  orderStatusUpdateLoading: false,

  qrStatusUpdateSuccess: null,
  qrStatusUpdateFailed: null,
  qrStatusUpdateLoading: false,

  qrValidateSuccess: null,
  qrValidateFailed: null,
  qrValidateLoading: false,

  orderPaymentRequestCancelLoading: false,
  orderPaymentRequestCancelSuccess: null,
  orderPaymentRequestCancelFailed: null,

  orderPaymentRequestCancelNotifyLoading: false,
  orderPaymentRequestCancelNotifySuccess: null,
  orderPaymentRequestCancelNotifyFailed: null,

  findOrderPaymentRequestStatusLoading: false,
  findOrderPaymentRequestStatusSuccess: null,
  // findOrderPaymentRequestStatusReject: null,
  findOrderPaymentRequestStatusFailed: null,

  orderPaymentChargeLoading: false,
  orderPaymentChargeSuccess: null,
  orderPaymentChargeFailed: null,

  findOrderStoreDetailLoading: false,
  findOrderStoreDetailSuccess: null,
  findOrderStoreDetailFailed: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case getAllActiveOrderActionTypes.REQUEST_ACTION:
      return {
        ...state,
        getAllActiveOrdersLoading: true,
        getAllActiveOrdersSuccess: null,
        getAllActiveOrdersFailed: null,
      };
    case getAllActiveOrderActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        getAllActiveOrdersLoading: false,
        getAllActiveOrdersSuccess: action.value,
        getAllActiveOrdersFailed: null,
      };
    case getAllActiveOrderActionTypes.FAILED_ACTION:
      return {
        ...state,
        getAllActiveOrdersLoading: false,
        getAllActiveOrdersSuccess: null,
        getAllActiveOrdersFailed: action.value,
      };

    case getAllStoreActiveOrderActionTypes.REQUEST_ACTION:
      return {
        ...state,
        getAllStoreActiveOrdersLoading: true,
        getAllStoreActiveOrdersSuccess: null,
        getAllStoreActiveOrdersFailed: null,
      };
    case getAllStoreActiveOrderActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        getAllStoreActiveOrdersLoading: false,
        getAllStoreActiveOrdersSuccess: action.value,
        getAllStoreActiveOrdersFailed: null,
      };
    case getAllStoreActiveOrderActionTypes.FAILED_ACTION:
      return {
        ...state,
        getAllStoreActiveOrdersLoading: false,
        getAllStoreActiveOrdersSuccess: null,
        getAllStoreActiveOrdersFailed: action.value,
      };

    case getAllStoreStationaryActiveOrderActionTypes.REQUEST_ACTION:
      return {
        ...state,
        getAllStoreStationaryActiveOrdersLoading: true,
        getAllStoreStationaryActiveOrdersSuccess: null,
        getAllStoreStationaryActiveOrdersFailed: null,
      };
    case getAllStoreStationaryActiveOrderActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        getAllStoreStationaryActiveOrdersLoading: false,
        getAllStoreStationaryActiveOrdersSuccess: action.value,
        getAllStoreStationaryActiveOrdersFailed: null,
      };
    case getAllStoreStationaryActiveOrderActionTypes.FAILED_ACTION:
      return {
        ...state,
        getAllStoreStationaryActiveOrdersLoading: false,
        getAllStoreStationaryActiveOrdersSuccess: null,
        getAllStoreStationaryActiveOrdersFailed: action.value,
      };

    case findOrderDetailsActionTypes.REQUEST_ACTION:
      return {
        ...state,
        findOrderDetailsLoading: true,
        findOrderDetailsSuccess: null,
        findOrderDetailsFailed: null,
      };
    case findOrderDetailsActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        findOrderDetailsLoading: false,
        findOrderDetailsSuccess: action.value,
        findOrderDetailsFailed: null,
      };
    case findOrderDetailsActionTypes.FAILED_ACTION:
      return {
        ...state,
        findOrderDetailsLoading: false,
        findOrderDetailsSuccess: null,
        findOrderDetailsFailed: action.value,
      };

    case orderPaymentRequestActionTypes.REQUEST_ACTION:
      return {
        ...state,
        orderPaymentRequestLoading: true,
        orderPaymentRequestSuccess: null,
        orderPaymentRequestFailed: null,
      };
    case orderPaymentRequestActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        orderPaymentRequestLoading: false,
        orderPaymentRequestSuccess: action.value,
        orderPaymentRequestFailed: null,
      };
    case orderPaymentRequestActionTypes.FAILED_ACTION:
      return {
        ...state,
        orderPaymentRequestLoading: false,
        orderPaymentRequestSuccess: null,
        orderPaymentRequestFailed: action.value,
      };

    case FindOrderPaymentRequestUserActionTypes.REQUEST_ACTION:
      return {
        ...state,
        findOrderPaymentRequestLoading: true,
        findOrderPaymentRequestSuccess: null,
        findOrderPaymentRequestFailed: null,
      };
    case FindOrderPaymentRequestUserActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        findOrderPaymentRequestLoading: false,
        findOrderPaymentRequestSuccess: action.value,
        findOrderPaymentRequestFailed: null,
      };
    case FindOrderPaymentRequestUserActionTypes.FAILED_ACTION:
      return {
        ...state,
        findOrderPaymentRequestLoading: false,
        findOrderPaymentRequestSuccess: null,
        findOrderPaymentRequestFailed: action.value,
      };

    case orderPaymentRequestUpdateActionTypes.REQUEST_ACTION:
      return {
        ...state,
        findOrderPaymentRequestUpdateLoading: true,
        findOrderPaymentRequestUpdateSuccess: null,
        findOrderPaymentRequestUpdateFailed: null,
      };
    case orderPaymentRequestUpdateActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        findOrderPaymentRequestUpdateLoading: false,
        findOrderPaymentRequestUpdateSuccess: action.value,
        findOrderPaymentRequestUpdateFailed: null,
      };
    case orderPaymentRequestUpdateActionTypes.FAILED_ACTION:
      return {
        ...state,
        findOrderPaymentRequestUpdateLoading: false,
        findOrderPaymentRequestUpdateSuccess: null,
        findOrderPaymentRequestUpdateFailed: action.value,
      };

    case orderStatusUpdateActionTypes.REQUEST_ACTION:
      return {
        ...state,
        orderStatusUpdateSuccess: true,
        orderStatusUpdateFailed: null,
        orderStatusUpdateLoading: null,
      };
    case orderStatusUpdateActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        orderStatusUpdateSuccess: false,
        orderStatusUpdateFailed: action.value,
        orderStatusUpdateLoading: null,
      };
    case orderStatusUpdateActionTypes.FAILED_ACTION:
      return {
        ...state,
        orderStatusUpdateSuccess: false,
        orderStatusUpdateFailed: null,
        orderStatusUpdateLoading: action.value,
      };

    case qrUpdateActionTypes.REQUEST_ACTION:
      return {
        ...state,
        qrStatusUpdateSuccess: true,
        qrStatusUpdateFailed: null,
        qrStatusUpdateLoading: null,
      };
    case qrUpdateActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        qrStatusUpdateSuccess: false,
        qrStatusUpdateFailed: action.value,
        qrStatusUpdateLoading: null,
      };
    case qrUpdateActionTypes.FAILED_ACTION:
      return {
        ...state,
        qrStatusUpdateSuccess: false,
        qrStatusUpdateFailed: null,
        qrStatusUpdateLoading: action.value,
      };

    case qrValidateActionTypes.REQUEST_ACTION:
      return {
        ...state,
        qrValidateLoading: true,
        qrValidateSuccess: null,
        qrValidateFailed: null,
      };
    case qrValidateActionTypes.SUCCESS_ACTION:
      return {
        ...state,

        qrValidateLoading: true,
        qrValidateSuccess: action.value,
        qrValidateFailed: null,
      };
    case qrValidateActionTypes.FAILED_ACTION:
      return {
        ...state,
        qrValidateLoading: false,
        qrValidateSuccess: null,
        qrValidateFailed: action.value,
      };

    case orderPaymentRequestCancelActionTypes.REQUEST_ACTION:
      return {
        ...state,
        orderPaymentRequestCancelLoading: true,
        orderPaymentRequestCancelSuccess: null,
        orderPaymentRequestCancelFailed: null,
      };
    case orderPaymentRequestCancelActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        orderPaymentRequestCancelLoading: false,
        orderPaymentRequestCancelSuccess: action.value,
        orderPaymentRequestCancelFailed: null,
      };
    case orderPaymentRequestCancelActionTypes.FAILED_ACTION:
      return {
        ...state,
        orderPaymentRequestCancelLoading: false,
        orderPaymentRequestCancelSuccess: null,
        orderPaymentRequestCancelFailed: action.value,
      };

    case orderPaymentRequestCancelNotifyActionTypes.REQUEST_ACTION:
      return {
        ...state,
        orderPaymentRequestCancelNotifyLoading: true,
        orderPaymentRequestCancelNotifySuccess: null,
        orderPaymentRequestCancelNotifyFailed: null,
      };
    case orderPaymentRequestCancelNotifyActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        orderPaymentRequestCancelNotifyLoading: false,
        orderPaymentRequestCancelNotifySuccess: action.value,
        orderPaymentRequestCancelNotifyFailed: null,
      };
    case orderPaymentRequestCancelNotifyActionTypes.FAILED_ACTION:
      return {
        ...state,
        orderPaymentRequestCancelNotifyLoading: false,
        orderPaymentRequestCancelNotifySuccess: null,
        orderPaymentRequestCancelNotifyFailed: action.value,
      };

    case FindOrderPaymentRequestStatusMerchantActionTypes.REQUEST_ACTION:
      return {
        ...state,
        findOrderPaymentRequestStatusLoading: true,
        findOrderPaymentRequestStatusSuccess: null,
        // findOrderPaymentRequestStatusReject: null,
        findOrderPaymentRequestStatusFailed: null,
      };
    case FindOrderPaymentRequestStatusMerchantActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        findOrderPaymentRequestStatusLoading: false,
        findOrderPaymentRequestStatusSuccess: action.value,
        // findOrderPaymentRequestStatusReject: null,
        findOrderPaymentRequestStatusFailed: null,
      };
    case FindOrderPaymentRequestStatusMerchantActionTypes.FAILED_ACTION:
      return {
        ...state,
        findOrderPaymentRequestStatusLoading: false,
        findOrderPaymentRequestStatusSuccess: null,
        // findOrderPaymentRequestStatusReject: null,
        findOrderPaymentRequestStatusFailed: action.value,
      };

    case orderPaymentChargeActionTypes.REQUEST_ACTION:
      return {
        ...state,
        orderPaymentChargeLoading: true,
        orderPaymentChargeSuccess: null,
        orderPaymentChargeFailed: null,
      };
    case orderPaymentChargeActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        orderPaymentChargeLoading: false,
        orderPaymentChargeSuccess: action.value,
        orderPaymentChargeFailed: null,
      };
    case orderPaymentChargeActionTypes.FAILED_ACTION:
      return {
        ...state,
        orderPaymentChargeLoading: false,
        orderPaymentChargeSuccess: null,
        orderPaymentChargeFailed: action.value,
      };

    case findOrderStoreDetailActionTypes.REQUEST_ACTION:
      return {
        ...state,
        findOrderStoreDetailLoading: true,
        findOrderStoreDetailSuccess: null,
        findOrderStoreDetailFailed: null,
      };
    case findOrderStoreDetailActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        findOrderStoreDetailLoading: false,
        findOrderStoreDetailSuccess: action.value,
        findOrderStoreDetailFailed: null,
      };
    case findOrderStoreDetailActionTypes.FAILED_ACTION:
      return {
        ...state,
        findOrderStoreDetailLoading: false,
        findOrderStoreDetailSuccess: null,
        findOrderStoreDetailFailed: action.value,
      };

    // ** Reset
    case resetorderPaymentRequestMerchantActionTypes.RESET_ACTION:
      return {
        ...state,
        orderPaymentRequestLoading: false,
        orderPaymentRequestSuccess: null,
        orderPaymentRequestFailed: null,
      };

    case resetfindOrderDetailsActionTypes.RESET_ACTION:
      return {
        ...state,
        findOrderDetailsLoading: false,
        findOrderDetailsSuccess: null,
        findOrderDetailsFailed: null,
      };

    case resetfindOrderStoreDetailActionTypes.RESET_ACTION:
      return {
        ...state,
        findOrderStoreDetailLoading: false,
        findOrderStoreDetailSuccess: null,
        findOrderStoreDetailFailed: null,
      };

    //user find Order details reset
    case resetFindOrderPaymentRequestUserActionTypes.RESET_ACTION:
      return {
        ...state,
        findOrderPaymentRequestLoading: false,
        findOrderPaymentRequestSuccess: null,
        findOrderPaymentRequestFailed: null,
      };

    //merchant find Order details reset
    case resetFindOrderPaymentRequestStatusMerchantActionTypes.RESET_ACTION:
      return {
        ...state,

        findOrderPaymentRequestStatusLoading: false,
        findOrderPaymentRequestStatusSuccess: null,
        // findOrderPaymentRequestStatusReject: null,
        findOrderPaymentRequestStatusFailed: null,
      };

    case resetOrderPaymentChargeActionTypes.RESET_ACTION:
      return {
        ...state,
        orderPaymentChargeLoading: false,
        orderPaymentChargeSuccess: null,
        orderPaymentChargeFailed: null,
      };

    case resetOrderPaymentRequestCancelNotifyActionTypes.RESET_ACTION:
      return {
        ...state,
        orderPaymentRequestCancelNotifyLoading: false,
        orderPaymentRequestCancelNotifySuccess: null,
        orderPaymentRequestCancelNotifyFailed: null,
      };

    case resetOrderPaymentRequestCancelActionTypes.RESET_ACTION:
      return {
        ...state,
        orderPaymentRequestCancelLoading: false,
        orderPaymentRequestCancelSuccess: null,
        orderPaymentRequestCancelFailed: null,
      };

    case resetOrderPaymentRequestAcceptActionTypes.RESET_ACTION:
      return {
        ...state,
        orderPaymentRequestUpdateLoading: false,
        orderPaymentRequestUpdateSuccess: null,
        orderPaymentRequestUpdateFailed: null,
      };

    case resetQrValidateActionTypes.RESET_ACTION:
      return {
        ...state,
        qrValidateSuccess: false,
        qrValidateFailed: null,
        qrValidateLoading: null,
      };

    default:
      return state;
  }
};
