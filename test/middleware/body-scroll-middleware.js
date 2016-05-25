import bodyScrollMiddleware from 'middleware/body-scroll-middleware';
import { openBottomSheet, closeBottomSheet } from 'actions/bottom-sheet';


describe('bodyScrollMiddleware', function () {
  afterEach(function () {
    document.body.className = '';
  });

  it('should disable bodyscroll on OPEN_BOTTOM_SHEET', function () {
    let dispatched;
    const dispatchAction = openBottomSheet();
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
});
