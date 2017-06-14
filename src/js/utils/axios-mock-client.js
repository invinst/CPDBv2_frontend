import MockAdapter from 'axios-mock-adapter';

import axiosClient from './axios-client';


const requestCounter = {};

export const countRequests = func => config => {
  const url = config.url.replace(/.*\/api\/v2(.*)/, '$1');
  if (requestCounter[url] === undefined) requestCounter[url] = 0;
  requestCounter[url] += 1;
  return func(config);
};

window.requestCount = (url) => requestCounter[url] || 0;

export default new MockAdapter(axiosClient);
