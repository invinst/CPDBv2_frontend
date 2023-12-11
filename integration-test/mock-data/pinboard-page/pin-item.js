export const emptyCreatedPinboardData = {
  'id': 'abcd5678',
  'title': '',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
  'description': '',
};


export const pinboardWithOfficer1Data = {
  'id': 'abcd5678',
  'title': '',
  'officer_ids': [1],
  'crids': [],
  'trr_ids': [],
  'description': '',
};

export const pinboardWithOfficer1OfficersData = [
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

export const createPinboardWithOfficer1RequestData = {
  'title': '',
  'officer_ids': [1],
  'crids': [],
  'trr_ids': [],
};

export const createPinboardWithOfficer1Data = {
  'id': 'abcd5678',
  'title': '',
  'officer_ids': [1],
  'crids': [],
  'trr_ids': [],
  'description': '',
};

export const pinOfficer2PinboardRequestData = {
  'title': '',
  'officer_ids': ['1', '2'],
  'crids': [],
  'trr_ids': [],
  'description': '',
};

export const pinOfficer2PinboardData = {
  'id': 'abcd5678',
  'title': '',
  'officer_ids': ['1', '2'],
  'crids': [],
  'trr_ids': [],
  'description': '',
};


export const pinOfficer2OfficersData = [
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


export const removeAllPinItemsPinboardRequestData = {
  'crids': [],
  'description': '',
  'officer_ids': [],
  'title': '',
  'trr_ids': [],
};

export const removeAllPinItemsPinboardData = {
  'id': 'abcd5678',
  'title': '',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
  'description': '',
};

export const pinTRR123PinboardRequestData = {
  'title': '',
  'officer_ids': ['1'],
  'crids': [],
  'trr_ids': ['123'],
  'description': '',
};

export const pinTRR123PinboardData = {
  'id': 'abcd5678',
  'title': '',
  'officer_ids': ['1'],
  'crids': [],
  'trr_ids': ['123'],
  'description': '',
};

export const pinCR123PinboardRequestData = {
  'title': '',
  'officer_ids': ['1'],
  'crids': ['CR123'],
  'trr_ids': ['123'],
  'description': '',
};

export const pinCR123PinboardData = {
  'id': 'abcd5678',
  'title': '',
  'officer_ids': ['1'],
  'crids': ['CR123'],
  'trr_ids': ['123'],
  'description': '',
};
