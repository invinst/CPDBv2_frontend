import should from 'should';
import { LOCATION_CHANGE } from 'connected-react-router';

import crid from 'reducers/cr-page/crid';


describe('crid reducer', function () {
  it('should return initial state', function () {
    should.not.exist(crid(undefined, {}));
  });

  it('should handle LOCATION_CHANGE and return crid', function () {
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        location: { pathname: '/complaint/1/2/' },
      },
    };

    crid('some state', action).should.eql('1');
  });

  it('should handle LOCATION_CHANGE and return state when pathname is incorrect', function () {
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        location: { pathname: '/wrongpath/1/2/' },
      },
    };

    crid('some state', action).should.eql('some state');
  });
});

