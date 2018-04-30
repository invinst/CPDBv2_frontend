import { getVisualTokenShade, getVisualTokenOIGBackground, scalePercentile } from 'utils/visual-token';
import { OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT } from 'utils/constants';


describe('VisualToken utils', function () {
  describe('scalePercentile', function () {
    it('should return right key percentile', function () {
      scalePercentile(0).should.be.eql(0);
      scalePercentile(15).should.be.eql(1);
      scalePercentile(20).should.be.eql(1);
      scalePercentile(35).should.be.eql(2);
      scalePercentile(55).should.be.eql(3);
      scalePercentile(75).should.be.eql(4);
      scalePercentile(95).should.be.eql(5);
      scalePercentile(100).should.be.eql(5);
    });
  });

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
    it('should return correct background colors when first percentile is 0', () => {
      getVisualTokenOIGBackground(0, 0, 0).should.eql({
        backgroundColor: '#f5f4f4',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 15, 20).should.eql({
        backgroundColor: '#ffdddd',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 35, 40).should.eql({
        backgroundColor: '#fbc4cc',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 55, 60).should.eql({
        backgroundColor: '#ff9f9f',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 75, 80).should.eql({
        backgroundColor: '#ff7373',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 95, 100).should.eql({
        backgroundColor: '#ff6161',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });
    });

    it('should return correct background colors when first percentile is 1', () => {
      getVisualTokenOIGBackground(15, 0, 0).should.eql({
        backgroundColor: '#ffdec1',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(15, 15, 20).should.eql({
        backgroundColor: '#ffd0bc',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(15, 35, 40).should.eql({
        backgroundColor: '#fca5a5',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(15, 55, 60).should.eql({
        backgroundColor: '#ff9883',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(15, 75, 80).should.eql({
        backgroundColor: '#ff7567',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(15, 95, 100).should.eql({
        backgroundColor: '#ff5240',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });
    });

    it('should return correct background colors when first percentile is 2', () => {
      getVisualTokenOIGBackground(35, 0, 0).should.eql({
        backgroundColor: '#ffc498',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(35, 15, 20).should.eql({
        backgroundColor: '#ffac89',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(35, 35, 40).should.eql({
        backgroundColor: '#ff9b8f',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(35, 55, 60).should.eql({
        backgroundColor: '#ff7a7a',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(35, 75, 80).should.eql({
        backgroundColor: '#ff5454',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(35, 95, 100).should.eql({
        backgroundColor: '#fa3e3e',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });
    });

    it('should return correct background colors when first percentile is 3', () => {
      getVisualTokenOIGBackground(55, 0, 0).should.eql({
        backgroundColor: '#ffb382',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(55, 15, 20).should.eql({
        backgroundColor: '#ffa270',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(55, 35, 40).should.eql({
        backgroundColor: '#fc7060',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(55, 55, 60).should.eql({
        backgroundColor: '#fd5f4c',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(55, 75, 80).should.eql({
        backgroundColor: '#fa4040',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(55, 95, 100).should.eql({
        backgroundColor: '#f72f2f',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });
    });

    it('should return correct background colors when first percentile is 4', () => {
      getVisualTokenOIGBackground(75, 0, 0).should.eql({
        backgroundColor: '#ffa644',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(75, 15, 20).should.eql({
        backgroundColor: '#fb8c43',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(75, 35, 40).should.eql({
        backgroundColor: '#ff6c3a',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(75, 55, 60).should.eql({
        backgroundColor: '#ff522f',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(75, 75, 80).should.eql({
        backgroundColor: '#ff2d00',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.LIGHT_COLOR,
      });

      getVisualTokenOIGBackground(75, 95, 100).should.eql({
        backgroundColor: '#f60000',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.LIGHT_COLOR,
      });
    });

    it('should return correct background colors when first percentile is 5', () => {
      getVisualTokenOIGBackground(95, 0, 0).should.eql({
        backgroundColor: '#ff8600',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(95, 15, 20).should.eql({
        backgroundColor: '#ff7000',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(95, 35, 40).should.eql({
        backgroundColor: '#ff5e19',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(95, 55, 60).should.eql({
        backgroundColor: '#ff4a17',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(95, 75, 80).should.eql({
        backgroundColor: '#ff3800',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.LIGHT_COLOR,
      });

      getVisualTokenOIGBackground(95, 95, 100).should.eql({
        backgroundColor: '#ff0000',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.LIGHT_COLOR,
      });
    });

    it('should return extra blue background colors when first percentile is 0', () => {
      getVisualTokenOIGBackground(0, 0, 0).should.eql({
        backgroundColor: '#f5f4f4',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 15, 0).should.eql({
        backgroundColor: '#d5e5ff',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 35, 0).should.eql({
        backgroundColor: '#c7dbfb',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 55, 0).should.eql({
        backgroundColor: '#aec1fa',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 75, 0).should.eql({
        backgroundColor: '#6a8cf1',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 95, 0).should.eql({
        backgroundColor: '#184cea',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });
    });
  });
});
