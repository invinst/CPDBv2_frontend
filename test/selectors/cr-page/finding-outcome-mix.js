import { getFindingOutcomeMix } from 'selectors/cr-page/finding-outcome-mix';


describe('outcome tranformation', function () {
  describe('getFindingOutcomeMix', function () {
    it('should return correct final decision text', function () {
      getFindingOutcomeMix('Unknown', '10 Day Suspension').should.eql('Suspended 10 days');
      getFindingOutcomeMix('Unknown', 'Administrative Termination').should.eql('Administrative Termination');
      getFindingOutcomeMix('Unfounded', 'Unknown').should.eql('Unfounded');
      getFindingOutcomeMix('Exonerated', 'No Action Taken').should.eql('Exonerated');
      getFindingOutcomeMix('Unfounded', 'Violation Noted').should.eql('Unfounded - Violation Noted');
    });
  });
});
