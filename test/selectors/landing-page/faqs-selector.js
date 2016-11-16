import { faqsSelector, dataAvailableSelector } from 'selectors/landing-page/faqs-selector';
import FAQFactory from 'utils/test/factories/faq';


describe('faqs selectors (landing page)', function () {
  let state = {
    landingPage: {
      faqSection: {}
    },
    faqs: {}
  };

  beforeEach(function () {
    state.landingPage.faqSection = {};
  });

  describe('faqsSelector', function () {
    it('should return available faqs', function () {
      const question = 'question';
      const answer = 'answer';
      const faq = FAQFactory.build({}, { question, answer });
      state = {
        landingPage: {
          faqSection: {
            faqs: [faq.id]
          }
        },
        faqs: {
          [faq.id]: faq
        }
      };

      faqsSelector(state).should.eql([{
        id: faq.id,
        question: question,
        answer: [answer]
      }]);
    });
  });

  describe('dataAvailableSelector', function () {
    it('should return false when isRequesting', function () {

      state.landingPage.faqSection = {
        faqs: [1, 2, 3]
      };
      state.landingPage.isRequesting = true;

      dataAvailableSelector(state).should.be.false();
    });

    it('should return true if has faqs and requesting is false', function () {
      state.landingPage.faqSection = {
        faqs: [1, 2, 3]
      };
      state.landingPage.isRequesting = false;
      dataAvailableSelector(state).should.be.true();
    });

    it('should return false when there are no faqs', function () {
      state.landingPage.faqSection = {
        faqs: []
      };
      dataAvailableSelector(state).should.be.false();
    });
  });
});
