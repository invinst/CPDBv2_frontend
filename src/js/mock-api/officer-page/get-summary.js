export default () => ({
  'id': 1,
  'full_name': 'Bernadette Kelly',
  'unit': '001',
  'date_of_appt': '2015-09-23',
  'rank': 'NA',
  'race': 'White',
  'badge': '12345',
  'gender': 'Male',
  'complaint_records': {
    'count': 10,
    'facets': [
      { 'name': 'category', 'entries': [{ 'name': 'Illegal Search', 'count': 10 }] },
      { 'name': 'race', 'entries': [{ 'name': 'White', 'count': 10 }] },
      { 'name': 'age', 'entries': [{ 'name': '18', 'count': 10 }] },
      { 'name': 'gender', 'entries': [{ 'name': 'Female', 'count': 10 }]
    }]
  }
});
