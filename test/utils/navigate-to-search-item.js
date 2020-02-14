import { spy, stub } from 'sinon';
import browserHistory from 'utils/history';

import { navigateToSearchItem } from 'utils/navigate-to-search-item';
import * as tracking from 'utils/tracking';


describe('navigate to search item utils', function () {
  describe('navigateToSearchItem', function () {
    it('should call history push if to property is defined', function () {
      const beforeHookSpy = spy();
      spy(browserHistory, 'push');

      navigateToSearchItem({ to: 'to' }, beforeHookSpy);

      browserHistory.push.calledWith('to').should.be.true();
      beforeHookSpy.called.should.be.true();
    });

    it('should call trackOutboundLink if item has url', function () {
      const trackOutboundLinkStub = stub(tracking, 'trackOutboundLink');
      const beforeHookSpy = spy();

      navigateToSearchItem({ url: 'some/url' }, beforeHookSpy);

      trackOutboundLinkStub.should.be.calledWith('some/url', '_blank');
    });

    it('should not do anything if the item is datatool search url', function () {
      const beforeHookSpy = spy();
      spy(browserHistory, 'push');
      const trackOutboundLinkStub = stub(tracking, 'trackOutboundLink');

      navigateToSearchItem({ isDataToolSearchUrl: true }, beforeHookSpy);

      beforeHookSpy.called.should.be.true();
      browserHistory.push.called.should.be.false();
      trackOutboundLinkStub.called.should.be.false();
    });
  });
});
