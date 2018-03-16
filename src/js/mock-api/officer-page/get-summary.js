export default () => ({
  'id': 1,
  'full_name': 'Bernadette Kelly',
  'unit': '001',
  'date_of_appt': '2015-09-23',
  'rank': 'NA',
  'race': 'White',
  'badge': '12345',
  'gender': 'Male',
  'birth_year': 1963,
  'complaint_records': {
    'count': 10,
    'sustained_count': 2,
    'items': [{
      'year': 2010,
      'count': 5,
      'sustained_count': 1
    }, {
      'year': 2012,
      'count': 10,
      'sustained_count': 2
    }],
    'facets': [{
      'name': 'category',
      'entries': [{
        'name': 'Illegal Search',
        'count': 10,
        'sustained_count': 2,
        'items': [{
          'year': 2010,
          'count': 5,
          'sustained_count': 1,
          'name': 'Illegal Search'
        }, {
          'year': 2012,
          'count': 10,
          'sustained_count': 2,
          'name': 'Illegal Search'
        }]
      }]
    }, {
      'name': 'complainant race',
      'entries': [{
        'name': 'White',
        'count': 10,
        'sustained_count': 2,
        'items': [{
          'year': 2010,
          'count': 4,
          'sustained_count': 1,
          'name': 'White'
        }, {
          'year': 2012,
          'count': 10,
          'sustained_count': 2,
          'name': 'White'
        }]
      }]
    }, {
      'name': 'complainant age',
      'entries': [{
        'name': '<20',
        'count': 10,
        'sustained_count': 2,
        'items': [{
          'year': 2010,
          'count': 4,
          'sustained_count': 1,
          'name': 'White'
        }, {
          'year': 2012,
          'count': 10,
          'sustained_count': 2,
          'name': 'White'
        }]
      }]
    }, {
      'name': 'complainant gender',
      'entries': [{
        'name': 'Female',
        'count': 10,
        'sustained_count': 2,
        'items': [{
          'year': 2010,
          'count': 4,
          'sustained_count': 1,
          'name': 'White'
        }, {
          'year': 2012,
          'count': 8,
          'sustained_count': 1,
          'name': 'White'
        }, {
          'year': 2013,
          'count': 10,
          'sustained_count': 2,
          'name': 'White'
        }]
      }]
    }]
  }
});
