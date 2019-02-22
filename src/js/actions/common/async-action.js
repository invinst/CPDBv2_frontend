import Cookies from 'js-cookie';
import { getMockAdapter } from 'mock-api';


const authorizationHeaders = () => ({
  headers: {
    'Authorization': Cookies.get('apiAccessToken') ?
        `Token ${Cookies.get('apiAccessToken')}`
        : null
  }
});

const getWithConfig = (config=() => ({})) => (url, types, cancelToken) => ((params, adapter=getMockAdapter()) => {
  const request = {
    url,
    params,
    adapter,
    ...config()
  };

  if (cancelToken) {
    request.cancelToken = cancelToken;
  }

  return {
    types,
    payload: { request }
  };
});

export const get = getWithConfig();

export const authenticatedGet = getWithConfig(authorizationHeaders);

const postWithConfig = (config=() => ({})) => (url, types) => ((data, adapter=getMockAdapter()) => ({
  types,
  payload: {
    request: {
      method: 'post',
      url,
      data,
      adapter,
      ...config()
    }
  }
}));

export const post = postWithConfig();

export const authenticatedPost = postWithConfig(authorizationHeaders);

const patchWithConfig = (config=() => ({})) => (url, types) => ((data, adapter=getMockAdapter()) => ({
  types,
  payload: {
    request: {
      method: 'patch',
      url,
      data,
      adapter,
      ...config()
    }
  }
}));

export const patch = patchWithConfig();

export const authenticatedPatch = patchWithConfig(authorizationHeaders);

const putWithConfig = (config=() => ({})) => (url, types) => ((data, adapter=getMockAdapter()) => ({
  types,
  payload: {
    request: {
      method: 'put',
      url,
      data,
      adapter,
      ...config()
    }
  }
}));

export const put = putWithConfig();

export const authenticatedPut = putWithConfig(authorizationHeaders);
