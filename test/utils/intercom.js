import { stub } from 'sinon';
import { trackClickedFaqItem, trackClickedReportingItem } from 'utils/intercom';


describe('Intercom utils', function () {
  window.Intercom = function () {};
  let IntercomStub;

  beforeEach(function () {
    IntercomStub = stub(window, 'Intercom');
  });

  afterEach(function () {
    IntercomStub.restore();
  });

  describe('trackClickedFaqItem', function () {
    it('should call Intercom API', function () {
      trackClickedFaqItem(11, 'Some question?', ['Two', 'Paragraphs']);

      IntercomStub.calledOnce.should.equal(true);
      IntercomStub.calledWith('trackEvent', 'clicked-faq-item', {
        id: 11,
        question: 'Some question?',
        answer: 'Two. Paragraphs'
      }).should.equal(true);
    });
  });

  describe('trackClickedReportingItem', function () {
    it('should call Intercom API', function () {
      trackClickedReportingItem(11, 'This is a title');

      IntercomStub.calledOnce.should.equal(true);
      IntercomStub.calledWith('trackEvent', 'clicked-reporting-item', {
        id: 11,
        title: 'This is a title'
      }).should.equal(true);
    });
  });
});
