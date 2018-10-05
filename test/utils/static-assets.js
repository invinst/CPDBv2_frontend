import { imgUrl } from 'utils/static-assets';
import config from 'config';


describe('Static assets module', function () {
  describe('imgUrl function', function () {
    it('should prepend config static base url to path', function () {
      const oldStaticBase = config.staticBase;
      config.staticBase = 'http://cdn';
      imgUrl('abc').should.equal('http://cdn/img/abc');
      config.staticBase = oldStaticBase;
    });
  });
});
