import 'should';

import { imgUrl } from 'utils/static-assets';


describe('Static assets module', function () {
  describe('imgUrl function', function () {
    afterEach(function () {
      global.DEVELOPMENT = true;
    });

    it('should prepend /src/img/ to path when DEVELOPMENT is true', function () {
      global.DEVELOPMENT = true;
      imgUrl('abc').should.equal('/src/img/abc');
    });

    it('should prepend /dist/ to path when DEVELOPMENT is false', function () {
      global.DEVELOPMENT = false;
      imgUrl('def').should.equal('/dist/img/def');
    });
  });
});
