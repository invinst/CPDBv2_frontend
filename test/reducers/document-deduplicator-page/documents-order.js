import documentsOrder from 'reducers/document-deduplicator-page/documents-order';
import * as constants from 'utils/constants';


describe('Document deduplicator page documentsOrder reducer', function () {
  it('should have initial state', function () {
    documentsOrder(undefined, {}).should.deepEqual({ data: [], crid: '' });
  });

  it('should handle DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS', function () {
    documentsOrder(
      {
        data: [1],
        crid: '1000000',
      },
      {
        type: constants.DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS,
        payload: {
          results: [
            {
              id: 3,
            },
            {
              id: 2,
            },
          ],
        },
        request: {
          params: {
            crid: '1000000',
          },
        },
      }
    ).should.deepEqual({ data: [1, 3, 2], crid: '1000000' });

    documentsOrder(
      {
        data: [1],
        crid: '1000000',
      },
      {
        type: constants.DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS,
        payload: {
          results: [
            {
              id: 3,
            },
            {
              id: 2,
            },
          ],
        },
        request: {
          params: {},
        },
      }
    ).should.deepEqual({ data: [3, 2], crid: '' });
  });
});
