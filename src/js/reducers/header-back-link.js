import { handleActions } from 'redux-actions';
import { BACK_LINK_WHITELIST } from 'utils/constants';

const whitelist = Object.keys(BACK_LINK_WHITELIST);

export default handleActions({
  '@@router/LOCATION_CHANGE': (state, action) => {
    if (whitelist.indexOf(action.payload.pathname) !== -1) {
      return action.payload.pathname;
    }
    return state;
  }
}, '/');
