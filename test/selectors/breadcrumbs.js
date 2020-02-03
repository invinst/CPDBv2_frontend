import { getBreadcrumbItems, breadcrumbTextSelector } from 'selectors/breadcrumbs';

describe('breadcrumbs selectors', function () {
  describe('getBreadcrumbItems()', function () {
    it('should return breadcrumb', function () {
      getBreadcrumbItems({
        breadcrumb: {
          breadcrumbItems: ['url1', 'url2'],
        },
      }).should.eql(['url1', 'url2']);
    });
  });

  describe('breadcrumbTextSelector()', function () {
    it('should return breadcrumb text given url', function () {
      breadcrumbTextSelector(
        {
          breadcrumb: {
            breadcrumbsMapping: {
              '/complaint/345/': 'CR 345',
            },
          },
        },
        {
          url: '/complaint/345',
        }
      ).should.eql('CR 345');
    });

    it('should trip url of unnecessary parts before look up', function () {
      breadcrumbTextSelector(
        {
          breadcrumb: {
            breadcrumbsMapping: {
              '/officer/1234/': 'Ronald Hernandez',
            },
          },
        },
        {
          url: '/edit/officer/1234/ronald-hernandez/',
        }
      ).should.eql('Ronald Hernandez');
    });
  });
});
