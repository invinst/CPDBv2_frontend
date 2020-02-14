import should from 'should';
import { LOCATION_CHANGE } from 'connected-react-router';

import trrId from 'reducers/trr-page/trr-id';


describe('trr-page trrId reducer', function () {
  it('should return initial state', function () {
    should.not.exist(trrId(undefined, {}));
  });

  it('should handle LOCATION_CHANGE and return trrId', function () {
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        location: { pathname: '/trr/1/' },
      },
    };

    trrId('some state', action).should.eql(1);
  });

  it('should handle LOCATION_CHANGE and return state when pathname is incorrect', function () {
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        location: { pathname: '/wrongpath/1/' },
      },
    };

    trrId('some state', action).should.eql('some state');
  });
});

