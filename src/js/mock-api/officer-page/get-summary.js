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
    'sustained_count': 2,
    'facets': [
      { 'name': 'category', 'entries': [{ 'name': 'Illegal Search', 'count': 10, 'sustained_count': 2 }] },
      { 'name': 'complainant race', 'entries': [{ 'name': 'White', 'count': 10, 'sustained_count': 2 }] },
      { 'name': 'complainant age', 'entries': [{ 'name': '<20', 'count': 10, 'sustained_count': 2 }] },
      { 'name': 'complainant gender', 'entries': [{ 'name': 'Female', 'count': 10, 'sustained_count': 2 }]
    }]
  }
});
