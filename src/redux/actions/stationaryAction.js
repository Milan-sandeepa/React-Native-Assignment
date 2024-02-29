import {
  deleteStationaryItemUrl,
  getAllStationaryItemUrl,
  stationrySaveItemUrl,
  updateStationaryItemUrl,
} from '../../configurations/urlConfigurations';
import {httpDelete, httpPost, httpPut} from '../services/httpServices';
import {
  deleteItemDataActionTypes,
  getAllItemActionTypes,
  resetDeleteStationaryItemActionTypes,
  resetStationaryItemSaveActionTypes,
  resetUpdateStationaryItemActionTypes,
  storeItemSaveActionTypes,
  updateItemDataActionTypes,
} from '../types';

// ** get all items
export const getAllStationaryItemAction = data => {
  return httpPost({
    url: getAllStationaryItemUrl,
    data,
    actionTypes: getAllItemActionTypes,
    isAuth: true,
  });
};

// ** save Item
export const stationarySaveItemAction = data => {
  return httpPost({
    url: stationrySaveItemUrl,
    actionTypes: storeItemSaveActionTypes,
    data,
    isFormData: true,
    isAuth: true,
  });
};

// ** update Item
export const updateStationaryItemDataAction = data => {
  return httpPut({
    url: updateStationaryItemUrl,
    actionTypes: updateItemDataActionTypes,
    data,
    isFormData: true,
    isAuth: true,
  });
};

// ** delete item data
export const deleteStationaryItemDataAction = data => {
  return httpDelete({
    url: deleteStationaryItemUrl,
    data,
    actionTypes: deleteItemDataActionTypes,
    isAuth: true,
  });
};

// ** reset stationary
export const resetStationaryStoreAction = () => {
  return {
    type: resetStationaryItemSaveActionTypes.RESET_ACTION,
  };
};

export const resetUpdateStationaryItemAction = () => {
  return {
    type: resetUpdateStationaryItemActionTypes.RESET_ACTION,
  };
};

export const resetDeleteStationaryItemAction = () => {
  return {
    type: resetDeleteStationaryItemActionTypes.RESET_ACTION,
  };
};
