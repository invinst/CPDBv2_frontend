import { openTRRPage } from 'actions/open-page';
import { OPEN_TRR_PAGE } from 'utils/constants';


describe('openTRRPage', function () {
  it('should return right action', function () {
    openTRRPage(5).should.eql({
      type: OPEN_TRR_PAGE,
      payload: 5
    });
  });
});
