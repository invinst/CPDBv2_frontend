import Cookies from 'js-cookie';
import { stub } from 'sinon';

import {
  get, post, patch, put, authenticatedGet,
  authenticatedPost, authenticatedPatch, authenticatedPut
} from 'actions/common/async-action';


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

  describe('authenticatedGet', function () {
    it('should include Authorization header when apiAccessToken cookie exist', function () {
      const url = '/url';
      const types = ['a', 'b', 'c'];
      const params = { limit: '100' };
      stub(Cookies, 'get').returns('authenticated_token');

      authenticatedGet(url, types)(params).should.eql({
        types,
        payload: {
          request: {
            url,
            params,
            adapter: null,
            headers: {
              Authorization: 'Token authenticated_token'
            }
          }
        }
      });
      Cookies.get.restore();
    });

    it('should not include Authorization header when apiAccessToken cookie is not set', function () {
      const url = '/url';
      const types = ['a', 'b', 'c'];
      const params = { limit: '100' };

      authenticatedGet(url, types)(params).should.eql({
        types,
        payload: {
          request: {
            url,
            params,
            adapter: null,
            headers: {}
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
      stub(Cookies, 'get').returns('authenticated_token');

      authenticatedPost(url, types)(data).should.eql({
        types,
        payload: {
          request: {
            url,
            method: 'post',
            data,
            adapter: null,
            headers: {
              Authorization: 'Token authenticated_token'
            }
          }
        }
      });

      Cookies.get.restore();
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
      stub(Cookies, 'get').returns('authenticated_token');

      authenticatedPatch(url, types)(data).should.eql({
        types,
        payload: {
          request: {
            url,
            method: 'patch',
            data,
            adapter: null,
            headers: {
              Authorization: 'Token authenticated_token'
            }
          }
        }
      });

      Cookies.get.restore();
    });
  });

  describe('put', function () {
    it('should return the right action', function () {
      const url = '/url';
      const types = ['a', 'b', 'c'];
      const data = { data: 'data' };

      put(url, types)(data).should.eql({
        types,
        payload: {
          request: {
            url,
            method: 'put',
            data,
            adapter: null
          }
        }
      });
    });
  });

  describe('authenticatedPut', function () {
    it('should return the right action', function () {
      const url = '/url';
      const types = ['a', 'b', 'c'];
      const data = { data: 'data' };
      stub(Cookies, 'get').returns('authenticated_token');

      authenticatedPut(url, types)(data).should.eql({
        types,
        payload: {
          request: {
            url,
            method: 'put',
            data,
            adapter: null,
            headers: {
              Authorization: 'Token authenticated_token'
            }
          }
        }
      });

      Cookies.get.restore();
    });
  });
});
