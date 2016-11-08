import FaqFactory from 'utils/test/factories/faq';
import { RandomizedListFieldFactory } from 'utils/test/factories/field';
import faqSectionReports from 'reducers/landing-page/faq-section/faqs';
import { LANDING_PAGE_REQUEST_SUCCESS } from 'actions/landing-page';


describe('faqSectionReports reducer', function () {
  it('should return initial state', function () {
    faqSectionReports(undefined, {}).should.be.eql([]);
  });

  it('should handle LANDING_PAGE_REQUEST_SUCCESS', function () {
    const currentFaqFactoryId = FaqFactory.build().id;
    faqSectionReports(true, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: {
        fields: [RandomizedListFieldFactory.build({ name: 'faqs' }, { subFactory: FaqFactory })]
      }
    }).should.be.eql([currentFaqFactoryId + 1, currentFaqFactoryId + 2, currentFaqFactoryId + 3]);
  });
});
