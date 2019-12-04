import isLoading from 'reducers/pinboard-admin-page/is-loading';
import {
  ALL_PINBOARD_REQUEST_START,
  ALL_PINBOARD_REQUEST_SUCCESS,
  ALL_PINBOARD_REQUEST_FAILURE,
} from 'utils/constants';

describe('allPinboards reducer', function () {
  it('should have initial state', function () {
    isLoading(undefined, {}).should.be.false();
  });

  it('should handle ALL_PINBOARD_REQUEST_START', function () {
    isLoading(undefined, { type: ALL_PINBOARD_REQUEST_START }).should.be.true();
  });

  it('should handle ALL_PINBOARD_REQUEST_SUCCESS', function () {
    isLoading(undefined, { type: ALL_PINBOARD_REQUEST_SUCCESS }).should.be.false();
  });

  it('should handle ALL_PINBOARD_REQUEST_FAILURE', function () {
    isLoading(undefined, { type: ALL_PINBOARD_REQUEST_FAILURE }).should.be.false();
  });
});
