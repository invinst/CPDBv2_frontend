import bodyScrollMiddleware from 'middleware/body-scroll-middleware';
import { openBottomSheetWithReport, closeBottomSheet, openBottomSheetWithFAQ } from 'actions/bottom-sheet';


describe('bodyScrollMiddleware', function () {
  afterEach(function () {
    document.body.className = '';
  });

  it('should disable bodyscroll on OPEN_BOTTOM_SHEET_WITH_REPORT', function () {
    let dispatched;
    const dispatchAction = openBottomSheetWithReport({});
    bodyScrollMiddleware({})(action => dispatched = action)(dispatchAction);
    document.body.className.should.containEql('noscroll');
    dispatched.should.eql(dispatchAction);
  });

  it('should disable bodyscroll on OPEN_BOTTOM_SHEET_WITH_FAQ', function () {
    let dispatched;
    const dispatchAction = openBottomSheetWithFAQ({});
    bodyScrollMiddleware({})(action => dispatched = action)(dispatchAction);
    document.body.className.should.containEql('noscroll');
    dispatched.should.eql(dispatchAction);
  });

  it('should enable bodyscroll on CLOSE_BOTTOM_SHEET', function () {
    let dispatched;
    document.body.className = 'noscroll';
    const dispatchAction = closeBottomSheet();
    bodyScrollMiddleware({})(action => dispatched = action)(dispatchAction);
    document.body.className.should.not.containEql('noscroll');
    dispatched.should.eql(dispatchAction);
  });

  it('should enable bodyscroll on @@router/LOCATION_CHANGE', function () {
    let dispatched;
    document.body.className = 'noscroll';
    const dispatchAction = { type: '@@router/LOCATION_CHANGE' };
    bodyScrollMiddleware({})(action => dispatched = action)(dispatchAction);
    document.body.className.should.not.containEql('noscroll');
    dispatched.should.eql(dispatchAction);
  });
});
