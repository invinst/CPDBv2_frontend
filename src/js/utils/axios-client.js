import axios from 'axios';
import Cookies from 'js-cookie';


let API_ROOT = '/api/v1/';
let API_ROOT_V2 = `${global.location.origin}/api/v2/`;
if (global.DEVELOPMENT) {
  /* istanbul ignore next */
  const LOCAL_BASE_PATH = 'http://localhost:8000';
  const APIARY_MOCK_PATH = 'http://private-12e3f0-cpdp.apiary-mock.com/';
  API_ROOT = `${LOCAL_BASE_PATH}/api/v1/`;
  API_ROOT_V2 = APIARY_MOCK_PATH;
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

export const V2_ROOT_PATH = API_ROOT_V2;
