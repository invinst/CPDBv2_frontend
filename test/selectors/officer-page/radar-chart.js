import {
  getOfficerPercentile,
  officerYearlyThreePercentile
} from 'selectors/officer-page/radar-chart';


describe('Officer radar chart selectors', function () {
  let state = {
    officerPage: {
      percentile: {
        items: []
      },
    }
  };

  beforeEach(function () {
    state.officerPage.percentile = {};
  });

  describe('getOfficerPercentile', function () {
    it('should return percentile items', function () {
      state.officerPage.percentile = {
        items: [{ a: 1 }, { a: 2 }]
      };
      getOfficerPercentile(state).should.eql([{ a: 1 }, { a: 2 }]);
    });
  });

  describe('officerYearlyThreePercentile', function () {
    it('should return current percentile filter', function () {
      state.officerPage.percentile.items = [
        {
          'officer_id': 1,
          year: 2006,
          'percentile_alL_trr': '0.049',
          'percentile_civilian': '66.251',
          'percentile_internal': '0.023',
          'percentile_shooting': '0.000',
          'percentile_taser': '0.106',
          'percentile_others': '0.000'
        },
        {
          'officer_id': 1,
          year: 2007,
          'percentile_alL_trr': '0.046',
          'percentile_civilian': '75.065',
          'percentile_internal': '0.022',
          'percentile_shooting': '0.000',
          'percentile_taser': '0.100',
          'percentile_others': '0.000'
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
        visualTokenBackground: '#ffbb9f',
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
        visualTokenBackground: '#ffbb9f',
        'year': 2007
      }]);
    });
  });
});
