export const fetchPinboardComplaints = () => ([
  {
    'crid': '1234567',
    'incident_date': '2010-01-01',
    'point': { 'lon': 1.0, 'lat': 1.0 },
    'category': 'Use Of Force',
  }
]);

export const fetchPinboardOfficers = () => ([
  {
    'id': 1234,
    'full_name': 'Daryl Mack',
    'complaint_count': 10,
    'sustained_count': 0,
    'birth_year': 1975,
    'complaint_percentile': 99.3450,
    'race': 'White',
    'gender': 'Male',
    'rank': 'Police Officer',
    'percentile': {
      'percentile_trr': '12.0000',
      'percentile_allegation': '99.3450',
      'percentile_allegation_civilian': '98.4344',
      'percentile_allegation_internal': '99.7840',
      'year': 2016,
      'id': 1,
    }
  }
]);

export const fetchPinboardTRRs = () => ([
  {
    'id': 1234,
    'trr_datetime': '2012-01-01',
    'category': 'Firearm',
    'point': { 'lon': 1.0, 'lat': 1.0 },
    'firearm_used': true,
    'address': '14XX W 63RD ST, CHICAGO IL 60636',
    'officer': {
      'id': 16567,
      'full_name': 'Baudilio Lopez',
      'percentile': {
        'id': 180838,
        'percentile_trr': '72.1094',
        'percentile_allegation_civilian': '98.5549',
        'percentile_allegation_internal': '61.1521'
      },
      'allegation_count': 93
    },
    'to': '/trr/123456/'
  }
]);

export const fetchPinboardOfficers9778a2ec = () => ([]);
