import {
  RESET_ITEM_TYPE,
  RESET_ORDER_TYPE,
  placeOrderActionTypes,
  placeOrderStationaryActionTypes,
  resetCartActionTypes,
  resetPlaceOrderActionTypes,
  resetPlaceOrderStationaryActionTypes,
  updateCartItemQuantityTypes,
  updateItemDataActionTypes,
} from '../types';

const initialState = {
  cartItems: [],

  placeOrderLoading: false,
  placeOrderSuccess: null,
  placeOrderFailed: null,

  stationaryPlaceOrderLoading: false,
  stationaryPlaceOrderSuccess: null,
  stationaryPlaceOrderFailed: null,

  orderType: null,

  itemType: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newItem = action.payload.item;
      const existingItem = state.cartItems.find(item => item.id === newItem.id);
      if (existingItem) {
        // If the item already exists in the cart, update its quantity
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === newItem.id
              ? {...item, quantity: item.quantity + action.payload.quantity}
              : item,
          ),
        };
      } else {
        // If the item doesn't exist in the cart, add it
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            {...newItem, quantity: action.payload.quantity},
          ],
        };
      }

    case updateCartItemQuantityTypes.REQUEST_ACTION:
      return {
        ...state,
        cartItems: action.payload,
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };

    case placeOrderActionTypes.REQUEST_ACTION:
      return {
        ...state,
        placeOrderLoading: true,
        placeOrderSuccess: null,
        placeOrderFailed: null,
      };
    case placeOrderActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        placeOrderLoading: false,
        placeOrderSuccess: action.value,
        placeOrderFailed: null,
      };
    case placeOrderActionTypes.FAILED_ACTION:
      return {
        ...state,
        placeOrderLoading: false,
        placeOrderSuccess: null,
        placeOrderFailed: action.value,
      };

    case placeOrderStationaryActionTypes.REQUEST_ACTION:
      return {
        ...state,
        stationaryPlaceOrderLoading: true,
        stationaryPlaceOrderSuccess: null,
        stationaryPlaceOrderFailed: null,
      };
    case placeOrderStationaryActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        stationaryPlaceOrderLoading: false,
        stationaryPlaceOrderSuccess: action.value,
        stationaryPlaceOrderFailed: null,
      };
    case placeOrderStationaryActionTypes.FAILED_ACTION:
      return {
        ...state,
        stationaryPlaceOrderLoading: false,
        stationaryPlaceOrderSuccess: null,
        stationaryPlaceOrderFailed: action.value,
      };

    case 'SET_ORDER_TYPE':
      return {
        ...state,
        orderType: action.payload,
      };

    case 'SET_ITEM_TYPE':
      return {
        ...state,
        itemType: action.payload,
      };

    // ** Reset
    case resetCartActionTypes.RESET_ACTION:
      return {
        ...state,
        cartItems: [],
      };

    case resetPlaceOrderActionTypes.RESET_ACTION:
      return {
        ...state,
        placeOrderLoading: false,
        placeOrderSuccess: null,
        placeOrderFailed: null,
      };

    case resetPlaceOrderStationaryActionTypes.RESET_ACTION:
      return {
        ...state,
        stationaryPlaceOrderLoading: false,
        stationaryPlaceOrderSuccess: null,
        stationaryPlaceOrderFailed: null,
      };

    case RESET_ORDER_TYPE:
      return {
        ...state,
        orderType: null, // Reset orderType to its initial state
      };

    case RESET_ITEM_TYPE:
      return {
        ...state,
        itemType: null, // Reset itemType to its initial state
      };

    default:
      return state;
  }
};
