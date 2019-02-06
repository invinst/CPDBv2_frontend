import zipFileUrl from 'reducers/officer-page/zip-file-url';
import {
  CHANGE_OFFICER_ID,
  OFFICER_FETCH_ZIP_FILE_URL_REQUEST_START,
  OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS,
  OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_START,
  OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_SUCCESS
} from 'utils/constants';


describe('zipFileUrl reducer', function () {
  const defaultState = { withDocs: '', withoutDocs: '' };

  it('should have initial state', function () {
    zipFileUrl(undefined, {}).should.eql(defaultState);
  });

  it('should handle CHANGE_OFFICER_ID', function () {
    zipFileUrl(undefined, {
      type: CHANGE_OFFICER_ID,
    }).should.eql(defaultState);
  });

  it('should handle OFFICER_FETCH_ZIP_FILE_URL_REQUEST_START', function () {
    zipFileUrl(defaultState, {
      type: OFFICER_FETCH_ZIP_FILE_URL_REQUEST_START,
      payload: null
    }).should.eql(defaultState);

    zipFileUrl(
      {
        withDocs: 'lvh.me/file-with-docs.zip', withoutDocs: 'abc'
      },
      {
        type: OFFICER_FETCH_ZIP_FILE_URL_REQUEST_START,
        payload: {}
      }
    ).should.eql({ withDocs: 'lvh.me/file-with-docs.zip', withoutDocs: '' });
  });

  it('should handle OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS', function () {
    zipFileUrl(defaultState, {
      type: OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS,
      payload: 'lvh.me/file.zip'
    }).should.eql({ withDocs: '', withoutDocs: 'lvh.me/file.zip' });

    zipFileUrl(
      {
        withDocs: 'lvh.me/file-with-docs.zip', withoutDocs: 'abc'
      },
      {
        type: OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS,
        payload: 'lvh.me/file.zip'
      }
    ).should.eql({ withDocs: 'lvh.me/file-with-docs.zip', withoutDocs: 'lvh.me/file.zip' });
  });

  it('should handle OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_START', function () {
    zipFileUrl(defaultState, {
      type: OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_START,
      payload: null
    }).should.eql(defaultState);

    zipFileUrl(
      {
        withDocs: 'abc', withoutDocs: 'lvh.me/file.zip'
      },
      {
        type: OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_START,
        payload: {}
      }
    ).should.eql({ withDocs: '', withoutDocs: 'lvh.me/file.zip' });
  });

  it('should handle OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_SUCCESS', function () {
    zipFileUrl(defaultState, {
      type: OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_SUCCESS,
      payload: 'lvh.me/file-with-docs.zip'
    }).should.eql({ withDocs: 'lvh.me/file-with-docs.zip', withoutDocs: '' });

    zipFileUrl(
      {
        withDocs: 'abc', withoutDocs: 'lvh.me/file.zip'
      },
      {
        type: OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_SUCCESS,
        payload: 'lvh.me/file-with-docs.zip'
      }
    ).should.eql({ withDocs: 'lvh.me/file-with-docs.zip', withoutDocs: 'lvh.me/file.zip' });
  });
});
