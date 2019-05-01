import should from 'should';

import officerItemsReducer from 'reducers/pinboard-page/officer-items';
import * as constants from 'utils/constants';


describe('Pinboard officerItemsReducer', function () {
  it('should have initial state', function () {
    should(officerItemsReducer(undefined, {})).eql([]);
  });

  it('should handle PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS', function () {
    officerItemsReducer(
      [{ id: 1 }],
      {
        type: constants.PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS,
        payload: [
          { id: 2 }, { id: 3 },
        ]
      }
    ).should.deepEqual([{ id: 2 }, { id: 3 }]);
  });
});
