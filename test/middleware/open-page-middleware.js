import {
  openPoliceUnitPage,
  openTRRPage
} from 'actions/open-page';

import openPageMiddleware from 'middleware/open-page-middleware';
import { stub } from 'sinon';
import * as editPathUtils from 'utils/edit-path';


describe('openPageMiddleware', function () {
  beforeEach(function () {
    stub(editPathUtils, 'pushPathPreserveEditMode');
  });

  afterEach(function () {
    editPathUtils.pushPathPreserveEditMode.restore();
  });

  it('should push bottom sheet path on OPEN_POLICE_UNIT_PAGE', function () {
    let dispatched;
    const dispatchAction = openPoliceUnitPage('007');
    openPageMiddleware({})(action => dispatched = action)(dispatchAction);
    editPathUtils.pushPathPreserveEditMode.args[0][0].should.eql('/unit/007/');
    dispatched.should.eql(dispatchAction);
  });

  it('should push bottom sheet path on OPEN_TRR_PAGE', function () {
    let dispatched;
    const dispatchAction = openTRRPage({ trrId: '123' });
    openPageMiddleware({})(action => dispatched = action)(dispatchAction);
    editPathUtils.pushPathPreserveEditMode.args[0][0].should.eql('/trr/123/');
    dispatched.should.eql(dispatchAction);
  });
});
