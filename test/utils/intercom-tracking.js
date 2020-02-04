import sinon from 'sinon';

import * as IntercomTracking from 'utils/intercom-tracking';


describe('IntercomTracking utils', function () {
  beforeEach(function () {
    sinon.stub(global, 'Intercom');
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

  describe('trackSearchPage', function () {
    it('should send event analytic', function () {
      IntercomTracking.trackSearchPage();

      global.Intercom.should.be.calledWith(
        'trackEvent',
        'search_page'
      );
    });
  });

  describe('trackSearchTerms', function () {
    it('should send event analytic', function () {
      IntercomTracking.trackSearchTerms();

      global.Intercom.should.be.calledWith(
        'trackEvent',
        'search_terms'
      );
    });
  });
});
