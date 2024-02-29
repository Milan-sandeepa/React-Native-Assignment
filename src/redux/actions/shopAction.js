import {
  findShopUrl,
  getAllAvailbleItemsUrl,
  getAllShopsUrl,
  getAllStationaryItemUrl,
} from '../../configurations/urlConfigurations';
import {httpGet, httpPost} from '../services/httpServices';
import {
  addToCartActionTypes,
  findShopDataActionTypes,
  getAllAvailableItemsActionTypes,
  getAllAvailableStationaryItemActionTypes,
  getAllShopDataActionTypes,
  resetFindShopActionTypes,
} from '../types';

// ** get all shops
export const getAllShopAction = mail => {
  return httpGet({
    url: getAllShopsUrl + mail,
    actionTypes: getAllShopDataActionTypes,
    isAuth: true,
  });
};
// ** get all Avalable Items
export const getAllAvailableItemAction = data => {
  return httpPost({
    url: getAllAvailbleItemsUrl,
    data,
    actionTypes: getAllAvailableItemsActionTypes,
    isAuth: true,
  });
};

// ** get all Avalable Stationary Items
export const getAllAvailableStationaryItemAction = data => {
  return httpPost({
    url: getAllStationaryItemUrl,
    data,
    actionTypes: getAllAvailableStationaryItemActionTypes,
    isAuth: true,
  });
};

// ** find shop student
export const findShopAction = mail => {
  return httpGet({
    url: findShopUrl + mail,
    actionTypes: findShopDataActionTypes,
    isAuth: true,
  });
};

export const resetFindShopAction = () => {
  return {
    type: resetFindShopActionTypes.RESET_ACTION,
  };
};

// ** add to cart
export const addToCartAction = (item, quantity) => {
  return {
    actionTypes: addToCartActionTypes,
    payload: {item, quantity},
  };
};
