import { LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE } from 'actions/landing-page';
import faqs from 'reducers/landing-page/faq-app/faqs';


describe('faqs reducer', function () {
  it('should return initial state', function () {
    faqs(undefined, {}).should.eql([]);
  });

  it('should handle LANDING_PAGE_REQUEST_SUCCESS', function () {
    const expectedFaqs = [1, 2, 3];

    faqs(undefined, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: { faqs: expectedFaqs }
    }).should.eql(expectedFaqs);
  });

  it('should handle LANDING_PAGE_REQUEST_FAILURE', function () {
    faqs([1, 2, 3], {
      type: LANDING_PAGE_REQUEST_FAILURE
    }).should.eql([]);
  });
});
