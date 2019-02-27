import documentsOrder from 'reducers/document-deduplicator-page/documents-order';
import * as constants from 'utils/constants';


describe('Document deduplicator page documentsOrder reducer', function () {
  it('should have initial state', function () {
    documentsOrder(undefined, {}).should.deepEqual([]);
  });

  it('should handle DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS', function () {
    documentsOrder(
      [1],
      {
        type: constants.DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS,
        payload: {
          results: [
            {
              id: 3
            },
            {
              id: 2
            }
          ]
        }
      }
    ).should.deepEqual([1, 3, 2]);
  });
});
