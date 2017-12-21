import { dataToolSearchUrl, communityUrl } from 'utils/v1-url';


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
