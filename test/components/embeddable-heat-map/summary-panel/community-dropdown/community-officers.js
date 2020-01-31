import { communityFactory } from 'utils/test/factories/heat-map';
import CommunityOfficers from 'components/embeddable-heat-map/summary-panel/community-dropdown/community-officers';


describe('CommunityOfficers component', function () {
  it('should renderable', function () {
    CommunityOfficers.should.be.renderable({ ...communityFactory.build(), withRouter: true });
  });
});
