import { FAQS_REQUEST_SUCCESS, FAQS_REQUEST_FAILURE } from 'actions/faq-app';
import faqs from 'reducers/faq-app/faqs';


describe('faqs reducer', function () {
  it('should return initial state', function () {
    faqs(undefined, {}).should.eql([]);
  });

  it('should handle FAQS_REQUEST_SUCCESS', function () {
    const expectStories = [1, 2, 3];
    faqs(undefined, {
      type: FAQS_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.eql(expectStories);
  });
  it('should handle FAQS_REQUEST_FAILURE', function () {
    faqs([1, 2, 3], {
      type: FAQS_REQUEST_FAILURE
    }).should.eql([]);
  });
});
