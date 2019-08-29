import {
  documentsSelector,
  hasMoreSelector,
  nextParamsSelector,
} from 'selectors/document-deduplicator-page';


describe('Document deduplicator page selectors', function () {
  describe('Document deduplicator page documentsSelector', function () {
    it('should return doc with correct format', function () {
      const state = {
        documentDeduplicatorPage: {
          documentsOrder: {
            data: [1, 4677],
          },
          documents: {
            data: {
              '4677': {
                id: 4677,
                'created_at': '2017-01-14T06:00:01-06:00',
                title: 'CRID 1051117 CR',
                'source_type': 'DOCUMENTCLOUD',
                'preview_image_url': 'https://example.com/doc.jpg',
                'views_count': 1,
                'downloads_count': 1,
                'file_type': 'document',
                'url': 'http://document/link/4677',
                show: true,
              },
              '1': {
                id: 1,
                'created_at': '2017-01-14T06:00:01-06:00',
                title: 'CRID 1051117 CR',
                'source_type': 'DOCUMENTCLOUD',
                'preview_image_url': 'https://example.com/doc.jpg',
                'views_count': 1,
                'downloads_count': 1,
                'file_type': 'document',
                'url': 'http://document/link/1',
                show: true,
              },
            },
          },
        },
      };

      documentsSelector(state).should.eql([
        {
          id: 1,
          title: 'CRID 1051117 CR',
          thumbnail: 'https://example.com/doc.jpg',
          source: 'https://www.documentcloud.org/',
          date: 'Jan 14, 2017',
          viewsCount: 1,
          downloadsCount: 1,
          fileType: 'document',
          url: 'http://document/link/1',
          show: true,
        },
        {
          id: 4677,
          title: 'CRID 1051117 CR',
          thumbnail: 'https://example.com/doc.jpg',
          source: 'https://www.documentcloud.org/',
          date: 'Jan 14, 2017',
          viewsCount: 1,
          downloadsCount: 1,
          fileType: 'document',
          url: 'http://document/link/4677',
          show: true,
        },
      ]);
    });
  });

  describe('Document deduplicator page hasMoreSelector', function () {
    it('should return true when next paramater is available', function () {
      const state = {
        documentDeduplicatorPage: {
          pagination: {
            next: 'https://api.com/docs/?limit=20&offset=40',
          },
        },
      };

      hasMoreSelector(state).should.eql(true);
    });

    it('should return false when next parameter is not available', function () {
      const state = {
        documentDeduplicatorPage: {
          pagination: {
            next: null,
          },
        },
      };

      hasMoreSelector(state).should.eql(false);
    });
  });

  describe('Document deduplicator page nextParamsSelector', function () {
    it('should extract pagination information from next parameter', function () {
      const state = {
        documentDeduplicatorPage: {
          pagination: {
            next: 'https://api.com/docs/?limit=20&offset=40',
          },
        },
      };

      nextParamsSelector(state).should.eql({
        limit: '20',
        offset: '40',
      });
    });
  });
});
