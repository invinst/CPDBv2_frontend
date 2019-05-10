import should from 'should';

import trrItemsReducer from 'reducers/pinboard-page/trr-items';
import * as constants from 'utils/constants';


describe('Pinboard trrItemsReducer', function () {
  it('should have initial state', function () {
    should(trrItemsReducer(undefined, {})).eql([]);
  });

  it('should handle PINBOARD_TRRS_FETCH_REQUEST_SUCCESS', function () {
    trrItemsReducer([
      { 'id': 1 }],
      {
        type: constants.PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
        payload: [
          { 'id': '2' }, { 'id': '3' },
        ]
      }
    ).should.deepEqual([{ 'id': '2' }, { 'id': '3' }]);
  });

  it('should handle REMOVE_ITEM_IN_PINBOARD_PAGE with payload.type is TRR', function () {
    trrItemsReducer(
      [{ 'id': 1 }, { 'id': 2 }, { 'id': 3 }],
      {
        type: constants.REMOVE_ITEM_IN_PINBOARD_PAGE,
        payload: {
          type: 'TRR',
          id: '2',
        }
      }
    ).should.deepEqual([{ 'id': 1 }, { 'id': 3 }]);
  });

  it('should handle REMOVE_ITEM_IN_PINBOARD_PAGE with not exist trr id', function () {
    trrItemsReducer(
      [{ 'id': 1 }, { 'id': 2 }],
      {
        type: constants.REMOVE_ITEM_IN_PINBOARD_PAGE,
        payload: {
          type: 'TRR',
          id: '3',
        }
      }
    ).should.deepEqual([{ 'id': 1 }, { 'id': 2 }]);
  });

  it('should handle REMOVE_ITEM_IN_PINBOARD_PAGE and do nothing if type is not TRR', function () {
    trrItemsReducer(
      [{ 'id': 1 }, { 'id': 2 }],
      {
        type: constants.REMOVE_ITEM_IN_PINBOARD_PAGE,
        payload: {
          type: 'CR',
          id: '2',
        }
      }
    ).should.deepEqual([{ 'id': 1 }, { 'id': 2 }]);
  });

  it('should handle ORDER_PINBOARD', function () {
    trrItemsReducer(
      [{ 'id': 1 }, { 'id': 2 }],
      {
        type: 'ORDER_PINBOARD',
        payload: {
          type: 'TRR',
          ids: ['2', '1', '3'],
        }
      }).should.deepEqual([{ 'id': 2 }, { 'id': 1 }]
    );
  });

  it('should handle ORDER_PINBOARD and do nothing if type is not TRR', function () {
    trrItemsReducer(
      [{ 'id': 1 }, { 'id': 2 }],
      {
        type: constants.ORDER_PINBOARD,
        payload: {
          type: 'CR',
          ids: ['2', '1'],
        }
      }
    ).should.deepEqual([{ 'id': 1 }, { 'id': 2 }]);
  });
});
