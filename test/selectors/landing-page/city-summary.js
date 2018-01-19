import { citySummarySelector } from 'selectors/landing-page/city-summary';


describe('citySummarySelector', function () {
  it('should return city summary', function () {
    citySummarySelector({
      landingPage: {
        heatMap: {
          citySummary: {
            'allegation_count': 10,
            'discipline_count': 5,
            'most_common_complaints': [
              'abc',
              'def',
              'ghi'
            ]
          }
        }
      }
    }).should.eql({
      allegationCount: 10,
      disciplineCount: 5,
      mostCommonComplaints: [
        'abc',
        'def',
        'ghi'
      ]
    });
  });
});
