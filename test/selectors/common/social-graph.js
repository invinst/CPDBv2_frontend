import { officersTransform, coaccusedDataTransform } from 'selectors/common/social-graph';


describe('Social Graph page selectors', function () {
  describe('officersTransform', function () {
    it('should return officer correctly', function () {
      const officer = {
        'full_name': 'Jerome Finnigan',
        'id': 111,
      };
      officersTransform(officer).should.eql({
        fullName: 'Jerome Finnigan',
        id: 111,
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
