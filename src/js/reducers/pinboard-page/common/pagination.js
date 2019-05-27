import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';


const paginateReducer = (state, action) => {
  if (action.payload.previous) {
    return [...state, ...action.payload.results];
  } else {
    return action.payload.results;
  }
};

const createItemsReducer = (successType) => handleActions(
  { [successType]: paginateReducer },
  []
);

const createCountReducer = (successType) => handleActions({
  [successType]: (state, action) => (action.payload.count)
}, 0);

const createPaginationReducer = (successType, failureType) => handleActions({
  [successType]: (state, { payload: { next, previous } }) => ({ next, previous }),
  [failureType]: (state, action) => ({ next: null, previous: null })
}, { next: null, previous: null });


const createRequestingReducer = (startType, successType, failureType) => handleActions({
  [startType]: (state, action) => true,
  [successType]: (state, action) => false,
  [failureType]: (state, action) => false,
}, false);

export default (startType, successType, failureType) => {
  const items = createItemsReducer(successType);
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
