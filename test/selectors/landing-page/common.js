import should from 'should';

import { extractPercentile } from 'selectors/landing-page/common';
import { OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT } from 'utils/constants';


describe('extractPercentile', () => {
  it('should return proper object', () => {
    const officerPercentile = {
      'officer_id': 1,
      year: 2015,
      'percentile_allegation_internal': '10.1',
      'percentile_allegation_civilian': '52.5',
      'percentile_trr': '20.6',
    };
    const expected = {
      officerId: 1,
      year: 2015,
      items: [
        {
          axis: 'Use of Force Reports',
          value: 20.6,
        },
        {
          axis: 'Internal Allegations',
          value: 10.1,
        },
        {
          axis: 'Civilian Allegations',
          value: 52.5,
        },
      ],
      visualTokenBackground: '#f3adad', // corresponding to `132`
      textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
    };
    extractPercentile(officerPercentile).should.eql(expected);
  });

  it('should return null if the given percentile is null or undefined', () => {
    should(extractPercentile(undefined)).be.null();
    should(extractPercentile(null)).be.null();
  });
});
