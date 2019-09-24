import should from 'should';

import pinboardsReducer from 'reducers/pinboard-page/pinboards';
import * as constants from 'utils/constants';


describe('pinboardsReducer', function () {
  it('should have initial state', function () {
    should(pinboardsReducer(undefined, {})).eql([]);
  });

  it('should handle PINBOARDS_FETCH_REQUEST_SUCCESS', function () {
    const pinboards = [
      {
        'id': 1,
        'title': 'Pinboard Title',
        'created_at': '2019-09-12',
      },
      {
        'id': 2,
        'title': '',
        'created_at': '2019-10-15',
      },
    ];
    pinboardsReducer(
      [],
      {
        type: constants.PINBOARDS_FETCH_REQUEST_SUCCESS,
        payload: pinboards,
      },
    ).should.deepEqual(pinboards);
  });
});
