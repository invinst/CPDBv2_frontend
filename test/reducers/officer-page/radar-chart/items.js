
import { PERCENTILE_REQUEST_SUCCESS } from 'utils/constants';
import percentile from 'reducers/officer-page/radar-chart/items';

describe('Radar Chart action', function () {
  it('should return initial state', function () {
    percentile(undefined, {}).should.eql([]);
  });

  it('should handle PERCENTILE_REQUEST_SUCCESS', function () {
    const action = {
      type: PERCENTILE_REQUEST_SUCCESS,
      payload: [{
        'year': 2015,
        'percentile_taser': 90.2
      }]
    };
    percentile([], action).should.eql([{ 'year': 2015, 'percentile_taser': 90.2 }]);
  });
});
