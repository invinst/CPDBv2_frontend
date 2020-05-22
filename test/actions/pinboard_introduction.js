import {
  visitPinboardIntroduction,
  visitPinboardButtonIntroduction,
  visitPinButtonIntroduction,
} from 'actions/pinboard-introduction';
import {
  VISIT_PINBOARD_INTRODUCTION,
  VISIT_PINBOARD_BUTTON_INTRODUCTION,
  VISIT_PIN_BUTTON_INTRODUCTION,
} from 'utils/constants';

describe('pinboard-introduction actions', function () {
  describe('visitPinboardIntroduction', function () {
    it('should return the right action', function () {
      visitPinboardIntroduction().should.eql({
        type: VISIT_PINBOARD_INTRODUCTION,
        payload: undefined,
      });
    });
  });

  describe('visitPinboardButtonIntroduction', function () {
    it('should return the right action', function () {
      visitPinboardButtonIntroduction().should.eql({
        type: VISIT_PINBOARD_BUTTON_INTRODUCTION,
        payload: undefined,
      });
    });
  });

  describe('visitPinButtonIntroduction', function () {
    it('should return the right action', function () {
      visitPinButtonIntroduction().should.eql({
        type: VISIT_PIN_BUTTON_INTRODUCTION,
        payload: undefined,
      });
    });
  });
});
