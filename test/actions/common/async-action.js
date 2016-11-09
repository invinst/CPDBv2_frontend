import { get, post, patch, authenticatedPost, authenticatedPatch } from 'actions/common/async-action';


describe('async-action', function () {
  describe('get', function () {
    it('should return the right action', function () {
      const url = '/url';
      const types = ['a', 'b', 'c'];

      get(url, types)().should.eql({
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

  describe('post', function () {
    it('should return the right action', function () {
      const url = '/url';
      const types = ['a', 'b', 'c'];
      const data = { data: 'data' };

      post(url, types)(data).should.eql({
        types,
        payload: {
          request: {
            url,
            method: 'POST',
            data,
            adapter: undefined
          }
        }
      });
    });
  });

  describe('authenticatedPost', function () {
    it('should return the right action', function () {
      const url = '/url';
      const types = ['a', 'b', 'c'];
      const data = { data: 'data' };

      authenticatedPost(url, types)(data).should.eql({
        types,
        payload: {
          request: {
            url,
            method: 'POST',
            data,
            adapter: undefined,
            headers: {
              Authorization: null
            }
          }
        }
      });
    });
  });

  describe('patch', function () {
    it('should return the right action', function () {
      const url = '/url';
      const types = ['a', 'b', 'c'];
      const data = { data: 'data' };

      patch(url, types)(data).should.eql({
        types,
        payload: {
          request: {
            url,
            method: 'PATCH',
            data,
            adapter: undefined
          }
        }
      });
    });
  });

  describe('authenticatedPatch', function () {
    it('should return the right action', function () {
      const url = '/url';
      const types = ['a', 'b', 'c'];
      const data = { data: 'data' };

      authenticatedPatch(url, types)(data).should.eql({
        types,
        payload: {
          request: {
            url,
            method: 'PATCH',
            data,
            adapter: undefined,
            headers: {
              Authorization: null
            }
          }
        }
      });
    });
  });
});
