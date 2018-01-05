import { range } from 'lodash';

import {
  suggestionColumnsSelector, suggestionGroupsSelector, isEmptySelector,
  suggestionTagsSelector, orderedSuggestionGroupsSelector, chunkedSuggestionGroupsSelector,
  focusedSuggestionSelector, previewPaneInfoSelector
} from 'selectors/search-page';
import * as searchUtils from 'utils/search';
import { getThisYear } from 'utils/date';

describe('search page selector', function () {
  describe('suggestionGroupsSelector', function () {
    it('should output non-empty group', function () {
      suggestionGroupsSelector({
        searchPage: {
          suggestionGroups: {
            'OFFICER': [{}],
            'UNIT': []
          }
        }
      }).should.deepEqual({
        'OFFICER': [{}]
      });
    });
  });

  describe('suggestionTagsSelector', function () {
    it('should output correct order', function () {
      suggestionTagsSelector({
        searchPage: {
          tags: ['NEIGHBORHOOD', 'OFFICER', 'UNIT', 'COMMUNITY'],
          query: 'something'
        }
      }).should.deepEqual(['OFFICER', 'COMMUNITY', 'NEIGHBORHOOD', 'UNIT']);
    });

    it('should output RECENT tag if theres no query', function () {
      suggestionTagsSelector({
        searchPage: {
          tags: ['NEIGHBORHOOD', 'OFFICER', 'UNIT', 'COMMUNITY'],
          query: ''
        }
      }).should.deepEqual(['RECENT']);
    });
  });

  describe('isEmptySelector', function () {
    it('should be true when all keys are empty', function () {
      isEmptySelector({
        searchPage: {
          suggestionGroups: {
            'OFFICER': [],
            'UNIT': []
          }
        }
      }).should.be.true();
    });

    it('should be false when not all keys are empty', function () {
      isEmptySelector({
        searchPage: {
          suggestionGroups: {
            'OFFICER': [{}],
            'UNIT': []
          }
        }
      }).should.be.false();
    });
  });

  describe('suggestionColumnsSelector', function () {
    it('should chunk columns', function () {
      const oldValue = searchUtils.searchPageItemsPerColumn;
      searchUtils.searchPageItemsPerColumn = 10;
      suggestionColumnsSelector({
        searchPage: {
          suggestionGroups: {
            'OFFICER': range(15)
          }
        }
      }).should.deepEqual([10]);
      searchUtils.searchPageItemsPerColumn = oldValue;
    });
  });

  describe('orderedSuggestionGroupsSelector', function () {
    it('should transform suggestionGroups into a structure with guaranteed order', function () {
      orderedSuggestionGroupsSelector({
        searchPage: {
          suggestionGroups: {
            'OFFICER': [{}],
            'UNIT': [],
            'CO-ACCUSED': [{}, {}]
          }
        }
      }).should.deepEqual([
        {
          header: 'OFFICER',
          items: [{}]
        },
        {
          header: 'CO-ACCUSED',
          items: [{}, {}]
        }
      ]);
    });
  });

  describe('chunkedSuggestionGroupsSelector', function () {
    it('should return chunked columns of a single group correctly', function () {
      const oldValue = searchUtils.searchPageItemsPerColumn;
      searchUtils.searchPageItemsPerColumn = 3;
      chunkedSuggestionGroupsSelector({
        searchPage: {
          contentType: 'OFFICER',
          suggestionGroups: {
            'OFFICER': ['o1', 'o2', 'o3', 'o4'],
            'UNIT': [],
            'CO-ACCUSED': ['c1', 'c2']
          }
        }
      }).should.deepEqual([
        {
          header: 'OFFICER',
          columns: [
            ['o1', 'o2', 'o3'],
            ['o4']
          ],
          canLoadMore: false
        }
      ]);
      searchUtils.searchPageItemsPerColumn = oldValue;
    });

    it('should return sliced results from all groups correctly', function () {
      const oldValue = searchUtils.searchPageItemsPerColumn;
      searchUtils.searchPageItemsPerColumn = 3;
      chunkedSuggestionGroupsSelector({
        searchPage: {
          suggestionGroups: {
            'OFFICER': ['o1', 'o2', 'o3', 'o4'],
            'UNIT': [],
            'CO-ACCUSED': ['c1', 'c2']
          }
        }
      }).should.deepEqual([
        {
          header: 'OFFICER',
          columns: [
            ['o1', 'o2', 'o3']
          ],
          canLoadMore: true
        },
        {
          header: 'CO-ACCUSED',
          columns: [
            ['c1', 'c2']
          ],
          canLoadMore: false
        }
      ]);
      searchUtils.searchPageItemsPerColumn = oldValue;
    });
  });

  describe('focusedSuggestionSelector', function () {
    it('should return correct suggestion when viewing all groups', function () {
      const oldValue = searchUtils.searchPageItemsPerColumn;
      searchUtils.searchPageItemsPerColumn = 3;
      focusedSuggestionSelector({
        searchPage: {
          suggestionGroups: {
            'OFFICER': [{ o1: 'o1' }, { o2: 'o2' }, { o3: 'o3' }, { o4: 'o4' }],
            'UNIT': [],
            'CO-ACCUSED': [{ c1: 'c1' }, { c2: 'c2' }]
          },
          navigation: {
            columnIndex: 1,
            itemIndex: 1
          }
        }
      }).should.deepEqual({ header: 'CO-ACCUSED', c2: 'c2' });
      searchUtils.searchPageItemsPerColumn = oldValue;
    });

    it('should return correct suggestion when viewing single group', function () {
      const oldValue = searchUtils.searchPageItemsPerColumn;
      searchUtils.searchPageItemsPerColumn = 2;
      focusedSuggestionSelector({
        searchPage: {
          suggestionGroups: {
            'OFFICER': [{ o1: 'o1' }, { o2: 'o2' }, { o3: 'o3' }, { o4: 'o4' }, { o5: 'o5' }],
            'UNIT': [],
            'CO-ACCUSED': []
          },
          contentType: 'OFFICER',
          navigation: {
            columnIndex: 2,
            itemIndex: 0
          }
        }
      }).should.deepEqual({ header: 'OFFICER', o5: 'o5' });
      searchUtils.searchPageItemsPerColumn = oldValue;
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
      const currentYear = getThisYear();
      const info = {
        data: [
          ['unit', '001'],
          ['rank', null],
          [`${currentYear} salary`, '$99,999'],
          ['race', 'White'],
          ['sex', 'Male']
        ],
        visualTokenBackgroundColor: '#fafafa',
        id: '12345',
        text: 'John Wang'
      };
      previewPaneInfoSelector(focusedSuggestion).should.deepEqual(info);
    });
  });
});
