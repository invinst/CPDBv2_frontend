import {
  RawCRSuggestion,
  RawNeighborhoodSuggestion,
  RawOfficerSuggestion,
  RawTRRSuggestion,
  RawLawsuitSuggestion,
} from '../../../src/js/utils/test/factories/suggestion';

const communitySuggestions = [
  RawNeighborhoodSuggestion.build({ id: '1', name: 'Kenwood' }),
  RawNeighborhoodSuggestion.build({ id: '2', name: 'Austin' }),
  RawNeighborhoodSuggestion.build({ id: '3', name: 'Englewood' }),
  RawNeighborhoodSuggestion.build({ id: '4', name: 'Loop' }),
  RawNeighborhoodSuggestion.build({ id: '5', name: 'Garfield Park' }),
  RawNeighborhoodSuggestion.build({ id: '6', name: 'Humboldt Park' }),
  RawNeighborhoodSuggestion.build({ id: '7', name: 'Auburn Gresham' }),
];

export const defaultLawsuitSearchResult = [
  RawLawsuitSuggestion.build(
    {
      id: '25',
      to: '/lawsuit/00-L-1/',
      'case_no': '00-L-1',
      'summary': 'Hutchinson was shot and killed outside a bar near the Addison Red Line stop.',
      'primary_cause': 'EXCESSIVE FORCE/MINOR',
      'address': '200 E. Chicago Ave., Chicago IL',
      'location': 'near intersection of N Wavelandand Sheffield',
      'incident_date': '2000-03-16',
      'officers': [{
        'id': 2,
        'full_name': 'Lorem Ipsum',
        'allegation_count': 2,
        'percentile_trr': '4.4000',
        'percentile_allegation_civilian': '5.5000',
        'percentile_allegation_internal': '6.6000',
      }],
    }
  ),
  RawLawsuitSuggestion.build(
    {
      id: '26',
      to: '/lawsuit/00-L-2/',
      'case_no': '00-L-2',
      'summary': 'Hutchinson was shot and killed outside a bar near the Addison Red Line stop.',
      'primary_cause': 'EXCESSIVE FORCE/MINOR',
      'address': '200 E. Chicago Ave., Chicago IL',
      'location': 'near intersection of N Wavelandand Sheffield',
      'incident_date': '2000-03-16',
      'officers': [{
        'id': 3,
        'full_name': 'Lorem Ipsum',
        'allegation_count': 1,
        'percentile_trr': '3.3000',
        'percentile_allegation_civilian': '1.1000',
        'percentile_allegation_internal': '2.2000',
      }],
    }
  ),
];

export const defaultSearchResult = {
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
  'NEIGHBORHOOD': communitySuggestions,
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
          'percentile_trr': '72.1094',
          'percentile_allegation_civilian': '98.5549',
          'percentile_allegation_internal': '61.1521',
          'allegation_count': 93,
        }, {
          'id': 16568,
          'full_name': 'Baudilio Lopez',
          'percentile_trr': '72.1094',
          'percentile_allegation_civilian': '98.5549',
          'percentile_allegation_internal': '61.1521',
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
            'percentile_trr': '72.1094',
            'percentile_allegation_civilian': '98.5549',
            'percentile_allegation_internal': '61.1521',
            'allegation_count': 93,
          },
          {
            'id': 7544,
            'full_name': 'Dominique Dunigan',
            'percentile_trr': '0.0000',
            'percentile_allegation_civilian': '24.1180',
            'percentile_allegation_internal': '0.0000',
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
          'percentile_trr': '3.3000',
          'percentile_allegation_civilian': '1.1000',
          'percentile_allegation_internal': '2.2000',
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
          'percentile_trr': '4.4000',
          'percentile_allegation_civilian': '5.5000',
          'percentile_allegation_internal': '6.6000',
        },
      }
    ),
  ],
  'LAWSUIT': defaultLawsuitSearchResult,
};
