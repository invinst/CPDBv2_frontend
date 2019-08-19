import should from 'should';

import {
  UPDATE_DOCUMENT_PAGE_REQUEST_FAILURE,
  UPDATE_DOCUMENT_PAGE_REQUEST_START,
  UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS,
} from 'utils/constants';
import tagsErrorMessages from 'reducers/document-page/tags-error-messages';


describe('tagsErrorMessages reducer', function () {
  it('should return initial state', function () {
    should(tagsErrorMessages(undefined, {})).be.null();
  });

  it('should handle UPDATE_DOCUMENT_PAGE_REQUEST_FAILURE', function () {
    tagsErrorMessages(
      undefined,
      {
        type: UPDATE_DOCUMENT_PAGE_REQUEST_FAILURE,
        payload: {
          message: {
            tags: ['This is error message.'],
          }
        }
      }
    ).should.eql(['This is error message.']);
  });

  it('should handle UPDATE_DOCUMENT_PAGE_REQUEST_START', function () {
    should(tagsErrorMessages(
      { tagsErrorMessages: ['This is error message.'] },
      {
        type: UPDATE_DOCUMENT_PAGE_REQUEST_START,
        payload: {}
      }
    )).be.null();
  });

  it('should handle UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS', function () {
    should(tagsErrorMessages(
      { tagsErrorMessages: ['This is error message.'] },
      {
        type: UPDATE_DOCUMENT_PAGE_REQUEST_SUCCESS,
        payload: {}
      }
    )).be.null();
  });
});
