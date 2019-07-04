import { handleActions } from 'redux-actions';

import {
  UPDATE_SELECTED_OFFICER_ID,
  UPDATE_SOCIAL_GRAPH_SELECTED_EDGE,
} from 'utils/constants';


const selectedEdge = handleActions({
  [UPDATE_SOCIAL_GRAPH_SELECTED_EDGE]: (state, action) => action.payload,
  [UPDATE_SELECTED_OFFICER_ID]: () => null,
}, null);

export default selectedEdge;
