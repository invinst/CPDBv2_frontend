import {
  LANDING_PAGE_REQUEST_START, LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE
} from 'actions/landing-page';
import faqSectionIsRequesting from 'reducers/landing-page/faq-section/is-requesting';


describe('faqSectionIsRequesting reducer', function () {
  it('should return initial state', function () {
    faqSectionIsRequesting(undefined, {}).should.be.false();
  });

  it('should handle LANDING_PAGE_REQUEST_START', function () {
    faqSectionIsRequesting(undefined, {
      type: LANDING_PAGE_REQUEST_START
    }).should.be.true();
  });

  it('should handle LANDING_PAGE_REQUEST_SUCCESS', function () {
    faqSectionIsRequesting(true, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle LANDING_PAGE_REQUEST_FAILURE', function () {
    faqSectionIsRequesting(true, {
      type: LANDING_PAGE_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
