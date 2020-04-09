import communitiesRequested from 'reducers/landing-page/heat-map/communities-requested';
import { COMMUNITY_REQUEST_START, COMMUNITY_REQUEST_SUCCESS, COMMUNITY_REQUEST_FAILURE } from 'utils/constants';


describe('communitiesRequested reducer', function () {
  it('should have initial state', function () {
    communitiesRequested(undefined, {}).should.be.false();
  });

  it('should handle COMMUNITY_REQUEST_START', function () {
    communitiesRequested(true, { type: COMMUNITY_REQUEST_START }).should.be.false();
  });

  it('should handle COMMUNITY_REQUEST_SUCCESS', function () {
    communitiesRequested(false, { type: COMMUNITY_REQUEST_SUCCESS }).should.be.true();
  });

  it('should handle COMMUNITY_REQUEST_FAILURE', function () {
    communitiesRequested(false, { type: COMMUNITY_REQUEST_FAILURE }).should.be.true();
  });
});
