import faqForm from 'reducers/faq-page/faq-form';
import { FAQS_POST_START, FAQS_POST_SUCCESS, FAQS_POST_FAILURE } from 'actions/faq-page';


describe('faqForm reducer', function () {
  it('should have initial state', function () {
    faqForm(undefined, {}).should.eql({ isSubmitting: false });
  });

  it('should handle FAQS_POST_START', function () {
    faqForm(undefined, {
      type: FAQS_POST_START
    }).should.eql({
      isSubmitting: true
    });
  });

  it('should handle FAQS_POST_SUCCESS', function () {
    const data = 'data';
    const expectedState = {
      isSubmitting: false,
      data: data
    };

    faqForm(undefined, {
      type: FAQS_POST_SUCCESS,
      payload: data
    }).should.eql(expectedState);
  });

  it('should handle FAQS_POST_FAILURE', function () {
    const error = 'error';
    const expectedState = {
      isSubmitting: false,
      error: error
    };

    faqForm(undefined, {
      type: FAQS_POST_FAILURE,
      payload: error
    }).should.eql(expectedState);
  });
});
