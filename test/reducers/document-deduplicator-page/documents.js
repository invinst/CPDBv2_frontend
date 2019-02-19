import documents from 'reducers/document-deduplicator-page/documents';
import * as constants from 'utils/constants';


describe('documents reducer', function () {
  it('should have initial state', function () {
    documents(undefined, []).should.deepEqual([]);
  });

  it('should handle DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS', function () {
    documents(
      [
        {
          'id': 1,
          'created_at': '2017-01-14T06:00:01-06:00',
          'title': 'CRID 1051117 CR',
          'source_type': 'DOCUMENTCLOUD',
          'preview_image_url': 'https://assets.documentcloud.org/documents/4769596/pages/CRID-1051117-CR-p1-normal.gif',
          'views_count': 1,
          'downloads_count': 1,
          'show': true
        }
      ],
      {
        type: constants.DOCUMENT_DEDUPLICATOR_REQUEST_SUCCESS,
        payload: {
          results: [
            {
              'id': 2,
              'created_at': '2017-01-14T06:00:01-06:00',
              'title': 'CRID 1064593 CR',
              'source_type': 'DOCUMENTCLOUD',
              'preview_image_url': 'https://assets.documentcloud.org/documents/4769386/pages/CRID-1064593-CR-p1-normal.gif',
              'views_count': 2,
              'downloads_count': 1,
              'show': false
            }
          ]
        },
        request: {
          url: 'http://localhost/api/v2/attachments/?crid=1000000&limit=200'
        }
      }
    ).should.deepEqual([
      {
        'id': 2,
        'created_at': '2017-01-14T06:00:01-06:00',
        'title': 'CRID 1064593 CR',
        'source_type': 'DOCUMENTCLOUD',
        'preview_image_url': 'https://assets.documentcloud.org/documents/4769386/pages/CRID-1064593-CR-p1-normal.gif',
        'views_count': 2,
        'downloads_count': 1,
        'show': false
      }
    ]);
  });
});
