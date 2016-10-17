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

export const post = (url, types) => ((data, adapter) => ({
  types,
  payload: {
    request: {
      method: 'POST',
      url,
      data,
      adapter
    }
  }
}));

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

const authorizationHeaders = () => ({
  headers: {
    'Authorization': Cookies.get('apiAccessToken') ?
        `Token ${Cookies.get('apiAccessToken')}`
        : null
  }
});

export const patch = patchWithConfig();

export const authenticatedPatch = patchWithConfig(authorizationHeaders);
