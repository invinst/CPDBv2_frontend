import { stub } from 'sinon';

import IntercomLoggingMiddleware from 'middleware/intercom-logging';
import {
  openBottomSheetWithReport
} from 'actions/bottom-sheet';
import * as intercomUtils from 'utils/intercom';

describe('intercomLoggingMiddleware', function () {
  beforeEach(function () {
    stub(intercomUtils, 'trackClickedReportingItem');
  });

  afterEach(function () {
    intercomUtils.trackClickedReportingItem.restore();
  });

  it('should log event using intercom on OPEN_BOTTOM_SHEET_WITH_REPORT', function () {
    let dispatched;
    const dispatchAction = openBottomSheetWithReport({ id: 14, title: 'I am a title' });
    IntercomLoggingMiddleware({})(action => dispatched = action)(dispatchAction);
    intercomUtils.trackClickedReportingItem.calledOnce.should.equal(true);
    intercomUtils.trackClickedReportingItem.calledWith(14, 'I am a title').should.equal(true);

    dispatched.should.eql(dispatchAction);
  });
});
