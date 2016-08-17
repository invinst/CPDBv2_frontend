import { faqsSelector, dataAvailableSelector, paginationSelector } from 'selectors/landing-page/faqs-selector';
import RawFAQFactory from 'utils/test/factories/raw-faq';
import PaginationFactory from 'utils/test/factories/pagination';


describe('faqs selectors', function () {
  let state = {
    landingPage: {
      faqApp: {}
    }
  };

  beforeEach(function () {
    state.landingPage.faqApp = {};
  });

  describe('faqsSelector', function () {
    it('should return available faqs', function () {
      const faq = RawFAQFactory.build();
      state.landingPage.faqApp = {
        faqs: PaginationFactory.build({ results: [faq] })
      };

      faqsSelector(state).should.eql([{
        id: faq.id,
        title: faq.title,
        paragraphs: faq.body.map(p => p.value)
      }]);
    });
  });

  describe('dataAvailableSelector', function () {
    it('should return false when isRequesting', function () {
      state.landingPage.faqApp = {
        faqs: PaginationFactory.build({ results: RawFAQFactory.buildList(3) }),
        isRequesting: true
      };
      dataAvailableSelector(state).should.be.false();
    });

    it('should return true if has more than 2 faqs and requesting is false', function () {
      state.landingPage.faqApp = {
        isRequesting: false,
        faqs: PaginationFactory.build({ results: RawFAQFactory.buildList(3) })
      };
      dataAvailableSelector(state).should.be.true();
    });

    it('should return false when stories has less than 3 faqs', function () {
      state.landingPage.faqApp = {
        faqs: PaginationFactory.build({ results: RawFAQFactory.buildList(2) })
      };
      dataAvailableSelector(state).should.be.false();
    });
  });

  describe('paginationSelector', function () {
    it('should return count, next and previous', function () {
      const next = 'next';
      const previous = 'previous';
      const count = 'count';

      state.landingPage.faqApp = {
        faqs: { next, previous, count }
      };

      paginationSelector(state).should.eql({ next, previous, count });
    });
  });
});
