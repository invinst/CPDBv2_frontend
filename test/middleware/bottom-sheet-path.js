import { stub } from 'sinon';

import bottomSheetPathMiddleware from 'middleware/bottom-sheet-path';
import {
  openBottomSheetWithReport, openBottomSheetToCreateReport, closeBottomSheet,
  openBottomSheetWithFAQ, openBottomSheetToCreateFAQ, openBottomSheetWithOfficer
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

  it('should push bottom sheet path on OPEN_BOTTOM_SHEET_WITH_OFFICER', function () {
    let dispatched;
    const dispatchAction = openBottomSheetWithOfficer(123);
    bottomSheetPathMiddleware({})(action => dispatched = action)(dispatchAction);
    editPathUtils.pushPathPreserveEditMode.args[0][0].should.eql('/officer/123/');
    dispatched.should.eql(dispatchAction);
  });

  it('should push bottom sheet path on CLOSE_BOTTOM_SHEET', function () {
    const store = {
      getState() {
        return {
          pathStack: ['/foo/', '/bar/']
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
});
