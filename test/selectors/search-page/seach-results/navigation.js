import {
  previewPaneInfoSelector,
  totalItemCountSelector,
  focusedResultItemSelector
} from 'selectors/search-page/search-results/navigation';
import { RawOfficerSuggestion } from 'utils/test/factories/suggestion';
import { getSvgUrl } from 'utils/visual-token';
import { MORE_BUTTON, SEARCH_BOX } from 'utils/constants';


describe('search page navigation selector', function () {
  describe('focusedResultItemSelector', function () {
    it('should return correct suggestion', function () {
      focusedResultItemSelector({
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
          },
          searchTerms: {
            hidden: true
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
      focusedResultItemSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': [],
            'UNIT': [],
            'CO-ACCUSED': []
          },
          navigation: {
            itemIndex: 0
          },
          searchTerms: {
            hidden: true
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
      focusedResultItemSelector({
        searchPage: {
          tags: [],
          suggestionGroups: {
            'OFFICER': RawOfficerSuggestion.buildList(6),
            'UNIT': [],
            'CO-ACCUSED': []
          },
          navigation: {
            itemIndex: 6
          },
          searchTerms: {
            hidden: true
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
        data: {
          officerInfo: {
            unit: '001',
            rank: null,
            salary: '$99,999',
            race: 'White',
            sex: 'Male',
          },
          visualTokenBackgroundColor: '#fafafa',
          visualTokenImg: getSvgUrl('12345'),
          text: 'John Wang',
          title: 'John Wang',
        },
        type: 'OFFICER',
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
