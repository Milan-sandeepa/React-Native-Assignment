import {
  placeOrderRequestUrl,
  stationaryPlaceOrderRequestUrl,
} from '../../configurations/urlConfigurations';
import {httpPost} from '../services/httpServices';
import {
  RESET_ITEM_TYPE,
  RESET_ORDER_TYPE,
  placeOrderActionTypes,
  placeOrderStationaryActionTypes,
  resetCartActionTypes,
  resetPlaceOrderActionTypes,
  resetPlaceOrderStationaryActionTypes,
  updateCartItemQuantity,
  updateCartItemQuantityTypes,
} from '../types';

export const addToCart = (item, quantity) => ({
  type: 'ADD_TO_CART',
  payload: {item, quantity},
});

// update cart
export const updateCartItemAction = updatedCartItems => ({
  type: updateCartItemQuantityTypes.REQUEST_ACTION,
  payload: updatedCartItems,
});
export const removeFromCart = itemId => ({
  type: 'REMOVE_FROM_CART',
  payload: itemId,
});

// ** place Order request action
export const placeOrderRequestAction = data => {
  return httpPost({
    url: placeOrderRequestUrl,
    actionTypes: placeOrderActionTypes,
    data,
    isAuth: true,
  });
};

// ** place Order stationary request action
export const placeOrderStationaryRequestAction = data => {
  return httpPost({
    url: stationaryPlaceOrderRequestUrl,
    actionTypes: placeOrderStationaryActionTypes,
    data,
    isFormData: true,
    isAuth: true,
  });
};

export const setOrderType = orderType => ({
  type: 'SET_ORDER_TYPE',
  payload: orderType,
});

export const setItemType = itemType => ({
  type: 'SET_ITEM_TYPE',
  payload: itemType,
});

export const resetCartAction = () => {
  return {
    type: resetCartActionTypes.RESET_ACTION,
  };
};

export const resetPlaceOrderAction = () => {
  return {
    type: resetPlaceOrderActionTypes.RESET_ACTION,
  };
};

export const resetPlaceOrderStationaryAction = () => {
  return {
    type: resetPlaceOrderStationaryActionTypes.RESET_ACTION,
  };
};

export const resetOrderType = () => ({
  type: RESET_ORDER_TYPE,
});

export const resetItemType = () => ({
  type: RESET_ITEM_TYPE,
});
