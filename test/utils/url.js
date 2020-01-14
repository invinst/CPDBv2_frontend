import { getDomainName, getPageRoot, editPath } from 'utils/url';

describe('getDomainName', function () {
  it('should return domain name', function () {
    getDomainName(
      'https://www.chicagocopa.org/wp-content/uploads/2018/05/1087699.SRI_.Final-Redacted-by-DV.pdf'
    ).should.equal('chicagocopa.org');
    getDomainName(
      'https://assets.documentcloud.org/documents/3252454/CRID-289965-CR.pdf'
    ).should.equal('documentcloud.org');
  });
});

describe('getPageRoot', function () {
  it('should return landing if url is /', function () {
    getPageRoot('/').should.equal('landing');
  });

  it('should return first section', function () {
    getPageRoot('/search/').should.equal('search');
    getPageRoot('/pinboard/abc123/').should.equal('pinboard');
    getPageRoot('/officer/123/').should.equal('officer');
  });
});


describe('editPath', function () {
  it('should return correct path', function () {
    editPath('/search').should.eql('/(edit)?/search');
  });
});
