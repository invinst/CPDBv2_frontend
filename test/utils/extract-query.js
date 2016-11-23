import should from 'should';

import extractQuery from 'utils/extract-query';


describe('extractQuery', function () {
  it('should return null if url does not have search string', function () {
    should.not.exists(extractQuery(null));
    should.not.exists(extractQuery('http://abc.com'));
  });

  it('should return query params', function () {
    extractQuery('http://abc.com?search=edf').should.eql({ search: 'edf' });
  });
});
