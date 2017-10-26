import should from 'should';

import appContentReducer from 'reducers/app-content';


describe('appContentReducer', function () {
  it('should return initial state', function () {
    should.not.exists(appContentReducer(undefined, {}));
  });

  it('should return old path if possible when handle LOCATION_CHANGE', function () {
    appContentReducer('/', {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/reporting/13/'
      }
    }).should.eql('/');

    appContentReducer('/', {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/faq/13/'
      }
    }).should.eql('/');

    appContentReducer('/edit/', {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/edit/reporting/13/'
      }
    }).should.eql('/edit/');

    appContentReducer('/edit/', {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/edit/faq/13/'
      }
    }).should.eql('/edit/');
  });

  it('should return default path if there\'s no previous state when handle LOCATION_CHANGE', function () {
    appContentReducer(null, {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/reporting/13/'
      }
    }).should.eql('/reporting/');

    appContentReducer(null, {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/faq/13/'
      }
    }).should.eql('/faq/');
  });

  it('should return the same pathname if path is not bottomsheet when handle LOCATION_CHANGE', function () {
    appContentReducer(null, {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/faq/'
      }
    }).should.eql('/faq/');
  });
});
