import should from 'should';

import crItemsReducer from 'reducers/pinboard-page/cr-items';
import { PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS } from 'utils/constants';


describe('crItemsReducer', function () {
  it('should have initial state', function () {
    should(crItemsReducer(undefined, {})).eql([]);
  });

  it('should handle PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS', function () {
    crItemsReducer(
      [{ id: 1 }],
      {
        type: PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS,
        payload: [
          { id: 2 }, { id: 3 },
        ]
      }
    ).should.deepEqual([{ id: 2 }, { id: 3 }]);
  });
});
