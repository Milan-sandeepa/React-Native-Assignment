import {
  fileUploadActionTypes,
  resetUploadActionTypes,
  resetUploadSelectActionTypes,
} from '../types';

const initialState = {
  selectFiles: [],

  fileUploadLoading: false,
  fileUploadSuccess: null,
  fileUploadFailed: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_FILE':
      const newFile = action.payload.item;

      return {
        ...state,
        selectFiles: [
          ...state.selectFiles,
          {...newFile, quantity: action.payload.quantity},
        ],
      };

    case fileUploadActionTypes.REQUEST_ACTION:
      return {
        ...state,
        fileUploadLoading: true,
        fileUploadSuccess: null,
        fileUploadFailed: null,
      };
    case fileUploadActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        fileUploadLoading: false,
        fileUploadSuccess: action.value,
        fileUploadFailed: null,
      };
    case fileUploadActionTypes.FAILED_ACTION:
      return {
        ...state,
        fileUploadLoading: false,
        fileUploadSuccess: null,
        fileUploadFailed: action.value,
      };

    // // ** Reset
    case resetUploadSelectActionTypes.RESET_ACTION:
      return {
        ...state,
        selectFiles: [],
      };

    default:
      return state;
  }
};
