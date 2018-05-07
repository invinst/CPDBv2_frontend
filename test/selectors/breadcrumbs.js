import { getBreadcrumb, breadcrumbTextSelector } from 'selectors/breadcrumbs';

describe('breadcrumbs selectors', function () {
  describe('getBreadcrumb()', function () {
    it('should return breadcrumb', function () {
      getBreadcrumb({ breadcrumb: 'abc' }).should.eql('abc');
    });
  });

  describe('breadcrumbTextSelector()', function () {
    it('should return breadcrumb text given url', function () {
      breadcrumbTextSelector(
        {
          breadcrumbsMapping: {
            '/complaint/345/': 'CR 345'
          }
        },
        {
          url: '/complaint/345'
        }
      ).should.eql('CR 345');
    });

    it('should trip url of unnecessary parts before look up', function () {
      breadcrumbTextSelector(
        {
          breadcrumbsMapping: {
            '/officer/1234/': 'Ronald Hernandez'
          }
        },
        {
          url: '/edit/officer/1234/social-graph/'
        }
      ).should.eql('Ronald Hernandez');
    });
  });
});
