import { spy } from 'sinon';

import createFunctionWithTimeout from 'utils/create-function-with-timeout';


describe('createFunctionWithTimeout', function () {
  it('should call function after timeout', function (callback) {
    const spyFunc = spy();
    createFunctionWithTimeout(spyFunc, 100);
    setTimeout(() => {
      spyFunc.called.should.be.true();
      callback();
    }, 100);
  });

  it('should be called once', function (callback) {
    const spyFunc = spy();
    const timeoutFunc = createFunctionWithTimeout(spyFunc, 100);
    timeoutFunc();
    setTimeout(() => {
      spyFunc.calledOnce.should.be.true();
      callback();
    }, 100);
  });
});
