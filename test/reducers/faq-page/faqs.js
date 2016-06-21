import faqs from 'reducers/faq-page/faqs';
import { FAQ_PAGE_REQUEST_SUCCESS, FAQ_PAGE_REQUEST_FAILURE } from 'actions/faq-page';
import { PAGINATION_DEFAULT } from 'utils/constants';
import PaginationFactory from 'utils/test/factories/pagination';


describe('faqs reducer', function () {
  it('should have initial state', function () {
    faqs(undefined, {}).should.eql(PAGINATION_DEFAULT);
  });

  it('should handle FAQ_PAGE_REQUEST_SUCCESS', function () {
    const expectedFaqs = PaginationFactory.build({ results: [1, 2, 3] });

    faqs(undefined, {
      type: FAQ_PAGE_REQUEST_SUCCESS,
      payload: expectedFaqs
    }).should.eql(expectedFaqs);
  });

  it('should handle FAQ_PAGE_REQUEST_FAILURE', function () {
    faqs(PaginationFactory.build(), {
      type: FAQ_PAGE_REQUEST_FAILURE
    }).should.eql(PAGINATION_DEFAULT);
  });
});
