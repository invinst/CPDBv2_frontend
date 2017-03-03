import { getOfficerName, getComplaintsCount, getComplaintFacets, summarySelector } from 'selectors/officer-page';


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

  describe('getComplaintFacets', function () {
    it('should return complaint facets', function () {
      const complaintFacets = [{ name: 'foo', entries: [] }];
      state.officerPage = { complaintFacets };

      getComplaintFacets(state).should.eql(complaintFacets);
    });
  });

  describe('summarySelector', function () {
    it('should return summary', function () {
      const summary = {
        'unit': 'unit', 'rank': 'rank', 'date_of_appt': '2015-09-23',
        'race': 'race', 'gender': 'Male', 'badge': 'badge'
      };
      state.officerPage = { summary };

      summarySelector(state).should.eql({
        unitName: 'unit', rank: 'rank', dateOfAppt: 'SEP 23, 2015',
        race: 'race', gender: 'Male', badge: 'badge'
      });
    });
  });
});

