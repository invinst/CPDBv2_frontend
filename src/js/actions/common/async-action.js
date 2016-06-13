export const request = (url, types) => ((params, adapter) => ({
  types,
  payload: {
    request: {
      url,
      params,
      adapter
    }
  }
}));
