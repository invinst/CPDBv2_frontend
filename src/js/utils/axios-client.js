import axios from 'axios';
import Cookies from 'js-cookie';

import { V1_ROOT_PATH, BASE_PATH } from 'utils/constants';


export const clientConfig = {
  baseURL: V1_ROOT_PATH,
  responseType: 'json',
  withCredentials: true,
  headers: {
    common: {
      'X-CSRFToken': Cookies.get('csrftoken')
    }
  }
};

const client = axios.create(clientConfig);

/* istanbul ignore next */
// remove csrftoken header if requesting resources not from our site
client.interceptors.request.use(function (config) {
  if (!config.url.startsWith(BASE_PATH)) {
    delete config.headers.common['X-CSRFToken'];
  }
  return config;
});

export const cancelledByUser = reason => {
  if (reason.payload.message !== 'Cancelled by user') {
    throw reason;
  }
};

export default client;
