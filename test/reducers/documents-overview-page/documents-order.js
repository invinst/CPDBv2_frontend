import documentsOrder from 'reducers/documents-overview-page/documents-order';
import * as constants from 'utils/constants';


describe('DocumentsOverviewPage documentsOrder reducer', function () {
  it('should have initial state', function () {
    documentsOrder(undefined, {}).should.deepEqual({ data: [], match: '' });
  });

  it('should handle DOCUMENT_OVERVIEW_REQUEST_SUCCESS', function () {
    documentsOrder(
      {
        data: [1],
        match: 'term',
      },
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
        },
        request: {
          params: {
            match: 'term'
          }
        }
      }
    ).should.deepEqual({ data: [1, 3, 2], match: 'term' });

    documentsOrder(
      {
        data: [1],
        match: 'term',
      },
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
        },
        request: {
          params: {}
        }
      }
    ).should.deepEqual({ data: [3, 2], match: '' });
  });
});
