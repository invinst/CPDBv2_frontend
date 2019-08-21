import {
  SUGGESTION_REQUEST_START, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_REQUEST_FAILURE,
} from 'utils/constants';
import isRequesting from 'reducers/search-page/is-requesting';


describe('searchPage.isRequesting reducer', function () {
  it('should have initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle SUGGESTION_REQUEST_START', function () {
    isRequesting(undefined, {
      type: SUGGESTION_REQUEST_START,
    }).should.be.true();
  });

  it('should handle SUGGESTION_REQUEST_SUCCESS', function () {
    isRequesting(undefined, {
      type: SUGGESTION_REQUEST_SUCCESS,
    }).should.be.false();
  });

  it('should handle SUGGESTION_REQUEST_FAILURE with cancel message', function () {
    isRequesting(undefined, {
      type: SUGGESTION_REQUEST_FAILURE,
      payload: {
        message: 'Cancelled by user',
      },
    }).should.be.true();
  });

  it('should handle SUGGESTION_REQUEST_FAILURE without cancel message', function () {
    isRequesting(undefined, {
      type: SUGGESTION_REQUEST_FAILURE,
      payload: {},
    }).should.be.false();
  });
});
