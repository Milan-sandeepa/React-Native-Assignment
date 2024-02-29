import {
  deleteItemUrl,
  findItemUrl,
  getAllItemUrl,
  storeSaveItemUrl,
  updateItemUrl,
} from '../../configurations/urlConfigurations';
import {httpDelete, httpGet, httpPost, httpPut} from '../services/httpServices';
import {
  deleteItemDataActionTypes,
  findItemDataActionTypes,
  getAllItemActionTypes,
  resetDeleteItemActionTypes,
  resetFindItemActionTypes,
  resetItemSaveActionTypes,
  resetUpdateItemActionTypes,
  storeItemSaveActionTypes,
  updateItemDataActionTypes,
} from '../types';

// ** save Item
export const storeSaveItemAction = data => {
  return httpPost({
    url: storeSaveItemUrl,
    actionTypes: storeItemSaveActionTypes,
    data,
    isFormData: true,
    isAuth: true,
  });
};

// ** get all items
export const getAllItemAction = data => {
  return httpPost({
    url: getAllItemUrl,
    data,
    actionTypes: getAllItemActionTypes,
    isAuth: true,
  });
};

// ** find item data
export const findItemDataAction = data => {
  return httpPost({
    url: findItemUrl,
    data,
    actionTypes: findItemDataActionTypes,
    isAuth: true,
  });
};

// ** update Item
export const updateItemDataAction = data => {
  return httpPut({
    url: updateItemUrl,
    actionTypes: updateItemDataActionTypes,
    data,
    isFormData: true,
    isAuth: true,
  });
};

// ** delete item data
export const deleteItemDataAction = data => {
  return httpDelete({
    url: deleteItemUrl,
    data,
    actionTypes: deleteItemDataActionTypes,
    isAuth: true,
  });
};

// ** store reset
export const resetStoreAction = () => {
  return {
    type: resetItemSaveActionTypes.RESET_ACTION,
  };
};

export const resetFindItemAction = () => {
  return {
    type: resetFindItemActionTypes.RESET_ACTION,
  };
};

export const resetUpdateItemAction = () => {
  return {
    type: resetUpdateItemActionTypes.RESET_ACTION,
  };
};

export const resetDeleteItemAction = () => {
  return {
    type: resetDeleteItemActionTypes.RESET_ACTION,
  };
};
