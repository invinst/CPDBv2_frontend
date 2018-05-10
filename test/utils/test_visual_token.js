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
        backgroundColor: '#fce0e0',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 35, 40).should.eql({
        backgroundColor: '#f6c9d0',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 55, 60).should.eql({
        backgroundColor: '#f6a8a7',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 75, 80).should.eql({
        backgroundColor: '#f28081',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 95, 100).should.eql({
        backgroundColor: '#ef6f70',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });
    });

    it('should return correct background colors when first percentile is 1', () => {
      getVisualTokenOIGBackground(15, 0, 0).should.eql({
        backgroundColor: '#f9dec7',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(15, 15, 20).should.eql({
        backgroundColor: '#f9d3c3',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(15, 35, 40).should.eql({
        backgroundColor: '#f3adad',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(15, 55, 60).should.eql({
        backgroundColor: '#f39f8e',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(15, 75, 80).should.eql({
        backgroundColor: '#f18075',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(15, 95, 100).should.eql({
        backgroundColor: '#ed6154',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });
    });

    it('should return correct background colors when first percentile is 2', () => {
      getVisualTokenOIGBackground(35, 0, 0).should.eql({
        backgroundColor: '#f5c5a2',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(35, 15, 20).should.eql({
        backgroundColor: '#f3b094',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(35, 35, 40).should.eql({
        backgroundColor: '#f4a298',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(35, 55, 60).should.eql({
        backgroundColor: '#f28687',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(35, 75, 80).should.eql({
        backgroundColor: '#ee6465',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(35, 95, 100).should.eql({
        backgroundColor: '#e85050',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });
    });

    it('should return correct background colors when first percentile is 3', () => {
      getVisualTokenOIGBackground(55, 0, 0).should.eql({
        backgroundColor: '#f3b58e',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(55, 15, 20).should.eql({
        backgroundColor: '#f2a67f',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(55, 35, 40).should.eql({
        backgroundColor: '#ee7b6f',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(55, 55, 60).should.eql({
        backgroundColor: '#ec6c5e',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(55, 75, 80).should.eql({
        backgroundColor: '#e75151',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(55, 95, 100).should.eql({
        backgroundColor: '#e44243',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });
    });

    it('should return correct background colors when first percentile is 4', () => {
      getVisualTokenOIGBackground(75, 0, 0).should.eql({
        backgroundColor: '#eea558',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(75, 15, 20).should.eql({
        backgroundColor: '#eb9056',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(75, 35, 40).should.eql({
        backgroundColor: '#ed754f',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(75, 55, 60).should.eql({
        backgroundColor: '#eb5f45',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(75, 75, 80).should.eql({
        backgroundColor: '#ea4029',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.LIGHT_COLOR,
      });

      getVisualTokenOIGBackground(75, 95, 100).should.eql({
        backgroundColor: '#df1d24',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.LIGHT_COLOR,
      });
    });

    it('should return correct background colors when first percentile is 5', () => {
      getVisualTokenOIGBackground(95, 0, 0).should.eql({
        backgroundColor: '#ea872c',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(95, 15, 20).should.eql({
        backgroundColor: '#ea752b',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(95, 35, 40).should.eql({
        backgroundColor: '#ea6836',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(95, 55, 60).should.eql({
        backgroundColor: '#ea5734',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(95, 75, 80).should.eql({
        backgroundColor: '#e94829',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.LIGHT_COLOR,
      });

      getVisualTokenOIGBackground(95, 95, 100).should.eql({
        backgroundColor: '#e81f25',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.LIGHT_COLOR,
      });
    });

    it('should return extra blue background colors when first percentile is 0', () => {
      getVisualTokenOIGBackground(0, 0, 0).should.eql({
        backgroundColor: '#f5f4f4',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 15, 0).should.eql({
        backgroundColor: '#dde6f7',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 35, 0).should.eql({
        backgroundColor: '#d1ddf1',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 55, 0).should.eql({
        backgroundColor: '#bdc7ec',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 75, 0).should.eql({
        backgroundColor: '#8498d8',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });

      getVisualTokenOIGBackground(0, 95, 0).should.eql({
        backgroundColor: '#405ec3',
        textColor: OIG_VISUAL_TOKEN_COLOR_SCHEME_TEXT.DARK_COLOR,
      });
    });
  });
});
