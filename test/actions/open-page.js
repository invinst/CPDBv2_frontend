import { openOfficerPage, openTRRPage } from 'actions/open-page';
import { OPEN_OFFICER_PAGE, OPEN_TRR_PAGE } from 'utils/constants';


describe('openOfficerPage', function () {
  it('should return right action', function () {
    openOfficerPage(3).should.eql({
      type: OPEN_OFFICER_PAGE,
      payload: 3
    });
  });
});

describe('openTRRPage', function () {
  it('should return right action', function () {
    openTRRPage(5).should.eql({
      type: OPEN_TRR_PAGE,
      payload: 5
    });
  });
});
