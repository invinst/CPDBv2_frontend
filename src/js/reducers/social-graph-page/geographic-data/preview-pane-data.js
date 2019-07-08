import { handleActions } from 'redux-actions';

import * as constants from 'utils/constants';

export default handleActions({
  [constants.SOCIAL_GRAPH_GEOGRAPHIC_PREVIEW_PANE_REQUEST_SUCCESS]: (state, action) => action.payload
}, []);
