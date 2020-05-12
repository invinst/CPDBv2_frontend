import pinboardButtonIntroductionVisited from 'reducers/pinboard-introduction/is-pinboard-button-introduction-visited';

import { VISIT_PINBOARD_BUTTON_INTRODUCTION } from 'utils/constants';


describe('isPinboardButtonIntroductionVisited reducer', function () {
  it('should return initial state', function () {
    pinboardButtonIntroductionVisited(undefined, {}).should.be.false();
  });

  it('should handle VISIT_PINBOARD_BUTTON_INTRODUCTION', function () {
    const action = { type: VISIT_PINBOARD_BUTTON_INTRODUCTION };
    pinboardButtonIntroductionVisited(false, action).should.be.true();
  });
});
