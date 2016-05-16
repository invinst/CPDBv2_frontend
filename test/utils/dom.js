import { innerHeight } from 'utils/dom';

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
});
