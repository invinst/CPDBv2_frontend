import config from 'config';


describe('config', function () {
  it('should show the base configuration', function () {
    config.appName.should.be.equal('CPDP');
  });

  it('should show correct configuration depends on current NODE_ENV', function () {
    config.appEnv.should.be.equal('test');
  });
});
