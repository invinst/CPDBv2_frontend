import recentDocumentIsRequesting from 'reducers/landing-page/recent-document/is-requesting';
import * as constants from 'utils/constants';


describe('recentDocumentIsRequesting reducer', function () {
  it('should return initial state', function () {
    recentDocumentIsRequesting(undefined, {}).should.be.false();
  });

  it('should handle RECENT_DOCUMENT_REQUEST_START', function () {
    recentDocumentIsRequesting(undefined, {
      type: constants.RECENT_DOCUMENT_REQUEST_START
    }).should.be.true();
  });

  it('should handle RECENT_DOCUMENT_REQUEST_SUCCESS', function () {
    recentDocumentIsRequesting(true, {
      type: constants.RECENT_DOCUMENT_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle RECENT_DOCUMENT_FAILURE', function () {
    recentDocumentIsRequesting(true, {
      type: constants.RECENT_DOCUMENT_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
