export const recentSearchItemsRequestData = {
  'officer_ids': ['1', '123'],
  'crids': ['CR123', 'CR456', 'CR123456'],
  'trr_ids': ['123', '456'],
};

export const recentSearchItemsData = [
  {
    'id': '1',
    'name': 'Bernadette Kelly',
    'race': 'White',
    'gender': 'Male',
    'allegation_count': 12,
    'sustained_count': 3,
    'birth_year': 1972,
    'type': 'OFFICER',
  },
  {
    'id': '123',
    'name': 'Jerome Finnigan',
    'race': 'White',
    'gender': 'Male',
    'allegation_count': 22,
    'sustained_count': 2,
    'birth_year': 1975,
    'type': 'OFFICER',
  },
  {
    'id': 'CR123',
    'crid': 'CR123',
    'incident_date': '2005-04-23',
    'type': 'CR',
  },
  {
    'id': 'CR456',
    'crid': 'CR456',
    'incident_date': '2006-04-23',
    'type': 'CR',
  },
  {
    'id': 'CR123456',
    'crid': 'CR123456',
    'incident_date': '2007-04-23',
    'type': 'CR',
  },
  {
    'id': '123',
    'force_type': 'Member Presence',
    'trr_datetime': '2009-04-27',
    'type': 'TRR',
  },
  {
    'id': '456',
    'force_type': 'Physical Force - Holding',
    'trr_datetime': '2010-04-23',
    'type': 'TRR',
  },
];
