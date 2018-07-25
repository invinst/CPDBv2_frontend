import { coaccusalGroupsSelector, hasCoaccusalSelector } from 'selectors/officer-page/coaccusals';


describe('Officer coaccusals selectors', function () {
  describe('coaccusalGroupsSelector', function () {
    it('should return empty if the state is empty', function () {
      coaccusalGroupsSelector({
        officerPage: {
          coaccusals: {
            items: []
          }
        }
      }).should.be.empty();
    });

    it('should group coaccusals into correct groups', function () {
      const state = {
        officerPage: {
          coaccusals: {
            items: [
              {
                id: 1,
                'full_name': 'officerName 1',
                'allegation_count': 15,
                'sustained_count': 1,
                'complaint_percentile': 59.0,
                'birth_year': 1977,
                race: 'White',
                gender: 'Male',
                'coaccusal_count': 4,
                rank: 'Po As Detective',
                'percentile_trr': 95.0,
                'percentile_allegation_internal': 94.0,
                'percentile_allegation_civilian': 93.0,
              },
              {
                id: 2,
                'full_name': 'officerName 2',
                'allegation_count': 10,
                'sustained_count': 1,
                'complaint_percentile': 39.0,
                race: 'white',
                gender: 'male',
                'coaccusal_count': 2,
                rank: 'Po As Detective',
                'percentile_trr': 85.0,
                'percentile_allegation_internal': 84.0,
                'percentile_allegation_civilian': 83.0,
              },
              {
                id: 3,
                'full_name': 'officerName 3',
                'allegation_count': 5,
                'sustained_count': 1,
                'complaint_percentile': 19.0,
                'birth_year': 1977,
                race: 'white',
                gender: 'male',
                'coaccusal_count': 1,
                rank: 'Police Officer',
                'percentile_trr': 75.0,
                'percentile_allegation_internal': 74.0,
                'percentile_allegation_civilian': 73.0,
              }
            ]
          }
        }
      };

      coaccusalGroupsSelector(state).should.eql([
        {
          name: 'COACCUSED 2-4 TIMES',
          coaccusals: [
            {
              officerId: 1,
              officerName: 'officerName 1',
              allegationCount: 15,
              sustainedCount: 1,
              allegationPercentile: 59.0,
              age: 40,
              race: 'white',
              gender: 'male',
              coaccusalCount: 4,
              rank: 'Po As Detective',
              radarAxes: [
                {
                  axis: 'trr',
                  value: 95.0
                },
                {
                  axis: 'internal',
                  value: 94.0
                },
                {
                  axis: 'civilian',
                  value: 93.0
                }
              ],
              radarColor: {
                backgroundColor: '#f52524',
                textColor: '#DFDFDF'
              },
            },
            {
              officerId: 2,
              officerName: 'officerName 2',
              allegationCount: 10,
              sustainedCount: 1,
              allegationPercentile: 39.0,
              age: 'N/A',
              race: 'white',
              gender: 'male',
              coaccusalCount: 2,
              rank: 'Po As Detective',
              radarAxes: [
                {
                  axis: 'trr',
                  value: 85.0
                },
                {
                  axis: 'internal',
                  value: 84.0
                },
                {
                  axis: 'civilian',
                  value: 83.0
                }
              ],
              radarColor: {
                backgroundColor: '#f52524',
                textColor: '#DFDFDF'
              },
            },
          ],
        },
        {
          name: 'COACCUSED 1 TIME',
          coaccusals: [
            {
              officerId: 3,
              officerName: 'officerName 3',
              allegationCount: 5,
              sustainedCount: 1,
              allegationPercentile: 19.0,
              age: 40,
              race: 'white',
              gender: 'male',
              coaccusalCount: 1,
              rank: 'Police Officer',
              radarAxes: [
                {
                  axis: 'trr',
                  value: 75.0
                },
                {
                  axis: 'internal',
                  value: 74.0
                },
                {
                  axis: 'civilian',
                  value: 73.0
                }
              ],
              radarColor: {
                backgroundColor: '#f32a29',
                textColor: '#DFDFDF'
              },
            }
          ]
        },
      ]);
    });
  });

  describe('hasCoaccusalSelector', function () {
    it('should return false when there is no data', function () {
      const state = {
        officerPage: {
          coaccusals: {
            items: []
          }
        }
      };
      hasCoaccusalSelector(state).should.be.false();
    });

    it('should return true when have data', function () {
      const state = {
        officerPage: {
          coaccusals: {
            items: [{
              id: 1,
              'full_name': 'officerName 1',
              'allegation_count': 15,
              'sustained_count': 1,
              'complaint_percentile': 59.0,
              'birth_year': 1977,
              race: 'White',
              gender: 'Male',
              'coaccusal_count': 4,
              rank: 'Po As Detective',
              'percentile_trr': 95.0,
              'percentile_allegation_internal': 94.0,
              'percentile_allegation_civilian': 93.0,
            }]
          }
        }
      };
      hasCoaccusalSelector(state).should.be.true();
    });
  });
});


