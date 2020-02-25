import { handleActions } from 'redux-actions';
import { LOCATION_CHANGE } from 'connected-react-router';

import { getDataVisualizationTabName } from 'utils/data-visualization';
import {
  CHANGE_SOCIAL_GRAPH_MAIN_TAB,
  DATA_VISUALIZATION_TAB_NAMES,
} from 'utils/constants';


export default handleActions({
  [CHANGE_SOCIAL_GRAPH_MAIN_TAB]: (state, action) => action.payload,
  [LOCATION_CHANGE]: (state, action) => {
    const tabName = getDataVisualizationTabName(action.payload.location.pathname);
    return tabName in DATA_VISUALIZATION_TAB_NAMES ? tabName : state;
  },
}, DATA_VISUALIZATION_TAB_NAMES.SOCIAL_GRAPH);
