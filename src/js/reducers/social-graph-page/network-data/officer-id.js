import { handleActions } from 'redux-actions';

import { UPDATE_OFFICER_ID } from 'utils/constants';


const officerId = handleActions({
  [UPDATE_OFFICER_ID]: (state, action) => action.payload
}, null);

export default officerId;
