import {
  OFFICER_SOCIAL_GRAPH_REQUEST_START, OFFICER_SOCIAL_GRAPH_REQUEST_SUCCESS, OFFICER_SOCIAL_GRAPH_REQUEST_FAILURE
} from 'utils/constants';
import isRequesting from 'reducers/officer-page/social-graph/is-requesting';


describe('SocialGraph isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle OFFICER_SOCIAL_GRAPH_REQUEST_START', function () {
    isRequesting([], {
      type: OFFICER_SOCIAL_GRAPH_REQUEST_START
    }).should.be.true();
  });

  it('should handle OFFICER_SOCIAL_GRAPH_REQUEST_SUCCESS', function () {
    isRequesting([], {
      type: OFFICER_SOCIAL_GRAPH_REQUEST_SUCCESS,
    }).should.be.false();
  });

  it('should handle OFFICER_SOCIAL_GRAPH_REQUEST_FAILURE', function () {
    isRequesting([], {
      type: OFFICER_SOCIAL_GRAPH_REQUEST_FAILURE,
    }).should.be.false();
  });
});
