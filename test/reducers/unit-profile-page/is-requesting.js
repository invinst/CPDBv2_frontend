import {
  UNIT_PROFILE_SUMMARY_REQUEST_START, UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS, UNIT_PROFILE_SUMMARY_REQUEST_FAILURE
} from 'utils/constants';
import isRequesting from 'reducers/unit-profile-page/is-requesting';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle UNIT_PROFILE_SUMMARY_REQUEST_START', function () {
    isRequesting(undefined, {
      type: UNIT_PROFILE_SUMMARY_REQUEST_START
    }).should.be.true();
  });

  it('should handle UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: UNIT_PROFILE_SUMMARY_REQUEST_SUCCESS
    }).should.be.false();
  });

  it('should handle UNIT_PROFILE_SUMMARY_REQUEST_FAILURE', function () {
    isRequesting(true, {
      type: UNIT_PROFILE_SUMMARY_REQUEST_FAILURE
    }).should.be.false();
  });
});
