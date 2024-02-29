import {getCollageActionTypes} from '../types';

const initialState = {
  getCollageLoading: false,
  getCollageSuccess: null,
  getCollageFailed: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    //  get collage data
    case getCollageActionTypes.REQUEST_ACTION:
      return {
        ...state,
        getCollageLoading: true,
        getCollageSuccess: null,
        getCollageFailed: null,
      };
    case getCollageActionTypes.SUCCESS_ACTION:
      return {
        ...state,
        getCollageLoading: false,
        getCollageSuccess: action.value,
        getCollageFailed: null,
      };
    case getCollageActionTypes.FAILED_ACTION:
      return {
        ...state,
        getCollageLoading: false,
        getCollageSuccess: null,
        getCollageFailed: action.value,
      };

    // ** Reset

    default:
      return state;
  }
};
