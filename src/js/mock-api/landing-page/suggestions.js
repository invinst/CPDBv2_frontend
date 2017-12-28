import { RawOfficerSuggestion, RawNeighborhoodSuggestion } from 'utils/test/factories/suggestion';


export default {
  'default': {
    'OFFICER': [RawOfficerSuggestion.build({
      id: '1'
    }, {
      resultText: 'Bernadette Kelly',
      to: '/officer/1/',
      allegationCount: 10,
      sustainedCount: 2,
      birthYear: 1972,
      race: 'White',
      sex: 'Male'
    }), RawOfficerSuggestion.build({
      id: '2'
    }), ...RawOfficerSuggestion.buildList(8)],
    'CO-ACCUSED': [
      RawOfficerSuggestion.build({
        id: '1'
      }, {
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
  'OFFICER': {
    'OFFICER': [
      RawOfficerSuggestion.build({}, { resultText: 'Bernadette Kelly' }),
      RawOfficerSuggestion.build({}, { resultText: 'Charles Kelly' })
    ]
  },
  'foo': {
    'OFFICER': [
      RawOfficerSuggestion.build({}, { resultText: 'Laurence Lanners', to: '/officer/5678/' })
    ]
  }
};
