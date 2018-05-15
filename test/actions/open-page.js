import { openOfficerPage } from 'actions/open-page';
import { OPEN_OFFICER_PAGE } from 'utils/constants';


describe('openOfficerPage', function () {
  it('should return right action', function () {
    openOfficerPage(3).should.eql({
      type: OPEN_OFFICER_PAGE,
      payload: 3
    });
  });
});
