import should from 'should';

import trrId from 'reducers/trr-page/trr-id';


describe('trr-page trrId reducer', function () {
  it('should return initial state', function () {
    should.not.exist(trrId(undefined, {}));
  });

  it('should handle @@router/LOCATION_CHANGE and return trrId', function () {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/trr/1/'
      }
    };

    trrId('some state', action).should.eql(1);
  });

  it('should handle @@router/LOCATION_CHANGE and return state when pathname is incorrect', function () {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        pathname: '/wrongpath/1/'
      }
    };

    trrId('some state', action).should.eql('some state');
  });
});


