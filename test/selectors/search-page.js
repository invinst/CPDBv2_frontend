import { range } from 'lodash';

import {
  suggestionColumnsSelector, suggestionGroupsSelector, isEmptySelector,
  suggestionTagsSelector
} from 'selectors/search-page';


describe('autocomplete selector', function () {
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
    it('should be true when all keys empty', function () {
      isEmptySelector({
        searchPage: {
          suggestionGroups: {
            'OFFICER': [],
            'UNIT': []
          }
        }
      }).should.be.true();
    });

    it('should be true when all keys empty', function () {
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
    suggestionColumnsSelector({
      searchPage: {
        suggestionGroups: {
          'OFFICER': range(15)
        }
      }
    }).should.deepEqual([10, 5]);
  });
});
