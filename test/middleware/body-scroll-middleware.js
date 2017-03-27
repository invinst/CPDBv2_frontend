import bodyScrollMiddleware from 'middleware/body-scroll-middleware';


describe('bodyScrollMiddleware', function () {
  afterEach(function () {
    document.body.className = '';
  });

  it('should enable bodyscroll on @@router/LOCATION_CHANGE if path is report bottom sheet', function () {
    let dispatched;
    document.body.className = '';
    const dispatchAction = { type: '@@router/LOCATION_CHANGE', payload: { pathname: '/reporting/1/' } };
    bodyScrollMiddleware({})(action => dispatched = action)(dispatchAction);
    document.body.className.should.containEql('noscroll');
    dispatched.should.eql(dispatchAction);
  });

  it('should enable bodyscroll on @@router/LOCATION_CHANGE if path is faq bottom sheet', function () {
    let dispatched;
    document.body.className = '';
    const dispatchAction = { type: '@@router/LOCATION_CHANGE', payload: { pathname: '/faq/1/' } };
    bodyScrollMiddleware({})(action => dispatched = action)(dispatchAction);
    document.body.className.should.containEql('noscroll');
    dispatched.should.eql(dispatchAction);
  });

  it('should enable bodyscroll on @@router/LOCATION_CHANGE if path is officer bottom sheet', function () {
    let dispatched;
    document.body.className = '';
    const dispatchAction = { type: '@@router/LOCATION_CHANGE', payload: { pathname: '/officer/1/' } };
    bodyScrollMiddleware({})(action => dispatched = action)(dispatchAction);
    document.body.className.should.containEql('noscroll');
    dispatched.should.eql(dispatchAction);
  });

  it('should disabke bodyscroll on @@router/LOCATION_CHANGE', function () {
    let dispatched;
    document.body.className = 'noscroll';
    const dispatchAction = { type: '@@router/LOCATION_CHANGE', payload: { pathname: '/foo/bar/' } };
    bodyScrollMiddleware({})(action => dispatched = action)(dispatchAction);
    document.body.className.should.not.containEql('noscroll');
    dispatched.should.eql(dispatchAction);
  });
});
