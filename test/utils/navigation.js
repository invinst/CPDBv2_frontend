import sinon from 'sinon';
import { arrayOfN } from 'utils/prop-validators';

import * as NavigationUtil from 'utils/navigation';


describe('Navigation utils', function () {
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

  describe('getPageYBottomOffset', function () {
    beforeEach(function () {
      this.stubOffsetHeight = sinon.stub(window.document.body, 'offsetHeight').value(1000);
      this.stubPageYOffset = sinon.stub(window, 'pageYOffset').value(300);
    });

    it('should return distance to bottom', function () {
      NavigationUtil.getPageYBottomOffset().should.equal(700);
    });
  });

  describe('scrollByBottomOffset', function () {
    beforeEach(function () {
      this.stubOffsetHeight = sinon.stub(window.document.body, 'offsetHeight').value(1000);
      this.stubScrollTo = sinon.stub(window, 'scrollTo');
    });

    it('should return distance to bottom', function () {
      NavigationUtil.scrollByBottomOffset(400);
      this.stubScrollTo.should.be.calledWith(0, 600);
    });
  });
});
