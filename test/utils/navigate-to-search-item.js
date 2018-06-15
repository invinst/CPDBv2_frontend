import { spy } from 'sinon';
import { browserHistory } from 'react-router';

import { navigateToSearchItem } from 'utils/navigate-to-search-item';

describe('navigate to search item utils', function () {
  describe('navigateToSearchItem', function () {
    it('should call history push if to property is defined', function () {
      const beforeHookSpy = spy();
      spy(browserHistory, 'push');
      navigateToSearchItem({ to: 'to' }, beforeHookSpy);
      browserHistory.push.calledWith('to').should.be.true();
      beforeHookSpy.called.should.be.true();
      browserHistory.push.restore();
    });
  });
});
