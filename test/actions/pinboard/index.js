import {
  createPinboard,
  updatePinboard,
  fetchPinboard,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
} from 'actions/pinboard';
import * as constants from 'utils/constants';


describe('pinboard actions', function () {
  describe('createPinboard', function () {
    it('should return correct action', function () {
      createPinboard({ officerIds: [], crids: ['abc'], trrIds: [1] }).should.deepEqual({
        types: [
          constants.PINBOARD_CREATE_REQUEST_START,
          constants.PINBOARD_CREATE_REQUEST_SUCCESS,
          constants.PINBOARD_CREATE_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: constants.PINBOARDS_URL,
            method: 'post',
            adapter: null,
            data: {
              'officer_ids': [],
              crids: ['abc'],
              'trr_ids': [1],
            }
          }
        }
      });
    });
  });

  describe('updatePinboard', function () {
    it('should return correct action', function () {
      const pinboard = {
        id: '5cd06f2b',
        title: 'Title',
        officerIds: ['1'],
        crids: [],
        trrIds: ['1'],
      };
      updatePinboard(pinboard).should.deepEqual({
        types: [
          constants.PINBOARD_UPDATE_REQUEST_START,
          constants.PINBOARD_UPDATE_REQUEST_SUCCESS,
          constants.PINBOARD_UPDATE_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}5cd06f2b/`,
            method: 'put',
            adapter: null,
            data: {
              title: 'Title',
              'officer_ids': ['1'],
              crids: [],
              'trr_ids': ['1'],
            }
          }
        }
      });
    });
  });

  describe('fetchPinboard', function () {
    it('shoud return correct action', function () {
      fetchPinboard('5cd06f2b').should.deepEqual({
        types: [
          constants.PINBOARD_FETCH_REQUEST_START,
          constants.PINBOARD_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}5cd06f2b/`,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          }
        }
      });
    });
  });

  describe('fetchPinboardComplaints', function () {
    it('should return correct action', function () {
      fetchPinboardComplaints('5cd06f2b').should.deepEqual({
        types: [
          constants.PINBOARD_COMPLAINTS_FETCH_REQUEST_START,
          constants.PINBOARD_COMPLAINTS_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_COMPLAINTS_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}5cd06f2b/complaints/`,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          }
        }
      });
    });
  });

  describe('fetchPinboardOfficers', function () {
    it('should return correct action', function () {
      fetchPinboardOfficers('5cd06f2b').should.deepEqual({
        types: [
          constants.PINBOARD_OFFICERS_FETCH_REQUEST_START,
          constants.PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_OFFICERS_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}5cd06f2b/officers/`,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          }
        }
      });
    });
  });

  describe('fetchPinboardTRRs', function () {
    it('should return correct action', function () {
      fetchPinboardTRRs('5cd06f2b').should.deepEqual({
        types: [
          constants.PINBOARD_TRRS_FETCH_REQUEST_START,
          constants.PINBOARD_TRRS_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_TRRS_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}5cd06f2b/trrs/`,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          }
        }
      });
    });
  });
});
