import { LOCATION_CHANGE } from 'connected-react-router';

import dataReducer from 'reducers/document-page/data';
import { DOCUMENT_REQUEST_SUCCESS, UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS } from 'utils/constants';


describe('officersReducer', function () {
  it('should return initial state', function () {
    dataReducer(undefined, {}).should.eql({});
  });

  it('should handle DOCUMENT_REQUEST_SUCCESS', function () {
    dataReducer([], {
      type: DOCUMENT_REQUEST_SUCCESS,
      payload: {
        id: '1234',
        title: 'CRID 1083633 Report',
      },
    }).should.eql({
      id: '1234',
      title: 'CRID 1083633 Report',
    });
  });

  it('should handle UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS', function () {
    dataReducer({
      'text_content': 'Old content',
    }, {
      type: UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS,
      payload: {
        id: '1234',
        'text_content': 'New content',
      },
    }).should.eql({
      'text_content': 'New content',
      id: '1234',
    });
  });

  it('should handle LOCATION_CHANGE', function () {
    const action = {
      type: LOCATION_CHANGE,
      payload: {
        location: { pathname: '/officer/1/timeline/' },
      },
    };

    dataReducer('some state', action).should.eql({});
  });
});
