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
                'complaint_count': 15,
                'sustained_count': 1,
                'complaint_percentile': 59.0,
                'birth_year': 1977,
                race: 'White',
                gender: 'Male',
                'coaccusal_count': 4,
                rank: 'Po As Detective',
                'percentile': {
                  'year': 2007,
                  'percentile_allegation': '99.987',
                  'percentile_allegation_civilian': '94.0',
                  'percentile_allegation_internal': '93.0',
                  'percentile_trr': '95.0'
                },
              },
              {
                id: 2,
                'full_name': 'officerName 2',
                'complaint_count': 10,
                'sustained_count': 1,
                'complaint_percentile': 39.0,
                'birth_year': 1981,
                race: 'white',
                gender: 'male',
                'coaccusal_count': 2,
                rank: 'Po As Detective',
                'percentile': {
                  'year': 2007,
                  'percentile_allegation': '39.0',
                  'percentile_allegation_civilian': '83.0',
                  'percentile_allegation_internal': '84.0',
                  'percentile_trr': '85.0'
                },
              },
              {
                id: 3,
                'full_name': 'officerName 3',
                'complaint_count': 5,
                'sustained_count': 1,
                'complaint_percentile': 19.0,
                'birth_year': 1977,
                race: 'white',
                gender: 'male',
                'coaccusal_count': 1,
                rank: 'Police Officer',
                'percentile': {
                  'year': 2007,
                  'percentile_allegation': '19.0',
                  'percentile_allegation_civilian': '73.0',
                  'percentile_allegation_internal': '74.0',
                  'percentile_trr': '75.0'
                },
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
              id: 1,
              officerId: 1,
              fullName: 'officerName 1',
              complaintCount: 15,
              sustainedCount: 1,
              complaintPercentile: 59.0,
              birthYear: 1977,
              race: 'white',
              gender: 'male',
              coaccusalCount: 4,
              rank: 'Po As Detective',
              percentile: {
                items: [
                  {
                    'axis': 'Use of Force Reports',
                    'value': 95
                  },
                  {
                    'axis': 'Officer Allegations',
                    'value': 93
                  },
                  {
                    'axis': 'Civilian Allegations',
                    'value': 94
                  }
                ],
                textColor: '#DFDFDF',
                visualTokenBackground: '#f52524',
                year: 2007
              },
            },
            {
              id: 2,
              officerId: 2,
              fullName: 'officerName 2',
              complaintCount: 10,
              sustainedCount: 1,
              complaintPercentile: 39.0,
              birthYear: 1981,
              race: 'white',
              gender: 'male',
              coaccusalCount: 2,
              rank: 'Po As Detective',
              percentile: {
                items: [
                  {
                    'axis': 'Use of Force Reports',
                    'value': 85
                  },
                  {
                    'axis': 'Officer Allegations',
                    'value': 84
                  },
                  {
                    'axis': 'Civilian Allegations',
                    'value': 83
                  }
                ],
                textColor: '#DFDFDF',
                visualTokenBackground: '#f52524',
                year: 2007
              },
            },
          ],
        },
        {
          name: 'COACCUSED 1 TIME',
          coaccusals: [
            {
              id: 3,
              officerId: 3,
              fullName: 'officerName 3',
              complaintCount: 5,
              sustainedCount: 1,
              complaintPercentile: 19,
              birthYear: 1977,
              race: 'white',
              gender: 'male',
              coaccusalCount: 1,
              rank: 'Police Officer',
              percentile: {
                items: [
                  {
                    'axis': 'Use of Force Reports',
                    'value': 75
                  },
                  {
                    'axis': 'Officer Allegations',
                    'value': 74
                  },
                  {
                    'axis': 'Civilian Allegations',
                    'value': 73
                  }
                ],
                textColor: '#DFDFDF',
                visualTokenBackground: '#f32a29',
                year: 2007
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
              'complaint_count': 15,
              'sustained_count': 1,
              'complaint_percentile': 59.0,
              'birth_year': 1977,
              race: 'White',
              gender: 'Male',
              'coaccusal_count': 4,
              rank: 'Po As Detective',
              percentile: {
                'percentile_trr': '95.0000',
                'percentile_allegation': '59.0000',
                'percentile_allegation_internal': '94.0000',
                'percentile_allegation_civilian': '93.0000',
              }
            }]
          }
        }
      };
      hasCoaccusalSelector(state).should.be.true();
    });
  });
});


