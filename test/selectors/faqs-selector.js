import { faqsSelector, dataAvailableSelector } from 'selectors/faqs-selector';
import FAQFactory from 'utils/test/factories/faq';


describe('faqs selectors', function () {
  describe('faqsSelector', function () {
    it('should return available faqs', function () {
      const faq = FAQFactory.build();
      const state = {
        faqApp: {
          faqs: [faq]
        }
      };

      faqsSelector(state).should.eql([faq]);
    });
  });

  describe('dataAvailableSelector', function () {
    it('should return false when isRequesting', function () {
      let state = {
        faqApp: {
          faqs: FAQFactory.buildList(3),
          isRequesting: true
        }
      };
      dataAvailableSelector(state).should.be.false();
    });

    it('should return true if has more than 2 faqs and requesting is false', function () {
      let state = {
        faqApp: {
          isRequesting: false,
          faqs: FAQFactory.buildList(3)
        }
      };
      dataAvailableSelector(state).should.be.true();
    });

    it('should return false when stories has less than 3 faqs', function () {
      let state = {
        faqApp: {
          faqs: FAQFactory.buildList(2)
        }
      };
      dataAvailableSelector(state).should.be.false();
    });
  });
});
