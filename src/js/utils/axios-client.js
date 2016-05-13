import axios from 'axios';


export const API_ROOT = 'https://api.cpdb.co/';

export const clientConfig = {
  baseUrl: API_ROOT,
  responseType: 'json'
};

const client = axios.create(clientConfig);
export default client;
