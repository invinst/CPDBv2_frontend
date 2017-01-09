import { faqsSelector } from 'selectors/faq-page/faqs-selector';
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

      const { id, fieldProps } = faqsSelector(state)[0];
      id.should.equal(faq.id);
      fieldProps['answer'].should.be.ok();
      fieldProps['question'].should.be.ok();
    });
  });
});
