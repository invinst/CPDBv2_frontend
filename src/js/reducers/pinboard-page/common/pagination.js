import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import { getPinboardID } from 'utils/location';


const paginateReducer = (state, action) => {
  const pinboardId = getPinboardID(action.request.url);
  if (pinboardId === state.meta.pinboardId) {
    return {
      meta: { pinboardId },
      items: [...state.items, ...action.payload.results]
    };
  } else {
    return {
      meta: { pinboardId },
      items: action.payload.results
    };
  }
};

const defaultPagination = { meta: { pinboardId: null }, items: [] };

const createItemsReducer = (successType) => handleActions(
  { [successType]: paginateReducer },
  defaultPagination
);

const createCountReducer = (successType) =>handleActions({
  [successType]: (state, action) => (action.payload.count)
}, 0);

const createPaginationReducer = (successType, failureType) => handleActions({
  [successType]: (state, { payload: { next, previous } }) => ({ next, previous }),
  [failureType]: (state, action) => ({ next: null, previous: null })
}, { next: null, previous: null });


export default (successType, failureType) => {
  const items = createItemsReducer(successType);
  const count = createCountReducer(successType);
  const pagination = createPaginationReducer(successType, failureType);

  return combineReducers({
    items,
    count,
    pagination,
  });
};
