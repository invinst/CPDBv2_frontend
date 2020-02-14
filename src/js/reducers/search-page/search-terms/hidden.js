import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';


export default handleActions({
  [LOCATION_CHANGE]:
    (state, action) => action.payload.location.pathname.match(/search\/terms\/$/) === null,
}, true);
