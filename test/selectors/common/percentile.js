import should from 'should';

import { extractPercentile, extractLatestPercentile, visualTokenBackground } from 'selectors/common/percentile';
import { softBlackColor } from 'utils/styles';


describe('extractLatestPercentile', function () {
  it('should call extractPercentile with correct data', function () {
    extractLatestPercentile({
      'percentile_allegation': '60.0000',
      'percentile_allegation_civilian': '52.5000',
      'percentile_allegation_internal': '10.1000',
      'percentile_trr': '20.6000',
      'id': 8064,
      'full_name': 'Abraham Espinosa',
      'year': '1989',
    }).should.eql({
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
      visualTokenBackground: '#FF6453',
      textColor: softBlackColor,
    });

    extractLatestPercentile(undefined).should.eql({});

    extractLatestPercentile({
      'id': 8064,
      'full_name': 'Abraham Espinosa',
      'year': '1989',
    }).should.eql({});
  });
});

describe('extractPercentile', function () {
  it('should return visualTokenBackground, textColor, items, and year', function () {
    const officerPercentile = {
      year: 2015,
      'percentile_allegation': '60.0000',
      'percentile_allegation_civilian': '52.5000',
      'percentile_allegation_internal': '10.1000',
      'percentile_trr': '20.6000',
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
      visualTokenBackground: '#FF6453',
      textColor: softBlackColor,
    };
    extractPercentile(officerPercentile).should.eql(expected);
  });

  it('should return empty hash if the given percentile is null or undefined', function () {
    extractPercentile(undefined).should.eql({});
    extractPercentile(null).should.eql({});
    extractPercentile({}).should.eql({});
  });
});

describe('visualTokenBackground', function () {
  it('should return background color correctly', function () {
    visualTokenBackground('98.0000').should.eql('#F52524');
  });

  it('should return undefined if percentile is undefined', function () {
    should(visualTokenBackground(undefined)).be.undefined();
  });
});
