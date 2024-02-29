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

const initialState = {
  saveItemLoading: false,
  saveItemSuccess: null,
  saveItemFailed: null,

  findItemDataLoading: false,
  findItemDataSuccess: null,
  findItemDataFailed: null,

  getAllItemLoading: false,
  getAllItemSuccess: null,
  getAllItemFailed: null,

  updateItemLoading: false,
  updateItemSuccess: null,
  updateItemFailed: null,

  deleteItemLoading: false,
  deleteItemSuccess: null,
  deleteItemFailed: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    //  **item save
    case storeItemSaveActionTypes.REQUEST_ACTION:
      return {
        ...state,
        saveItemLoading: true,
        saveItemSuccess: null,
        saveItemFailed: null,
      };
    case storeItemSaveActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        saveItemLoading: false,
        saveItemSuccess: action.value,
        saveItemFailed: null,
      };
    case storeItemSaveActionTypes.FAILED_ACTION:
      return {
        ...state,
        saveItemLoading: false,
        saveItemSuccess: null,
        saveItemFailed: action.value,
      };

    //  **get all items
    case getAllItemActionTypes.REQUEST_ACTION:
      return {
        ...state,
        getAllItemLoading: true,
        getAllItemSuccess: null,
        getAllItemFailed: null,
      };
    case getAllItemActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        getAllItemLoading: false,
        getAllItemSuccess: action.value,
        getAllItemFailed: null,
      };
    case getAllItemActionTypes.FAILED_ACTION:
      return {
        ...state,
        getAllItemLoading: false,
        getAllItemSuccess: null,
        getAllItemFailed: action.value,
      };

    //  **find Item Data
    case findItemDataActionTypes.REQUEST_ACTION:
      return {
        ...state,
        findItemDataLoading: true,
        findItemDataSuccess: null,
        findItemDataFailed: null,
      };
    case findItemDataActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        findItemDataLoading: false,
        findItemDataSuccess: action.value,
        findItemDataFailed: null,
      };
    case findItemDataActionTypes.FAILED_ACTION:
      return {
        ...state,
        findItemDataLoading: false,
        findItemDataSuccess: null,
        findItemDataFailed: action.value,
      };

    //  **update Item Data
    case updateItemDataActionTypes.REQUEST_ACTION:
      return {
        ...state,
        updateItemLoading: true,
        updateItemSuccess: null,
        updateItemFailed: null,
      };
    case updateItemDataActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        updateItemLoading: false,
        updateItemSuccess: action.value,
        updateItemFailed: null,
      };
    case updateItemDataActionTypes.FAILED_ACTION:
      return {
        ...state,
        updateItemLoading: false,
        updateItemSuccess: null,
        updateItemFailed: action.value,
      };

    //  **delete Item
    case deleteItemDataActionTypes.REQUEST_ACTION:
      return {
        ...state,
        deleteItemLoading: true,
        deleteItemSuccess: null,
        deleteItemFailed: null,
      };
    case deleteItemDataActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        deleteItemLoading: false,
        deleteItemSuccess: action.value,
        deleteItemFailed: null,
      };
    case deleteItemDataActionTypes.FAILED_ACTION:
      return {
        ...state,
        deleteItemLoading: false,
        deleteItemSuccess: null,
        deleteItemFailed: action.value,
      };

    // ** Reset
    case resetItemSaveActionTypes.RESET_ACTION:
      return {
        ...state,
        saveItemLoading: false,
        saveItemSuccess: null,
        saveItemFailed: null,
      };

    case resetFindItemActionTypes.RESET_ACTION:
      return {
        ...state,
        findItemDataLoading: false,
        findItemDataSuccess: null,
        findItemDataFailed: null,
      };

    case resetUpdateItemActionTypes.RESET_ACTION:
      return {
        ...state,
        updateItemLoading: false,
        updateItemSuccess: null,
        updateItemFailed: null,
      };

    case resetDeleteItemActionTypes.RESET_ACTION:
      return {
        ...state,
        deleteItemLoading: false,
        deleteItemSuccess: null,
        deleteItemFailed: null,
      };

    default:
      return state;
  }
};
