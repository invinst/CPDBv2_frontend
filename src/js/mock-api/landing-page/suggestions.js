import { RawOfficerSuggestion, RawNeighborhoodSuggestion } from 'utils/test/factories/suggestion';


export const groupedSuggestions = {
  'default': {
    'OFFICER': [
      RawOfficerSuggestion.build({ id: '1' }, {
        resultText: 'Bernadette Kelly',
        to: '/officer/1/',
        allegationCount: 10,
        sustainedCount: 2,
        birthYear: 1972,
        race: 'White',
        sex: 'Male'
      }),
      RawOfficerSuggestion.build({ id: '2' }),
      ...RawOfficerSuggestion.buildList(8)
    ],
    'CO-ACCUSED': [
      RawOfficerSuggestion.build({ id: '1' }, {
        resultText: 'Bernadette Kelly',
        to: '/officer/1/',
        allegationCount: 10,
        sustainedCount: 2,
        birthYear: 1972,
        race: 'White',
        sex: 'Male'
      })
    ],
    'UNIT': [

    ],
    'NEIGHBORHOOD': [
      RawNeighborhoodSuggestion.build({ id: '1' }, { resultText: 'Kenwood' })
    ]
  },
  'noresult': {},
  'foo': {
    'OFFICER': [
      RawOfficerSuggestion.build({}, { resultText: 'Laurence Lanners', to: '/officer/5678/' })
    ]
  }
};

export const singleGroupSuggestions = {
  'default': {
    count: 30,
    previous: null,
    next: 'http://my/api/?contentType=OFFICER&offset=20',
    results: [
      RawOfficerSuggestion.build({}, { resultText: 'Bernadette Kelly' }),
      RawOfficerSuggestion.build({}, { resultText: 'Charles Kelly' }),
      ...RawOfficerSuggestion.buildList(18)
    ]
  },
  offset20: {
    count: 30,
    previous: null,
    next: null,
    results: RawOfficerSuggestion.buildList(10)
  }
};
