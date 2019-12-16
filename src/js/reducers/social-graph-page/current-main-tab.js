import { handleActions } from 'redux-actions';

import { getDataVisualizationTabName } from 'utils/data-visualization';
import {
  CHANGE_SOCIAL_GRAPH_MAIN_TAB,
  DATA_VISUALIZATION_TAB_NAMES,
  LOCATION_CHANGE,
} from 'utils/constants';


export default handleActions({
  [CHANGE_SOCIAL_GRAPH_MAIN_TAB]: (state, action) => action.payload,
  [LOCATION_CHANGE]: (state, action) => {
    const tabName = getDataVisualizationTabName(action.payload.pathname);
    return tabName in DATA_VISUALIZATION_TAB_NAMES ? tabName : state;
  },
}, DATA_VISUALIZATION_TAB_NAMES.SOCIAL_GRAPH);
