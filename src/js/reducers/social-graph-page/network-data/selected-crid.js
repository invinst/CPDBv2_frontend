import { handleActions } from 'redux-actions';

import {
  UPDATE_SOCIAL_GRAPH_SELECTED_CRID,
  UPDATE_SELECTED_OFFICER_ID,
  UPDATE_SOCIAL_GRAPH_SELECTED_EDGE
} from 'utils/constants';


const selectedCrid = handleActions({
  [UPDATE_SOCIAL_GRAPH_SELECTED_CRID]: (state, action) => action.payload,
  [UPDATE_SELECTED_OFFICER_ID]: () => null,
  [UPDATE_SOCIAL_GRAPH_SELECTED_EDGE]: () => null,
}, null);

export default selectedCrid;
