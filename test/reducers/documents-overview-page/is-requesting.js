import isRequesting from 'reducers/documents-overview-page/is-requesting';
import {
  DOCUMENT_OVERVIEW_REQUEST_START,
  DOCUMENT_OVERVIEW_REQUEST_FAILURE,
  DOCUMENT_OVERVIEW_REQUEST_SUCCESS,
} from 'utils/constants';


describe('DocumentsOverviewPage documentsOrder reducer', function () {
  it('should have initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle DOCUMENT_OVERVIEW_REQUEST_START', function () {
    isRequesting(false, { type: DOCUMENT_OVERVIEW_REQUEST_START }).should.be.true();
  });

  it('should handle DOCUMENT_OVERVIEW_REQUEST_SUCCESS', function () {
    isRequesting(true, { type: DOCUMENT_OVERVIEW_REQUEST_SUCCESS }).should.be.false();
  });

  it('should handle DOCUMENT_OVERVIEW_REQUEST_FAILURE', function () {
    isRequesting(false, { type: DOCUMENT_OVERVIEW_REQUEST_FAILURE }).should.be.false();
  });
});
