import sinon from 'sinon';

import { UPDATE_PATH_NAME } from 'utils/constants';
import updatePathNameMiddleware from 'middleware/path-name';

describe('updatePathNameMiddleware', function () {
  beforeEach(function () {
    this.stubReplaceState = sinon.stub(global.history, 'replaceState');
    this.stubHistoryState = sinon.stub(global.history, 'state');
    this.stubDocumentTitle = sinon.stub(document, 'title');
  });

  it('should push search page path on OPEN_SEARCH_PAGE', function () {
    const action = { type: UPDATE_PATH_NAME, payload: '/some/path' };
    updatePathNameMiddleware()(() => {})(action);
    this.stubReplaceState.calledWith(this.stubHistoryState, this.stubDocumentTitle, '/some/path');
  });
});
