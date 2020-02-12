import Mousetrap from 'mousetrap';
import { spy } from 'sinon';

import * as LayeredKeyBinding from 'utils/layered-key-binding';


describe('LayeredKeyBinding', function () {
  const key = 'key';

  afterEach(function () {
    LayeredKeyBinding.reset();
  });

  describe('bind', function () {
    it('should bind callback to key', function () {
      const callback = spy();
      LayeredKeyBinding.bind(key, callback);

      Mousetrap.trigger(key);
      callback.called.should.be.true();
    });
  });

  describe('unbind', function () {
    it('should bind previous callback in stack to key', function () {
      const callback1 = spy();
      const callback2 = spy();

      LayeredKeyBinding.bind(key, callback1);
      LayeredKeyBinding.bind(key, callback2);

      Mousetrap.trigger(key);
      callback2.called.should.be.true();

      LayeredKeyBinding.unbind(key);
      Mousetrap.trigger(key);
      callback1.called.should.be.true();
    });

    it('should unbind key if stack empty', function () {
      const callback = spy();
      LayeredKeyBinding.bind(key, callback);

      Mousetrap.trigger(key);
      callback.called.should.be.true();

      LayeredKeyBinding.unbind(key);
      Mousetrap.trigger(key);
      callback.calledTwice.should.be.false();
    });
  });
});
