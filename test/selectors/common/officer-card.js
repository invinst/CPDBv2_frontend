import { officerCardTransform } from 'selectors/common/officer-card';


describe('officerCardTransform', function () {
  it('should transform officer card correctly', function () {
    officerCardTransform({
      'id': 1,
      'full_name': 'Michel Foo',
      'complaint_count': 15,
      'sustained_count': 1,
      'birth_year': 1977,
      'race': 'White',
      'gender': 'Male',
      'rank': 'Po As Detective',
      'percentile_allegation': '91.5000',
      'percentile_allegation_civilian': '97.0000',
      'percentile_allegation_internal': '82.0000',
      'percentile_trr': '92.3000',
    }).should.eql({
      id: 1,
      officerId: 1,
      fullName: 'Michel Foo',
      complaintCount: 15,
      sustainedCount: 1,
      allegationPercentile: 91.5,
      age: '40-year-old',
      race: 'white',
      gender: 'male',
      rank: 'Po As Detective',
      percentile: {
        items: [{
          'axis': 'Use of Force Reports',
          'value': 92.3,
        }, {
          'axis': 'Officer Allegations',
          'value': 82,
        }, {
          'axis': 'Civilian Allegations',
          'value': 97,
        }],
        textColor: '#DFDFDF',
        visualTokenBackground: '#F52524',
      },
    });
  });

  it('should transform last percentile if card has many percentiles', function () {
    officerCardTransform({
      'id': 1,
      'full_name': 'Michel Foo',
      'complaint_count': 15,
      'sustained_count': 1,
      'birth_year': 1977,
      'race': 'White',
      'gender': 'Male',
      'rank': 'Po As Detective',
      'percentile_allegation': '91.0000',
      'percentile_allegation_civilian': '97.0000',
      'percentile_allegation_internal': '82.0000',
      'percentile_trr': '92.0000',
    }).should.eql({
      id: 1,
      officerId: 1,
      fullName: 'Michel Foo',
      complaintCount: 15,
      sustainedCount: 1,
      allegationPercentile: 91,
      age: '40-year-old',
      race: 'white',
      gender: 'male',
      rank: 'Po As Detective',
      percentile: {
        items: [{
          'axis': 'Use of Force Reports',
          'value': 92,
        }, {
          'axis': 'Officer Allegations',
          'value': 82,
        }, {
          'axis': 'Civilian Allegations',
          'value': 97,
        }],
        textColor: '#DFDFDF',
        visualTokenBackground: '#F52524',
      },
    });
  });

  it('should handle missing cases', function () {
    const officerCard = officerCardTransform({});
    officerCard.race.should.be.eql('N/A');
    officerCard.gender.should.be.eql('N/A');
  });
});
