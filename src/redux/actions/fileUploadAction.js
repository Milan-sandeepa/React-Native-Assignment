import {fileUploadUrl} from '../../configurations/urlConfigurations';
import {httpPost} from '../services/httpServices';
import {
  fileUploadActionTypes,
  resetUploadActionTypes,
  resetUploadSelectActionTypes,
} from '../types';

export const selectFileAction = item => ({
  type: 'SELECT_FILE',
  payload: {item},
});

export const fileUploadAction = data => {
  return httpPost({
    url: fileUploadUrl,
    actionTypes: fileUploadActionTypes,
    data,
    isFormData: true,
    isAuth: true,
  });
};

export const resetSelectFileAction = () => ({
  type: resetUploadSelectActionTypes.RESET_ACTION,
});
