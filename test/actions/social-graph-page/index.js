import { requestSocialGraph } from 'actions/social-graph-page';
import {
  SOCIAL_GRAPH_API_URL,
  SOCIAL_GRAPH_REQUEST_START,
  SOCIAL_GRAPH_REQUEST_SUCCESS,
  SOCIAL_GRAPH_REQUEST_FAILURE,
} from 'utils/constants';


describe('socialGraph actions', function () {
  describe('requestSocialGraph', function () {
    it('should return the right action', function () {
      requestSocialGraph({ 'unit_id': 123, 'threshold': 2, 'show_civil_only': true }).should.eql({
        types: [SOCIAL_GRAPH_REQUEST_START, SOCIAL_GRAPH_REQUEST_SUCCESS, SOCIAL_GRAPH_REQUEST_FAILURE],
        payload: {
          request: {
            url: SOCIAL_GRAPH_API_URL,
            params: { 'unit_id': 123, 'threshold': 2, 'show_civil_only': true },
            adapter: null,
            cancelToken: undefined,
          },
        },
      });
    });
  });
});
