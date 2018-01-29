import { map } from 'lodash';

import { CitySummaryFactory, rawCommunityFactory } from 'utils/test/factories/heat-map';


export const getCitySummary = () => (CitySummaryFactory.build({
  'allegation_count': 10,
  'discipline_count': 5,
  'most_common_complaints': [
    'Operation/Personnel Violations',
    'Use Of Force',
    'Illegal Search'
  ]
}));

export const getCommunities = () => ({
  type: 'FeatureCollection',
  features: map([rawCommunityFactory.build({
    'allegation_count': 5,
    'discipline_count': 2
  }), ...rawCommunityFactory.buildList(9)], (properties) => ({
    properties
  }))
});
