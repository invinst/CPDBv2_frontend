import sinon from 'sinon';

import { cancelledByUser } from 'utils/axios-client';


describe('axios-client', function () {
  describe('cancelledByUser', function () {
    it('should throw reason object when the message is not "Cancelled by user"', function () {
      const reason = {
        payload: {
          message: 'Error',
        },
      };

      let spyFunc = sinon.spy(cancelledByUser);
      try {
        spyFunc(reason);
      } catch (e) {
        // The assertion of throwing error should be in
        // the finally block.
      } finally {
        spyFunc.threw(reason).should.be.true();
      }
    });

    it('should not throw error when the message is "Cancelled by user"', function () {
      const reason = {
        payload: {
          message: 'Cancelled by user',
        },
      };
      (cancelledByUser(reason) === undefined).should.be.true();
    });
  });
});
