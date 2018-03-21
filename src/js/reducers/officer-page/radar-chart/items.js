import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


const percentile = handleActions({
  [constants.PERCENTILE_REQUEST_SUCCESS]: (state, action) => (action.payload)
}, []);

export default percentile;
