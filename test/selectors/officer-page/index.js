import {
  getOfficerName, getComplaintsCount, getComplaintFacetsSelector, summarySelector
} from 'selectors/officer-page';


describe('officer page selectors', function () {
  let state = {
    officerPage: {}
  };

  beforeEach(function () {
    state.officerPage = {};
  });

  describe('getOfficerName', function () {
    it('should return officer name', function () {
      const fullName = 'Mr. Foo';
      state.officerPage = { fullName };

      getOfficerName(state).should.eql(fullName);
    });
  });

  describe('getComplaintsCount', function () {
    it('should return complaints count', function () {
      const complaintsCount = 1;
      state.officerPage = { complaintsCount };

      getComplaintsCount(state).should.eql(complaintsCount);
    });
  });

  describe('getComplaintFacetsSelector', function () {
    it('should return complaint facets', function () {
      const complaintFacets = [{
        name: 'foo',
        entries: [{
          'name': 'Illegal Search',
          'count': 2,
          'sustained_count': 1,     // eslint-disable-line camelcase
          items: [{
            year: 2012,
            count: 2,
            'substained_count': 1,    // eslint-disable-line camelcase
            name: 'Illegal Search'
          }]
        }]
      }];
      state.officerPage = { complaintFacets };

      getComplaintFacetsSelector(state).should.eql([{
        name: 'foo',
        entries: [{
          name: 'Illegal Search',
          count: 2,
          sustainedCount: 1,
          items: [{
            year: 2012,
            count: 2,
            'substained_count': 1,    // eslint-disable-line camelcase
            name: 'Illegal Search'
          }]
        }]
      }]);
    });
  });

  describe('summarySelector', function () {
    it('should return summary', function () {
      const summary = {
        'unit': 'unit', 'rank': 'rank', 'date_of_appt': '2015-09-23',
        'race': 'race', 'gender': 'Male', 'badge': 'badge',
        'date_of_resignation': '2016-01-02', agency: 'CPD'
      };
      state.officerPage = { summary };

      summarySelector(state).should.eql({
        unitName: 'unit', rank: 'rank', dateOfAppt: '2015-09-23',
        race: 'race', gender: 'Male', badge: 'badge',
        dateOfResignation: '2016-01-02', agency: 'CPD'
      });
    });
  });
});
