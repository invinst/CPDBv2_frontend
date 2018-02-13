import { getComplaintSummaries } from 'actions/landing-page/complaint-summaries';
import * as constants from 'utils/constants';


describe('getComplaintSummaries action', function () {
  it('should return correct action', function () {
    getComplaintSummaries().should.eql({
      types: [
        constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_START,
        constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_SUCCESS,
        constants.RECENT_COMPLAINT_SUMMARIES_REQUEST_FAILURE
      ],
      payload: {
        request: {
          url: constants.RECENT_COMPLAINT_SUMMARIES_URL,
          adapter: null,
          params: undefined
        }
      }
    });
  });
});


