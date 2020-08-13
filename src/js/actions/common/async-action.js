import Cookies from 'js-cookie';


const authorizationHeaders = () => {
  const apiAccessToken = Cookies.get('apiAccessToken');
  const headers = {};
  if (apiAccessToken) {
    headers['Authorization'] = `Token ${apiAccessToken}`;
  }
  return { headers };
};

const getWithConfig = (config=() => ({})) => (url, types, cancelToken) => ((params) => ({
  types,
  payload: {
    request: {
      url,
      params,
      cancelToken,
      ...config(),
    },
  },
}));

export const get = getWithConfig();

export const authenticatedGet = getWithConfig(authorizationHeaders);

export const withoutCredentialsGet = getWithConfig(() => ({ withCredentials: false }));

const postWithConfig = (config=() => ({})) => (url, types, cancelToken) => ((data) => ({
  types,
  payload: {
    request: {
      method: 'post',
      url,
      data,
      cancelToken,
      ...config(),
    },
  },
}));

export const post = postWithConfig();

export const authenticatedPost = postWithConfig(authorizationHeaders);

const patchWithConfig = (config=() => ({})) => (url, types) => ((data) => ({
  types,
  payload: {
    request: {
      method: 'patch',
      url,
      data,
      ...config(),
    },
  },
}));

export const patch = patchWithConfig();

export const authenticatedPatch = patchWithConfig(authorizationHeaders);

const putWithConfig = (config=() => ({})) => (url, types, cancelToken) => ((data) => ({
  types,
  payload: {
    request: {
      method: 'put',
      url,
      data,
      cancelToken,
      ...config(),
    },
  },
}));

export const put = putWithConfig();

export const authenticatedPut = putWithConfig(authorizationHeaders);

export const deleteRequest = (url, types, cancelToken) => ((data) => {
  return {
    types,
    payload: {
      request: {
        method: 'DELETE',
        url,
        data,
        cancelToken,
      },
    },
  };
});
