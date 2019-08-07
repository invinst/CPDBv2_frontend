import redirect from 'reducers/pinboard-page/redirect';
import should from 'should';

import * as constants from 'utils/constants';


describe('redirect reducer', function () {
  it('should have initial state', function () {
    should(redirect(undefined, {})).be.false();
  });

  it('should handle PINBOARD_PAGE_REDIRECT', function () {
    redirect(
      false,
      {
        type: constants.PINBOARD_PAGE_REDIRECT,
        payload: true,
      }
    ).should.be.true();

    redirect(
      true,
      {
        type: constants.PINBOARD_PAGE_REDIRECT,
        payload: false,
      }
    ).should.be.false();
  });
});
