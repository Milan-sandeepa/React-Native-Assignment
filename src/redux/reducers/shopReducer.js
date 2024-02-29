import {
  addToCartActionTypes,
  findShopDataActionTypes,
  getAllAvailableItemsActionTypes,
  getAllAvailableStationaryItemActionTypes,
  getAllShopDataActionTypes,
  resetFindItemActionTypes,
  resetFindShopActionTypes,
} from '../types';

const initialState = {
  getAllShopLoading: false,
  getAllShopSuccess: null,
  getAllShopFailed: null,

  getAllAvalableItemsLoading: false,
  getAllAvalableItemsSuccess: null,
  getAllAvalableItemsFailed: null,

  getAllAvalableStationaryItemsLoading: false,
  getAllAvalableStationaryItemsSuccess: null,
  getAllAvalableStationaryItemsFailed: null,

  findShopLoading: false,
  findShopSuccess: null,
  findShopFailed: null,

  cartItems: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    //  **get All shops
    case getAllShopDataActionTypes.REQUEST_ACTION:
      return {
        ...state,
        getAllShopLoading: true,
        getAllShopSuccess: null,
        getAllShopFailed: null,
      };
    case getAllShopDataActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        getAllShopLoading: false,
        getAllShopSuccess: action.value,
        getAllShopFailed: null,
      };
    case getAllShopDataActionTypes.FAILED_ACTION:
      return {
        ...state,
        getAllShopLoading: false,
        getAllShopSuccess: null,
        getAllShopFailed: action.value,
      };

    //  **get All Avalable Items
    case getAllAvailableItemsActionTypes.REQUEST_ACTION:
      return {
        ...state,
        getAllAvalableItemsLoading: true,
        getAllAvalableItemsSuccess: null,
        getAllAvalableItemsFailed: null,
      };
    case getAllAvailableItemsActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        getAllAvalableItemsLoading: false,
        getAllAvalableItemsSuccess: action.value,
        getAllAvalableItemsFailed: null,
      };
    case getAllAvailableItemsActionTypes.FAILED_ACTION:
      return {
        ...state,
        getAllAvalableItemsLoading: false,
        getAllAvalableItemsSuccess: null,
        getAllAvalableItemsFailed: action.value,
      };

    //  **get All Avalable Stationary Items
    case getAllAvailableStationaryItemActionTypes.REQUEST_ACTION:
      return {
        ...state,
        getAllAvalableStationaryItemsLoading: true,
        getAllAvalableStationaryItemsSuccess: null,
        getAllAvalableStationaryItemsFailed: null,
      };
    case getAllAvailableStationaryItemActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        getAllAvalableStationaryItemsLoading: false,
        getAllAvalableStationaryItemsSuccess: action.value,
        getAllAvalableStationaryItemsFailed: null,
      };
    case getAllAvailableStationaryItemActionTypes.FAILED_ACTION:
      return {
        ...state,
        getAllAvalableStationaryItemsLoading: false,
        getAllAvalableStationaryItemsSuccess: null,
        getAllAvalableStationaryItemsFailed: action.value,
      };

    //  **find shop student
    case findShopDataActionTypes.REQUEST_ACTION:
      return {
        ...state,
        findShopLoading: true,
        findShopSuccess: null,
        findShopFailed: null,
      };
    case findShopDataActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        findShopLoading: false,
        findShopSuccess: action.value,
        findShopFailed: null,
      };
    case findShopDataActionTypes.FAILED_ACTION:
      return {
        ...state,
        findShopLoading: false,
        findShopSuccess: null,
        findShopFailed: action.value,
      };

    //** Add to Cart

    case addToCartActionTypes.SUCCESS_ACTION:
      const newItem = {
        item: action.payload.item,
        quantity: action.payload.quantity,
      };
      return {
        ...state,
        cartItems: [...state.cartItems, newItem],
      };

    // ** Reset
    case resetFindShopActionTypes.RESET_ACTION:
      return {
        ...state,
        findShopLoading: false,
        findShopSuccess: null,
        findShopFailed: null,
      };

    default:
      return state;
  }
};
