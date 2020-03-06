import pinboardsMenuSelector from 'reducers/pinboard-page/pinboards-menu';
import { PINBOARDS_MENU_REQUEST_SUCCESS } from 'utils/constants';


describe('pinboardsMenu reducer', function () {
  it('should have initial state', function () {
    pinboardsMenuSelector(undefined, {}).should.be.eql([]);
  });

  it('should handle PINBOARDS_MENU_REQUEST_SUCCESS', function () {
    pinboardsMenuSelector([], {
      type: PINBOARDS_MENU_REQUEST_SUCCESS,
      payload: [{ id: 767 }],
    }).should.be.eql([{ id: 767 }]);
  });
});
