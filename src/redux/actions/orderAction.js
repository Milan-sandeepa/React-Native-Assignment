import {
  findOrderDetailsUrl,
  findOrderPaymentRequestUserUrl,
  getAllActiveOrdersUrl,
  getAllStoreActiveOrdersUrl,
  getAllStoreFoodActiveOrdersUrl,
  getAllStoreStationaryActiveOrdersUrl,
  getOrderPaymentRequestStatusMerchantUrl,
  getPaymentCancelMerchantUrl,
  orderPaymentChargeUrl,
  orderPaymentRequestCancelUrl,
  orderPaymentRequestMerchantSaveUrl,
  orderPaymentRequestMerchantUrl,
  orderPaymentRequestUrl,
  orderPaymentRequestUserUpdateUrl,
  orderSatusUpdateUrl,
  qrSatusUpdateUrl,
  qrValidateUrl,
} from '../../configurations/urlConfigurations';
import {httpGet, httpPost, httpPut} from '../services/httpServices';
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

export const getAllActiveOrdersAction = data => {
  return httpPost({
    url: getAllActiveOrdersUrl,
    actionTypes: getAllActiveOrderActionTypes,
    data,
    isAuth: true,
  });
};

export const getAllStoreFoodActiveOrdersAction = data => {
  return httpPost({
    url: getAllStoreFoodActiveOrdersUrl,
    actionTypes: getAllStoreActiveOrderActionTypes,
    data,
    isAuth: true,
  });
};

export const getAllStoreStationaryActiveOrdersAction = data => {
  return httpPost({
    url: getAllStoreStationaryActiveOrdersUrl,
    actionTypes: getAllStoreStationaryActiveOrderActionTypes,
    data,
    isAuth: true,
  });
};

export const findOrderDetailsAction = data => {
  return httpPost({
    url: findOrderDetailsUrl,
    actionTypes: findOrderDetailsActionTypes,
    data,
    isAuth: true,
  });
};

export const findOrderStoreDetailAction = data => {
  return httpPost({
    url: findOrderDetailsUrl,
    actionTypes: findOrderStoreDetailActionTypes,
    data,
    isAuth: true,
  });
};

export const orderPaymentRequestMerchantAction = data => {
  return httpPost({
    url: orderPaymentRequestMerchantSaveUrl,
    actionTypes: orderPaymentRequestActionTypes,
    data,
    isAuth: true,
  });
};

export const findOrderPaymentRequestUserAction = data => {
  return httpPost({
    url: findOrderPaymentRequestUserUrl,
    actionTypes: FindOrderPaymentRequestUserActionTypes,
    data,
    isAuth: true,
  });
};

export const orderPaymentRequestAcceptAction = data => {
  return httpPut({
    url: orderPaymentRequestUserUpdateUrl,
    actionTypes: orderPaymentRequestUpdateActionTypes,
    data,
    isAuth: true,
  });
};

export const orderStatusUpdateAction = data => {
  return httpPut({
    url: orderSatusUpdateUrl,
    actionTypes: orderStatusUpdateActionTypes,
    data,
    isAuth: true,
  });
};

export const qrStatusUpdateAction = data => {
  return httpPut({
    url: qrSatusUpdateUrl,
    actionTypes: qrUpdateActionTypes,
    data,
    isAuth: true,
  });
};

export const qrValidateAction = data => {
  return httpPost({
    url: qrValidateUrl,
    actionTypes: qrValidateActionTypes,
    data,
    isAuth: true,
  });
};

export const orderPaymentRequestCancelAction = data => {
  return httpPut({
    url: orderPaymentRequestCancelUrl,
    actionTypes: orderPaymentRequestCancelActionTypes,
    data,
    isAuth: true,
  });
};

export const FindOrderPaymentRequestStatusMerchantAction = data => {
  return httpPost({
    url: getOrderPaymentRequestStatusMerchantUrl,
    actionTypes: FindOrderPaymentRequestStatusMerchantActionTypes,
    data,
    isAuth: true,
  });
};

export const orderPaymentRequestCancelNotifyAction = data => {
  return httpPost({
    url: getPaymentCancelMerchantUrl,
    actionTypes: orderPaymentRequestCancelNotifyActionTypes,
    data,
    isAuth: true,
  });
};

export const orderPaymentChargeAction = data => {
  return httpPost({
    url: orderPaymentChargeUrl,
    actionTypes: orderPaymentChargeActionTypes,
    data,
    isAuth: true,
  });
};

export const resetfindOrderDetailsAction = () => {
  return {
    type: resetfindOrderDetailsActionTypes.RESET_ACTION,
  };
};

export const resetOrderPaymentRequestMerchantAction = () => {
  return {
    type: resetorderPaymentRequestMerchantActionTypes.RESET_ACTION,
  };
};

export const resetFindOrderPaymentRequestUserAction = () => {
  return {
    type: resetFindOrderPaymentRequestUserActionTypes.RESET_ACTION,
  };
};

export const resetFindOrderPaymentRequestStatusMerchantAction = () => {
  return {
    type: resetFindOrderPaymentRequestStatusMerchantActionTypes.RESET_ACTION,
  };
};

export const resetOrderPaymentChargeAction = () => {
  return {
    type: resetOrderPaymentChargeActionTypes.RESET_ACTION,
  };
};

export const resetOrderPaymentRequestCancelNotifyAction = () => {
  return {
    type: resetOrderPaymentRequestCancelNotifyActionTypes.RESET_ACTION,
  };
};

export const resetOrderPaymentRequestCancelAction = () => {
  return {
    type: resetOrderPaymentRequestCancelActionTypes.RESET_ACTION,
  };
};

export const resetOrderPaymentRequestAcceptAction = () => {
  return {
    type: resetOrderPaymentRequestAcceptActionTypes.RESET_ACTION,
  };
};

export const resetQrValidationAction = () => {
  return {
    type: resetQrValidateActionTypes.RESET_ACTION,
  };
};

export const resetFindOrderStoreDetailAction = () => {
  return {
    type: resetfindOrderStoreDetailActionTypes.RESET_ACTION,
  };
};
