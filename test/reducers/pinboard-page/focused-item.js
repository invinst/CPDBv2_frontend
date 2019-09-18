import focusedItemReducer from 'reducers/pinboard-page/focused-item';
import should from 'should';

import * as constants from 'utils/constants';


describe('focusedItem reducer', function () {
  it('should have initial state', function () {
    should(focusedItemReducer(undefined, {})).be.eql({});
  });

  it('should handle PINBOARD_PAGE_FOCUS_ITEM', function () {
    focusedItemReducer(undefined,
      {
        type: constants.PINBOARD_PAGE_FOCUS_ITEM,
        payload: {
          'id': '123456',
          'type': 'CR',
        },
      }
    ).should.eql({
      'id': '123456',
      'type': 'CR',
    });
  });
});
