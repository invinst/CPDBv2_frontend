import { suggestionGroupsSelector, isEmptySelector } from 'selectors/landing-page/autocomplete/suggestion-groups';


describe('autocomplete selector', function () {
  describe('suggestionGroupsSelector', function () {
    it('should output non-empty group', function () {
      suggestionGroupsSelector({
        landingPage: {
          suggestionApp: {
            suggestionGroups: {
              'OFFICER': [{}],
              'UNIT': []
            }
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
        landingPage: {
          suggestionApp: {
            suggestionGroups: {
              'OFFICER': [],
              'UNIT': []
            }
          }
        }
      }).should.be.true();
    });

    it('should be true when all keys empty', function () {
      isEmptySelector({
        landingPage: {
          suggestionApp: {
            suggestionGroups: {
              'OFFICER': [{}],
              'UNIT': []
            }
          }
        }
      }).should.be.false();
    });
  });
});
