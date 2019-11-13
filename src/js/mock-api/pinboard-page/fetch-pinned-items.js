export const fetchPinboardComplaints = () => ([
  {
    'crid': '1234567',
    'incident_date': '2010-01-01',
    'point': { 'lon': 1.0, 'lat': 1.0 },
    'category': 'Use Of Force',
  },
]);

export const ffff6666Complaints = [{
  'crid': '5678123',
  'incident_date': '2010-01-01',
  'point': { 'lon': 1.0, 'lat': 1.0 },
  'category': 'Use Of Force',
}];

export const eeee7777Complaints = ffff6666Complaints;

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
    },
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
]);

export const dcab5678Officers = [
  {
    'id': '1',
    'full_name': 'Bernadette Kelly',
    'race': 'White',
    'gender': 'Male',
    'complaint_count': 12,
    'sustained_count': 3,
    'birth_year': 1972,
  },
  {
    'id': '3',
    'full_name': 'Edward May',
    'race': 'White',
    'gender': 'Male',
    'complaint_count': 15,
    'sustained_count': 3,
    'birth_year': 1975,
  },
];

export const abcd8765Officers = [
  {
    'id': '1',
    'full_name': 'Bernadette Kelly',
    'race': 'White',
    'gender': 'Male',
    'complaint_count': 12,
    'sustained_count': 3,
    'birth_year': 1972,
  },
];

export const abcd8765OUpdatedfficers = [
  {
    'id': '1',
    'full_name': 'Bernadette Kelly',
    'race': 'White',
    'gender': 'Male',
    'complaint_count': 12,
    'sustained_count': 3,
    'birth_year': 1972,
  },
  {
    'id': '2',
    'full_name': 'Edward May',
    'race': 'White',
    'gender': 'Male',
    'complaint_count': 15,
    'sustained_count': 3,
    'birth_year': 1975,
  },
];

export const ffff6666Officers = [
  {
    'id': 1,
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
    },
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
  {
    'id': 2,
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
    },
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

export const eeee7777Officers = ffff6666Officers;

export const fetchPinboardTRRs = () => ([
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
      'percentile': {
        'id': 180838,
        'percentile_trr': '72.1094',
        'percentile_allegation_civilian': '98.5549',
        'percentile_allegation_internal': '61.1521',
      },
      'allegation_count': 93,
    },
    'to': '/trr/123456/',
  },
]);

export const ffff6666TRRs = [
  {
    'id': 3,
    'trr_datetime': '2012-01-01',
    'category': 'Impact Weapon',
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
        'percentile_allegation_internal': '61.1521',
      },
      'allegation_count': 93,
    },
    'to': '/trr/123456/',
  },
  {
    'id': 2,
    'trr_datetime': '2012-01-01',
    'category': 'Impact Weapon',
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
        'percentile_allegation_internal': '61.1521',
      },
      'allegation_count': 93,
    },
    'to': '/trr/123456/',
  },
];

export const fetchPinboardOfficers9778a2ec = () => ([]);
