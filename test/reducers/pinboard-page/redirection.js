import redirection from 'reducers/pinboard-page/redirection';
import should from 'should';

import * as constants from 'utils/constants';


describe('redirection reducer', function () {
  it('should have initial state', function () {
    should(redirection(undefined, {})).be.null();
  });

  it('should handle PINBOARD_PAGE_REDIRECT', function () {
    redirection(
      {
        initialLoading: false,
        redirect: false,
      },
      {
        type: constants.PINBOARD_PAGE_REDIRECT,
        payload: true,
      }
    ).should.eql({
      initialLoading: false,
      redirect: true,
    });
  });

  it('should handle PINBOARD_PAGE_INITIAL_LOADING', function () {
    redirection(
      {
        initialLoading: false,
        redirect: false,
      },
      {
        type: constants.PINBOARD_PAGE_INITIAL_LOADING,
        payload: true,
      }
    ).should.eql({
      initialLoading: true,
      redirect: false,
    });
  });
});
