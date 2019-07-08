import { handleActions } from 'redux-actions';


export default (startType, successType, failureType, cancelledType) => handleActions({
  [startType]: (state, action) => true,
  [successType]: (state, action) => false,
  [failureType]: (state, action) => false,
  ...( cancelledType ? { [cancelledType]: (state, action) => false } : {} ),
}, false);
