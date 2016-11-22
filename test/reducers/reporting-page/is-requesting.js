import { REPORTS_REQUEST_START, REPORTS_REQUEST_SUCCESS, REPORTS_REQUEST_FAILURE } from 'actions/reporting-page';
import isRequesting from 'reducers/reporting-page/is-requesting';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle REPORTS_REQUEST_START', function () {
    isRequesting(undefined, {
      type: REPORTS_REQUEST_START
    }).should.be.true();
  });

  it('should handle REPORTS_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: REPORTS_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle REPORTS_POST_FAILURE', function () {
    isRequesting(true, {
      type: REPORTS_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
