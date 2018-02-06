import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';


const officersByAllegation = handleActions({
  [constants.OFFICERS_BY_ALLEGATION_REQUEST_SUCCESS]: (state, action) => (action.payload)
}, []);

export default officersByAllegation;
