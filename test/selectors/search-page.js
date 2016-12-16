import { suggestionGroupsSelector, isEmptySelector } from 'selectors/search-page';


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
});
