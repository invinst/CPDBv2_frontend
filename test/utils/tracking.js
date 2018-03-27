import { stub, spy } from 'sinon';
import axios from 'axios';

import { EVENTS_API_URL } from 'utils/constants';
import {
  trackIntercomClickedFaqEvent, trackIntercomClickedReportEvent, trackInternalEvent, trackOutboundLink
} from 'utils/tracking';


describe('Intercom utils', function () {
  window.Intercom = function () {};
  let IntercomStub;

  beforeEach(function () {
    IntercomStub = stub(window, 'Intercom');
    stub(axios, 'post');
  });

  afterEach(function () {
    IntercomStub.restore();
    axios.post.restore();
  });

  describe('trackIntercomClickedFaqEvent', function () {
    it('should call Intercom API', function () {
      trackIntercomClickedFaqEvent(11, 'Some question?', 'An answer.');

      IntercomStub.calledOnce.should.be.true();
      IntercomStub.calledWith('trackEvent', 'clicked-faq-item', {
        id: 11,
        question: 'Some question?',
        answer: 'An answer.'
      }).should.be.true();
    });
  });

  describe('trackIntercomClickedReportEvent', function () {
    it('should call Intercom API', function () {
      trackIntercomClickedReportEvent(11, 'This is a title');

      IntercomStub.calledOnce.should.be.true();
      IntercomStub.calledWith('trackEvent', 'clicked-reporting-item', {
        id: 11,
        title: 'This is a title'
      }).should.be.true();
    });
  });

  describe('trackInternalEvent', function () {
    it('should post to events api', function () {
      trackInternalEvent('eventA', { a: 'b' });
      axios.post.calledOnce.should.be.true();
      axios.post.calledWith(EVENTS_API_URL, { name: 'eventA', data: { a: 'b' } }).should.be.true();
    });
  });

  describe('trackOutboundLink', function () {
    it('should send event analytic', function () {
      stub(global, 'ga');
      const event = {
        preventDefault: spy()
      };

      trackOutboundLink('localhost')(event);

      event.preventDefault.called.should.be.true();
      const args = global.ga.getCall(0).args;
      args.slice(0, 5).should.eql(['send', 'event', 'outbound', 'click', 'localhost']);
      args[5].transport.should.equal('beacon');
      args[5].hitCallback.should.be.ok();
      global.ga.restore();
    });
  });
});
