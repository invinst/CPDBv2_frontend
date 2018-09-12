import {
  RawOfficerSuggestion,
  RawNeighborhoodSuggestion,
  RawCRSuggestion,
  RawTRRSuggestion
} from 'utils/test/factories/suggestion';


export const groupedSuggestions = {
  'default': {
    'OFFICER': [
      RawOfficerSuggestion.build(
        {
          id: '1',
          name: 'Bernadette Kelly',
          to: '/officer/1/bernadette-kelly/',
          'allegation_count': 10,
          'sustained_count': 2,
          'birth_year': 1972,
          race: 'White',
          gender: 'Male'
        }
      ),
      RawOfficerSuggestion.build(
        {
          id: '2',
          name: 'John Kelly',
          to: '/officer/2/john-kelly/',
          'allegation_count': 5,
          'sustained_count': 1,
          'birth_year': 1980,
          race: 'White',
          gender: 'Female'
        }),
      ...RawOfficerSuggestion.buildList(8)
    ],
    'CO-ACCUSED': [
      RawOfficerSuggestion.build(
        {
          id: '1',
          name: 'Bernadette Kelly',
          to: '/officer/1/bernadette-kelly/',
          'allegation_count': 10,
          'sustained_count': 2,
          'birth_year': 1972,
          race: 'White',
          gender: 'Male'
        }
      )
    ],
    'UNIT': [],
    'NEIGHBORHOOD': [
      RawNeighborhoodSuggestion.build({ id: '1', name: 'Kenwood' }),
      RawNeighborhoodSuggestion.build({ id: '2', name: 'Austin' }),
      RawNeighborhoodSuggestion.build({ id: '3', name: 'Englewood' }),
      RawNeighborhoodSuggestion.build({ id: '4', name: 'Loop' }),
      RawNeighborhoodSuggestion.build({ id: '5', name: 'Garfield Park' }),
      RawNeighborhoodSuggestion.build({ id: '6', name: 'Humboldt Park' }),
      RawNeighborhoodSuggestion.build({ id: '7', name: 'Auburn Gresham' }),
    ],
    'CR': [
      RawCRSuggestion.build(
        {
          id: '1',
          crid: 'CR123',
          to: '/complaint/CR123/',
          category: 'Lockup Procedures',
          'incident_date': '2004-04-23'
        }
      ),
      RawCRSuggestion.build(
        {
          id: '2',
          crid: 'CR456',
          to: '/complaint/CR456/',
          category: null,
          'incident_date': null
        }
      ),
    ],
    'TRR': [
      RawTRRSuggestion.build(
        {
          id: '123',
          to: '/trr/123/',
          'force_type': 'Member Presence',
          'trr_datetime': '2004-04-27'
        }
      ),
      RawTRRSuggestion.build(
        {
          id: '456',
          to: '/trr/456/',
          'force_type': null,
          'trr_datetime': null
        }
      )
    ]
  },
  'noresult': {},
  'foo': {
    'OFFICER': [
      RawOfficerSuggestion.build({ name: 'Laurence Lanners', to: '/officer/5678/laurence-lanners/' })
    ]
  },
  '2004/04/23': {
    'DATE > CR': [
      RawCRSuggestion.build(
        {
          id: '1',
          crid: 'CR123',
          to: '/complaint/CR123/',
          category: 'Lockup Procedures',
          'incident_date': '2004-04-23'
        }
      ),
      RawCRSuggestion.build(
        {
          id: '2',
          crid: 'CR456',
          to: '/complaint/CR456/',
          category: null,
          'incident_date': '2004-04-23'
        }
      ),
    ],
    'DATE > TRR': [
      RawTRRSuggestion.build(
        {
          id: '123',
          to: '/trr/123/',
          'force_type': 'Member Presence',
          'trr_datetime': '2004-04-23'
        }
      ),
      RawTRRSuggestion.build(
        {
          id: '456',
          to: '/trr/456/',
          'force_type': null,
          'trr_datetime': '2004-04-23'
        }
      )
    ]
  }
};

export const singleGroupSuggestions = {
  'default': {
    count: 30,
    previous: null,
    next: 'http://my/api/?contentType=OFFICER&offset=20',
    results: [
      RawOfficerSuggestion.build({ name: 'Bernadette Kelly' }),
      RawOfficerSuggestion.build({ name: 'Charles Kelly' }),
      ...RawOfficerSuggestion.buildList(18)
    ]
  },
  neighborhoods: {
    count: 7,
    previous: null,
    next: null,
    results: [
      RawNeighborhoodSuggestion.build({ id: '1', name: 'Kenwood' }),
      RawNeighborhoodSuggestion.build({ id: '2', name: 'Austin' }),
      RawNeighborhoodSuggestion.build({ id: '3', name: 'Englewood' }),
      RawNeighborhoodSuggestion.build({ id: '4', name: 'Loop' }),
      RawNeighborhoodSuggestion.build({ id: '5', name: 'Garfield Park' }),
      RawNeighborhoodSuggestion.build({ id: '6', name: 'Humboldt Park' }),
      RawNeighborhoodSuggestion.build({ id: '7', name: 'Auburn Gresham' }),
    ]
  },
  offset20: {
    count: 30,
    previous: null,
    next: null,
    results: RawOfficerSuggestion.buildList(10)
  }
};
