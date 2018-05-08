const coaccusals = [{
  id: 2,
  'full_name': 'Officer 2',
  'allegation_count': 2,
  'sustained_count': 1,
  'complaint_percentile': 95.0,
  race: 'White',
  gender: 'Male',
  'birth_year': 1950,
  'coaccusal_count': 2,
}, {
  id: 3,
  'full_name': 'Officer 3',
  'allegation_count': 1,
  'sustained_count': 1,
  'complaint_percentile': 99.0,
  race: 'Black',
  gender: 'Male',
  'birth_year': 1970,
  'coaccusal_count': 1,
}];

const results = {
  '1': coaccusals,
  '1234': []
};

export default (officerId = 1) => results[`${officerId}`];
