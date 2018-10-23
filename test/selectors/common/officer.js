import { officerCardTransform } from 'selectors/common/officer';


describe('officerCardTransform', function () {
  it('should return an officer information', function () {
    const singleOfficerCard = {
      id: '8562',
      'full_name': 'Jerome Finnigan',
      'complaint_count': 175,
      'sustained_count': 6,
      'complaint_percentile': '99.987',
      'birth_year': 1963,
      race: 'White',
      gender: 'Male',
      percentile: {
        'percentile_trr': '70.069',
        'percentile_allegation_civilian': '99.984',
        'percentile_allegation': '99.987',
        'percentile_allegation_internal': '99.675',
        year: 2018,
        'officer_id': 8562,
      },
      type: 'single_officer'
    };

    officerCardTransform(singleOfficerCard).should.eql({
      id: '8562',
      officerId: '8562',
      fullName: 'Jerome Finnigan',
      complaintCount: 175,
      sustainedCount: 6,
      complaintPercentile: 99.987,
      birthYear: 1963,
      race: 'white',
      gender: 'male',
      percentile: {
        'items': [
          {
            'axis': 'Use of Force Reports',
            'value': 70.069
          },
          {
            'axis': 'Officer Allegations',
            'value': 99.675
          },
          {
            'axis': 'Civilian Allegations',
            'value': 99.984
          }
        ],
        officerId: 8562,
        textColor: '#DFDFDF',
        visualTokenBackground: '#f0201e',
        year: 2018
      },
      type: 'single_officer'
    });
  });
});
