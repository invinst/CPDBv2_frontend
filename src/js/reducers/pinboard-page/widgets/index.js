import { combineReducers } from 'redux';

import complaintSummary from './complaint-summary';
import complaintSummaryRequesting from './complaint-summary-requesting';
import trrSummary from './trr-summary';
import trrSummaryRequesting from './trr-summary-requesting';
import officersSummary from './officers-summary';
import officersSummaryRequesting from './officers-summary-requesting';
import complainantsSummary from './complainants-summary';
import complainantsSummaryRequesting from './complainants-summary-requesting';


export default combineReducers({
  complaintSummary,
  complaintSummaryRequesting,
  trrSummary,
  trrSummaryRequesting,
  officersSummary,
  officersSummaryRequesting,
  complainantsSummary,
  complainantsSummaryRequesting,
});
