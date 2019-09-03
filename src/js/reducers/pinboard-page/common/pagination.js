import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import createRequestingReducer from 'reducers/common/requesting';

const paginateReducer = (state, action) => {
  if (action.payload.previous) {
    return [...state, ...action.payload.results];
  } else {
    return action.payload.results;
  }
};

const createItemsReducer = (successType, customItemsHandler) => handleActions(
  {
    [successType]: paginateReducer,
    ...customItemsHandler,
  },
  []
);

const createCountReducer = (successType) => handleActions({
  [successType]: (state, action) => (action.payload.count),
}, 0);

const createPaginationReducer = (successType, failureType) => handleActions({
  [successType]: (state, { payload: { next, previous } }) => ({ next, previous }),
  [failureType]: (state, action) => ({ next: null, previous: null }),
}, { next: null, previous: null });


export default (startType, successType, failureType, customItemsHandler={}) => {
  const items = createItemsReducer(successType, customItemsHandler);
  const count = createCountReducer(successType);
  const pagination = createPaginationReducer(successType, failureType);
  const requesting = createRequestingReducer(startType, successType, failureType);

  return combineReducers({
    requesting,
    items,
    count,
    pagination,
  });
};
