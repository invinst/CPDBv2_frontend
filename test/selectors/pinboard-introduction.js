import {
  isPinButtonIntroductionVisitedSelector,
  isPinboardButtonIntroductionVisitedSelector,
  isPinboardIntroductionVisitedSelector,
} from 'selectors/pinboard-introduction';

describe('pinboard-introduction selector', function () {
  describe('isPinButtonIntroductionVisitedSelector', function () {
    it('should return correct value', function () {
      const state = {
        pinboardIntroduction: {
          isPinButtonIntroductionVisited: true,
        },
      };
      isPinButtonIntroductionVisitedSelector(state).should.be.true();
    });
  });

  describe('isPinboardButtonIntroductionVisitedSelector', function () {
    it('should return correct value', function () {
      const state = {
        pinboardIntroduction: {
          isPinboardButtonIntroductionVisited: true,
        },
      };
      isPinboardButtonIntroductionVisitedSelector(state).should.be.true();
    });
  });

  describe('isPinboardIntroductionVisitedSelector', function () {
    it('should return correct value', function () {
      const state = {
        pinboardIntroduction: {
          isPinboardIntroductionVisited: true,
        },
      };
      isPinboardIntroductionVisitedSelector(state).should.be.true();
    });
  });
});
