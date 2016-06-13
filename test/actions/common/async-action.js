import { request } from 'actions/common/async-action';


describe('faqApp actions', function () {
  describe('requestFAQs', function () {
    it('should return the right action', function () {
      const url = '/url';
      const types = ['a', 'b', 'c'];

      request(url, types)().should.eql({
        types,
        payload: {
          request: {
            url,
            params: undefined,
            adapter: undefined
          }
        }
      });
    });
  });
});
