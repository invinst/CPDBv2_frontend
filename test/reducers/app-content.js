import should from 'should';

import appContentReducer from 'reducers/app-content';


describe('appContentReducer', function () {
  it('should return initial state', function () {
    should.not.exists(appContentReducer(undefined, {}));
  });

  it('should return correct path', function () {
    appContentReducer('/', {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/some/path/'
      }
    }).should.eql('/some/path/');
  });
});
