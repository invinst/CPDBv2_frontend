import {
  createPinboard,
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
  fetchPinboardGeographicData,
  removeItemInPinboardPage,
  addItemInPinboardPage,
  fetchLatestRetrievedPinboard,
} from 'actions/pinboard';
import * as constants from 'utils/constants';


describe('pinboard actions', function () {
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

  describe('fetchPinboardSocialGraph', function () {
    it('should return correct action', function () {
      fetchPinboardSocialGraph('1').should.deepEqual({
        types: [
          constants.PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_START,
          constants.PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}1/social-graph/`,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          }
        }
      });
    });
  });

  describe('fetchPinboardGeographicData', function () {
    it('should return correct action', function () {
      fetchPinboardGeographicData('268a5e58').should.deepEqual({
        types: [
          constants.PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_START,
          constants.PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_GEOGRAPHIC_DATA_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}268a5e58/geographic-data/`,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          }
        }
      });
    });
  });

  describe('fetchPinboardRelevantDocuments', function () {
    it('shoud return correct action', function () {
      fetchPinboardRelevantDocuments('66ef1560').should.deepEqual({
        types: [
          constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_START,
          constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}66ef1560/relevant-documents/?`,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          }
        }
      });
    });

    it('shoud return correct action with params', function () {
      fetchPinboardRelevantDocuments(
        '66ef1560',
        { limit: '20', offset: '20' }
      ).should.deepEqual({
        types: [
          constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_START,
          constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_RELEVANT_DOCUMENTS_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}66ef1560/relevant-documents/?limit=20&offset=20`,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          }
        }
      });
    });
  });

  describe('fetchPinboardRelevantCoaccusals', function () {
    it('shoud return correct action', function () {
      fetchPinboardRelevantCoaccusals('66ef1560').should.deepEqual({
        types: [
          constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_START,
          constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}66ef1560/relevant-coaccusals/?`,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          }
        }
      });
    });

    it('shoud return correct action with params', function () {
      fetchPinboardRelevantCoaccusals(
        '66ef1560',
        { limit: '20', offset: '20' }
      ).should.deepEqual({
        types: [
          constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_START,
          constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_RELEVANT_COACCUSALS_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}66ef1560/relevant-coaccusals/?limit=20&offset=20`,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          }
        }
      });
    });
  });

  describe('fetchPinboardRelevantComplaints', function () {
    it('shoud return correct action', function () {
      fetchPinboardRelevantComplaints('66ef1560').should.deepEqual({
        types: [
          constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_START,
          constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}66ef1560/relevant-complaints/?`,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          }
        }
      });
    });

    it('shoud return correct action with params', function () {
      fetchPinboardRelevantComplaints(
        '66ef1560',
        { limit: '20', offset: '20' }
      ).should.deepEqual({
        types: [
          constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_START,
          constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_SUCCESS,
          constants.PINBOARD_RELEVANT_COMPLAINTS_FETCH_REQUEST_FAILURE,
        ],
        payload: {
          request: {
            url: `${constants.PINBOARDS_URL}66ef1560/relevant-complaints/?limit=20&offset=20`,
            params: undefined,
            adapter: null,
            cancelToken: undefined,
          }
        }
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
          }
        }
      });
    });
  });
});
