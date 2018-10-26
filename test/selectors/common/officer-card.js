import { officerCardTransform } from 'selectors/common/officer-card';


describe('officerCardTransform', function () {
  it('should transform officer card correctly', function () {
    officerCardTransform({
      'id': 1,
      'full_name': 'Michel Foo',
      'complaint_count': 15,
      'sustained_count': 1,
      'complaint_percentile': 59.0,
      'birth_year': 1977,
      'race': 'White',
      'gender': 'Male',
      'rank': 'Po As Detective',
      'percentile': {
        'officer_id': 1,
        'year': 2007,
        'percentile_allegation': '91.5',
        'percentile_allegation_civilian': '97.0',
        'percentile_allegation_internal': '82.0',
        'percentile_trr': '92.3'
      },
    }).should.eql({
      id: 1,
      officerId: 1,
      fullName: 'Michel Foo',
      complaintCount: 15,
      sustainedCount: 1,
      complaintPercentile: 59.0,
      birthYear: 1977,
      race: 'white',
      gender: 'male',
      rank: 'Po As Detective',
      percentile: {
        items: [{
          'axis': 'Use of Force Reports',
          'value': 92.3
        }, {
          'axis': 'Officer Allegations',
          'value': 82
        }, {
          'axis': 'Civilian Allegations',
          'value': 97
        }],
        officerId: 1,
        textColor: '#DFDFDF',
        visualTokenBackground: '#f52524',
        year: 2007,
      },
    });
  });

  it('should handle missing cases', function () {
    const officerCard = officerCardTransform({});
    officerCard.race.should.be.eql('N/A');
    officerCard.gender.should.be.eql('N/A');
  });
});
