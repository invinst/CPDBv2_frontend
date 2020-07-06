export const pinboardData = {
  'id': 'ceea8ea3',
  'title': 'Pinboard Title',
  'officer_ids': [1234],
  'crids': ['1234567'],
  'trr_ids': [1234],
  'description': 'Pinboard Description',
};

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

export const pinboardsListData = [
  {
    'id': 'ceea8ea3',
    'title': 'Pinboard title',
    'created_at': '2019-09-12',
    'last_viewed_at': '2019-10-20T05:45:00.967Z',
  },
  {
    'id': '28a6cad6',
    'title': ' copy 2',
    'created_at': '2020-06-16',
    'last_viewed_at': '2020-06-16T03:13:18.634819Z',
  },
  {
    'id': '1cf707c8',
    'title': ' copy',
    'created_at': '2020-06-16',
    'last_viewed_at': '2020-06-16T03:13:15.413617Z',
  },
  {
    'id': '8f75b55e',
    'title': ' copy',
    'created_at': '2020-06-16',
    'last_viewed_at': '2020-06-16T03:13:12.476303Z',
  },
  {
    'id': '133b5796',
    'title': '',
    'created_at': '2020-06-16',
    'last_viewed_at': '2020-06-16T03:12:47.264821Z',
  },
  {
    'id': '357a1a92',
    'title': ' copy',
    'created_at': '2020-06-16',
    'last_viewed_at': '2020-06-16T02:55:33.132359Z',
  },
  {
    'id': '6ea61a74',
    'title': '',
    'created_at': '2020-06-15',
    'last_viewed_at': '2020-06-15T09:51:22.959919Z',
  },
  {
    'id': '746b76a8',
    'title': ' copy',
    'created_at': '2020-06-15',
    'last_viewed_at': '2020-06-15T09:51:19.732191Z',
  },
  {
    'id': 'fbddbd63',
    'title': '',
    'created_at': '2020-06-15',
    'last_viewed_at': '2020-06-15T07:09:53.012098Z',
  },
  {
    'id': '0791a1a6',
    'title': ' copy',
    'created_at': '2020-06-15',
    'last_viewed_at': '2020-06-15T07:09:08.599145Z',
  },
  {
    'id': '2752843c',
    'title': '',
    'created_at': '2020-06-15',
    'last_viewed_at': '2020-06-15T07:08:44.969149Z',
  },
  {
    'id': '6d00ea6f',
    'title': '',
    'created_at': '2020-06-15',
    'last_viewed_at': '2020-06-15T07:08:07.699989Z',
  },
];
