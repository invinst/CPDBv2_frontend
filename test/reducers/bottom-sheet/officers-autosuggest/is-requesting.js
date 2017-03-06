import {
  SEARCH_OFFICERS_REQUEST_START, SEARCH_OFFICERS_REQUEST_SUCCESS, SEARCH_OFFICERS_REQUEST_FAILURE
} from 'utils/constants';
import isRequesting from 'reducers/bottom-sheet/officers-autosuggest/is-requesting';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle SEARCH_OFFICERS_REQUEST_START', function () {
    isRequesting(undefined, {
      type: SEARCH_OFFICERS_REQUEST_START
    }).should.be.true();
  });

  it('should handle SEARCH_OFFICERS_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: SEARCH_OFFICERS_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle SEARCH_OFFICERS_REQUEST_FAILURE', function () {
    isRequesting(true, {
      type: SEARCH_OFFICERS_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
