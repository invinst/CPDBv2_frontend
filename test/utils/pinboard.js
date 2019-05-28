import { generatePinboardUrl } from 'utils/pinboard';


describe('pinboard utils', function () {
  describe('generatePinboardUrl', function () {
    it('should return empty string if pinboard is null or pinboard id is not defined', function () {
      generatePinboardUrl(null).should.be.equal('');
    });

    it('should return correct url', function () {
      generatePinboardUrl({
        id: '5cd06f2b',
        title: 'Title'
      }).should.be.equal('/pinboard/5cd06f2b/title/');
    });
  });
});
