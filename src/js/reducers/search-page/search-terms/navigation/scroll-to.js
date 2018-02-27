import { handleActions } from 'redux-actions';

import {
  SEARCH_TERMS_NAVIGATION_DOWN,
  SEARCH_TERMS_NAVIGATION_RESET,
  SEARCH_TERMS_NAVIGATION_SET,
  SEARCH_TERMS_NAVIGATION_UP,
} from 'utils/constants';


export default handleActions({
  [SEARCH_TERMS_NAVIGATION_RESET]: () => true,
  [SEARCH_TERMS_NAVIGATION_DOWN]: () => true,
  [SEARCH_TERMS_NAVIGATION_UP]: () => true,
  [SEARCH_TERMS_NAVIGATION_SET]: () => false,
}, true);
