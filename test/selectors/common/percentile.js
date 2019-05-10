import should from 'should';

import { extractPercentile, visualTokenBackground } from 'selectors/common/percentile';
import { OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT } from 'utils/constants';
import { greyishColor } from 'utils/styles';


describe('extractPercentile', () => {
  it('should return visualTokenBackground, textColor, items, and year', () => {
    const officerPercentile = {
      year: 2015,
      'percentile_allegation_civilian': '52.5',
      'percentile_allegation_internal': '10.1',
      'percentile_trr': '20.6',
    };
    const expected = {
      year: 2015,
      items: [
        {
          axis: 'Use of Force Reports',
          value: 20.6,
        },
        {
          axis: 'Officer Allegations',
          value: 10.1,
        },
        {
          axis: 'Civilian Allegations',
          value: 52.5,
        },
      ],
      visualTokenBackground: '#ed7467', // corresponding to `312`
      textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
    };
    extractPercentile(officerPercentile).should.eql(expected);
  });

  it('should return null if the given percentile is null or undefined', () => {
    should(extractPercentile(undefined)).be.null();
    should(extractPercentile(null)).be.null();
  });
});

describe('visualTokenBackground', function () {
  it('should return background color correctly', function () {
    const percentile = {
      'percentile_allegation_civilian': '78.12',
      'percentile_allegation_internal': '80.20',
      'percentile_trr': '92.35'
    };
    visualTokenBackground(percentile).should.eql('#dc2c30');
  });

  it('should return default greyishColor', function () {
    const percentile = {
      'percentile_allegation_civilian': null,
      'percentile_allegation_internal': null,
      'percentile_trr': null
    };
    visualTokenBackground(percentile).should.eql(greyishColor);
  });

  it('should return null if percentile is empty', function () {
    should(visualTokenBackground({})).be.null();
  });
});
