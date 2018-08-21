import { stub } from 'sinon';

import * as IntercomTracking from 'utils/intercom-tracking';


describe('IntercomTracking utils', function () {
  beforeEach(function () {
    stub(global, 'Intercom');
  });

  afterEach(function () {
    global.Intercom.restore();
  });

  describe('trackOpenExplainer', function () {
    it('should send event analytic', function () {
      IntercomTracking.trackOpenExplainer(123);

      global.Intercom.should.be.calledWith(
        'trackEvent',
        'visual_token_explainer',
        { officerId: 123 }
      );
    });
  });
});
