import { stub } from 'sinon';

import {
  isPinButtonIntroductionVisitedSelector,
  isPinboardButtonIntroductionVisitedSelector,
  isPinboardIntroductionVisitedSelector,
} from 'selectors/pinboard-introduction';
import * as pinboardUtils from 'utils/pinboard';


describe('pinboard-introduction selector', function () {
  describe('isPinButtonIntroductionVisitedSelector', function () {
    context('isPinboardFeatureEnabled() return true', function () {
      it('should return correct value', function () {
        stub(pinboardUtils, 'isPinboardFeatureEnabled').returns(true);
        isPinButtonIntroductionVisitedSelector({
          pinboardIntroduction: {
            isPinButtonIntroductionVisited: true,
          },
        }).should.be.true();
        isPinButtonIntroductionVisitedSelector({
          pinboardIntroduction: {
            isPinButtonIntroductionVisited: false,
          },
        }).should.be.false();
      });
    });

    context('isPinboardFeatureEnabled() return false', function () {
      it('should always return true', function () {
        stub(pinboardUtils, 'isPinboardFeatureEnabled').returns(false);
        isPinButtonIntroductionVisitedSelector({
          pinboardIntroduction: {
            isPinButtonIntroductionVisited: true,
          },
        }).should.be.true();
        isPinButtonIntroductionVisitedSelector({
          pinboardIntroduction: {
            isPinButtonIntroductionVisited: false,
          },
        }).should.be.true();
      });
    });
  });

  describe('isPinboardButtonIntroductionVisitedSelector', function () {
    context('isPinboardFeatureEnabled() return true', function () {
      it('should return correct value', function () {
        stub(pinboardUtils, 'isPinboardFeatureEnabled').returns(true);
        isPinboardButtonIntroductionVisitedSelector({
          pinboardIntroduction: {
            isPinboardButtonIntroductionVisited: true,
          },
        }).should.be.true();
        isPinboardButtonIntroductionVisitedSelector({
          pinboardIntroduction: {
            isPinboardButtonIntroductionVisited: false,
          },
        }).should.be.false();
      });
    });

    context('isPinboardFeatureEnabled() return false', function () {
      it('should always return true', function () {
        stub(pinboardUtils, 'isPinboardFeatureEnabled').returns(false);
        isPinboardButtonIntroductionVisitedSelector({
          pinboardIntroduction: {
            isPinButtonIntroductionVisited: true,
          },
        }).should.be.true();
        isPinboardButtonIntroductionVisitedSelector({
          pinboardIntroduction: {
            isPinButtonIntroductionVisited: false,
          },
        }).should.be.true();
      });
    });
  });

  describe('isPinboardIntroductionVisitedSelector', function () {
    context('isPinboardFeatureEnabled() return true', function () {
      it('should return correct value', function () {
        stub(pinboardUtils, 'isPinboardFeatureEnabled').returns(true);
        isPinboardIntroductionVisitedSelector({
          pinboardIntroduction: {
            isPinboardIntroductionVisited: true,
          },
        }).should.be.true();
        isPinboardIntroductionVisitedSelector({
          pinboardIntroduction: {
            isPinboardIntroductionVisited: false,
          },
        }).should.be.false();
      });
    });

    context('isPinboardFeatureEnabled() return false', function () {
      it('should always return true', function () {
        stub(pinboardUtils, 'isPinboardFeatureEnabled').returns(false);
        isPinboardIntroductionVisitedSelector({
          pinboardIntroduction: {
            isPinButtonIntroductionVisited: true,
          },
        }).should.be.true();
        isPinboardIntroductionVisitedSelector({
          pinboardIntroduction: {
            isPinButtonIntroductionVisited: false,
          },
        }).should.be.true();
      });
    });
  });
});
