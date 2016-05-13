import { arrayOfN } from 'utils/prop-validators';


describe('PropValidators module', function () {
  describe('arrayOfN function', function () {
    it('should not throw if prop is array of n elements', function () {
      (arrayOfN(3)({ a: [1, 2, 3] }, 'a', 'Component') === undefined).should.be.true();
    });

    it('should throw when prop is not an array of n elements', function () {
      let error = arrayOfN(2)({ b: [1, 2, 3] }, 'b', 'Component');
      error.should.be.instanceOf(Error);
      error.message.should.equal('b must be an array of exactly 2 elements.');
    });
  });
});
