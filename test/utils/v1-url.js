import { dataToolSearchUrl, neighborhoodUrl } from 'utils/v1-url';


describe('dataToolSearchUrl', function () {
  it('should return v1 data tool search url', function () {
    dataToolSearchUrl('term').should.equal('http://cpdb.lvh.me/s/term');
  });
});

describe('neighborhoodUrl', function () {
  it('should return v1 data tool search url', function () {
    neighborhoodUrl('Hyde Park')
      .should.equal('http://cpdb.lvh.me/url-mediator/session-builder?neighborhood=Hyde%20Park');
  });
});
