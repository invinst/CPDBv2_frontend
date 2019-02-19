import { documentsSelector } from 'selectors/document-deduplicator-page';


describe('Document deduplicator page selectors', function () {
  describe('documentsSelector', function () {
    it('should return doc with correct format', function () {
      const state = {
        documentDeduplicatorPage: {
          documents: [
            {
              id: 4677,
              'created_at': '2017-01-14T06:00:01-06:00',
              title: 'CRID 1051117 CR',
              'source_type': 'DOCUMENTCLOUD',
              'preview_image_url': 'https://assets.documentcloud.org/documents/4769596/pages/CRID-1051117-CR-p1-normal.gif',
              'views_count': 1,
              'downloads_count': 1,
              show: true
            }
          ]
        }
      };

      documentsSelector(state).should.eql([{
        id: 4677,
        title: 'CRID 1051117 CR',
        thumbnail: 'https://assets.documentcloud.org/documents/4769596/pages/CRID-1051117-CR-p1-normal.gif',
        source: 'https://www.documentcloud.org/',
        date: 'Jan 14, 2017',
        viewsCount: 1,
        downloadsCount: 1,
        show: true
      }]);
    });
  });
});
