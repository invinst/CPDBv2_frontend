import { getVisualTokenShade, getVisualTokenOIGBackground } from 'utils/visual-token';
import { OIG_VISUAL_TOKEN_COLOR_SCHEME, OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT } from 'utils/constants';


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

  describe('getVisualTokenOIGBackground', () => {
    it('should return correct background colors', () => {
      getVisualTokenOIGBackground(0, 0, 0).should.eql({
        backgroundColor: OIG_VISUAL_TOKEN_COLOR_SCHEME['000'],
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 20, 0).should.eql({
        backgroundColor: OIG_VISUAL_TOKEN_COLOR_SCHEME['010'],
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(10, 0, 20).should.eql({
        backgroundColor: OIG_VISUAL_TOKEN_COLOR_SCHEME['101'],
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(55, 20, 0).should.eql({
        backgroundColor: OIG_VISUAL_TOKEN_COLOR_SCHEME['210'],
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(55, 20, 56).should.eql({
        backgroundColor: OIG_VISUAL_TOKEN_COLOR_SCHEME['212'],
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.LIGHT_COLOR,
      });

      getVisualTokenOIGBackground(55, 80, 56).should.eql({
        backgroundColor: OIG_VISUAL_TOKEN_COLOR_SCHEME['222'],
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.LIGHT_COLOR,
      });
    });
  });
});
