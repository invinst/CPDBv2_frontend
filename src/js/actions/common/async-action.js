import Cookies from 'js-cookie';
import { getMockAdapter } from 'mock-api';


const authorizationHeaders = () => {
  const apiAccessToken = Cookies.get('apiAccessToken');
  const headers = {};
  if (apiAccessToken) {
    headers['Authorization'] = `Token ${apiAccessToken}`;
  }
  return { headers };
};

const getWithConfig = (config=() => ({})) => (url, types, cancelToken) => ((params, adapter=getMockAdapter()) => ({
  types,
  payload: {
    request: {
      url,
      params,
      adapter,
      cancelToken,
      ...config()
    }
  }
}));

export const get = getWithConfig();

export const authenticatedGet = getWithConfig(authorizationHeaders);

export const withoutCredentialsGet = getWithConfig(() => ({ withCredentials: false }));

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
