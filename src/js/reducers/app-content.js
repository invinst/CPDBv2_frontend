import { handleActions } from 'redux-actions';


export default handleActions({
  '@@router/LOCATION_CHANGE': (state, action) => action.payload.pathname,
}, null);
