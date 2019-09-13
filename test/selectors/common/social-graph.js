import { officerTransform, coaccusedDataTransform } from 'selectors/common/social-graph';


describe('Social Graph page selectors', function () {
  describe('officerTransform', function () {
    it('should return officer correctly', function () {
      const officer = {
        'full_name': 'Jerome Finnigan',
        'id': 111,
        'percentile': {
          'percentile_trr': '78.2707',
          'percentile_allegation_civilian': '97.8772',
          'percentile_allegation_internal': '61.1521',
        },
      };
      officerTransform(officer).should.eql({
        fullName: 'Jerome Finnigan',
        id: 111,
        visualTokenBackground: '#f0201e',
      });
    });
  });

  describe('coaccusedDataTransform', function () {
    it('should return coaccused datum correctly', function () {
      const coaccusedDatum = {
        'officer_id_1': 123,
        'officer_id_2': 456,
        'incident_date': '1988-10-03T00:00:00Z',
        'accussed_count': 5,
      };
      coaccusedDataTransform(coaccusedDatum).should.eql({
        officerId1: 123,
        officerId2: 456,
        incidentDate: '1988-10-03T00:00:00Z',
        accussedCount: 5,
      });
    });
  });
});
