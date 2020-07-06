import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.PAGE_LOAD_START]: () => true,
  [constants.PAGE_LOAD_FINISH]: () => false,
}, true);
