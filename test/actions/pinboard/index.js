import { CancelToken } from 'axios';
import { spy, stub } from 'sinon';

import {
  createPinboard,
  createNewPinboard,
  createNewEmptyPinboard,
  duplicatePinboard,
  updatePinboard,
  addItemToPinboardState,
  removeItemFromPinboardState,
  orderPinboardState,
  savePinboard,
  orderPinboard,
  fetchPinboard,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
  fetchPinboardSocialGraph,
  fetchPinboardRelevantDocuments,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  fetchFirstPagePinboardGeographicCrs,
  fetchOtherPagesPinboardGeographicCrs,
  fetchFirstPagePinboardGeographicTrrs,
  fetchOtherPagesPinboardGeographicTrrs,
  removeItemInPinboardPage,
  addItemInPinboardPage,
  fetchLatestRetrievedPinboard,
  updatePinboardFromSource,
} from 'actions/pinboard';
import * as constants from 'utils/constants';


describe('pinboard actions', function () {
  let cancel;

  beforeEach(function () {
    cancel = spy();
    stub(CancelToken, 'source').returns({
      token: 'token',
      cancel,
    });
  });

  describe('removeItemInPinboardPage', function () {
    it('should return correct action', function () {
      removeItemInPinboardPage({
        id: '1234',
        type: 'OFFICER',
      }).should.deepEqual({
        type: constants.REMOVE_ITEM_IN_PINBOARD_PAGE,
        payload: {
          id: '1234',
          type: 'OFFICER',
          isPinned: true,
        },
      });
    });
  });

  describe('addItemInPinboardPage', function () {
    it('should return correct action', function () {
      addItemInPinboardPage({
        id: '1234',
        type: 'OFFICER',
      }).should.deepEqual({
        type: constants.ADD_ITEM_IN_PINBOARD_PAGE,
        payload: {
          id: '1234',
          type: 'OFFICER',
          isPinned: false,
        },
      });
    });
  });

  describe('createPinboard', function () {
    it('should return correct action', function () {
      createPinboard({ title: 'Pinboard title', officerIds: [], crids: ['abc'], trrIds: [1] }).should.deepEqual({
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
              title: 'Pinboard title',
              'officer_ids': [],
              crids: ['abc'],
              'trr_ids': [1],
              'source_pinboard_id': undefined,
            },
            cancelToken: 'token',
          },
        },
      });
    });

    it('should cancel old fetch requests if new request is called', function () {
      createPinboard({ officerIds: [], crids: ['abc'], trrIds: [1] });
      createPinboard({ officerIds: [], crids: ['abc'], trrIds: [1] });
      cancel.called.should.be.true();
    });
  });

  describe('createNewEmptyPinboard', function () {
    it('should return correct action', function () {
      createNewEmptyPinboard().should.deepEqual({
        types: [
          constants.PINBOARD_CREATE_NEW_REQUEST_START,
          constants.PINBOARD_CREATE_NEW_REQUEST_SUCCESS,
          constants.PINBOARD_CREATE_NEW_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: constants.PINBOARDS_URL,
            method: 'post',
            adapter: null,
            data: {
              'officer_ids': [],
              crids: [],
              'trr_ids': [],
              'source_pinboard_id': undefined,
            },
            cancelToken: 'token',
          },
        },
      });
    });

    it('should cancel old fetch requests if new request is called', function () {
      createNewEmptyPinboard();
      createNewEmptyPinboard();
      cancel.called.should.be.true();
    });
  });

  describe('duplicatePinboard', function () {
    it('should return correct action', function () {
      duplicatePinboard('adg234r6').should.deepEqual({
        types: [
          constants.PINBOARD_CREATE_NEW_REQUEST_START,
          constants.PINBOARD_CREATE_NEW_REQUEST_SUCCESS,
          constants.PINBOARD_CREATE_NEW_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: constants.PINBOARDS_URL,
            method: 'post',
            adapter: null,
            data: {
              'officer_ids': undefined,
              crids: undefined,
              'trr_ids': undefined,
              'source_pinboard_id': 'adg234r6',
            },
            cancelToken: 'token',
          },
        },
      });
    });

    it('should cancel old fetch requests if new request is called', function () {
      duplicatePinboard('adg234r6');
      duplicatePinboard('adg234r6');
      cancel.called.should.be.true();
    });
  });

  describe('updatePinboard', function () {
    it('should return correct action', function () {
      const pinboard = {
        id: '5cd06f2b',
        title: 'Title',
        description: 'Description',
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
              description: 'Description',
              'officer_ids': ['1'],
              crids: [],
              'trr_ids': ['1'],
            },
            cancelToken: 'token',
          },
        },
      });
    });

    it('should cancel old fetch requests if new request is called', function () {
      const pinboard = {
        id: '5cd06f2b',
        title: 'Title',
        officerIds: ['1'],
        crids: [],
        trrIds: ['1'],
      };
      updatePinboard(pinboard);
      updatePinboard(pinboard);
      cancel.called.should.be.true();
    });
  });

  describe('addItemToPinboardState', function () {
    it('should return correct action', function () {
      addItemToPinboardState({
        id: '1234',
        type: 'OFFICER',
      }).should.deepEqual({
        type: constants.ADD_ITEM_TO_PINBOARD_STATE,
        payload: {
          id: '1234',
          type: 'OFFICER',
        },
      });
    });
  });

  describe('removeItemFromPinboardState', function () {
    it('should return correct action', function () {
      removeItemFromPinboardState({
        id: '1234',
        type: 'OFFICER',
      }).should.deepEqual({
        type: constants.REMOVE_ITEM_FROM_PINBOARD_STATE,
        payload: {
          id: '1234',
          type: 'OFFICER',
        },
      });
    });
  });

  describe('orderPinboardState', function () {
    it('should return correct action', function () {
      orderPinboardState({
        ids: ['1234', '456'],
        type: 'OFFICER',
      }).should.deepEqual({
        type: constants.ORDER_PINBOARD_STATE,
        payload: {
          ids: ['1234', '456'],
          type: 'OFFICER',
        },
      });
    });
  });

  describe('savePinboard', function () {
    it('should return correct action', function () {
      savePinboard({
        id: 1,
        title: 'Pinboard Title',
        'officer_ids': [12],
        crids: ['abc'],
        'trr_ids': [1],
        description: 'Description',
        isPinboardRestored: false,
      }).should.deepEqual({
        type: constants.SAVE_PINBOARD,
        payload: {
          id: 1,
          title: 'Pinboard Title',
          'officer_ids': [12],
          crids: ['abc'],
          'trr_ids': [1],
          description: 'Description',
          isPinboardRestored: false,
        },
      });
    });
  });

  describe('orderPinboard', function () {
    it('should return correct action', function () {
      orderPinboard({
        ids: ['1234', '456'],
        type: 'OFFICER',
      }).should.deepEqual({
        type: constants.ORDER_PINBOARD,
        payload: {
          ids: ['1234', '456'],
          type: 'OFFICER',
        },
      });
    });
  });

  describe('fetchPinboard', function () {
    it('should return correct action', function () {
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
            cancelToken: 'token',
          },
        },
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
          constants.PINBOARD_COMPLAINTS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}5cd06f2b/complaints/`,
            params: undefined,
            adapter: null,
            cancelToken: 'token',
          },
        },
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
          constants.PINBOARD_OFFICERS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}5cd06f2b/officers/`,
            params: undefined,
            adapter: null,
            cancelToken: 'token',
          },
        },
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
          constants.PINBOARD_TRRS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}5cd06f2b/trrs/`,
            params: undefined,
            adapter: null,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchPinboardSocialGraph', function () {
    it('should return correct action', function () {
      fetchPinboardSocialGraph('268a5e58').should.deepEqual({
        types: [
          constants.PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_START,
          constants.PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE,
          constants.PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: constants.SOCIAL_GRAPH_NETWORK_API_URL,
            params: { 'pinboard_id': '268a5e58' },
            adapter: null,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchFirstPagePinboardGeographicCrs', function () {
    it('should return correct action', function () {
      fetchFirstPagePinboardGeographicCrs({ 'pinboard_id': '268a5e58' }).should.deepEqual({
        types: [
          constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START,
          constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS,
          constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE,
          constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: constants.SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_URL,
            params: { 'pinboard_id': '268a5e58' },
            adapter: null,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchOtherPagesPinboardGeographicCrs', function () {
    it('should return correct action', function () {
      fetchOtherPagesPinboardGeographicCrs({ 'pinboard_id': '268a5e58' }).should.deepEqual({
        types: [
          constants.PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_START,
          constants.PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_FAILURE,
          constants.PINBOARD_GEOGRAPHIC_CRS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: constants.SOCIAL_GRAPH_GEOGRAPHIC_CRS_API_URL,
            params: { 'pinboard_id': '268a5e58' },
            adapter: null,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchFirstPagePinboardGeographicTrrs', function () {
    it('should return correct action', function () {
      fetchFirstPagePinboardGeographicTrrs({ 'pinboard_id': '268a5e58' }).should.deepEqual({
        types: [
          constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START,
          constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS,
          constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE,
          constants.FIRST_PAGE_PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: constants.SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL,
            params: { 'pinboard_id': '268a5e58' },
            adapter: null,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchOtherPagesPinboardGeographicTrrs', function () {
    it('should return correct action', function () {
      fetchOtherPagesPinboardGeographicTrrs({ 'pinboard_id': '268a5e58' }).should.deepEqual({
        types: [
          constants.PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_START,
          constants.PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_FAILURE,
          constants.PINBOARD_GEOGRAPHIC_TRRS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: constants.SOCIAL_GRAPH_GEOGRAPHIC_TRRS_API_URL,
            params: { 'pinboard_id': '268a5e58' },
            adapter: null,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchPinboardRelevantDocuments', function () {
    it('should return correct action', function () {
      fetchPinboardRelevantDocuments('66ef1560').should.deepEqual({
        types: [
          constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_START,
          constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE,
          constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}66ef1560/relevant-documents/?`,
            params: undefined,
            adapter: null,
            cancelToken: 'token',
          },
        },
      });
    });

    it('should return correct action with params', function () {
      fetchPinboardRelevantDocuments(
        '66ef1560',
        { limit: '20', offset: '20' }
      ).should.deepEqual({
        types: [
          constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_START,
          constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE,
          constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}66ef1560/relevant-documents/?limit=20&offset=20`,
            params: undefined,
            adapter: null,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchPinboardRelevantCoaccusals', function () {
    it('should return correct action', function () {
      fetchPinboardRelevantCoaccusals('66ef1560').should.deepEqual({
        types: [
          constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_START,
          constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE,
          constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}66ef1560/relevant-coaccusals/?`,
            params: undefined,
            adapter: null,
            cancelToken: 'token',
          },
        },
      });
    });

    it('should return correct action with params', function () {
      fetchPinboardRelevantCoaccusals(
        '66ef1560',
        { limit: '20', offset: '20' }
      ).should.deepEqual({
        types: [
          constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_START,
          constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE,
          constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}66ef1560/relevant-coaccusals/?limit=20&offset=20`,
            params: undefined,
            adapter: null,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchPinboardRelevantComplaints', function () {
    it('should return correct action', function () {
      fetchPinboardRelevantComplaints('66ef1560').should.deepEqual({
        types: [
          constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_START,
          constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_FAILURE,
          constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}66ef1560/relevant-complaints/?`,
            params: undefined,
            adapter: null,
            cancelToken: 'token',
          },
        },
      });
    });

    it('should return correct action with params', function () {
      fetchPinboardRelevantComplaints(
        '66ef1560',
        { limit: '20', offset: '20' }
      ).should.deepEqual({
        types: [
          constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_START,
          constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_FAILURE,
          constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_CANCELLED,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}66ef1560/relevant-complaints/?limit=20&offset=20`,
            params: undefined,
            adapter: null,
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('fetchLatestRetrievedPinboard', function () {
    it('should return correct action', function () {
      fetchLatestRetrievedPinboard().should.deepEqual({
        types: [
          constants.PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_START,
          constants.PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}latest-retrieved-pinboard/`,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          },
        },
      });
    });
  });

  describe('createNewPinboard', function () {
    it('should return correct action', function () {
      createNewPinboard({ officerIds: [], crids: ['abc'], trrIds: [1] }).should.deepEqual({
        types: [
          constants.PINBOARD_CREATE_NEW_REQUEST_START,
          constants.PINBOARD_CREATE_NEW_REQUEST_SUCCESS,
          constants.PINBOARD_CREATE_NEW_REQUEST_FAILURE,
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
              'source_pinboard_id': undefined,
            },
            cancelToken: 'token',
          },
        },
      });
    });
  });

  describe('updatePinboardFromSource', function () {
    it('should return correct action', function () {
      updatePinboardFromSource('abcd1234', 'abcd5678').should.deepEqual({
        types: [
          constants.PINBOARD_UPDATE_FROM_SOURCE_REQUEST_START,
          constants.PINBOARD_UPDATE_FROM_SOURCE_REQUEST_SUCCESS,
          constants.PINBOARD_UPDATE_FROM_SOURCE_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}abcd1234/`,
            method: 'put',
            adapter: null,
            data: {
              'source_pinboard_id': 'abcd5678',
            },
            cancelToken: 'token',
          },
        },
      });
    });
  });
});
