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
