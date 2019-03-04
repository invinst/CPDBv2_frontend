import {
  documentsSelector,
  hasMoreSelector,
  nextParamsSelector
} from 'selectors/documents-overview-page';

import * as constants from 'utils/constants';


describe('DocumentsOverviewPage selectors', function () {
  describe('DocumentsOverviewPage documentsSelector', function () {
    it('should return doc with correct format', function () {
      const state = {
        documentsOverviewPage: {
          documents: {
            data: {
              '1': {
                id: 1,
                'created_at': '2017-02-14T06:00:01-06:00',
                title: 'CRID 1051117 CR',
                'source_type': 'DOCUMENTCLOUD',
                'preview_image_url': 'https://example.com/pic1.jpg',
                'views_count': 1,
                'downloads_count': 1,
                show: true,
                crid: '1051117',
                'documents_count': 1
              },
              '2': {
                id: 2,
                'created_at': '2017-01-14T06:00:01-06:00',
                title: 'CRID 1064593 CR',
                'source_type': 'PORTAL_COPA',
                'preview_image_url': 'https://example.com/pic2.jpg',
                'views_count': 2,
                'downloads_count': 1,
                show: false,
                crid: '1064593',
                'documents_count': 2
              }
            }
          },
          documentsOrder: {
            data: [2, 1]
          }
        }
      };

      documentsSelector(state).should.eql([
        {
          kind: constants.DOCUMENTS_SEARCH_ITEMS.MONTH_SEPARATOR,
          text: 'Jan 2017',
          id: '01-2017'
        },
        {
          id: 2,
          kind: constants.DOCUMENTS_SEARCH_ITEMS.DOCUMENT,
          title: 'CRID 1064593 CR',
          thumbnail: 'https://example.com/pic2.jpg',
          source: 'https://www.chicagocopa.org/',
          date: 'Jan 14',
          viewsCount: 2,
          downloadsCount: 1,
          crid: '1064593',
          documentsCount: 1
        },
        {
          kind: constants.DOCUMENTS_SEARCH_ITEMS.MONTH_SEPARATOR,
          text: 'Feb 2017',
          id: '02-2017'
        },
        {
          id: 1,
          kind: constants.DOCUMENTS_SEARCH_ITEMS.DOCUMENT,
          title: 'CRID 1051117 CR',
          thumbnail: 'https://example.com/pic1.jpg',
          source: 'https://www.documentcloud.org/',
          date: 'Feb 14',
          viewsCount: 1,
          downloadsCount: 1,
          crid: '1051117',
          documentsCount: 0
        }
      ]);
    });
  });

  describe('DocumentsOverviewPage hasMoreSelector', function () {
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

  describe('DocumentsOverviewPage nextParamsSelector', function () {
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
