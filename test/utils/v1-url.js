import { dataToolSearchUrl, communityUrl, categoryUrl } from 'utils/v1-url';


describe('dataToolSearchUrl', function () {
  it('should return v1 data tool search url', function () {
    dataToolSearchUrl('term').should.equal('http://cpdb.lvh.me/s/term');
  });
});

describe('communityUrl', function () {
  it('should return v1 data tool search url', function () {
    communityUrl('Hyde Park')
      .should.equal('http://cpdb.lvh.me/url-mediator/session-builder?community=Hyde%20Park');
  });
});

describe('categoryUrl', function () {
  it('should return v1 data tool search url', function () {
    categoryUrl('Use Of Force')
      .should.equal('http://cpdb.lvh.me/url-mediator/session-builder?cat__category=Use%20Of%20Force');
  });
});
