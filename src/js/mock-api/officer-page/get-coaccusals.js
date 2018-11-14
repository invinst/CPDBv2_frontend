const coaccusals = [{
  id: 2,
  'full_name': 'John Kelly',
  'complaint_count': 2,
  'sustained_count': 1,
  'complaint_percentile': 95.0,
  race: 'White',
  gender: 'Male',
  'birth_year': 1950,
  'coaccusal_count': 2,
  'rank': 'Police Officer',
  'percentile': [{
    'percentile_trr': '90.0000',
    'percentile_allegation_civilian': '92.0000',
    'percentile_allegation': '93.0000',
    'percentile_allegation_internal': '91.0000',
    'id': 2,
    'year': 2016
  }],
}, {
  id: 3,
  'full_name': 'Jerome Finnigan',
  'complaint_count': 1,
  'sustained_count': 1,
  'complaint_percentile': 99.0,
  race: 'Black',
  gender: 'Male',
  'birth_year': 1970,
  'coaccusal_count': 1,
  'rank': 'Detective',
  'percentile': [{
    'percentile_trr': '80.0000',
    'percentile_allegation_civilian': '72.0000',
    'percentile_allegation': '98.0000',
    'percentile_allegation_internal': '81.0000',
    'id': 3,
    'year': 2016
  }],
}];

const results = {
  '1': coaccusals,
  '1234': []
};

export default (officerId = 1) => results[`${officerId}`];
