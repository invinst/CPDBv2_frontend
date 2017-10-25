import {
  OFFICER_SOCIAL_GRAPH_SET_YEAR_RANGE, CHANGE_OFFICER_ID
} from 'utils/constants';
import yearRange from 'reducers/officer-page/social-graph/year-range';


describe('yearRange reducer', function () {
  const defaultValue = [2000, new Date().getYear() + 1900];

  it('should return initial state', function () {
    yearRange(undefined, {}).should.be.eql(defaultValue);
  });

  it('should handle OFFICER_SOCIAL_GRAPH_SET_YEAR_RANGE', function () {
    yearRange([], {
      type: OFFICER_SOCIAL_GRAPH_SET_YEAR_RANGE,
      payload: [2000, 2005]
    }).should.be.eql([2000, 2005]);
  });

  it('should handle CHANGE_OFFICER_ID', function () {
    yearRange([], {
      type: CHANGE_OFFICER_ID,
    }).should.be.eql(defaultValue);
  });
});
