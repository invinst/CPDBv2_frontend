import { get } from 'actions/common/async-action';
import * as constants from 'utils/constants';


export const getComplaintSummaries = get(
  constants.RECENT_COMPLAINT_SUMMARIES_URL,
  [
    constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_START,
    constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_SUCCESS,
    constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_FAILURE
  ]
);
