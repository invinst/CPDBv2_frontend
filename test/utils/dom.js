import { innerHeight, disableBodyScroll, enableBodyScroll } from 'utils/dom';

describe('dom utils', function () {
  describe('innerHeight function', function () {
    const fakeDomNode = function () {
      return {
        children: [
          {
            getBoundingClientRect() {
              return { height: 10 };
            }
          }
        ]
      };
    };

    it('should calculate correct element innerHeight', function () {
      innerHeight(fakeDomNode()).should.equal(10);
    });
  });

  describe('disableBodyScroll function', function () {
    afterEach(function () {
      document.body.className = '';
    });

    it('should add "noscroll" class to body', function () {
      disableBodyScroll();
      document.body.className.should.containEql('noscroll');
    });

    it('should remove "noscroll" class to body', function () {
      document.body.className += 'noscroll';
      enableBodyScroll();
      document.body.className.should.not.containEql('noscroll');
    });
  });
});
