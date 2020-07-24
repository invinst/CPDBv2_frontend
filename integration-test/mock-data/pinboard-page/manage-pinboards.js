import { pinboardData } from './common';

export const shortPinboardsListData = [
  {
    'id': 'abcd5678',
    'title': 'Pinboard title',
    'created_at': '2019-09-12',
    'last_viewed_at': '2019-10-20T05:45:00.967Z',
  },
  {
    'id': 'abcd1234',
    'title': '',
    'created_at': '2019-10-15',
    'last_viewed_at': '2019-10-18T06:15:00.967Z',
  },
];

export const pinboardsListData = [
  {
    'id': 'abcd5678',
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

export const pinboardsDetailMenu = {
  pinboards: [
    {
      'id': '8d2daffe',
      'title': 'Skrull Cap',
      'created_at': '2020-03-09',
      'crids': [],
      'officer_ids': [
        13937,
        83473,
        81234,
      ],
      'trr_ids': [],
    },
    {
      'id': '99a3ea5b',
      'title': 'Watts Crew',
      'created_at': '2020-03-09',
      'crids': [],
      'officer_ids': [1],
      'trr_ids': [],
    },
    {
      'id': '8e8c623a',
      'title': '',
      'created_at': '2020-03-09',
      'crids': [],
      'officer_ids': [1],
      'trr_ids': [],
    },
    {
      'id': '7a0d5648',
      'title': 'Watts Crew 2',
      'created_at': '2020-03-09',
      'crids': [],
      'officer_ids': [
        1,
        29033,
        13937,
      ],
      'trr_ids': [],
    },
    {
      'id': 'eb912947',
      'title': 'Title 5 edit 3',
      'created_at': '2020-01-03',
      'crids': [
        '269123',
        '1063957',
      ],
      'officer_ids': [
        1,
        4137,
        32265,
        29033,
        21468,
        27778,
        18206,
      ],
      'trr_ids': [],
    },
  ],
  updateRequestParams: [
    {
      'title': 'Skrull Cap',
      'description': '',
      'officer_ids': [
        '13937',
        '83473',
        '81234',
        '1',
      ],
      'crids': [],
      'trr_ids': [],
    },
    {
      'title': 'Skrull Cap',
      'description': '',
      'officer_ids': [
        '13937',
        '83473',
        '81234',
      ],
      'crids': ['1000000'],
      'trr_ids': [],
    },
  ],
  updatedPinboards: [
    {
      'id': '8d2daffe',
      'title': 'Skrull Cap',
      'description': '',
      'created_at': '2020-03-09',
      'crids': [],
      'officer_ids': [
        13937,
        83473,
        81234,
        1,
      ],
      'trr_ids': [],
    },
    {
      'id': '8d2daffe',
      'title': 'Skrull Cap',
      'description': '',
      'created_at': '2020-03-09',
      'crids': ['1000000'],
      'officer_ids': [
        13937,
        83473,
        81234,
      ],
      'trr_ids': [],
    },
  ],
  createPinboardRequestParams: [
    {
      'officer_ids': [1],
    },
    {
      'crids': ['1000000'],
    },
  ],
  createdPinboards: [
    {
      'id': 'f7231a74',
      'title': '',
      'officer_ids': [1],
      'crids': [],
      'trr_ids': [],
      'description': '',
    },
    {
      'id': 'f7295a74',
      'title': '',
      'officer_ids': [],
      'crids': ['1000000'],
      'trr_ids': [],
      'description': '',
    },
  ],
};

export const unpinFirstOfficerCardRequestData = {
  'title': 'Pinboard Title',
  'officer_ids': [],
  'crids': ['1234567'],
  'trr_ids': ['1234'],
  'description': 'Pinboard Description',
};

export const unpinFirstOfficerCardData = {
  id: 'abcd5678',
  ...unpinFirstOfficerCardRequestData,
};

export const duplicateCurrentPinboardRequestData = {
  'source_pinboard_id': 'abcd5678',
};

export const duplicatedPinboardData = {
  ...pinboardData,
  id: 'abcd1234',
};

export const createdPinboardFromParamsRequestData = {
  title: '',
  'officer_ids': [1, 2],
  'crids': ['5678123'],
  'trr_ids': [3, 2],
};

export const createdPinboardFromInvalidParamsRequestData = {
  title: '',
  'officer_ids': [1, 2],
  'crids': ['987654', '5678123'],
  'trr_ids': [9, 7],
};

export const createdPinboardFromInvalidParamsResponseData = {
  id: 'abcd1234',
  title: '',
  'officer_ids': [1, 2],
  'crids': ['5678123'],
  'trr_ids': [],
  'not_found_items': {
    'officer_ids': [],
    'crids': ['987654'],
    'trr_ids': [9, 7],
  },
};

export const createdPinboardFromInvalidParamsData = {
  id: 'abcd1234',
  title: '',
  'officer_ids': [1, 2],
  'crids': ['5678123'],
  'trr_ids': [],
};

export const createdPinboardFromParamsData = {
  id: 'abcd1234',
  title: '',
  'officer_ids': ['1', '2'],
  'crids': ['5678123'],
  'trr_ids': ['3', '2'],
  description: '',
};

export const createdPinboardWithTitleRequestData = {
  title: 'Empty pinboard with preset title via url',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
};

export const createdPinboardWithTitleData = {
  id: 'abcd1234',
  title: 'Empty pinboard with preset title via url',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
  description: '',
};

export const createdPinboardWithTitleAndParamsRequestData = {
  title: 'Preset title via url',
  'officer_ids': [1, 2],
  'crids': ['5678123'],
  'trr_ids': [3, 2],
};

export const createdPinboardWithTitleAndParamsData = {
  id: 'abcd1234',
  title: 'Preset title via url',
  'officer_ids': ['1', '2'],
  'crids': ['5678123'],
  'trr_ids': ['3', '2'],
  description: '',
};

export const createdPinboardFromParamsOfficersData = [
  {
    'id': 1,
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
  {
    'id': 2,
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

export const createdPinboardFromParamsTRRsData = [
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
      'percentile_trr': '72.1094',
      'percentile_allegation_civilian': '98.5549',
      'percentile_allegation_internal': '61.1521',
      'allegation_count': 93,
    },
    'to': '/trr/3/',
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
      'percentile_trr': '72.1094',
      'percentile_allegation_civilian': '98.5549',
      'percentile_allegation_internal': '61.1521',
      'allegation_count': 93,
    },
    'to': '/trr/2/',
  },
];

export const createdPinboardFromParamsComplaintsData = [
  {
    'crid': '5678123',
    'incident_date': '2010-01-01',
    'point': { 'lon': 1.0, 'lat': 1.0 },
    'category': 'Use Of Force',
  },
];

export const duplicateCreatedPinboardFromParamsRequestData = {
  'source_pinboard_id': 'abcd1234',
};

export const duplicateCreatedPinboardFromParamsData = {
  ...createdPinboardFromParamsData,
  'id': 'abcd7890',
};
