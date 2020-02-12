import { spy } from 'sinon';

import { countRequests } from 'utils/axios-mock-client';


describe('axios mock client', function () {
  describe('countRequests', function () {
    it('should count the request url', function () {
      const func = spy();
      const onReply = countRequests(func);
      const config = { url: 'http://foo.com/api/v2/bar/' };
      onReply(config);
      func.calledWith(config).should.be.true;
      window.requestCount(/bar/).should.eql(1);
    });
  });
});
