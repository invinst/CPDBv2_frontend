import { stub, useFakeTimers } from 'sinon';

import { OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS } from 'utils/constants';
import retryOfficerDownloadMiddleware from 'middleware/retry-officer-downloads';
import { fetchOfficerZipFileUrl, fetchOfficerZipWithDocsFileUrl } from 'actions/officer-page';


describe('retryOfficerDownloadMiddleware', function () {
  const store = {
    dispatch: stub().usingPromise(Promise).resolves('abc')
  };

  afterEach(function () {
    store.dispatch.reset();
  });

  it(
    'should retry fetchOfficerZipFileUrl on OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS',
    function () {
      const clock = useFakeTimers();

      const action = {
        type: OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS,
        request: {
          url: '/officer/123/',
          params: { 'retry-counter': 1 },
        },
        payload: ''
      };
      retryOfficerDownloadMiddleware(store)(() => {})(action);

      clock.tick(1200);
      store.dispatch.calledWith(fetchOfficerZipFileUrl('123', 2));
    }
  );

  it(
    'should retry fetchOfficerZipFileUrl on OFFICER_FETCH_ZIP_WITH_DOCS_FILE_URL_REQUEST_SUCCESS',
    function () {
      const clock = useFakeTimers();

      const action = {
        type: OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS,
        request: {
          url: '/officer/123/',
          params: { 'retry-counter': 1 },
        },
        payload: ''
      };
      retryOfficerDownloadMiddleware(store)(() => {})(action);

      clock.tick(1200);
      store.dispatch.calledWith(fetchOfficerZipWithDocsFileUrl('123', 2));
    }
  );

  it('should not retry if payload is ready', function () {
    const clock = useFakeTimers();
    const action = {
      type: OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS,
      request: {
        url: '/officer/123/',
        params: { 'retry-counter': 60 },
      },
      payload: 'lvh.me/file.zip'
    };
    retryOfficerDownloadMiddleware(store)(() => {})(action);

    clock.tick(1200);
    store.dispatch.should.not.be.called();
  });

  it(
    'should retry with limit',
    function () {
      const clock = useFakeTimers();

      const action = {
        type: OFFICER_FETCH_ZIP_FILE_URL_REQUEST_SUCCESS,
        request: {
          url: '/officer/123/',
          params: { 'retry-counter': 60 },
        },
        payload: ''
      };
      retryOfficerDownloadMiddleware(store)(() => {})(action);

      clock.tick(1200);
      store.dispatch.should.not.be.called();
    }
  );
});
