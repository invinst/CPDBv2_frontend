import { dataToolSearchUrl } from 'utils/v1-url';


describe('dataToolSearchUrl', function () {
  it('should return v1 data tool search url', function () {
    dataToolSearchUrl('term').should.equal('http://cpdb.lvh.me/s/term');
  });
});
