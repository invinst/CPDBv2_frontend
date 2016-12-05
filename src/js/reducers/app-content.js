import { handleActions } from 'redux-actions';
import { STORIES_PATH } from 'utils/constants';


export default handleActions({
  '@@router/LOCATION_CHANGE': (state, action) => {
    if (action.payload.pathname.match(new RegExp(`(\/edit)?/${STORIES_PATH}(\\d+|new)`))) {
      return state ? state : `/${STORIES_PATH}`;
    }
    return action.payload.pathname;
  }
}, null);
