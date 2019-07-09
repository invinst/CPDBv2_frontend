import should from 'should';

import officerItemsReducer from 'reducers/pinboard-page/officer-items/items';
import * as constants from 'utils/constants';


describe('Pinboard officerItemsReducer', function () {
  it('should have initial state', function () {
    should(officerItemsReducer(undefined, {})).eql([]);
  });

  it('should handle PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS', function () {
    officerItemsReducer(
      [{ 'id': 1 }],
      {
        type: constants.PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS,
        payload: [
          { 'id': 2 }, { 'id': 3 },
        ]
      }
    ).should.deepEqual([{ 'id': 2 }, { 'id': 3 }]);
  });

  it('should handle ADD_ITEM_IN_PINBOARD_PAGE with payload.type is OFFICER', function () {
    officerItemsReducer(
      [{ 'id': 1 }],
      {
        type: constants.ADD_ITEM_IN_PINBOARD_PAGE,
        payload: {
          type: 'OFFICER',
          id: '2',
          complaintCount: 3,
          fullName: 'Jerome Finnigan',
          percentile: null,
          rank: 'Officer',
        }
      }
    ).should.deepEqual([{
      'id': 1
    }, {
      'id': 2,
      'full_name': 'Jerome Finnigan',
      'rank': 'Officer',
      'complaint_count': 3,
      'percentile': null,
    }]);
  });

  it('should handle ADD_ITEM_IN_PINBOARD_PAGE with percentile', function () {
    officerItemsReducer(
      [{ 'id': 1 }],
      {
        type: constants.ADD_ITEM_IN_PINBOARD_PAGE,
        payload: {
          type: 'OFFICER',
          id: '2',
          complaintCount: 3,
          fullName: 'Jerome Finnigan',
          percentile: {
            year: undefined,
            items: [
              { axis: 'Use of Force Reports', value: 99.9 },
              { axis: 'Officer Allegations', value: 11.1 },
              { axis: 'Civilian Allegations', value: 22.2 }
            ],
            visualTokenBackground: '#e85050',
            textColor: '#231F20',
          },
          rank: 'Officer',
        }
      }
    ).should.deepEqual([{
      'id': 1
    }, {
      'id': 2,
      'full_name': 'Jerome Finnigan',
      'rank': 'Officer',
      'complaint_count': 3,
      'percentile': {
        'percentile_trr': 99.9,
        'percentile_allegation_internal': 11.1,
        'percentile_allegation_civilian': 22.2,
      },
    }]);
  });

  it('should handle ADD_ITEM_IN_PINBOARD_PAGE with duplicated officer id', function () {
    officerItemsReducer(
      [{ 'id': 1 }],
      {
        type: constants.ADD_ITEM_IN_PINBOARD_PAGE,
        payload: {
          type: 'OFFICER',
          id: '1',
          complaintCount: 3,
          fullName: 'Jerome Finnigan',
          percentile: null,
          rank: 'Officer',
        }
      }
    ).should.deepEqual([{ 'id': 1 }]);
  });

  it('should handle ADD_ITEM_IN_PINBOARD_PAGE and do nothing if type is not OFFICER', function () {
    officerItemsReducer(
      [{ 'id': 1 }],
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
    ).should.deepEqual([{ 'id': 1 }]);
  });

  it('should handle REMOVE_ITEM_IN_PINBOARD_PAGE with payload.type is OFFICER', function () {
    officerItemsReducer(
      [{
        'id': 1,
      }, {
        'id': 2,
        'full_name': 'Jerome Finnigan',
        'rank': 'Officer',
        'complaint_count': 3,
        'percentile': null,
      }, {
        'id': 3,
      }],
      {
        type: constants.REMOVE_ITEM_IN_PINBOARD_PAGE,
        payload: {
          type: 'OFFICER',
          id: '2',
        }
      }
    ).should.deepEqual([{ 'id': 1 }, { 'id': 3 }]);
  });

  it('should handle REMOVE_ITEM_IN_PINBOARD_PAGE with not exist officer id', function () {
    officerItemsReducer(
      [{
        'id': 1,
      }, {
        'id': 2,
        'full_name': 'Jerome Finnigan',
        'rank': 'Officer',
        'complaint_count': 3,
        'percentile': null,
      }],
      {
        type: constants.REMOVE_ITEM_IN_PINBOARD_PAGE,
        payload: {
          type: 'OFFICER',
          id: '3',
        }
      }
    ).should.deepEqual([{
      'id': 1,
    }, {
      'id': 2,
      'full_name': 'Jerome Finnigan',
      'rank': 'Officer',
      'complaint_count': 3,
      'percentile': null,
    }]);
  });

  it('should handle REMOVE_ITEM_IN_PINBOARD_PAGE and do nothing if type is not OFFICER', function () {
    officerItemsReducer(
      [{
        'id': 1,
      }, {
        'id': 2,
        'full_name': 'Jerome Finnigan',
        'rank': 'Officer',
        'complaint_count': 3,
        'percentile': null,
      }],
      {
        type: constants.REMOVE_ITEM_IN_PINBOARD_PAGE,
        payload: {
          type: 'CR',
          id: '2',
        }
      }
    ).should.deepEqual([{
      'id': 1,
    }, {
      'id': 2,
      'full_name': 'Jerome Finnigan',
      'rank': 'Officer',
      'complaint_count': 3,
      'percentile': null,
    }]);
  });

  it('should handle ORDER_PINBOARD', function () {
    officerItemsReducer(
      [{
        'id': 1,
      }, {
        'id': 2,
        'full_name': 'Jerome Finnigan',
        'rank': 'Officer',
        'complaint_count': 3,
        'percentile': null,
      }],
      {
        type: constants.ORDER_PINBOARD,
        payload: {
          type: 'OFFICER',
          ids: ['2', '1', '3'],
        }
      }
    ).should.deepEqual([{
      'id': 2,
      'full_name': 'Jerome Finnigan',
      'rank': 'Officer',
      'complaint_count': 3,
      'percentile': null,
    }, {
      'id': 1,
    }]);
  });

  it('should handle ORDER_PINBOARD and do nothing if type is not OFFICER', function () {
    officerItemsReducer(
      [{
        'id': 1,
      }, {
        'id': 2,
        'full_name': 'Jerome Finnigan',
        'rank': 'Officer',
        'complaint_count': 3,
        'percentile': null,
      }],
      {
        type: constants.ORDER_PINBOARD,
        payload: {
          type: 'CR',
          ids: ['2', '1'],
        }
      }
    ).should.deepEqual([{
      'id': 1,
    }, {
      'id': 2,
      'full_name': 'Jerome Finnigan',
      'rank': 'Officer',
      'complaint_count': 3,
      'percentile': null,
    }]);
  });
});
