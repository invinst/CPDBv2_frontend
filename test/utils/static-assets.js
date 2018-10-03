import { imgUrl, mediaUrl } from 'utils/static-assets';
import config from 'config';


describe('Static assets module', function () {
  describe('imgUrl function', function () {
    let oldAppEnv;

    beforeEach(function () {
      oldAppEnv = config.appEnv;
    });

    afterEach(function () {
      config.appEnv = oldAppEnv;
    });

    it('should prepend /src/img/ to path when appEnv is dev', function () {
      config.appEnv = 'dev';
      imgUrl('abc').should.equal('/src/img/abc');
    });

    it('should prepend /dist/ to path when appEnv is not dev', function () {
      config.appEnv = 'prod';
      imgUrl('def').should.equal('/dist/img/def');
    });
  });

  describe('mediaUrl function', function () {
    let oldAppEnv;

    beforeEach(function () {
      oldAppEnv = config.appEnv;
    });

    afterEach(function () {
      config.appEnv = oldAppEnv;
    });

    it('should prepend localhost domain to path when appEnv is dev', function () {
      config.appEnv = 'dev';
      mediaUrl('/abc').should.equal('http://localhost:8000/abc');
    });

    it('should not modify path when appEnv is not dev', function () {
      config.appEnv = 'prod';
      mediaUrl('/def').should.equal('/def');
    });
  });
});
