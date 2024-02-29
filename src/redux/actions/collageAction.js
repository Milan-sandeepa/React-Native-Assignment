import {getAllCollageUrl} from '../../configurations/urlConfigurations';
import {httpGet} from '../services/httpServices';
import {getCollageActionTypes} from '../types';

// ** get all collages
export const getAllCollageAction = () => {
  return httpGet({
    url: getAllCollageUrl,
    actionTypes: getCollageActionTypes,
  });
};
