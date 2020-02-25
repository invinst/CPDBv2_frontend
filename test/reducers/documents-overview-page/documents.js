import { LOCATION_CHANGE } from 'connected-react-router';

import documents from 'reducers/documents-overview-page/documents';
import * as constants from 'utils/constants';


describe('DocumentsOverviewPage documents reducer', function () {
  it('should have initial state', function () {
    documents(undefined, {}).should.deepEqual({ data: {}, match: '' });
  });

  it('should handle LOCATION_CHANGE', function () {
    documents({
      data: {
        '1': {
          id: 1,
        },
        '3': {
          id: 3,
        },
      },
      match: 'term',
    }, {
      type: LOCATION_CHANGE,
    }
    ).should.deepEqual({
      data: {},
      match: '',
    });
  });

  it('should handle DOCUMENT_OVERVIEW_REQUEST_SUCCESS', function () {
    documents({
      data: {
        '1': {
          id: 1,
        },
        '3': {
          id: 3,
        },
      },
      match: 'term',
    }, {
      type: constants.DOCUMENT_OVERVIEW_REQUEST_SUCCESS,
      payload: {
        results: [{
          id: 1,
        }, {
          id: 2,
        }],
      },
      request: {
        params: {
          match: 'term',
        },
      },
    }
    ).should.deepEqual({
      data: {
        '1': {
          id: 1,
        },
        '2': {
          id: 2,
        },
        '3': {
          id: 3,
        },
      },
      match: 'term',
    });

    documents({
      data: {
        '1': {
          id: 1,
        },
        '3': {
          id: 3,
        },
      },
      match: 'term',
    }, {
      type: constants.DOCUMENT_OVERVIEW_REQUEST_SUCCESS,
      payload: {
        results: [{
          id: 1,
        }, {
          id: 2,
        }],
      },
      request: {
        params: {},
      },
    }
    ).should.deepEqual({
      data: {
        '1': {
          id: 1,
        },
        '2': {
          id: 2,
        },
      },
      match: '',
    });
  });
});
