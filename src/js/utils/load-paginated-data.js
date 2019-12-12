import { merge } from 'lodash';

const storeDispatch = (actionCall, store) => {
  return store ? store.dispatch(actionCall) : actionCall;
};

export const loadPaginatedData = (requestParams, firstRequestFunc, otherRequestFunc, store) => {
  storeDispatch(firstRequestFunc(requestParams), store).then((response) => {
    if (response && response.payload) {
      const totalCount = response.payload['count'];
      const limit = response.payload['limit'];
      const requestParams = response.request.params;
      for (let offset = limit; offset < totalCount; offset = offset + limit) {
        storeDispatch(otherRequestFunc(merge({ limit: limit, offset: offset }, requestParams)), store);
      }
    }
  });
};
