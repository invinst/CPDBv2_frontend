import {
  getOfficerPercentile,
  officerYearlyFivePercentile,
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

  describe('officerYearlyFivePercentile', function () {
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
          'axis': 'Civilian Complaints',
          'value': 66.251
        }, {
          'axis': 'Internal Complaints',
          'value': 0.023
        }],
        'officerId': 1,
        'year': 2006
      }, {
        'items': [{
          'axis': 'Use of Force Reports',
          'value': 0.046
        }, {
          'axis': 'Civilian Complaints',
          'value': 75.065
        }, {
          'axis': 'Internal Complaints',
          'value': 0.022
        }],
        'officerId': 1,
        'year': 2007
      }]);
    });
  });

  describe('officerYearlyFivePercentile', function () {
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

      officerYearlyFivePercentile(state).should.eql([{
        'items': [{
          'axis': 'Taser Reports',
          'value': 0.049
        }, {
          'axis': 'Shooting Reports',
          'value': 0
        }, {
          'axis': 'Internal Complaints',
          'value': 0.023
        }, {
          'axis': 'Civilian Complaints',
          'value': 66.251
        }, {
          'axis': 'Other Use of Force Report',
          'value': 0
        }],
        'officerId': 1,
        'year': 2006
      }, {
        'items': [{
          'axis': 'Taser Reports',
          'value': 0.046
        }, {
          'axis': 'Shooting Reports',
          'value': 0
        }, {
          'axis': 'Internal Complaints',
          'value': 0.022
        }, {
          'axis': 'Civilian Complaints',
          'value': 75.065
        }, {
          'axis': 'Other Use of Force Report',
          'value': 0
        }],
        'officerId': 1,
        'year': 2007
      }]);
    });
  });
});
