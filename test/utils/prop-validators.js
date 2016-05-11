import { List } from 'immutable';

import { arrayOfN, listOfN } from 'utils/prop-validators';


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

  describe('listOfN function', function () {
    it('should not throw if prop is list of n elements', function () {
      (listOfN(3)({ a: List([1, 2, 3]) }, 'a', 'Component') === undefined).should.be.true();
    });

    it('should throw when prop is not an list of n elements', function () {
      let error = listOfN(2)({ b: List([1, 2, 3]) }, 'b', 'Component');
      error.should.be.instanceOf(Error);
      error.message.should.equal('b must be an list of exactly 2 elements.');
    });
  });
});
