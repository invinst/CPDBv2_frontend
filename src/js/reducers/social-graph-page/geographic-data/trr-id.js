import { handleActions } from 'redux-actions';

import { UPDATE_GEOGRAPHIC_TRR_ID } from 'utils/constants';


const trrId = handleActions({
  [UPDATE_GEOGRAPHIC_TRR_ID]: (state, action) => action.payload
}, null);

export default trrId;
