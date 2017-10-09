import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


const yearRange = handleActions({
  [constants.OFFICER_SOCIAL_GRAPH_SET_YEAR_RANGE]: (state, action) => action.payload
}, [1984, new Date().getYear() + 1900]);

export default yearRange;
