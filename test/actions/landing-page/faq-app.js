import {
  requestFAQs, FAQS_API_URL,
  FAQS_REQUEST_START, FAQS_REQUEST_SUCCESS, FAQS_REQUEST_FAILURE
} from 'actions/landing-page/faq-app';


describe('faqApp actions', function () {
  describe('requestFAQs', function () {
    it('should return the right action', function () {
      requestFAQs().should.eql({
        types: [FAQS_REQUEST_START, FAQS_REQUEST_SUCCESS, FAQS_REQUEST_FAILURE],
        payload: {
          request: {
            url: FAQS_API_URL,
            params: undefined,
            adapter: undefined
          }
        }
      });
    });
  });
});
