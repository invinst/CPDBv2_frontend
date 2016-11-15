import { getOffsetKey } from 'utils/rich-text';


describe('RichText utils', function () {
  describe('getOffsetKey', function () {
    it('should return offset key', function () {
      const div = document.createElement('DIV');
      div.setAttribute('data-offset-key', '123');
      getOffsetKey(div).should.eql('123');
    });

    it('should return offset key from ancestor', function () {
      const div = document.createElement('DIV');
      div.setAttribute('data-offset-key', '123');
      const div2 = document.createElement('DIV');
      div.appendChild(div2);
      getOffsetKey(div2).should.eql('123');
    });
  });
});
