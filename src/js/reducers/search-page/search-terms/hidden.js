import { handleActions } from 'redux-actions';


export default handleActions({
  '@@router/LOCATION_CHANGE':
    (state, action) => action.payload.pathname.match(/search\/terms\/$/) === null,
}, true);
