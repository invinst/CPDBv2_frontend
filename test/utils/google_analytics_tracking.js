import { stub, useFakeTimers } from 'sinon';
import * as GATracking from 'utils/google_analytics_tracking';


describe('GATracking utils', function () {
  beforeEach(function () {
    stub(global, 'ga');
  });

  afterEach(function () {
    global.ga.restore();
  });

  describe('trackSwipeLanddingPageCarousel', function () {
    it('should send event analytic', function () {
      GATracking.trackSwipeLanddingPageCarousel('left', 'type');

      global.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'landing_page_carousel',
        eventAction: 'swipe_left',
        eventLabel: 'type',
      });
    });
  });

  describe('trackOutboundLink', function () {
    it('should send event analytic', function () {
      GATracking.trackOutboundLink('localhost');

      const args = global.ga.getCall(0).args;
      args[0].should.equal('send');
      args[1].hitType.should.equal('event');
      args[1].eventCategory.should.equal('outbound');
      args[1].eventAction.should.equal('click');
      args[1].eventLabel.should.equal('localhost');
      args[1].transport.should.equal('beacon');
      args[1].hitCallback.should.be.ok();
    });
  });

  describe('trackPageView', function () {
    it('should send event analytic', function () {
      GATracking.trackPageView('pathname');

      global.ga.should.be.calledWith('send', {
        hitType: 'pageview',
        page: 'pathname',
      });
    });
  });

  describe('trackSearchResultsCount', function () {
    it('should send event analytic', function () {
      GATracking.trackSearchResultsCount(12);

      global.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'search',
        eventAction: 'num_results',
        eventValue: 12,
      });
    });
  });

  describe('trackSingleSearchResults', function () {
    it('should send event analytic', function () {
      GATracking.trackSingleSearchResults('contentType', 'query', 123);

      global.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'contentType',
        eventAction: 'single_search',
        eventLabel: 'query',
        eventValue: 123,
      });
    });
  });

  describe('trackSearchFocusedItem', function () {
    it('should send event analytic at most once in 500ms', function () {
      const clock = useFakeTimers();

      GATracking.trackSearchFocusedItem('contentType', 'query', 'itemId1', 1);
      GATracking.trackSearchFocusedItem('contentType', 'query', 'itemId2', 2);
      clock.tick(550);

      global.ga.should.be.calledTwice();
      global.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'contentType',
        eventAction: 'view_search_preview',
        eventLabel: 'itemId2',
        eventValue: 2,
      });
      global.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'contentType',
        eventAction: 'view_search_preview_with_query',
        eventLabel: 'itemId2 - query',
        eventValue: 2,
      });

      clock.tick(1000);
      GATracking.trackSearchFocusedItem('contentType', 'query', 'itemId3');
      clock.tick(550);

      global.ga.callCount.should.equal(4);

      clock.restore();
    });
  });

  describe('trackSearchQuery', function () {
    it('should send event analytic at most once in 500ms', function () {
      const clock = useFakeTimers();

      GATracking.trackSearchQuery('que');
      GATracking.trackSearchQuery('quer');
      clock.tick(550);

      global.ga.should.be.calledOnce();
      global.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'search',
        eventAction: 'change_query',
        eventLabel: 'quer',
      });

      clock.tick(1000);
      GATracking.trackSearchQuery('query');
      clock.tick(550);

      global.ga.should.be.calledTwice();

      clock.restore();
    });
  });

  describe('trackCommunityClick', function () {
    it('should send event analytic', function () {
      GATracking.trackCommunityClick('communityName');

      global.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'community',
        eventAction: 'click',
        eventLabel: 'communityName',
      });
    });
  });

  describe('trackOpenExplainer', function () {
    it('should send event analytic', function () {
      GATracking.trackOpenExplainer(123);

      global.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'visual_token_explainer',
        eventAction: 'open',
        eventValue: 123,
      });
    });
  });

  describe('trackRelatedByCategoryClick', function () {
    it('should send event analytic', function () {
      GATracking.trackRelatedByCategoryClick('01234', '56789');
      global.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'related_by_category',
        eventAction: 'click',
        eventLabel: 'Source CRID: 01234 - Target CRID: 56789',
      });
    });
  });

  describe('trackRelatedByAccusedClick', function () {
    it('should send event analytic', function () {
      GATracking.trackRelatedByAccusedClick('01234', '56789');
      global.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'related_by_accused',
        eventAction: 'click',
        eventLabel: 'Source CRID: 01234 - Target CRID: 56789',
      });
    });
  });

  describe('trackAttachmentClick', function () {
    it('should send event analytic', function () {
      GATracking.trackAttachmentClick('/', '/complaint/123456/');
      global.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'attachment_click',
        eventAction: 'click',
        eventLabel: 'Source URL: / - Target URL: /complaint/123456/',
      });
    });
  });

  describe('trackPopupButtonClick', function () {
    it('should send event analytic', function () {
      GATracking.trackPopupButtonClick('/officer/8562/jerome-finnigan/', 'Rank');
      global.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'popup_click',
        eventAction: 'click',
        eventLabel: '/officer/8562/jerome-finnigan/ - Rank',
      });
    });
  });

  describe('trackOfficerDownload', function () {
    it('should send event analytic', function () {
      GATracking.trackOfficerDownload(8562, 'download', 'without_docs');
      global.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'officer_data',
        eventAction: 'download',
        eventValue: 8562,
        eventLabel: 'without_docs',
      });
    });
  });

  describe('trackOfficerDownloadMenu', function () {
    it('should send event analytic', function () {
      GATracking.trackOfficerDownloadMenu(8562, 'open');
      global.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'officer_download_menu',
        eventAction: 'open',
        eventValue: 8562,
      });
    });
  });

  describe('trackDocumentEdit', function () {
    it('should send event analytic', function () {
      GATracking.trackDocumentEdit(1234, 'title');
      global.ga.should.be.calledWith('send', {
        hitType: 'event',
        eventCategory: 'document_edit',
        eventAction: 'edit',
        eventLabel: 'Document ID: 1234 - Field: title',
      });
    });
  });
});
