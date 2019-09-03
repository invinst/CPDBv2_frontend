import { parseInt, identity } from 'lodash';

import { generatePinboardUrl, getFormatId } from 'utils/pinboard';


describe('pinboard utils', function () {
  describe('generatePinboardUrl', function () {
    it('should return empty string if pinboard is null or pinboard id is not defined', function () {
      generatePinboardUrl(null).should.be.equal('');
    });

    it('should return correct url', function () {
      generatePinboardUrl({
        id: '5cd06f2b',
        title: 'Title',
      }).should.be.equal('/pinboard/5cd06f2b/title/');
    });
  });

  describe('getFormatId', function () {
    it('should return correct format function', function () {
      getFormatId('officer_ids').should.be.equal(parseInt);
      getFormatId('trr_ids').should.be.equal(parseInt);
      getFormatId('cr_ids').should.be.equal(identity);

      getFormatId('officer_ids')('123456').should.be.equal(123456);
      getFormatId('trr_ids')('123456').should.be.equal(123456);
      getFormatId('cr_ids')('123456').should.be.equal('123456');
    });
  });
});
