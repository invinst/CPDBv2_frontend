import { handleActions } from 'redux-actions';

import { UPDATE_GEOGRAPHIC_CRID } from 'utils/constants';


const crid = handleActions({
  [UPDATE_GEOGRAPHIC_CRID]: (state, action) => action.payload
}, null);

export default crid;
