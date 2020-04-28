import isPinboardIntroductionVisited from 'reducers/pinboard-introduction/is-pinboard-introduction-visited';

import { VISIT_PINBOARD_INTRODUCTION } from 'utils/constants';


describe('isPinboardIntroductionVisited reducer', function () {
  it('should return initial state', function () {
    isPinboardIntroductionVisited(undefined, {}).should.be.false();
  });

  it('should handle VISIT_PINBOARD_INTRODUCTION', function () {
    const action = { type: VISIT_PINBOARD_INTRODUCTION };
    isPinboardIntroductionVisited(false, action).should.be.true();
  });
});
