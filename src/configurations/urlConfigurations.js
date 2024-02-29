// ** Base API
import {chargeFromUserActionTypes} from '../redux/types';

export const baseUrl = 'http://192.168.8.193:8024';
// export const baseUrl = 'http://103.125.216.56:8023';

// ** refresh token API
export const refreshTokenUrl = '/auth/api/v1/refreshToken';

// ** auth API
export const signInUrl = '/auth/api/v1/signIn';
export const signUpUrl = '/auth/api/v1/signUp';
export const getAllCollageUrl = '/collage/api/v1/collage-getAll';
export const forgotPasswordUrl = '/auth/api/v1/forgetPassword/';
export const changePasswordUrl = '/auth/api/v1/resetPassword';
export const verifyUserAccountUrl = '/auth/api/v1/verifyEmail';
export const resendVerifyEmailUrl = '/auth/api/v1/resendVerifyEmail/';
// ** profile
export const updatePasswordUrl = '/profile/api/v1/changePassword';
export const updateProfileUrl = '/profile/api/v1/updateProfile';
export const getProfileDataUrl = '/profile/api/v1/getDetails/';
// ** report
export const studentWalletUrl = '/report/api/v1/user/wallet';
export const studentExpensesUrl = '/report/api/v1/user/expenses';
export const merchantIncomeUrl = '/report/api/v1/merchant/income';
export const merchantWithdrawUrl = '/report/api/v1/merchant/withdraw/history';
// ** payment
export const refreshCoinsUrl = '/payment/api/v1/refreshCoins/'; // student only
export const addNewPaymentUrl = '/payment/api/v1/add-upi-payment'; // student only
export const chargeFromUserUrl = '/payment/api/v1/merchant/charge/user';
export const chargeFromStudentrUrl = '/payment/api/v1/merchant/charge/student';
export const merchantCoinsRequestSaveUrl =
  '/payment/api/v1/merchant/charge/request-save';

export const statusCheckUrl = '/payment/api/v1/merchant/charge/request-status';
export const getPaymentCancelNotifyUrl =
  '/payment/api/v1/merchant/charge/request-cancel-status';

export const merchantCoinsRequestUrl =
  '/payment/api/v1/merchant/charge/user/requestCoin/';
export const merchantCoinsTransfertUrl =
  '/payment/api/v1/merchant/charge/user/requestCoinTransfer';
export const merchantCoinsTransferRejectUrl =
  '/payment/api/v1/merchant/charge/user/requestCoinTransferReject';
export const paymentUnsuccessfulUrl =
  '/payment/api/v1/add-upi-payment-unsuccessful';
export const withdrawCoinsUrl = '/payment/api/v1/merchant/withdraw';

//storeAPI
export const storeSaveItemUrl = '/store/api/v1/save-item';
export const getAllItemUrl = '/store/api/v1/get-all-items';
export const findItemUrl = '/store/api/v1/find-item';
export const updateItemUrl = '/store/api/v1/update-item';
export const deleteItemUrl = '/store/api/v1/delete-item';

//stationaryAPI
export const stationrySaveItemUrl = '/stationary/api/v1/save-item';
export const getAllStationaryItemUrl = '/stationary/api/v1/get-all-items';
export const findStationaryItemUrl = '/stationary/api/v1/find-item';
export const updateStationaryItemUrl = '/stationary/api/v1/update-item';
export const deleteStationaryItemUrl = '/stationary/api/v1/delete-item';
export const stationaryPlaceOrderRequestUrl =
  '/stationary/api/v1/placeOrderRequest';
export const fileUploadUrl = '/stationary/api/v1/file-upload';

//shopAPI
export const getAllShopsUrl = '/shop/api/v1/get-all-shops/';
export const findShopUrl = '/shop/api/v1/find-shop/';
export const getAllAvailbleItemsUrl = '/shop/api/v1/get-all-available-items';

//orderAPI
export const placeOrderRequestUrl = '/order/api/v1/student/placeOrderRequest';
export const getAllActiveOrdersUrl = '/order/api/v1/get-all-active-orders';
export const getAllStoreFoodActiveOrdersUrl =
  '/order/api/v1/get-all-store-food-active-orders';
export const getAllStoreStationaryActiveOrdersUrl =
  '/order/api/v1/get-all-store-stationary-active-orders';
export const findOrderDetailsUrl = '/order/api/v1/find-order';
export const orderPaymentRequestMerchantSaveUrl =
  '/order/api/v1/merchant/order-payment-request';
export const findOrderPaymentRequestUserUrl =
  '/order/api/v1/user/get-order-payment-request';

export const orderPaymentRequestUserUpdateUrl =
  '/order/api/v1/user/order-payment-request-status-update';

export const orderPaymentRequestCancelUrl =
  '/order/api/v1/user/order-payment-request-cancel';

export const getOrderPaymentRequestStatusMerchantUrl =
  '/order/api/v1/merchant/order-payment-request-status';

export const getPaymentCancelMerchantUrl =
  '/order/api/v1/merchant/order-payment-request-cancel-status';

export const orderPaymentChargeUrl =
  '/order/api/v1/merchant/order-payment-charge';

export const orderSatusUpdateUrl = '/order/api/v1/user/order-status-update';
export const qrSatusUpdateUrl = '/order/api/v1/user/qr-status-update';
export const qrValidateUrl = '/order/api/v1/user/qr-validate';
export const userCheckUrl = '/auth/api/v1/userChecking';
export const userResetPinUrl = '/auth/api/v1/userResetPin';
export const fcmTokenUpdateUrl = '/auth/api/v1/fcmTokenUpdate';
