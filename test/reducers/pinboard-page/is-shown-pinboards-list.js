import { HIDE_SHOW_PINBOARDS_LIST } from 'utils/constants';
import isShownPinboardsList from 'reducers/pinboard-page/is-shown-pinboards-list';


describe('isShownPinboardsList reducer', function () {
  it('should return initial state', function () {
    isShownPinboardsList(undefined, {}).should.be.false();
  });

  it('should handle HIDE_SHOW_PINBOARDS_LIST', function () {
    isShownPinboardsList(false, { type: HIDE_SHOW_PINBOARDS_LIST, payload: true }).should.be.true();
    isShownPinboardsList(true, { type: HIDE_SHOW_PINBOARDS_LIST, payload: false }).should.be.false();
  });
});
