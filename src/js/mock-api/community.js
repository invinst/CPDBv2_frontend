export const getCommunity = () => ({
  'count': 77,
  'next': 'http://localhost:8000/api/v1/suggestion/single/?contentType=COMMUNITY&limit=30&offset=30&term=community',
  'previous': null,
  'results': [
    {
      'name': 'Austin',
      'area_type': 'community',
      'url': 'http://localhost:8001/url-mediator/session-builder?community=Austin',
      'tags': [
        'community',
      ],
      'allegation_count': 9427,
      'officers_most_complaint': [
        {
          'id': 25898,
          'percentile_allegation': 99.479,
          'percentile_allegation_civilian': 99.6971,
          'percentile_allegation_internal': 70.7427,
          'percentile_trr': 97.0276,
          'name': 'Robert Seaberry',
          'count': 65,
        },
        {
          'id': 13391,
          'percentile_allegation': 99.2931,
          'percentile_allegation_civilian': 83.7403,
          'percentile_allegation_internal': 61.1521,
          'percentile_trr': 72.1094,
          'name': 'Tyrone Jenkins',
          'count': 52,
        },
        {
          'id': 18043,
          'percentile_allegation': 97.7239,
          'percentile_allegation_civilian': 62.4393,
          'percentile_allegation_internal': 98.0095,
          'percentile_trr': 0.0,
          'name': 'Otha Mc Coy',
          'count': 50,
        },
      ],
      'most_common_complaint': [
        {
          'id': 98,
          'name': 'Use Of Force',
          'count': 981,
        },
        {
          'id': 204,
          'name': 'Operation/Personnel Violations',
          'count': 430,
        },
        {
          'id': 194,
          'name': 'Operation/Personnel Violations',
          'count': 363,
        },
      ],
      'race_count': [
        {
          'race': 'Black',
          'count': 81066,
        },
        {
          'race': 'Hispanic',
          'count': 11132,
        },
        {
          'race': 'White',
          'count': 4353,
        },
        {
          'race': 'Other',
          'count': 611,
        },
        {
          'race': 'Asian',
          'count': 481,
        },
      ],
      'median_income': '$31,478',
      'id': '451',
    },
  ],
});
