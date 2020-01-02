import { createSelector } from 'reselect';
import { map, reduce, round, kebabCase } from 'lodash';


const getRawCommunities = state => state.landingPage.heatMap.communities;
export const getClusterGeoJson = state => state.landingPage.heatMap.clusterGeoJson;

const transformMostComplaintOfficer = officer => ({
  complaintsCount: officer['complaints_count'],
  fullName: officer['full_name'],
  officerSlug: kebabCase(officer['full_name']),
  id: officer['id'],
});

const transformRaceCount = raceCount => {
  const total = reduce(raceCount, (sum, { count }) => (sum + count), 0);

  return map(raceCount, ({ race, count }) => ({
    race,
    count: `${round((count / total) * 100, 1)}%`,
  }));
};

const transformCommunity = community => ({
  allegationCount: community['allegation_count'].toLocaleString(),
  disciplineCount: community['discipline_count'].toLocaleString(),
  id: community.id,
  medianIncome: community['median_income'],
  mostComplaintsOfficers: map(community['most_complaints_officers'], transformMostComplaintOfficer),
  name: community.name,
  population: community.population.toLocaleString(),
  raceCount: transformRaceCount(community['race_count']),
});

export const hasClusterGeoJsonData = createSelector(
  getClusterGeoJson,
  data => data !== null
);

export const communityGeoJSONSelector = createSelector(
  getRawCommunities,
  communities => (communities ? {
    ...communities,
    features: map(communities.features, feature => ({
      ...feature,
      properties: transformCommunity(feature.properties),
    })),
  } : null)
);

export const communitiesSelector = createSelector(
  communityGeoJSONSelector,
  communityGeoJSON =>
    communityGeoJSON ?
      map(communityGeoJSON.features, feature => feature.properties) :
      null
);

export const hasCommunitiesSelector = createSelector(
  getRawCommunities,
  communities => communities !== null
);
