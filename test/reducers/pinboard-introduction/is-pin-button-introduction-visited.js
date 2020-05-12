import isPinbuttonIntroductionVisited from 'reducers/pinboard-introduction/is-pinbutton-introduction-visited';

import { VISIT_PIN_BUTTON_INTRODUCTION } from 'utils/constants';


describe('isPinbuttonIntroductionVisited reducer', function () {
  it('should return initial state', function () {
    isPinbuttonIntroductionVisited(undefined, {}).should.be.false();
  });

  it('should handle VISIT_PIN_BUTTON_INTRODUCTION', function () {
    const action = { type: VISIT_PIN_BUTTON_INTRODUCTION };
    isPinbuttonIntroductionVisited(false, action).should.be.true();
  });
});
