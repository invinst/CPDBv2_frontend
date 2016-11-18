import {
  faqsSelector, dataAvailableSelector
} from 'selectors/faq-page/faqs-selector';
import FAQFactory from 'utils/test/factories/faq';


describe('faqs selectors', function () {
  let state = {
    faqPage: {}
  };

  beforeEach(function () {
    state.faqPage = {};
  });

  describe('faqsSelector', function () {
    it('should return available faqs', function () {
      const question = 'question';
      const answer = 'answer';
      const faq = FAQFactory.build({}, { question, answer });
      state.faqs = [faq];

      faqsSelector(state).should.eql([{
        id: faq.id,
        answer: [answer],
        question
      }]);
    });
  });

  describe('dataAvailableSelector', function () {
    it('should return false when isRequesting', function () {
      state.faqPage = {
        isRequesting: true
      };
      dataAvailableSelector(state).should.be.false();
    });

    it('should return true if has faqs and requesting is false', function () {
      state.faqs = [1];
      state.faqPage = {
        isRequesting: false
      };
      dataAvailableSelector(state).should.be.true();
    });

    it('should return false when there are no faqs', function () {
      state.faqs = [];
      dataAvailableSelector(state).should.be.false();
    });
  });
});
