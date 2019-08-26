import networkOfficers from 'reducers/social-graph-page/network-data/network-officers';

import { SOCIAL_GRAPH_OFFICERS_REQUEST_SUCCESS } from 'utils/constants';


describe('networkOfficers reducer', function () {
  it('should return initial state', function () {
    networkOfficers(undefined, {}).should.eql([]);
  });

  it('should handle SOCIAL_GRAPH_OFFICERS_REQUEST_SUCCESS', function () {
    const graphOfficerData = [
      {
        'id': 123,
        'full_name': 'Jerome Finnigan',
        'appointed_date': '2001-07-08',
        'resignation_date': '2005-10-10',
        'badge': '123456',
        'gender': 'Male',
        'birth_year': 1970,
        'race': 'White',
        'rank': 'Police Officer',
        'unit': {
          'id': 456,
          'unit_name': 'Unit 715',
          'description': 'This is unit description',
        },
        'allegation_count': 10,
        'sustained_count': 5,
        'civilian_compliment_count': 20,
        'discipline_count': 3,
        'trr_count': 7,
        'major_award_count': 15,
        'honorable_mention_count': 12,
        'percentile': {
          'officer_id': 123,
          'year': 2017,
          'percentile_allegation': '95',
          'percentile_trr': '90',
          'percentile_allegation_civilian': '97.0',
          'percentile_allegation_internal': '82.0',
        },
        'honorable_mention_percentile': '70',
      },
    ];

    networkOfficers([], {
      type: SOCIAL_GRAPH_OFFICERS_REQUEST_SUCCESS,
      payload: graphOfficerData,
    }).should.eql(graphOfficerData);
  });
});

