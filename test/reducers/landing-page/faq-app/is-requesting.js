import { FAQS_REQUEST_START, FAQS_REQUEST_SUCCESS, FAQS_REQUEST_FAILURE } from 'actions/landing-page/faq-app';
import isRequesting from 'reducers/landing-page/faq-app/is-requesting';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle FAQS_REQUEST_START', function () {
    isRequesting(undefined, {
      type: FAQS_REQUEST_START
    }).should.be.true();
  });

  it('should handle FAQS_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: FAQS_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle FAQS_REQUEST_FAILURE', function () {
    isRequesting(true, {
      type: FAQS_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
