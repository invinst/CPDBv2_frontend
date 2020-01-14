import browserHistory from 'utils/history';
import { stub, spy } from 'sinon';

import {
  innerHeight, disableBodyScroll, enableBodyScroll, getCurrentPathname,
  changePageTitle, viewportHeight, scrollToElement,
} from 'utils/dom';

describe('dom utils', function () {
  describe('innerHeight function', function () {
    const fakeDomNode = function () {
      return {
        children: [
          {
            getBoundingClientRect() {
              return { height: 10 };
            },
          },
        ],
      };
    };

    it('should calculate correct element innerHeight', function () {
      innerHeight(fakeDomNode()).should.equal(10);
    });
  });

  describe('viewportHeight', function () {
    it('should return correct viewport height', function () {
      viewportHeight().should.eql(2000);
    });
  });

  describe('disableBodyScroll', function () {
    afterEach(function () {
      document.body.className = '';
    });

    it('should add "noscroll" class to body', function () {
      disableBodyScroll();
      document.body.className.should.containEql('noscroll');
    });

    it('should not add "noscroll" anymore if body className has it already', function () {
      document.body.className = 'noscroll somethingelse';
      disableBodyScroll();
      document.body.className.should.eql('noscroll somethingelse');
    });
  });

  describe('enableBodyScroll function', function () {
    afterEach(function () {
      document.body.className = '';
    });

    it('should remove "noscroll" class to body', function () {
      document.body.className += 'noscroll';
      enableBodyScroll();
      document.body.className.should.not.containEql('noscroll');
    });
  });

  describe('getCurrentPathname function', function () {
    it('should return current path', function () {
      browserHistory.push('/abc');
      getCurrentPathname().should.equal('/abc');
    });
  });

  describe('changePageTitle', function () {
    it('should change page title', function () {
      changePageTitle('abc');
      const el = document.getElementsByTagName('TITLE')[0];
      el.textContent.should.equal('abc');
    });
  });

  describe('scrollToElement', function () {
    beforeEach(function () {
      this.stubQuerySelector = stub(document, 'querySelector');
      this.dummyElement = { scrollIntoView: spy() };
      this.stubQuerySelector.withArgs('#dummy').returns(this.dummyElement);
      this.stubScrollBy = stub(window, 'scrollBy');
    });

    afterEach(function () {
      this.stubQuerySelector.restore();
      this.stubScrollBy.restore();
    });

    it('should call appropriate method on selected element to scroll to it', function () {
      scrollToElement('#dummy', true, 10);
      this.dummyElement.scrollIntoView.should.be.called();
      this.stubScrollBy.should.be.calledWith(0, 10);
    });

    it('should abort if element was not found', function () {
      scrollToElement('#nonexistent');
      this.dummyElement.scrollIntoView.called.should.be.false();
    });
  });
});
