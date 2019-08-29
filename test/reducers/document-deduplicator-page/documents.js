import documents from 'reducers/document-deduplicator-page/documents';
import * as constants from 'utils/constants';


describe('Document deduplicator page documents reducer', function () {
  it('should have initial state', function () {
    documents(undefined, {}).should.deepEqual({ data: {}, crid: '' });
  });

  it('should handle DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS', function () {
    documents({
      data: {
        '1': {
          id: 1,
        },
        '3': {
          id: 3,
        },
      },
      crid: '1000000',
    }, {
      type: constants.DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS,
      payload: {
        results: [{
          id: 1,
        }, {
          id: 2,
        }],
      },
      request: {
        params: {
          crid: '1000000',
        },
      },
    }
    ).should.deepEqual({
      data: {
        '1': {
          id: 1,
        },
        '2': {
          id: 2,
        },
        '3': {
          id: 3,
        },
      },
      crid: '1000000',
    });

    documents({
      data: {
        '1': {
          id: 1,
        },
        '3': {
          id: 3,
        },
      },
      crid: '1000000',
    }, {
      type: constants.DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS,
      payload: {
        results: [{
          id: 1,
        }, {
          id: 2,
        }],
      },
      request: {
        params: {},
      },
    }
    ).should.deepEqual({
      data: {
        '1': {
          id: 1,
        },
        '2': {
          id: 2,
        },
      },
      crid: '',
    });
  });

  it('should handle DOCUMENT_VISIBILITY_TOGGLE_REQUEST_SUCCESS', function () {
    documents({
      data: {
        '1': {
          id: 1,
          show: true,
        },
      },
      crid: '1000000',
    }, {
      type: constants.DOCUMENT_VISIBILITY_TOGGLE_REQUEST_SUCCESS,
      payload: {
        show: false,
      },
      request: {
        url: 'http://localhost/api/v2/attachments/1/',
      },
    }
    ).should.deepEqual({
      data: {
        '1': {
          id: 1,
          show: false,
        },
      },
      crid: '1000000',
    });
  });
});
