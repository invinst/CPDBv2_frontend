import { roundedPercentile } from 'utils/calculations';


describe('roundedPercentile', () => {
  it('should not show any decimals if the value is less than 99.0%', () => {
    roundedPercentile(97.132).should.eql(97);
  });

  it('should display 0.1% precision if the value is equal or larger than 99.0%', () => {
    roundedPercentile(99.0).should.eql(99);
    roundedPercentile(99.1643).should.eql(99.1);
    roundedPercentile(99.981).should.eql(99.9);
    roundedPercentile(99.995).should.eql(99.9);
  });

  it('should return the original when cannot parse the value to number', () => {
    roundedPercentile('N/A').should.eql('N/A');
  });

  it('should display 0.1% precision when the value can be parsed to float', () => {
    roundedPercentile('99.1643').should.eql(99.1);
  });
});
