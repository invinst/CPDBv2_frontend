import { spy } from 'sinon';
import { showIntercomLauncher, showIntercomMessages } from 'utils/intercom';


describe('Intercom utils', function () {
  beforeEach(function () {
    spy(window, 'Intercom');
  });

  afterEach(function () {
    window.Intercom.restore();
  });

  it('showIntercomLauncher should call Intercom correctly', function () {
    showIntercomLauncher(true);
    window.Intercom.calledWith('update', { 'hide_default_launcher': false }).should.be.true();
  });

  it('showIntercomMessages should call Intercom correctly', function () {
    showIntercomMessages(true);
    window.Intercom.calledWith('show').should.be.true();

    window.Intercom.resetHistory();

    showIntercomMessages(false);
    window.Intercom.calledWith('hide').should.be.true();
  });
});
