import { handleActions } from 'redux-actions';


export default (startType, successType, failureType) => handleActions({
  [startType]: (state, action) => true,
  [successType]: (state, action) => false,
  [failureType]: (state, action) => false,
}, false);
