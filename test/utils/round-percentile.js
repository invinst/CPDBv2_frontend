import roundPercentile from 'utils/round-percentile';


describe('roundPercentile', () => {
  it('should not show any decimals if the value is less than 99.0%', () => {
    roundPercentile(97.132).should.eql(97);
  });

  it('should display 0.1% precision if the value is equal or larger than 99.0%', () => {
    roundPercentile(99.0).should.eql(99);
    roundPercentile(99.1643).should.eql(99.1);
    roundPercentile(99.981).should.eql(99.9);
    roundPercentile(99.995).should.eql(99.9);
  });

  it('should return the original when cannot parse the value to number', () => {
    roundPercentile('N/A').should.eql('N/A');
  });

  it('should display 0.1% precision when the value can be parsed to float', () => {
    roundPercentile('99.1643').should.eql(99.1);
  });

  it('should return a string when the toString param is true', () => {
    roundPercentile('99.1643', true).should.eql('99.1');
  });
});
