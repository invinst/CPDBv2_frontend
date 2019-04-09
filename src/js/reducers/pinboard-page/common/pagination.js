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
