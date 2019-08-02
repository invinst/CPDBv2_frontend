import { citySummarySelector } from 'selectors/landing-page/city-summary';


describe('citySummarySelector', function () {
  it('should return city summary', function () {
    citySummarySelector({
      landingPage: {
        heatMap: {
          citySummary: {
            'start_year': 1999,
            'end_year': 2017,
            'allegation_count': 10,
            'discipline_count': 5,
            'most_common_complaints': [
              'abc',
              'def',
              'ghi',
            ],
          },
        },
      },
    }).should.eql({
      startYear: 1999,
      endYear: 2017,
      allegationCount: 10,
      disciplinePercentage: 50,
      mostCommonComplaints: [
        'abc',
        'def',
        'ghi',
      ],
    });
  });
});
