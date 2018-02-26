import { getRecentDocument } from 'actions/landing-page/recent-document';
import * as constants from 'utils/constants';


describe('getRecentDocument action', function () {
  it('should return correct action', function () {
    getRecentDocument().should.eql({
      types: [
        constants.RECENT_DOCUMENT_REQUEST_START,
        constants.RECENT_DOCUMENT_REQUEST_SUCCESS,
        constants.RECENT_DOCUMENT_REQUEST_FAILURE
      ],
      payload: {
        request: {
          url: constants.RECENT_DOCUMENT_URL,
          adapter: null,
          params: undefined
        }
      }
    });
  });
});


