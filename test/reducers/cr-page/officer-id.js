import should from 'should';

import officerId from 'reducers/cr-page/officer-id';


describe('cr-page officerId reducer', function () {
  it('should return initial state', function () {
    should.not.exist(officerId(undefined, {}));
  });

  it('should handle @@router/LOCATION_CHANGE and return officerId', function () {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/complaint/1/2/'
      }
    };

    officerId('some state', action).should.eql(2);
  });

  it('should handle @@router/LOCATION_CHANGE and return state when pathname is incorrect', function () {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/wrongpath/1/2/'
      }
    };

    officerId('some state', action).should.eql('some state');
  });
});


