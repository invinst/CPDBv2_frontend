import { stub } from 'sinon';

import bottomSheetPathMiddleware from 'middleware/bottom-sheet-path';
import {
  openBottomSheetWithReport, openBottomSheetToCreateReport, closeBottomSheet, openBottomSheetWithFAQ,
  openBottomSheetToCreateFAQ, openOfficerPage, openComplaintPage, openPoliceUnitPage, openOfficerSocialGraphPage
} from 'actions/bottom-sheet';
import * as editPathUtils from 'utils/edit-path';


describe('bottomSheetPathMiddleware', function () {
  beforeEach(function () {
    stub(editPathUtils, 'pushPathPreserveEditMode');
  });

  afterEach(function () {
    editPathUtils.pushPathPreserveEditMode.restore();
  });

  it('should push bottom sheet path on OPEN_BOTTOM_SHEET_WITH_REPORT', function () {
    let dispatched;
    const dispatchAction = openBottomSheetWithReport({ id: 14 });
    bottomSheetPathMiddleware({})(action => dispatched = action)(dispatchAction);
    editPathUtils.pushPathPreserveEditMode.args[0][0].should.eql('/reporting/14/');
    dispatched.should.eql(dispatchAction);
  });

  it('should push bottom sheet path on OPEN_BOTTOM_SHEET_TO_CREATE_REPORT', function () {
    let dispatched;
    const dispatchAction = openBottomSheetToCreateReport();
    bottomSheetPathMiddleware({})(action => dispatched = action)(dispatchAction);
    editPathUtils.pushPathPreserveEditMode.args[0][0].should.eql('/reporting/new/');
    dispatched.should.eql(dispatchAction);
  });

  it('should push bottom sheet path on OPEN_OFFICER_PAGE', function () {
    let dispatched;
    const dispatchAction = openOfficerPage(123);
    bottomSheetPathMiddleware({})(action => dispatched = action)(dispatchAction);
    editPathUtils.pushPathPreserveEditMode.args[0][0].should.eql('/officer/123/');
    dispatched.should.eql(dispatchAction);
  });

  it('should push bottom sheet path on OPEN_OFFICER_SOCIAL_GRAPH_PAGE', function () {
    let dispatched;
    const dispatchAction = openOfficerSocialGraphPage(123);
    bottomSheetPathMiddleware({})(action => dispatched = action)(dispatchAction);
    editPathUtils.pushPathPreserveEditMode.args[0][0].should.eql('/officer/123/social/');
    dispatched.should.eql(dispatchAction);
  });

  it('should push bottom sheet path on OPEN_COMPLAINT_PAGE', function () {
    let dispatched;
    const dispatchAction = openComplaintPage({ crid: '1', officerId: 1 });
    bottomSheetPathMiddleware({})(action => dispatched = action)(dispatchAction);
    editPathUtils.pushPathPreserveEditMode.args[0][0].should.eql('/complaint/1/1/');
    dispatched.should.eql(dispatchAction);
  });

  it('should push bottom sheet path on CLOSE_BOTTOM_SHEET', function () {
    const store = {
      getState() {
        return {
          appContent: '/foo/'
        };
      }
    };

    let dispatched;
    const dispatchAction = closeBottomSheet();
    bottomSheetPathMiddleware(store)(action => dispatched = action)(dispatchAction);
    editPathUtils.pushPathPreserveEditMode.args[0][0].should.eql('/foo/');
    dispatched.should.eql(dispatchAction);
  });

  it('should push bottom sheet path on OPEN_BOTTOM_SHEET_WITH_FAQ', function () {
    let dispatched;
    const dispatchAction = openBottomSheetWithFAQ(14);
    bottomSheetPathMiddleware({})(action => dispatched = action)(dispatchAction);
    editPathUtils.pushPathPreserveEditMode.args[0][0].should.eql('/faq/14/');
    dispatched.should.eql(dispatchAction);
  });

  it('should push bottom sheet path on OPEN_BOTTOM_SHEET_TO_CREATE_FAQ', function () {
    let dispatched;
    const dispatchAction = openBottomSheetToCreateFAQ();
    bottomSheetPathMiddleware({})(action => dispatched = action)(dispatchAction);
    editPathUtils.pushPathPreserveEditMode.args[0][0].should.eql('/faq/new/');
    dispatched.should.eql(dispatchAction);
  });

  it('should push bottom sheet path on OPEN_POLICE_UNIT_PAGE', function () {
    let dispatched;
    const dispatchAction = openPoliceUnitPage('007');
    bottomSheetPathMiddleware({})(action => dispatched = action)(dispatchAction);
    editPathUtils.pushPathPreserveEditMode.args[0][0].should.eql('/unit/007/');
    dispatched.should.eql(dispatchAction);
  });
});
