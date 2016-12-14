import {
  requestFAQs, askQuestion, updateFAQ, fetchFAQ, FAQS_API_URL,
  FAQS_REQUEST_START, FAQS_REQUEST_SUCCESS, FAQS_REQUEST_FAILURE,
  FAQS_POST_START, FAQS_POST_SUCCESS, FAQS_POST_FAILURE,
  FAQ_REQUEST_START, FAQ_REQUEST_SUCCESS, FAQ_REQUEST_FAILURE,
  UPDATE_FAQ_REQUEST_START, UPDATE_FAQ_REQUEST_SUCCESS, UPDATE_FAQ_REQUEST_FAILURE
} from 'actions/faq-page';


describe('faqPage actions', function () {
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

  describe('fetchFAQ action', function () {
    it('should return correct action', function () {
      fetchFAQ(1).should.eql({
        types: [FAQ_REQUEST_START, FAQ_REQUEST_SUCCESS, FAQ_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${FAQS_API_URL}1/`,
            adapter: undefined,
            params: undefined
          }
        }
      });
    });
  });

  describe('askQuestion', function () {
    it('should return right action', function () {
      const data = { title: 'title' };

      askQuestion(data).should.eql({
        types: [FAQS_POST_START, FAQS_POST_SUCCESS, FAQS_POST_FAILURE],
        payload: {
          request: {
            url: FAQS_API_URL,
            method: 'POST',
            headers: {
              Authorization: null
            },
            data: data,
            adapter: undefined
          }
        }
      });
    });
  });

  describe('updateFAQ', function () {
    it('should return right action', function () {
      const id = 1;
      const data = { title: 'title' };

      updateFAQ(id, data).should.eql({
        types: [UPDATE_FAQ_REQUEST_START, UPDATE_FAQ_REQUEST_SUCCESS, UPDATE_FAQ_REQUEST_FAILURE],
        payload: {
          request: {
            url: `${FAQS_API_URL}${id}/`,
            method: 'PATCH',
            headers: {
              Authorization: null
            },
            data: data,
            adapter: undefined
          }
        }
      });
    });
  });
});
