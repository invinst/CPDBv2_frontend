import { range } from 'lodash';

import {
  suggestionColumnsSelector, suggestionGroupsSelector, isEmptySelector,
  suggestionTagsSelector, orderedSuggestionGroupsSelector, chunkedSuggestionGroupsSelector,
  focusedSuggestionSelector
} from 'selectors/search-page';

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
    it('should out put correct order', function () {
      suggestionTagsSelector({
        searchPage: {
          tags: ['NEIGHBORHOOD', 'OFFICER', 'UNIT', 'COMMUNITY']
        }
      }).should.deepEqual(['OFFICER', 'COMMUNITY', 'NEIGHBORHOOD', 'UNIT']);
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
      suggestionColumnsSelector({
        searchPage: {
          suggestionGroups: {
            'OFFICER': range(15)
          },
          itemsPerColumn: 10
        }
      }).should.deepEqual([10]);
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
      chunkedSuggestionGroupsSelector({
        searchPage: {
          contentType: 'OFFICER',
          itemsPerColumn: 3,
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
    });

    it('should return sliced results from all groups correctly', function () {
      chunkedSuggestionGroupsSelector({
        searchPage: {
          itemsPerColumn: 3,
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
    });
  });

  describe('focusedSuggestionSelector', function () {
    it('should return correct suggestion when viewing all groups', function () {
      focusedSuggestionSelector({
        searchPage: {
          itemsPerColumn: 3,
          suggestionGroups: {
            'OFFICER': ['o1', 'o2', 'o3', 'o4'],
            'UNIT': [],
            'CO-ACCUSED': ['c1', 'c2']
          },
          navigation: {
            columnIndex: 1,
            itemIndex: 1
          }
        }
      }).should.deepEqual('c2');
    });

    it('should return correct suggestion when viewing single group', function () {
      focusedSuggestionSelector({
        searchPage: {
          itemsPerColumn: 2,
          suggestionGroups: {
            'OFFICER': ['o1', 'o2', 'o3', 'o4', 'o5'],
            'UNIT': [],
            'CO-ACCUSED': ['c1', 'c2']
          },
          contentType: 'OFFICER',
          navigation: {
            columnIndex: 2,
            itemIndex: 0
          }
        }
      }).should.deepEqual('o5');
    });
  });
});
