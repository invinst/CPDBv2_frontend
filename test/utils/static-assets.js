import { imgUrl } from 'utils/static-assets';


describe('Static assets module', function () {
  describe('imgUrl function', function () {
    it('should prepend config static base url to path', function () {
      imgUrl('abc').should.equal('/img/abc');
    });
  });
});
