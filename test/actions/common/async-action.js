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
            adapter: null
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
            method: 'post',
            data,
            adapter: null
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
            method: 'post',
            data,
            adapter: null,
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
            method: 'patch',
            data,
            adapter: null
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
            method: 'patch',
            data,
            adapter: null,
            headers: {
              Authorization: null
            }
          }
        }
      });
    });
  });
});
