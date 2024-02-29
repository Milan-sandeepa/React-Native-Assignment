import {combineReducers} from 'redux';

import authReducer from './authReducer';
import profileReducer from './profileReducer';
import reportReducer from './reportReducer';
import paymentReducer from './paymentReducer';
import storeReducer from './storeReducer';
import stationaryReducer from './stationaryReducer';
import shopReducer from './shopReducer';
import cartReducer from './cartReducer ';
import orderReducer from './orderReducer';
import collageReducer from './collageReducer';
import fileUploadReducer from './fileUploadReducer';

export default combineReducers({
  authState: authReducer,
  profileState: profileReducer,
  reportState: reportReducer,
  paymentState: paymentReducer,
  storeState: storeReducer,
  stationaryState: stationaryReducer,
  shopState: shopReducer,
  cartState: cartReducer,
  orderState: orderReducer,
  collageState: collageReducer,
  fileUploadState: fileUploadReducer,
});
