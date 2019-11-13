import {
  RawOfficerSuggestion,
  RawNeighborhoodSuggestion,
  RawCRSuggestion,
  RawTRRSuggestion,
  RawRankSuggestion,
  CommunitySuggestion,
} from 'utils/test/factories/suggestion';
import { SearchTermCategoryItem } from 'utils/test/factories/search-terms';

const officerSuggestions = [
  RawOfficerSuggestion.build(
    {
      id: '8562',
      name: 'Jerome Finnigan',
      to: '/officer/1/jerome-finnigan/',
      'allegation_count': 10,
      'sustained_count': 2,
      'birth_year': 1972,
      race: 'White',
      gender: 'Male',
    }
  ),
  RawOfficerSuggestion.build(
    {
      id: '8563',
      name: 'Edward May',
      to: '/officer/2/edward-may/',
      'allegation_count': 5,
      'sustained_count': 1,
      'birth_year': 1980,
      race: 'White',
      gender: 'Female',
    }
  ),
  ...RawOfficerSuggestion.buildList(8),
];

const crSuggestions = [
  RawCRSuggestion.build(
    {
      id: '1',
      crid: 'CR123',
      to: '/complaint/CR123/',
      category: 'Lockup Procedures',
      'sub_category': 'Reports',
      'incident_date': '2004-04-23',
      highlight: {
        summary: ['an officer named Kelly caught the victim'],
      },
      address: '14XX W 63RD ST, CHICAGO IL 60636',
      'victims': [
        { 'gender': 'Female', 'race': 'Hispanic' },
        { 'gender': 'Female', 'race': 'Hispanic', 'age': 48 },
      ],
      'coaccused': [{
        'id': 16567,
        'full_name': 'Baudilio Lopez',
        'percentile': {
          'id': 16567,
          'percentile_trr': '72.1094',
          'percentile_allegation_civilian': '98.5549',
          'percentile_allegation_internal': '61.1521',
        },
        'allegation_count': 93,
      }, {
        'id': 16568,
        'full_name': 'Baudilio Lopez',
        'percentile': {
          'id': 16568,
          'percentile_trr': '72.1094',
          'percentile_allegation_civilian': '98.5549',
          'percentile_allegation_internal': '61.1521',
        },
        'allegation_count': 93,
      }],
    }
  ),
  RawCRSuggestion.build(
    {
      id: '2',
      crid: 'CR456',
      to: '/complaint/CR456/',
      highlight: {},
      'incident_date': '2006-11-12',
      category: 'Operation/Personnel Violations',
      'sub_category': 'Reports',
      address: '14XX W 63RD ST, CHICAGO IL 60636',
      'victims': [
        { 'gender': 'Female', 'race': 'Hispanic' },
        { 'gender': 'Female', 'race': 'Hispanic' },
      ],
      'coaccused': [
        {
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
        {
          'id': 7544,
          'full_name': 'Dominique Dunigan',
          'percentile': {
            'id': 180839,
            'percentile_trr': '0.0000',
            'percentile_allegation_civilian': '24.1180',
            'percentile_allegation_internal': '0.0000',
          },
          'allegation_count': 1,
        },
      ],
    }
  ),
];

const trrSuggestions = [
  RawTRRSuggestion.build(
    {
      id: '123',
      to: '/trr/123/',
      'force_type': 'Member Presence',
      'trr_datetime': '2004-04-27',
    }
  ),
  RawTRRSuggestion.build(
    {
      id: '456',
      to: '/trr/456/',
      'force_type': 'Verbal Commands',
      'trr_datetime': '2005-04-27',
    }
  ),
];

const community1Suggestions = [
  CommunitySuggestion.build({ name: 'Loop' }),
];

const community2Suggestions = [
  CommunitySuggestion.build({ name: 'Austin' }),
];

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
          gender: 'Male',
          unit: {
            id: 1,
            'unit_name': '018',
            description: 'District 018',
          },
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
          gender: 'Female',
        }
      ),
      RawOfficerSuggestion.build(
        {
          id: '3',
          name: 'Edward may',
          to: '/officer/3/edward-may/',
          'allegation_count': 8,
          'sustained_count': 2,
          'birth_year': 1984,
          race: 'White',
          gender: 'Female',
        }
      ),
      ...RawOfficerSuggestion.buildList(8),
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
          gender: 'Male',
        }
      ),
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
          id: 'CR123',
          crid: 'CR123',
          to: '/complaint/CR123/',
          category: 'Lockup Procedures',
          'sub_category': 'Reports',
          'incident_date': '2004-04-23',
          highlight: {
            summary: ['an officer named Kelly caught the victim'],
          },
          address: '14XX W 63RD ST, CHICAGO IL 60636',
          'victims': [
            { 'gender': 'Female', 'race': 'Hispanic' },
            { 'gender': 'Female', 'race': 'Hispanic', 'age': 48 },
          ],
          'coaccused': [{
            'id': 16567,
            'full_name': 'Baudilio Lopez',
            'percentile': {
              'id': 16567,
              'percentile_trr': '72.1094',
              'percentile_allegation_civilian': '98.5549',
              'percentile_allegation_internal': '61.1521',
            },
            'allegation_count': 93,
          }, {
            'id': 16568,
            'full_name': 'Baudilio Lopez',
            'percentile': {
              'id': 16568,
              'percentile_trr': '72.1094',
              'percentile_allegation_civilian': '98.5549',
              'percentile_allegation_internal': '61.1521',
            },
            'allegation_count': 93,
          }],
        }
      ),
      RawCRSuggestion.build(
        {
          id: 'CR456',
          crid: 'CR456',
          to: '/complaint/CR456/',
          highlight: {},
          'incident_date': '2006-11-12',
          category: 'Operation/Personnel Violations',
          'sub_category': 'Reports',
          address: '14XX W 63RD ST, CHICAGO IL 60636',
          'victims': [
            { 'gender': 'Female', 'race': 'Hispanic' },
            { 'gender': 'Female', 'race': 'Hispanic' },
          ],
          'coaccused': [
            {
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
            {
              'id': 7544,
              'full_name': 'Dominique Dunigan',
              'percentile': {
                'id': 180839,
                'percentile_trr': '0.0000',
                'percentile_allegation_civilian': '24.1180',
                'percentile_allegation_internal': '0.0000',
              },
              'allegation_count': 1,
            },
          ],
        }
      ),
    ],
    'TRR': [
      RawTRRSuggestion.build(
        {
          id: '123',
          to: '/trr/123/',
          'force_type': 'Member Presence',
          'trr_datetime': '2004-04-27',
          'category': 'Taser',
          'address': '3000 Michigan Ave',
          'officer': {
            'id': 1,
            'full_name': 'Jesse Pinkman',
            'allegation_count': 1,
            'percentile': {
              'id': 1,
              'percentile_trr': '3.3000',
              'percentile_allegation_civilian': '1.1000',
              'percentile_allegation_internal': '2.2000',
            },
          },
        }
      ),
      RawTRRSuggestion.build(
        {
          id: '456',
          to: '/trr/456/',
          'force_type': null,
          'trr_datetime': null,
          'category': 'Firearm',
          'address': '4000 Michigan Ave',
          'officer': {
            'id': 2,
            'full_name': 'Lorem Ipsum',
            'allegation_count': 2,
            'percentile': {
              'id': 2,
              'percentile_trr': '4.4000',
              'percentile_allegation_civilian': '5.5000',
              'percentile_allegation_internal': '6.6000',
            },
          },
        }
      ),
    ],
  },
  'noresult': {},
  'foo': {
    'OFFICER': [
      RawOfficerSuggestion.build({ name: 'Laurence Lanners', to: '/officer/5678/laurence-lanners/' }),
    ],
  },
  '2004/04/23': {
    'DATE > CR': [
      RawCRSuggestion.build(
        {
          id: 'CR123',
          crid: 'CR123',
          to: '/complaint/CR123/',
          category: 'Lockup Procedures',
          'sub_category': 'Reports',
          'incident_date': '2004-04-23',
          highlight: {},
          address: '14XX W 63RD ST, CHICAGO IL 60636',
          'victims': [],
          'coaccused': [],
        }
      ),
      RawCRSuggestion.build(
        {
          id: 'CR456',
          crid: 'CR456',
          to: '/complaint/CR456/',
          'incident_date': '2004-04-23',
          highlight: {},
          category: 'Operation/Personnel Violations',
          'sub_category': 'Reports',
          address: '14XX W 63RD ST, CHICAGO IL 60636',
          'victims': [
            { 'gender': 'Female', 'race': 'Hispanic' },
            { 'gender': 'Female', 'race': 'Hispanic' },
          ],
          'coaccused': [
            {
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
            {
              'id': 7544,
              'full_name': 'Dominique Dunigan',
              'percentile': {
                'id': 180839,
                'percentile_trr': '0.0000',
                'percentile_allegation_civilian': '24.1180',
                'percentile_allegation_internal': '0.0000',
              },
              'allegation_count': 1,
            },
          ],
        }
      ),
    ],
    'DATE > TRR': [
      RawTRRSuggestion.build(
        {
          id: '123',
          to: '/trr/123/',
          'force_type': 'Member Presence',
          'trr_datetime': '2004-04-23',
          'category': 'Taser',
          'address': '3000 Michigan Ave',
          'officer': {
            'id': 1,
            'full_name': 'Jesse Pinkman',
            'allegation_count': 1,
            'percentile': {
              'id': 1,
              'percentile_trr': '3.3000',
              'percentile_allegation_civilian': '1.1000',
              'percentile_allegation_internal': '2.2000',
            },
          },
        }
      ),
      RawTRRSuggestion.build(
        {
          id: '456',
          to: '/trr/456/',
          'force_type': 'Physical Force - Holding',
          'trr_datetime': '2004-04-23',
          'category': 'Firearm',
          'address': '4000 Michigan Ave',
          'officer': {
            'id': 2,
            'full_name': 'Lorem Ipsum',
            'allegation_count': 2,
            'percentile': {
              'id': 2,
              'percentile_trr': '4.4000',
              'percentile_allegation_civilian': '5.5000',
              'percentile_allegation_internal': '6.6000',
            },
          },
        }
      ),
    ],
    'DATE > OFFICERS': [
      RawOfficerSuggestion.build(
        {
          id: '123',
          name: 'Jerome Finnigan',
          to: '/officer/123/jerome-finnigan/',
          'birth_year': '1975',
        }
      ),
      RawOfficerSuggestion.build(
        {
          id: '456',
          name: 'Edward May',
          to: '/officer/456/edward-may/',
          'birth_year': '1969',
        }
      ),
    ],
  },
  'rank': {
    'RANK': [
      RawRankSuggestion.build(
        {
          name: 'Officer',
          'active_officers_count': 2,
        }
      ),
      RawRankSuggestion.build(
        {
          name: 'Chief',
          'active_officers_count': 3,
        }
      ),
    ],
  },
  'Geography': {
    'SEARCH-TERMS': [
      SearchTermCategoryItem.build(
        {
          name: 'Communities',
          'category_name': 'Geography',
          description: 'Whatever [SomeLink](http://www.somelink.lvh.me)',
          'call_to_action_type': 'view_all',
          id: 'community',
        }
      ),
    ],
  },
  'Kelly': {
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
          gender: 'Male',
        }
      ),
    ],
    'INVESTIGATOR > CR': [
      RawCRSuggestion.build(
        {
          id: 'CR123456',
          crid: 'CR123456',
          to: '/complaint/CR123456/',
          category: 'Lockup Procedures',
          'sub_category': 'Reports',
          'incident_date': '2004-04-23',
          highlight: {
            summary: ['an officer named Kelly caught the victim'],
          },
          address: '15XX W 63RD ST, CHICAGO IL 60636',
          'victims': [],
          'coaccused': [],
        }
      ),
      RawCRSuggestion.build(
        {
          id: '2',
          crid: 'CR654321',
          to: '/complaint/CR654321/',
          category: 'Operation/Personnel Violations',
          'sub_category': 'Reports',
          'incident_date': null,
          highlight: {},
          address: '14XX W 63RD ST, CHICAGO IL 60636',
          'victims': [
            { 'gender': 'Female', 'race': 'Hispanic' },
            { 'gender': 'Female', 'race': 'Hispanic' },
          ],
          'coaccused': [
            {
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
            {
              'id': 7544,
              'full_name': 'Dominique Dunigan',
              'percentile': {
                'id': 180839,
                'percentile_trr': '0.0000',
                'percentile_allegation_civilian': '24.1180',
                'percentile_allegation_internal': '0.0000',
              },
              'allegation_count': 1,
            },
          ],
        },
      ),
    ],
  },
  'CR only': {
    'CR': [
      RawCRSuggestion.build(
        {
          id: '1',
          crid: 'CR123',
          to: '/complaint/CR123/',
          category: 'Lockup Procedures',
          'sub_category': 'Reports',
          'incident_date': '2004-04-23',
          highlight: {
            summary: ['an officer named Kelly caught the victim'],
          },
          address: '14XX W 63RD ST, CHICAGO IL 60636',
          'victims': [
            { 'gender': 'Female', 'race': 'Hispanic' },
            { 'gender': 'Female', 'race': 'Hispanic', 'age': 48 },
          ],
          'coaccused': [{
            'id': 16567,
            'full_name': 'Baudilio Lopez',
            'percentile': {
              'id': 16567,
              'percentile_trr': '72.1094',
              'percentile_allegation_civilian': '98.5549',
              'percentile_allegation_internal': '61.1521',
            },
            'allegation_count': 93,
          }, {
            'id': 16568,
            'full_name': 'Baudilio Lopez',
            'percentile': {
              'id': 16568,
              'percentile_trr': '72.1094',
              'percentile_allegation_civilian': '98.5549',
              'percentile_allegation_internal': '61.1521',
            },
            'allegation_count': 93,
          }],
        }
      ),
      RawCRSuggestion.build(
        {
          id: '2',
          crid: 'CR456',
          to: '/complaint/CR456/',
          highlight: {},
          'incident_date': '2006-11-12',
          category: 'Operation/Personnel Violations',
          'sub_category': 'Reports',
          address: '14XX W 63RD ST, CHICAGO IL 60636',
          'victims': [
            { 'gender': 'Female', 'race': 'Hispanic' },
            { 'gender': 'Female', 'race': 'Hispanic' },
          ],
          'coaccused': [
            {
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
            {
              'id': 7544,
              'full_name': 'Dominique Dunigan',
              'percentile': {
                'id': 180839,
                'percentile_trr': '0.0000',
                'percentile_allegation_civilian': '24.1180',
                'percentile_allegation_internal': '0.0000',
              },
              'allegation_count': 1,
            },
          ],
        }
      ),
    ],
  },
  'community': {
    'COMMUNITY': community2Suggestions,
    'RANK': [
      RawRankSuggestion.build(
        {
          name: 'Officer',
          'active_officers_count': 2,
        }
      ),
      RawRankSuggestion.build(
        {
          name: 'Chief',
          'active_officers_count': 3,
        }
      ),
    ],
    'CR': [
      RawCRSuggestion.build(
        {
          id: '1',
          crid: 'CR123',
          to: '/complaint/CR123/',
          category: 'Lockup Procedures',
          'sub_category': 'Reports',
          'incident_date': '2004-04-23',
          highlight: {
            summary: ['an officer named Kelly caught the victim'],
          },
          address: '14XX W 63RD ST, CHICAGO IL 60636',
          'victims': [
            { 'gender': 'Female', 'race': 'Hispanic' },
            { 'gender': 'Female', 'race': 'Hispanic', 'age': 48 },
          ],
          'coaccused': [{
            'id': 16567,
            'full_name': 'Baudilio Lopez',
            'percentile': {
              'id': 16567,
              'percentile_trr': '72.1094',
              'percentile_allegation_civilian': '98.5549',
              'percentile_allegation_internal': '61.1521',
            },
            'allegation_count': 93,
          }, {
            'id': 16568,
            'full_name': 'Baudilio Lopez',
            'percentile': {
              'id': 16568,
              'percentile_trr': '72.1094',
              'percentile_allegation_civilian': '98.5549',
              'percentile_allegation_internal': '61.1521',
            },
            'allegation_count': 93,
          }],
        }
      ),
      RawCRSuggestion.build(
        {
          id: '2',
          crid: 'CR456',
          to: '/complaint/CR456/',
          highlight: {},
          'incident_date': '2006-11-12',
          category: 'Operation/Personnel Violations',
          'sub_category': 'Reports',
          address: '14XX W 63RD ST, CHICAGO IL 60636',
          'victims': [
            { 'gender': 'Female', 'race': 'Hispanic' },
            { 'gender': 'Female', 'race': 'Hispanic' },
          ],
          'coaccused': [
            {
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
            {
              'id': 7544,
              'full_name': 'Dominique Dunigan',
              'percentile': {
                'id': 180839,
                'percentile_trr': '0.0000',
                'percentile_allegation_civilian': '24.1180',
                'percentile_allegation_internal': '0.0000',
              },
              'allegation_count': 1,
            },
          ],
        }
      ),
    ],
  },
  'jerome': {
    'OFFICER': officerSuggestions,
    'CR': crSuggestions,
    'TRR': trrSuggestions,
    'COMMUNITY': community1Suggestions,
  },
};

export const singleGroupSuggestions = {
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
    ],
  },
  officer: {
    count: 25,
    previous: null,
    next: 'http://my/api/?contentType=OFFICER&offset=10',
    results: officerSuggestions,
  },
  officerOffset10: {
    count: 25,
    previous: 'http://my/api/?contentType=OFFICER',
    next: 'http://my/api/?contentType=OFFICER&offset=20',
    results: RawOfficerSuggestion.buildList(10),
  },
  officerOffset20: {
    count: 25,
    previous: 'http://my/api/?contentType=OFFICER&offset=10',
    next: null,
    results: RawOfficerSuggestion.buildList(5),
  },
  cr: {
    count: 2,
    previous: null,
    next: null,
    results: crSuggestions,
  },
  trr: {
    count: 2,
    previous: null,
    next: null,
    results: trrSuggestions,
  },
  community1: {
    count: 1,
    previous: null,
    next: null,
    results: community1Suggestions,
  },
  community2: {
    count: 1,
    previous: null,
    next: null,
    results: community2Suggestions,
  },
};
