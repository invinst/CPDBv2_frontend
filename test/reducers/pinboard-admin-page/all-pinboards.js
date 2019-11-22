import allPinboards from 'reducers/pinboard-admin-page/all-pinboards';
import {
  ALL_PINBOARD_REQUEST_START,
  ALL_PINBOARD_REQUEST_SUCCESS,
  ALL_PINBOARD_REQUEST_FAILURE,
} from 'utils/constants';


const defaultState = { requesting: false, items: [], count: 0, pagination: { next: null, previous: null } };

describe('allPinboards reducer', function () {
  it('should have initial state', function () {
    allPinboards(undefined, {}).should.eql(defaultState);
  });

  it('should handle ALL_PINBOARD_REQUEST_START', function () {
    allPinboards(defaultState, {
      type: ALL_PINBOARD_REQUEST_START,
    }).should.eql({
      requesting: true,
      items: [],
      count: 0,
      pagination: {
        next: null,
        previous: null,
      },
    });
  });

  it('should handle ALL_PINBOARD_REQUEST_SUCCESS', function () {
    const pinboards = [
      {
        'id': '197dcdc7',
        'title': '',
        'description': '',
        'created_at': '2019-10-25',
        'officers_count': 7,
        'allegations_count': 7,
        'trrs_count': 0,
      },
      {
        'id': '361ee7cc',
        'title': '',
        'description': '',
        'created_at': '2019-10-25',
        'officers_count': 1,
        'allegations_count': 0,
        'trrs_count': 0,
      },
      {
        'id': 'c08762fa',
        'title': '',
        'description': '',
        'created_at': '2019-10-25',
        'officers_count': 4,
        'allegations_count': 4,
        'trrs_count': 0,
      },
    ];

    allPinboards(defaultState, {
      type: ALL_PINBOARD_REQUEST_SUCCESS,
      payload: {
        count: 1106,
        next: '/pinboards/all/?limit=20&offset=20',
        previous: null,
        results: pinboards,
      },
    }).should.eql({
      requesting: false,
      items: pinboards,
      count: 1106,
      pagination: {
        next: '/pinboards/all/?limit=20&offset=20',
        previous: null,
      },
    });
  });

  it('should handle ALL_PINBOARD_REQUEST_SUCCESS with existing pinboards', function () {
    const existingPinboards = [
      {
        'id': '197dcdc7',
        'title': '',
        'description': '',
        'created_at': '2019-10-25',
        'officers_count': 7,
        'allegations_count': 7,
        'trrs_count': 0,
      },
      {
        'id': '361ee7cc',
        'title': '',
        'description': '',
        'created_at': '2019-10-25',
        'officers_count': 1,
        'allegations_count': 0,
        'trrs_count': 0,
      },
      {
        'id': 'c08762fa',
        'title': '',
        'description': '',
        'created_at': '2019-10-25',
        'officers_count': 4,
        'allegations_count': 4,
        'trrs_count': 0,
      },
    ];

    const newPinboards = [
      {
        'id': 'dbba9e8a',
        'title': '',
        'description': '',
        'created_at': '2019-10-21',
        'officers_count': 4,
        'allegations_count': 4,
        'trrs_count': 0,
      },
      {
        'id': 'bb06b63f',
        'title': '',
        'description': '',
        'created_at': '2019-10-21',
        'officers_count': 4,
        'allegations_count': 4,
        'trrs_count': 0,
      },
      {
        'id': '716b9c2e',
        'title': '',
        'description': '',
        'created_at': '2019-10-21',
        'officers_count': 4,
        'allegations_count': 4,
        'trrs_count': 0,
      },
    ];

    const currentState = {
      requesting: false,
      items: existingPinboards,
      count: 1106,
      pagination: {
        next: '/pinboards/all/?limit=20&offset=20',
        previous: null,
      },
    };

    allPinboards(currentState, {
      type: ALL_PINBOARD_REQUEST_SUCCESS,
      payload: {
        next: '/pinboards/all/?limit=20&offset=40',
        previous: '/pinboards/all/?limit=20',
        count: 1106,
        results: newPinboards,
      },
    }).should.eql({
      requesting: false,
      items: existingPinboards.concat(newPinboards),
      count: 1106,
      pagination: {
        next: '/pinboards/all/?limit=20&offset=40',
        previous: '/pinboards/all/?limit=20',
      },
    });
  });

  it('should handle ALL_PINBOARD_REQUEST_FAILURE', function () {
    const existingPinboards = [
      {
        'id': '197dcdc7',
        'title': '',
        'description': '',
        'created_at': '2019-10-25',
        'officers_count': 7,
        'allegations_count': 7,
        'trrs_count': 0,
      },
      {
        'id': '361ee7cc',
        'title': '',
        'description': '',
        'created_at': '2019-10-25',
        'officers_count': 1,
        'allegations_count': 0,
        'trrs_count': 0,
      },
      {
        'id': 'c08762fa',
        'title': '',
        'description': '',
        'created_at': '2019-10-25',
        'officers_count': 4,
        'allegations_count': 4,
        'trrs_count': 0,
      },
    ];

    const currentState = {
      items: existingPinboards,
      count: 1106,
      pagination: {
        next: '/pinboards/66ef1560/relevant-documents/?limit=20&offset=40',
        previous: '/pinboards/66ef1560/relevant-documents/?',
      },
    };

    allPinboards(currentState, {
      type: ALL_PINBOARD_REQUEST_FAILURE,
      payload: {},
    }).should.eql({
      requesting: false,
      items: existingPinboards,
      count: 1106,
      pagination: { next: null, previous: null },
    });
  });
});
