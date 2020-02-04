import { getBreadcrumbItems, breadcrumbItemsSelector } from 'selectors/breadcrumbs';

describe('breadcrumbs selectors', function () {
  describe('getBreadcrumbItems', function () {
    it('should return breadcrumb items', function () {
      getBreadcrumbItems({
        breadcrumb: {
          breadcrumbItems: ['url1', 'url2'],
        },
      }).should.eql(['url1', 'url2']);
    });
  });

  describe('breadcrumbTextSelector', function () {
    it('should return breadcrumb text given url', function () {
      const state = {
        breadcrumb: {
          breadcrumbItems: [
            '/search/',
            '/complaint/345/',
            '/edit/officer/1234/ronald-hernandez/',
            '/no-mapping-path/',
            '/documents/',
            '/documents/crid/1083690/',
          ],
          breadcrumbsMapping: {
            '/complaint/345/': 'CR 345',
            '/officer/1234/': 'Ronald Hernandez',
            '/documents/crid/1083690/': '#1083690 document deduplicator',
          },
        },
      };
      const expectedBreadcrumbItems = [
        { path: '/search/', text: 'Search', isCurrent: false },
        { path: '/complaint/345/', text: 'CR 345', isCurrent: false },
        { path: '/edit/officer/1234/ronald-hernandez/', text: 'Ronald Hernandez', isCurrent: false },
        { path: '/documents/', text: 'Documents Overview', isCurrent: false },
        { path: '/documents/crid/1083690/', text: '#1083690 document deduplicator', isCurrent: true },
      ];
      breadcrumbItemsSelector(state).should.eql(expectedBreadcrumbItems);
    });
  });
});
