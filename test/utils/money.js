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

    it('should render "0" if a value equal 0', function () {
      moneyFormatShort('0.00').should.eql('0');
    });
  });

  describe('moneyFormat', function () {
    it('should render a number with readable format', function () {
      moneyFormat(1000.00).should.eql('1,000.00');
      moneyFormat(1000000.00).should.eql('1,000,000.00');
      moneyFormat(1000000000.00).should.eql('1,000,000,000.00');
    });

    it('should render "-" if a value equal 0', function () {
      moneyFormat('0.00').should.eql('-');
    });
  });
});
