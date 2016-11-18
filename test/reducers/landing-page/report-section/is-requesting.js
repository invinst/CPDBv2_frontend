import {
  LANDING_PAGE_REQUEST_START, LANDING_PAGE_REQUEST_SUCCESS, LANDING_PAGE_REQUEST_FAILURE
} from 'actions/landing-page';
import reportSectionIsRequesting from 'reducers/landing-page/report-section/is-requesting';


describe('reportSectionIsRequesting reducer', function () {
  it('should return initial state', function () {
    reportSectionIsRequesting(undefined, {}).should.be.false();
  });

  it('should handle LANDING_PAGE_REQUEST_START', function () {
    reportSectionIsRequesting(undefined, {
      type: LANDING_PAGE_REQUEST_START
    }).should.be.true();
  });

  it('should handle LANDING_PAGE_REQUEST_SUCCESS', function () {
    reportSectionIsRequesting(true, {
      type: LANDING_PAGE_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle LANDING_PAGE_REQUEST_FAILURE', function () {
    reportSectionIsRequesting(true, {
      type: LANDING_PAGE_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
