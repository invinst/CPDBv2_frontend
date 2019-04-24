import { officerTransform, coaccusedDataTransform, officerDetailTransform } from 'selectors/common/social-graph';


describe('Social Graph page selectors', function () {
  describe('officerTransform', function () {
    it('should return officer correctly', function () {
      const officer = {
        'full_name': 'Jerome Finnigan',
        'id': 111,
      };
      officerTransform(officer).should.eql({
        fullName: 'Jerome Finnigan',
        id: 111,
      });
    });
  });

  it('should return officer detail correctly', function () {
    const officer = {
      'full_name': 'Jerome Finnigan',
      'id': 111,
      'percentile': {
        'officer_id': 111,
        'year': 2007,
        'percentile_allegation': '91.5',
        'percentile_allegation_civilian': '97.0',
        'percentile_allegation_internal': '82.0',
        'percentile_trr': '92.3'
      },
    };
    officerDetailTransform(officer).should.eql({
      fullName: 'Jerome Finnigan',
      id: 111,
      percentile: {
        officerId: 111,
        year: 2007,
        items: [
          { axis: 'Use of Force Reports', value: 92.3 },
          { axis: 'Officer Allegations', value: 82 },
          { axis: 'Civilian Allegations', value: 97 }
        ],
        visualTokenBackground: '#f52524',
        textColor: '#DFDFDF'
      }
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
