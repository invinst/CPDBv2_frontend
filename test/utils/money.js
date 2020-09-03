import { moneyFormatShort, moneyFormat } from 'utils/money';

describe('money', function () {
  describe('myneyFormatShort', function () {
    it('should render "K" if a value equal or larger than 1,000', function () {
      moneyFormatShort(1000.00).should.eql('1.0k');
    });

    it('should render "M" if a value equal or larger than 1,000,000', function () {
      moneyFormatShort(1000000.00).should.eql('1.0m');
    });

    it('should render "B" if a value equal or larger than 1,000,000', function () {
      moneyFormatShort(1000000000.00).should.eql('1.0b');
    });
  });

  describe('moneyFormat', function () {
    it('should render a number with readable format', function () {
      moneyFormat(1000.00).should.eql('1,000.00');
      moneyFormat(1000000.00).should.eql('1,000,000.00');
      moneyFormat(1000000000.00).should.eql('1,000,000,000.00');
    });
  });
});
