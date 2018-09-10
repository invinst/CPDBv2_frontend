import should from 'should';

import {
  communityGeoJSONSelector, communitiesSelector, getClusterGeoJson, hasClusterGeoJsonData
} from 'selectors/landing-page/heat-map';
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
        },
        clusterGeoJson: 'abc'
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
              id: 1,
              officerSlug: 'jerome-finnigan',
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
            id: 1,
            officerSlug: 'jerome-finnigan',
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

  describe('getClusterGeoJson', function () {
    it('should return cluster geojson data', function () {
      getClusterGeoJson(state).should.eql('abc');
    });
  });

  describe('hasClusterGeoJsonData', function () {
    it('should return true if has cluster geojson data', function () {
      hasClusterGeoJsonData(state).should.be.true();
    });

    it('should return false if does not have cluster geojson data', function () {
      hasClusterGeoJsonData({
        landingPage: {
          heatMap: {
            clusterGeoJson: null
          }
        }
      }).should.be.false();
    });
  });
});
