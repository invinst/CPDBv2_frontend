import documentsOrder from 'reducers/documents-overview-page/documents-order';
import * as constants from 'utils/constants';


describe('documentsOrder reducer', function () {
  it('should have initial state', function () {
    documentsOrder(undefined, {}).should.deepEqual([]);
  });

  it('should handle DOCUMENT_OVERVIEW_REQUEST_SUCCESS', function () {
    documentsOrder(
      [1],
      {
        type: constants.DOCUMENT_OVERVIEW_REQUEST_SUCCESS,
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
