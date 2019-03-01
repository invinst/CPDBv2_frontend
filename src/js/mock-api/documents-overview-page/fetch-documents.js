export default () => ({
  'count': 2,
  'next': null,
  'previous': null,
  'results': [
    {
      'id': 1,
      'created_at': '2019-01-09T06:00:01-06:00',
      'title': 'CRID #123456 DOCUMENT CLOUD',
      'source_type': 'DOCUMENTCLOUD',
      'preview_image_url': 'https://example.com/doc1.jpg',
      'views_count': 1000,
      'downloads_count': 2000,
      'show': true,
      'crid': '123456',
      'documents_count': '1'
    },
    {
      'id': 2,
      'created_at': '2019-02-10T06:00:01-06:00',
      'title': 'CRID #123457 COPA',
      'source_type': 'PORTAL_COPA',
      'preview_image_url': null,
      'views_count': 2000,
      'downloads_count': 1000,
      'show': false,
      'crid': '123457',
      'documents_count': '2'
    }
  ]
});
