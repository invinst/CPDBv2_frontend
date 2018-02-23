import pages from 'reducers/cms/pages';
import * as constants from 'utils/constants';


describe('pages reducer', function () {
  it('should have initial state', function () {
    pages(undefined, {}).should.deepEqual({});
  });

  it('should handle CMS_PAGE_REQUEST_SUCCESS', function () {
    pages(
      {
        'another_page': 'page content'
      },
      {
        type: constants.CMS_PAGE_REQUEST_SUCCESS,
        payload: {
          fields: [
            {
              name: 'navbar_title',
              type: 'rich_text',
              value: 'my rich text'
            }
          ],
          meta: {
            order: 1
          }
        },
        request: {
          url: 'http://localhost/api/v2/cms-pages/my_slug_page/'
        }
      }
    ).should.deepEqual({
      'another_page': 'page content',
      'my_slug_page': {
        fields: {
          'navbar_title': {
            name: 'navbar_title',
            type: 'rich_text',
            value: 'my rich text'
          }
        },
        meta: {
          order: 1
        }
      }
    });
  });

  it('should handle UPDATE_CMS_PAGE_REQUEST_SUCCESS', function () {
    pages(
      {
        'another_page': 'page content'
      },
      {
        type: constants.UPDATE_CMS_PAGE_REQUEST_SUCCESS,
        payload: {
          fields: [
            {
              name: 'navbar_title',
              type: 'rich_text',
              value: 'my rich text'
            }
          ],
          meta: {
            order: 1
          }
        },
        request: {
          url: 'http://localhost/api/v2/cms-pages/my_slug_page/'
        }
      }
    ).should.deepEqual({
      'another_page': 'page content',
      'my_slug_page': {
        fields: {
          'navbar_title': {
            name: 'navbar_title',
            type: 'rich_text',
            value: 'my rich text'
          }
        },
        meta: {
          order: 1
        }
      }
    });
  });
});
