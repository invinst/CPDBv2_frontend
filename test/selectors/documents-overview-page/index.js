import {
  documentsSelector,
  hasMoreSelector,
  nextParamsSelector
} from 'selectors/documents-overview-page';


describe('Documents overview page selectors', function () {
  describe('documentsSelector', function () {
    it('should return doc with correct format', function () {
      const state = {
        documentsOverviewPage: {
          documents: {
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
              'source_type': 'COPA',
              'preview_image_url': 'https://example.com/pic2.jpg',
              'views_count': 2,
              'downloads_count': 1,
              show: false
            }
          },
          documentsOrder: [2, 1]
        }
      };

      documentsSelector(state).should.eql([
        {
          id: 2,
          title: 'CRID 1064593 CR',
          thumbnail: 'https://example.com/pic2.jpg',
          source: 'https://www.chicagocopa.org/',
          date: 'Jan 14, 2017',
          viewsCount: 2,
          downloadsCount: 1,
          show: false
        },
        {
          id: 1,
          title: 'CRID 1051117 CR',
          thumbnail: 'https://example.com/pic1.jpg',
          source: 'https://www.documentcloud.org/',
          date: 'Jan 14, 2017',
          viewsCount: 1,
          downloadsCount: 1,
          show: true
        }
      ]);
    });
  });

  describe('hasMoreSelector', function () {
    it('should return true when next paramater is available', function () {
      const state = {
        documentsOverviewPage: {
          pagination: {
            next: 'https://api.com/docs/?limit=20&offset=40'
          }
        }
      };

      hasMoreSelector(state).should.eql(true);
    });

    it('should return false when next parameter is not available', function () {
      const state = {
        documentsOverviewPage: {
          pagination: {
            next: null
          }
        }
      };

      hasMoreSelector(state).should.eql(false);
    });
  });

  describe('nextParamsSelector', function () {
    it('should extract pagination information from next parameter', function () {
      const state = {
        documentsOverviewPage: {
          pagination: {
            next: 'https://api.com/docs/?limit=20&offset=40'
          }
        }
      };

      nextParamsSelector(state).should.eql({
        limit: '20',
        offset: '40'
      });
    });
  });
});
