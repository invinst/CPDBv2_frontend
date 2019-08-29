import { combineReducers } from 'redux';

import activityGrid from './activity-grid';
import heatMap from './heat-map';
import officersByAllegation from './officers-by-allegation';
import complaintSummaries from './complaint-summaries';
import recentDocument from './recent-document';

export default combineReducers({
  activityGrid,
  heatMap,
  officersByAllegation,
  recentDocument,
  complaintSummaries,
});
