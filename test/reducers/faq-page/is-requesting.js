import { FAQ_PAGE_REQUEST_START, FAQ_PAGE_REQUEST_SUCCESS, FAQ_PAGE_REQUEST_FAILURE } from 'actions/faq-page';
import isRequesting from 'reducers/faq-page/is-requesting';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle FAQ_PAGE_REQUEST_START', function () {
    isRequesting(undefined, {
      type: FAQ_PAGE_REQUEST_START
    }).should.be.true();
  });

  it('should handle FAQ_PAGE_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: FAQ_PAGE_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle FAQ_PAGE_REQUEST_FAILURE', function () {
    isRequesting(true, {
      type: FAQ_PAGE_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
