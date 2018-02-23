import {
  focusedItemSelector,
  previewPaneInfoSelector,
  totalItemCountSelector
} from 'selectors/search-page/navigation';
import { RawOfficerSuggestion } from 'utils/test/factories/suggestion';
import { getSvgUrl } from 'utils/visual-token';
import { MORE_BUTTON, SEARCH_BOX } from 'utils/constants';

describe('search page navigation selector', function () {
  describe('focusedItemSelector', function () {
    it('should return correct suggestion', function () {
      focusedItemSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': RawOfficerSuggestion.buildList(2),
            'UNIT': [],
            'CO-ACCUSED': [RawOfficerSuggestion.build(), RawOfficerSuggestion.build({ id: '29033' }, {
              race: 'White',
              resultText: 'Jerome Turbyville',
              url: 'https://example.com',
              to: '/officer/29033'
            })]
          },
          navigation: {
            itemIndex: 4
          }
        }
      }).should.deepEqual({
        id: '29033',
        to: '/officer/29033',
        type: 'CO-ACCUSED',
        text: 'Jerome Turbyville',
        uniqueKey: 'CO-ACCUSED-29033',
        url: 'https://example.com'
      });
    });

    it('should return searchbox item when there is no suggestion', function () {
      focusedItemSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': [],
            'UNIT': [],
            'CO-ACCUSED': []
          },
          navigation: {
            itemIndex: 0
          }
        }
      }).should.deepEqual({
        id: undefined,
        to: undefined,
        type: undefined,
        text: undefined,
        uniqueKey: SEARCH_BOX,
        url: undefined
      });
    });

    it('should return More correctly', function () {
      focusedItemSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': RawOfficerSuggestion.buildList(6),
            'UNIT': [],
            'CO-ACCUSED': []
          },
          navigation: {
            itemIndex: 6
          }
        }
      }).should.deepEqual({
        id: 'OFFICER',
        to: undefined,
        text: undefined,
        type: MORE_BUTTON,
        uniqueKey: `${MORE_BUTTON}-OFFICER`,
        url: undefined,
      });
    });
  });

  describe('previewPaneInfoSelector', function () {
    it('should return correct info', function () {
      const focusedSuggestion = {
        header: 'OFFICER',
        id: '12345',
        text: 'John Wang',
        payload: {
          unit: '001',
          rank: null,
          salary: '$99,999',
          race: 'White',
          sex: 'Male',
          'visual_token_background_color': '#fafafa'
        }
      };
      const info = {
        data: [
          ['unit', '001'],
          ['rank', null],
          ['2017 salary', '$99,999'],
          ['race', 'White'],
          ['sex', 'Male']
        ],
        visualTokenBackgroundColor: '#fafafa',
        visualTokenImg: getSvgUrl('12345'),
        text: 'John Wang'
      };
      previewPaneInfoSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': [focusedSuggestion],
            'UNIT': [],
            'CO-ACCUSED': []
          },
          navigation: {
            itemIndex: 1
          }
        }
      }).should.deepEqual(info);
    });
  });

  describe('totalItemCountSelector', function () {
    it('should return total suggestions count', function () {
      totalItemCountSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': RawOfficerSuggestion.buildList(3),
            'UNIT': [],
            'CO-ACCUSED': []
          }
        }
      }).should.equal(4);
    });
  });
});
