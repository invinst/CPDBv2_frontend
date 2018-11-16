import { stub } from 'sinon';

import { UPDATE_PATH_NAME } from 'utils/constants';
import updatePathNameMiddleware from 'middleware/path-name';

describe('updatePathNameMiddleware', function () {
  beforeEach(function () {
    this.stubReplaceState = stub(global.history, 'replaceState');
    this.stubHistoryState = stub(global.history, 'state');
    this.stubDocumentTitle = stub(document, 'title');
  });

  afterEach(function () {
    this.stubReplaceState.restore();
    this.stubHistoryState.restore();
    this.stubDocumentTitle.restore();
  });

  it('should push search page path on OPEN_SEARCH_PAGE', function () {
    const action = { type: UPDATE_PATH_NAME, payload: '/some/path' };
    updatePathNameMiddleware()(() => {})(action);
    this.stubReplaceState.calledWith(this.stubHistoryState, this.stubDocumentTitle, '/some/path');
  });
});
