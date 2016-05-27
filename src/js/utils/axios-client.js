import axios from 'axios';


let API_ROOT = '/api/v1/';
if (global.DEVELOPMENT) {
  /* istanbul ignore next */
  API_ROOT = 'http://localhost:8000/api/v1/';
}

export const clientConfig = {
  baseURL: API_ROOT,
  responseType: 'json'
};

const client = axios.create(clientConfig);
export default client;
