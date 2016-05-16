import 'should';

import { imgRootFolder } from 'utils/static-assets';


describe('Static assets module', function () {
  describe('imgRootFolder function', function () {
    afterEach(function () {
      global.DEVELOPMENT = true;
    });

    it('should return /src/img/ when DEVELOPMENT is true', function () {
      global.DEVELOPMENT = true;
      imgRootFolder().should.equal('/src/img/');
    });

    it('should return /dist/ when DEVELOPMENT is false', function () {
      global.DEVELOPMENT = false;
      imgRootFolder().should.equal('/dist/');
    });
  });
});
