import { contentSelector } from 'selectors/landing-page/bottom-sheet-selector';


describe('bottomSheetSelector', function () {
  describe('contentSelector', function () {
    it('should return content state', function () {
      const contentState = 'contentState';
      contentSelector({ landingPage: { bottomSheet: { content: contentState } } }).should.eql(contentState);
    });
  });
});
