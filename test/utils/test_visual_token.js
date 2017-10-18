import { getVisualTokenShade } from 'utils/visual-token';

describe('VisualToken utils', function () {
  describe('getVisualTokenShade', function () {
    it('should return correct color', function () {
      getVisualTokenShade(0).should.eql('#f5f4f4');
      getVisualTokenShade(1).should.eql('#edf0fa');
      getVisualTokenShade(3).should.eql('#edf0fa');
      getVisualTokenShade(5).should.eql('#d4e2f4');
      getVisualTokenShade(7).should.eql('#d4e2f4');
      getVisualTokenShade(10).should.eql('#c6d4ec');
      getVisualTokenShade(15).should.eql('#c6d4ec');
      getVisualTokenShade(25).should.eql('#aec9e8');
      getVisualTokenShade(35).should.eql('#aec9e8');
      getVisualTokenShade(40).should.eql('#90b1f5');
      getVisualTokenShade(50).should.eql('#90b1f5');
    });
  });
});
