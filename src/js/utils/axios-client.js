import axios from 'axios';
import Cookies from 'js-cookie';


let API_ROOT = '/api/v1/';
if (global.DEVELOPMENT) {
  /* istanbul ignore next */
  API_ROOT = 'http://localhost:8000/api/v1/';
}

export const clientConfig = {
  baseURL: API_ROOT,
  responseType: 'json',
  headers: {
    common: {
      'X-CSRFToken': Cookies.get('csrftoken')
    }
  }
};

const client = axios.create(clientConfig);
export default client;
