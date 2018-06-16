import should from 'should';

import crid from 'reducers/cr-page/crid';


describe('crid reducer', function () {
  it('should return initial state', function () {
    should.not.exist(crid(undefined, {}));
  });

  it('should handle @@router/LOCATION_CHANGE and return crid', function () {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/complaint/1/2/'
      }
    };

    crid('some state', action).should.eql('1');
  });

  it('should handle @@router/LOCATION_CHANGE and return state when pathname is incorrect', function () {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/wrongpath/1/2/'
      }
    };

    crid('some state', action).should.eql('some state');
  });
});


