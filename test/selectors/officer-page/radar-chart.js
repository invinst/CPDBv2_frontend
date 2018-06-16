import {
  getOfficerPercentile,
  officerYearlyThreePercentile
} from 'selectors/officer-page';


describe('Officer radar chart selectors', function () {
  let state = {
    officerPage: {
      summary: {
        percentiles: [],
      }
    }
  };

  beforeEach(function () {
    state.officerPage.summary.percentiles = [];
  });

  describe('getOfficerPercentile', function () {
    it('should return percentile items', function () {
      state.officerPage.summary.percentiles = [{ a: 1 }, { a: 2 }];
      getOfficerPercentile(state).should.eql([{ a: 1 }, { a: 2 }]);
    });
  });

  describe('officerYearlyThreePercentile', function () {
    it('should return current percentile filter', function () {
      state.officerPage.summary.percentiles = [
        {
          'officer_id': 1,
          year: 2006,
          'percentile_allegation_civilian': '66.251',
          'percentile_allegation_internal': '0.023',
          'percentile_trr': '0.049',
          'percentile_allegation': '41.001',
        },
        {
          'officer_id': 1,
          year: 2007,
          'percentile_allegation_civilian': '75.065',
          'percentile_allegation_internal': '0.022',
          'percentile_trr': '0.046',
          'percentile_allegation': '31.201'
        }];

      officerYearlyThreePercentile(state).should.eql([{
        'items': [{
          'axis': 'Use of Force Reports',
          'value': 0.049
        }, {
          'axis': 'Internal Allegations',
          'value': 0.023
        }, {
          'axis': 'Civilian Allegations',
          'value': 66.251
        }],
        'officerId': 1,
        textColor: '#231F20',
        visualTokenBackground: '#eb9056',
        'year': 2006
      }, {
        'items': [{
          'axis': 'Use of Force Reports',
          'value': 0.046
        }, {
          'axis': 'Internal Allegations',
          'value': 0.022
        }, {
          'axis': 'Civilian Allegations',
          'value': 75.065
        }],
        'officerId': 1,
        textColor: '#231F20',
        visualTokenBackground: '#eb9056',
        'year': 2007
      }]);
    });
  });
});
