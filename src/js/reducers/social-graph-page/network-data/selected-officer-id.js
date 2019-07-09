import { handleActions } from 'redux-actions';

import {
  UPDATE_SELECTED_OFFICER_ID,
  UPDATE_SOCIAL_GRAPH_SELECTED_EDGE,
  UPDATE_SOCIAL_GRAPH_SELECTED_CRID,
} from 'utils/constants';


const selectedOfficerId = handleActions({
  [UPDATE_SELECTED_OFFICER_ID]: (state, action) => action.payload,
  [UPDATE_SOCIAL_GRAPH_SELECTED_EDGE]: () => null,
  [UPDATE_SOCIAL_GRAPH_SELECTED_CRID]: () => null,
}, null);

export default selectedOfficerId;
