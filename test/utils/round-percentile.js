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
  it('should return the original if the value is not a number', () => {
    roundPercentile('N/A').should.eql('N/A');
  });
});
