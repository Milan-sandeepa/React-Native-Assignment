import {
  addNewPaymentUrl,
  chargeFromStudentrUrl,
  chargeFromUserUrl,
  getPaymentCancelNotifyUrl,
  merchantCoinsRequestSaveUrl,
  merchantCoinsRequestUrl,
  merchantCoinsTransferRejectUrl,
  merchantCoinsTransfertUrl,
  refreshCoinsUrl,
  statusCheckUrl,
  withdrawCoinsUrl,
} from '../../configurations/urlConfigurations';
import {httpGet, httpPost, httpPut} from '../services/httpServices';
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

export const chargeFromUserAction = data => {
  return httpPost({
    url: chargeFromUserUrl,
    actionTypes: chargeFromUserActionTypes,
    data,
    isAuth: true,
  });
};

export const chargeFromStudentAction = data => {
  return httpPost({
    url: chargeFromStudentrUrl,
    actionTypes: paymentChargeStudentActionTypes,
    data,
    isAuth: true,
  });
};

export const withdrawCoinsAction = data => {
  return httpPost({
    url: withdrawCoinsUrl,
    actionTypes: withdrawCoinsActionTypes,
    data,
    isAuth: true,
  });
};

export const addNewPaymentAction = data => {
  return httpPost({
    url: addNewPaymentUrl,
    actionTypes: addNewPaymentActionTypes,
    data,
    isAuth: true,
  });
};

export const getRefreshCoinsAction = mail => {
  return httpGet({
    url: refreshCoinsUrl + mail,
    actionTypes: refreshCoinsActionTypes,
    isAuth: true,
  });
};

export const merchantCoinRequestSaveAction = data => {
  return httpPost({
    url: merchantCoinsRequestSaveUrl,
    actionTypes: merchantCoinRequestSaveActionTypes,
    data,
    isAuth: true,
  });
};

export const findCoinStatusAction = data => {
  return httpPost({
    url: statusCheckUrl,
    actionTypes: findCoinStatusActionTypes,
    data,
    isAuth: true,
  });
};

export const coinRequestCancelNotifyAction = data => {
  return httpPost({
    url: getPaymentCancelNotifyUrl,
    actionTypes: coinRequestCancelNotifyActionTypes,
    data,
    isAuth: true,
  });
};

export const getMerchantCoinsRequestAction = mail => {
  return httpGet({
    url: merchantCoinsRequestUrl + mail,
    actionTypes: merchantCoinRequestActionTypes,
    isAuth: true,
  });
};

export const merchantCoinTransferAction = data => {
  return httpPut({
    url: merchantCoinsTransfertUrl,
    actionTypes: merchantCoinTransferActionTypes,
    data,
    isAuth: true,
  });
};

export const merchantCoinTransferRejectAction = data => {
  return httpPut({
    url: merchantCoinsTransferRejectUrl,
    actionTypes: merchantCoinTransferRejectActionTypes,
    data,
    isAuth: true,
  });
};

export const resetPaymentAction = () => {
  return {
    type: resetPaymentActionTypes.RESET_ACTION,
  };
};
