import citySummary from 'reducers/landing-page/heat-map/city-summary';
import * as constants from 'utils/constants';


describe('citySummary reducer', function () {
  it('should have initial state', function () {
    citySummary(undefined, {}).should.eql({});
  });

  it('should handle CITY_SUMMARY_REQUEST_START', function () {
    citySummary({
      'allegation_count': 10,
      'discipline_count': 5
    }, {
      type: constants.CITY_SUMMARY_REQUEST_START,
      payload: {}
    }).should.eql({
      'allegation_count': 10,
      'discipline_count': 5
    });
  });

  it('should handle CITY_SUMMARY_REQUEST_SUCCESS', function () {
    citySummary(undefined, {
      type: constants.CITY_SUMMARY_REQUEST_SUCCESS,
      payload: {
        'allegation_count': 10,
        'discipline_count': 5
      }
    }).should.eql({
      'allegation_count': 10,
      'discipline_count': 5
    });
  });

  it('should handle CITY_SUMMARY_REQUEST_FAILURE', function () {
    citySummary({
      'allegation_count': 10,
      'discipline_count': 5
    }, {
      type: constants.CITY_SUMMARY_REQUEST_FAILURE,
      payload: {}
    }).should.eql({
      'allegation_count': 10,
      'discipline_count': 5
    });
  });
});
