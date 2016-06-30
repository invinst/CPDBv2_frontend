import {
  requestFAQs, askQuestion, FAQ_PAGE_API_URL,
  FAQ_PAGE_REQUEST_START, FAQ_PAGE_REQUEST_SUCCESS, FAQ_PAGE_REQUEST_FAILURE,
  FAQ_PAGE_POST_START, FAQ_PAGE_POST_SUCCESS, FAQ_PAGE_POST_FAILURE
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

  describe('askQuestion', function () {
    it('should return right action', function () {
      const data = { title: 'title' };

      askQuestion(data).should.eql({
        types: [FAQ_PAGE_POST_START, FAQ_PAGE_POST_SUCCESS, FAQ_PAGE_POST_FAILURE],
        payload: {
          request: {
            url: FAQ_PAGE_API_URL,
            method: 'POST',
            data: data,
            adapter: undefined
          }
        }
      });
    });
  });
});
