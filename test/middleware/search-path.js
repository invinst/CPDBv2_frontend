import sinon from 'sinon';

import { SEARCH_PATH, OPEN_SEARCH_PAGE, SEARCH_ALIAS_EDIT_PATH } from 'utils/constants';
import { UPDATE_ALIAS_REQUEST_SUCCESS } from 'actions/inline-alias-admin-page';
import * as editPathUtils from 'utils/edit-path';
import searchPathMiddleware from 'middleware/search-path';

describe('searchPathMiddleware', function () {
  beforeEach(function () {
    this.stubPushPathPreserveEditMode = sinon.stub(editPathUtils, 'pushPathPreserveEditMode');
  });

  it('should push search page path on OPEN_SEARCH_PAGE', function () {
    const action = { type: OPEN_SEARCH_PAGE };
    searchPathMiddleware()(() => {})(action);
    this.stubPushPathPreserveEditMode.calledWith(SEARCH_PATH).should.be.true();
  });

  it('should push search alias edit path on UPDATE_ALIAS_REQUEST_SUCCESS', function () {
    const action = { type: UPDATE_ALIAS_REQUEST_SUCCESS };
    searchPathMiddleware()(() => {})(action);
    this.stubPushPathPreserveEditMode.calledWith(SEARCH_ALIAS_EDIT_PATH).should.be.true();
  });

});
