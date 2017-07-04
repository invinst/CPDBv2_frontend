export default () => ({
  'unit_name': '001',
  'member_records': {
    'active_members': 5,
    'total': 10,
    'facets': [
      { 'name': 'race', 'entries': [{ 'name': 'White', 'count': 10 }] },
      { 'name': 'age', 'entries': [{ 'name': '21-30', 'count': 10 }] },
      { 'name': 'gender', 'entries': [{ 'name': 'Female', 'count': 10 }]
      }]
  },
  'complaint_records': {
    'count': 10,
    'sustained_count': 2,
    'facets': [
      { 'name': 'category', 'entries': [{ 'name': 'Illegal Search', 'count': 10, 'sustained_count': 2 }] },
      { 'name': 'race', 'entries': [{ 'name': 'White', 'count': 10, 'sustained_count': 2 }] },
      { 'name': 'age', 'entries': [{ 'name': '<20', 'count': 10, 'sustained_count': 2 }] },
      { 'name': 'gender', 'entries': [{ 'name': 'Female', 'count': 10, 'sustained_count': 2 }]
      }]
  }
});
