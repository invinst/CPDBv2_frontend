import Cookies from 'js-cookie';
import sinon from 'sinon';

import {
  get, post, patch, put, authenticatedGet, withoutCredentialsGet,
  authenticatedPost, authenticatedPatch, authenticatedPut,
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
            adapter: null,
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('authenticatedGet', function () {
    it('should include Authorization header when apiAccessToken cookie exist', function () {
      const url = '/url';
      const types = ['a', 'b', 'c'];
      const params = { limit: '100' };
      sinon.stub(Cookies, 'get').returns('authenticated_token');

      authenticatedGet(url, types)(params).should.eql({
        types,
        payload: {
          request: {
            url,
            params,
            adapter: null,
            cancelToken: undefined,
            headers: {
              Authorization: 'Token authenticated_token',
            },
          },
        },
      });
    });

    it('should not include Authorization header when apiAccessToken cookie is not set', function () {
      const url = '/url';
      const types = ['a', 'b', 'c'];
      const params = { limit: '100' };
      sinon.stub(Cookies, 'get').returns(null);

      authenticatedGet(url, types)(params).should.eql({
        types,
        payload: {
          request: {
            url,
            params,
            adapter: null,
            cancelToken: undefined,
            headers: {},
          },
        },
      });
    });
  });

  describe('withoutCredentialsGet', function () {
    it('should return the right action', function () {
      const url = '/url';
      const types = ['a', 'b', 'c'];

      withoutCredentialsGet(url, types)().should.eql({
        types,
        payload: {
          request: {
            url,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
            withCredentials: false,
          },
        },
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
            adapter: null,
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('authenticatedPost', function () {
    it('should return the right action', function () {
      const url = '/url';
      const types = ['a', 'b', 'c'];
      const data = { data: 'data' };
      sinon.stub(Cookies, 'get').returns('authenticated_token');

      authenticatedPost(url, types)(data).should.eql({
        types,
        payload: {
          request: {
            url,
            method: 'post',
            data,
            adapter: null,
            headers: {
              Authorization: 'Token authenticated_token',
            },
            cancelToken: undefined,
          },
        },
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
            adapter: null,
          },
        },
      });
    });
  });

  describe('authenticatedPatch', function () {
    it('should return the right action', function () {
      const url = '/url';
      const types = ['a', 'b', 'c'];
      const data = { data: 'data' };
      sinon.stub(Cookies, 'get').returns('authenticated_token');

      authenticatedPatch(url, types)(data).should.eql({
        types,
        payload: {
          request: {
            url,
            method: 'patch',
            data,
            adapter: null,
            headers: {
              Authorization: 'Token authenticated_token',
            },
          },
        },
      });
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
            adapter: null,
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('authenticatedPut', function () {
    it('should return the right action', function () {
      const url = '/url';
      const types = ['a', 'b', 'c'];
      const data = { data: 'data' };
      sinon.stub(Cookies, 'get').returns('authenticated_token');

      authenticatedPut(url, types)(data).should.eql({
        types,
        payload: {
          request: {
            url,
            method: 'put',
            data,
            adapter: null,
            headers: {
              Authorization: 'Token authenticated_token',
            },
            cancelToken: undefined,
          },
        },
      });
    });
  });
});
