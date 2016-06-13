import {
  requestFAQs, FAQ_PAGE_API_URL,
  FAQ_PAGE_REQUEST_START, FAQ_PAGE_REQUEST_SUCCESS, FAQ_PAGE_REQUEST_FAILURE
} from 'actions/faq-page';


describe('faqPage actions', function () {
  describe('requestFAQs', function () {
    it('should return the right action', function () {
      requestFAQs().should.eql({
        types: [FAQ_PAGE_REQUEST_START, FAQ_PAGE_REQUEST_SUCCESS, FAQ_PAGE_REQUEST_FAILURE],
        payload: {
          request: {
            url: FAQ_PAGE_API_URL,
            params: undefined,
            adapter: undefined
          }
        }
      });
    });
  });
});
