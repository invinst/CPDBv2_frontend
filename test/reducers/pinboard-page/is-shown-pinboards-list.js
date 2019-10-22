import should from 'should';

import isShownPinboardsListReducer from 'reducers/pinboard-page/is-shown-pinboards-list';
import * as constants from 'utils/constants';


describe('isShownPinboardsListReducer', function () {
  it('should have initial state', function () {
    should(isShownPinboardsListReducer(undefined, {})).be.false();
  });
  it('should handle HIDE_SHOW_PINBOARDS_LIST', function () {
    isShownPinboardsListReducer(
      false,
      {
        type: constants.HIDE_SHOW_PINBOARDS_LIST,
        payload: true,
      },
    ).should.be.true();
  });
});
