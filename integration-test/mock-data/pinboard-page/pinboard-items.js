export const pinboardOfficersData = [
  {
    'id': 1234,
    'full_name': 'Daryl Mack',
    'complaint_count': 10,
    'sustained_count': 0,
    'birth_year': 1975,
    'race': 'White',
    'gender': 'Male',
    'rank': 'Police Officer',
    'percentile_trr': '12.0000',
    'percentile_allegation': '99.3450',
    'percentile_allegation_civilian': '98.4344',
    'percentile_allegation_internal': '99.7840',
    'date_of_appt': '2000-01-02',
    'date_of_resignation': '2010-02-03',
    'badge': '456',
    'to': '/officer/1234/daryl-mack/',
    'unit': {
      'id': 4,
      'unit_name': '004',
      'description': 'District 004',
      'long_unit_name': 'Unit 004',
    },
    'allegation_count': 1,
    'civilian_compliment_count': 2,
    'discipline_count': 6,
    'trr_count': 7,
    'major_award_count': 8,
    'honorable_mention_count': 3,
    'honorable_mention_percentile': 88.88,
  },
];

export const pinboardComplaintsData = [
  {
    'crid': '1234567',
    'incident_date': '2010-01-01',
    'point': { 'lon': 1.0, 'lat': 1.0 },
    'category': 'Use Of Force',
  },
];

export const pinboardTRRsData = [
  {
    'id': 1234,
    'trr_datetime': '2012-01-01',
    'category': 'Impact Weapon',
    'point': { 'lon': 1.0, 'lat': 1.0 },
    'firearm_used': true,
    'address': '14XX W 63RD ST, CHICAGO IL 60636',
    'officer': {
      'id': 16567,
      'full_name': 'Baudilio Lopez',
      'percentile_trr': '72.1094',
      'percentile_allegation': '98.5549',
      'percentile_allegation_civilian': '98.5549',
      'percentile_allegation_internal': '61.1521',
      'allegation_count': 93,
    },
    'to': '/trr/123456/',
  },
];
