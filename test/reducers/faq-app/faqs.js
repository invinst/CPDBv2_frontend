import { FAQS_REQUEST_SUCCESS, FAQS_REQUEST_FAILURE } from 'actions/faq-app';
import faqs from 'reducers/faq-app/faqs';
import { PAGINATION_DEFAULT } from 'utils/constants';
import PaginationFactory from 'utils/test/factories/pagination';


describe('faqs reducer', function () {
  it('should return initial state', function () {
    faqs(undefined, {}).should.eql(PAGINATION_DEFAULT);
  });

  it('should handle FAQS_REQUEST_SUCCESS', function () {
    const expectedFaqs = PaginationFactory.build({ results: [1, 2, 3] });

    faqs(undefined, {
      type: FAQS_REQUEST_SUCCESS,
      payload: expectedFaqs
    }).should.eql(expectedFaqs);
  });

  it('should handle FAQS_REQUEST_FAILURE', function () {
    faqs(PaginationFactory.build(), {
      type: FAQS_REQUEST_FAILURE
    }).should.eql(PAGINATION_DEFAULT);
  });
});
