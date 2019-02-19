import documents from 'reducers/documents-overview-page/documents';
import * as constants from 'utils/constants';


describe('documents reducer', function () {
  it('should have initial state', function () {
    documents(undefined, {}).should.deepEqual({});
  });

  it('should handle DOCUMENT_OVERVIEW_REQUEST_SUCCESS', function () {
    documents({
      '1': {
        id: 1,
        'created_at': '2017-01-14T06:00:01-06:00',
        title: 'CRID 1051117 CR',
        'source_type': 'DOCUMENTCLOUD',
        'preview_image_url': 'https://example.com/pic1.jpg',
        'views_count': 1,
        'downloads_count': 1,
        show: true
      }
    }, {
      type: constants.DOCUMENT_OVERVIEW_REQUEST_SUCCESS,
      payload: {
        results: [{
          id: 1,
          'created_at': '2017-01-14T06:00:01-06:00',
          title: 'CRID 1051117 CR',
          'source_type': 'DOCUMENTCLOUD',
          'preview_image_url': 'https://example.com/pic1.jpg',
          'views_count': 1,
          'downloads_count': 1,
          show: true
        }, {
          id: 2,
          'created_at': '2017-01-14T06:00:01-06:00',
          title: 'CRID 1064593 CR',
          'source_type': 'DOCUMENTCLOUD',
          'preview_image_url': 'https://example.com/pic2.jpg',
          'views_count': 2,
          'downloads_count': 1,
          show: false
        }]
      }
    }
    ).should.deepEqual({
      '1': {
        id: 1,
        'created_at': '2017-01-14T06:00:01-06:00',
        title: 'CRID 1051117 CR',
        'source_type': 'DOCUMENTCLOUD',
        'preview_image_url': 'https://example.com/pic1.jpg',
        'views_count': 1,
        'downloads_count': 1,
        show: true
      },
      '2': {
        id: 2,
        'created_at': '2017-01-14T06:00:01-06:00',
        title: 'CRID 1064593 CR',
        'source_type': 'DOCUMENTCLOUD',
        'preview_image_url': 'https://example.com/pic2.jpg',
        'views_count': 2,
        'downloads_count': 1,
        show: false
      }
    });
  });
});
