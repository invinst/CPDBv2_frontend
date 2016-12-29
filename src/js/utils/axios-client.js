import axios from 'axios';
import Cookies from 'js-cookie';

import { V1_ROOT_PATH } from 'utils/constants';


export const clientConfig = {
  baseURL: V1_ROOT_PATH,
  responseType: 'json',
  headers: {
    common: {
      'X-CSRFToken': Cookies.get('csrftoken')
    }
  }
};

const client = axios.create(clientConfig);

export default client;
