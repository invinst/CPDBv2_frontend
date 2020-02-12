import { spy } from 'sinon';
import { showIntercomLauncher, showIntercomMessages, updateIntercomEmail } from 'utils/intercom';


describe('Intercom utils', function () {
  beforeEach(function () {
    spy(window, 'Intercom');
  });

  describe('showIntercomLauncher', function () {
    it('should call Intercom correctly', function () {
      showIntercomLauncher(true);
      window.Intercom.calledWith('update', { 'hide_default_launcher': false }).should.be.true();
    });
  });

  describe('showIntercomMessages', function () {
    it('should call Intercom correctly', function () {
      showIntercomMessages(true);
      window.Intercom.calledWith('show').should.be.true();

      window.Intercom.resetHistory();

      showIntercomMessages(false);
      window.Intercom.calledWith('hide').should.be.true();
    });
  });

  describe('updateIntercomEmail', function () {
    it('should update Intercom user email', function () {
      updateIntercomEmail('abc@gmail.com');
      window.Intercom.calledWith('update', { email: 'abc@gmail.com' }).should.be.true();
    });
  });
});
