import should from 'should';

import { communityGeoJSONSelector, communitiesSelector } from 'selectors/landing-page/heat-map';
import { rawCommunityFactory, raceCountFactory, rawComplaintOfficerFactory } from 'utils/test/factories/heat-map';

describe('Heat map selectors', function () {
  const state = {
    landingPage: {
      heatMap: {
        communities: {
          type: 'FeatureCollection',
          features: [{
            abc: 'def',
            properties: rawCommunityFactory.build({
              id: 1,
              'allegation_count': 10,
              'discipline_count': 5,
              'median_income': '$1,000',
              'most_complaints_officers': [rawComplaintOfficerFactory.build({
                'complaints_count': 1,
                'full_name': 'Jerome Finnigan',
                id: 1
              })],
              name: 'Hyde Park',
              population: 1500,
              'race_count': [raceCountFactory.build({
                race: 'Black',
                count: 50
              })]
            })
          }]
        }
      }
    }
  };

  describe('communityGeoJSONSelector', function () {
    it('should return community geojson', function () {
      communityGeoJSONSelector(state).should.eql({
        type: 'FeatureCollection',
        features: [{
          abc: 'def',
          properties: {
            id: 1,
            allegationCount: '10',
            disciplineCount: '5',
            medianIncome: '$1,000',
            name: 'Hyde Park',
            population: '1,500',
            mostComplaintsOfficers: [{
              complaintsCount: 1,
              fullName: 'Jerome Finnigan',
              id: 1
            }],
            raceCount: [{
              race: 'Black',
              count: '100%'
            }]
          }
        }]
      });
    });
    it('should return null when receive null', function () {
      should(communityGeoJSONSelector({
        landingPage: {
          heatMap: {
            communities: null
          }
        }
      })).eql(null);
    });
  });

  describe('communitiesSelector', function () {
    it('should return community list', function () {
      communitiesSelector(state).should.eql([
        {
          id: 1,
          allegationCount: '10',
          disciplineCount: '5',
          medianIncome: '$1,000',
          name: 'Hyde Park',
          population: '1,500',
          mostComplaintsOfficers: [{
            complaintsCount: 1,
            fullName: 'Jerome Finnigan',
            id: 1
          }],
          raceCount: [{
            race: 'Black',
            count: '100%'
          }]
        }
      ]);
    });

    it('should return null when receive null', function () {
      should(communitiesSelector({
        landingPage: {
          heatMap: {
            communities: null
          }
        }
      })).eql(null);
    });
  });
});
