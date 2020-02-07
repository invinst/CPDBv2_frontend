import should from 'should';
import { LOCATION_CHANGE } from 'connected-react-router';

import ActiveTab from 'reducers/officer-page/active-tab';


describe('ActiveTab reducer', function () {
  it('should return initial state', function () {
    should.not.exist(ActiveTab(undefined, {}));
  });

  it('should handle LOCATION_CHANGE and return active tab', function () {
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        location: { pathname: '/officer/1/timeline/' },
      },
    };

    ActiveTab('some state', action).should.eql('timeline');
  });

  it('should handle LOCATION_CHANGE and return state when pathname is incorrect', function () {
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        location: { pathname: '/wrongpath/1/2/' },
      },
    };

    ActiveTab('some state', action).should.eql('some state');
  });

});
