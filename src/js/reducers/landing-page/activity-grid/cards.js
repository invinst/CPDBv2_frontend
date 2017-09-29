import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


const cards = handleActions({
  [constants.ACTIVITY_GRID_REQUEST_SUCCESS]: (state, action) => (action.payload)
}, []);

export default cards;
