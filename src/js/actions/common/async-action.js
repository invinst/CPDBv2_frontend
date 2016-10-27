import Cookies from 'js-cookie';

export const get = (url, types) => ((params, adapter) => ({
  types,
  payload: {
    request: {
      url,
      params,
      adapter
    }
  }
}));

const authorizationHeaders = () => ({
  headers: {
    'Authorization': Cookies.get('apiAccessToken') ?
        `Token ${Cookies.get('apiAccessToken')}`
        : null
  }
});

const postWithConfig = (config=() => ({})) => (url, types) => ((data, adapter) => ({
  types,
  payload: {
    request: {
      method: 'POST',
      url,
      data,
      adapter,
      ...config()
    }
  }
}));

export const post = postWithConfig();

export const authenticatedPost = postWithConfig(authorizationHeaders);

const patchWithConfig = (config=() => ({})) => (url, types) => ((data, adapter) => ({
  types,
  payload: {
    request: {
      method: 'PATCH',
      url,
      data,
      adapter,
      ...config()
    }
  }
}));

export const patch = patchWithConfig();

export const authenticatedPatch = patchWithConfig(authorizationHeaders);
