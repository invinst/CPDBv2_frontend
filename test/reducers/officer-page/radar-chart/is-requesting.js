import {
  PERCENTILE_REQUEST_START, PERCENTILE_REQUEST_SUCCESS, PERCENTILE_REQUEST_FAILURE
} from 'utils/constants';
import isRequesting from 'reducers/officer-page/radar-chart/is-requesting';


describe('OfficerPercentile isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle PERCENTILE_REQUEST_START', function () {
    isRequesting([], {
      type: PERCENTILE_REQUEST_START
    }).should.be.true();
  });

  it('should handle PERCENTILE_REQUEST_SUCCESS', function () {
    isRequesting([], {
      type: PERCENTILE_REQUEST_SUCCESS,
    }).should.be.false();
  });

  it('should handle PERCENTILE_REQUEST_FAILURE', function () {
    isRequesting([], {
      type: PERCENTILE_REQUEST_FAILURE,
    }).should.be.false();
  });
});
