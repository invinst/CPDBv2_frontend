import 'should-sinon';

import { getCoaccusalGroups, } from 'selectors/officer-page/coaccusals';


describe('officer page selectors', function () {
  describe('getCoaccusalGroups', function () {
    it('should return empty if the state is empty', function () {
      getCoaccusalGroups({
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
                rank: 'Po As Detective'
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
                rank: 'Po As Detective'
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
                rank: 'Police Officer'
              }
            ]
          }
        }
      };

      getCoaccusalGroups(state).should.eql([
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
              rank: 'Police Officer'
            }
          ]
        },
      ]);
    });
  });
});


