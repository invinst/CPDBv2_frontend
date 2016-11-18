import should from 'should';

import extractQuery from 'utils/extract-query';


describe('extractQuery', function () {
  it('should return null if url does not have search string', function () {
    should.not.exists(extractQuery(null));
    should.not.exists(extractQuery('http://abc.com'));
    should.not.exists(extractQuery('http://abc.com?q=c'));
  });

  it('should return search string', function () {
    extractQuery('http://abc.com?search=edf').should.eql('edf');
  });
});
