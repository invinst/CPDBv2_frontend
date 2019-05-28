import should from 'should';

import crItemsReducer from 'reducers/pinboard-page/cr-items/cr-items';
import * as constants from 'utils/constants';


describe('crItemsReducer', function () {
  it('should have initial state', function () {
    should(crItemsReducer(undefined, {})).eql([]);
  });

  it('should handle PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS', function () {
    crItemsReducer(
      [{ 'crid': '1' }],
      {
        type: constants.PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS,
        payload: [
          { 'crid': '2' }, { 'crid': '3' },
        ]
      }
    ).should.deepEqual([{ 'crid': '2' }, { 'crid': '3' }]);
  });

  it('should handle ADD_ITEM_IN_PINBOARD_PAGE with payload.type is CR', function () {
    crItemsReducer(
      [{ 'crid': '1' }],
      {
        type: constants.ADD_ITEM_IN_PINBOARD_PAGE,
        payload: {
          type: 'CR',
          id: '2',
          incidentDate: 'Apr 4, 2017',
          category: 'Use Of Force',
          point: { 'lon': 1.0, 'lat': 2.0 },
        }
      }
    ).should.deepEqual([{
      'crid': '1'
    }, {
      'crid': '2',
      'incident_date': 'Apr 4, 2017',
      'most_common_category': 'Use Of Force',
      'point': { 'lon': 1.0, 'lat': 2.0 },
    }]);
  });

  it('should handle ADD_ITEM_IN_PINBOARD_PAGE with duplicated crid', function () {
    crItemsReducer(
      [{ 'crid': '1' }],
      {
        type: constants.ADD_ITEM_IN_PINBOARD_PAGE,
        payload: {
          type: 'CR',
          id: '1',
          incidentDate: 'Apr 4, 2017',
          category: 'Use Of Force',
          point: { 'lon': 1.0, 'lat': 2.0 },
        }
      }
    ).should.deepEqual([{ 'crid': '1' }]);
  });

  it('should handle ADD_ITEM_IN_PINBOARD_PAGE and do nothing if type is not CR', function () {
    crItemsReducer(
      [{ 'crid': '1' }],
      {
        type: constants.ADD_ITEM_IN_PINBOARD_PAGE,
        payload: {
          type: 'OFFICER',
          id: '2',
          complaintCount: 3,
          fullName: 'Jerome Finnigan',
          percentile: {},
          rank: 'Officer',
        }
      }
    ).should.deepEqual([{ 'crid': '1' }]);
  });

  it('should handle REMOVE_ITEM_IN_PINBOARD_PAGE with payload.type is CR', function () {
    crItemsReducer(
      [{
        'crid': '1',
      }, {
        'crid': '2',
        'incident_date': 'Apr 4, 2017',
        'most_common_category': 'Use Of Force',
        'point': { 'lon': 1.0, 'lat': 2.0 },
      }, {
        'crid': '3',
      }],
      {
        type: constants.REMOVE_ITEM_IN_PINBOARD_PAGE,
        payload: {
          type: 'CR',
          id: '2',
        }
      }
    ).should.deepEqual([{ 'crid': '1' }, { 'crid': '3' }]);
  });

  it('should handle REMOVE_ITEM_IN_PINBOARD_PAGE with not exist crid', function () {
    crItemsReducer(
      [{
        'crid': '1',
      }, {
        'crid': '2',
        'incident_date': 'Apr 4, 2017',
        'most_common_category': 'Use Of Force',
        'point': { 'lon': 1.0, 'lat': 2.0 },
      }],
      {
        type: constants.REMOVE_ITEM_IN_PINBOARD_PAGE,
        payload: {
          type: 'CR',
          id: '3',
        }
      }
    ).should.deepEqual([{
      'crid': '1',
    }, {
      'crid': '2',
      'incident_date': 'Apr 4, 2017',
      'most_common_category': 'Use Of Force',
      'point': { 'lon': 1.0, 'lat': 2.0 },
    }]);
  });

  it('should handle REMOVE_ITEM_IN_PINBOARD_PAGE and do nothing if type is not CR', function () {
    crItemsReducer(
      [{
        'crid': '1',
      }, {
        'crid': '2',
        'incident_date': 'Apr 4, 2017',
        'most_common_category': 'Use Of Force',
        'point': { 'lon': 1.0, 'lat': 2.0 },
      }],
      {
        type: constants.REMOVE_ITEM_IN_PINBOARD_PAGE,
        payload: {
          type: 'OFFICER',
          id: '2',
        }
      }
    ).should.deepEqual([{
      'crid': '1',
    }, {
      'crid': '2',
      'incident_date': 'Apr 4, 2017',
      'most_common_category': 'Use Of Force',
      'point': { 'lon': 1.0, 'lat': 2.0 },
    }]);
  });

  it('should handle ORDER_PINBOARD', function () {
    crItemsReducer(
      [{
        'crid': '1',
      }, {
        'crid': '2',
        'incident_date': 'Apr 4, 2017',
        'most_common_category': 'Use Of Force',
        'point': { 'lon': 1.0, 'lat': 2.0 },
      }],
      {
        type: constants.ORDER_PINBOARD,
        payload: {
          type: 'CR',
          ids: ['2', '1', '3'],
        }
      }
    ).should.deepEqual([{
      'crid': '2',
      'incident_date': 'Apr 4, 2017',
      'most_common_category': 'Use Of Force',
      'point': { 'lon': 1.0, 'lat': 2.0 },
    }, {
      'crid': '1',
    }]);
  });

  it('should handle ORDER_PINBOARD and do nothing if type is not CR', function () {
    crItemsReducer(
      [{
        'crid': '1',
      }, {
        'crid': '2',
        'incident_date': 'Apr 4, 2017',
        'most_common_category': 'Use Of Force',
        'point': { 'lon': 1.0, 'lat': 2.0 },
      }],
      {
        type: constants.ORDER_PINBOARD,
        payload: {
          type: 'OFFICER',
          ids: ['2', '1'],
        }
      }
    ).should.deepEqual([{
      'crid': '1',
    }, {
      'crid': '2',
      'incident_date': 'Apr 4, 2017',
      'most_common_category': 'Use Of Force',
      'point': { 'lon': 1.0, 'lat': 2.0 },
    }]);
  });
});
