import MostRecentEmailLink from 'components/landing-page/vftg-section/most-recent-email-link';


describe('MostRecentEmailLink component', function () {
  it('should be renderable', function () {
    MostRecentEmailLink.should.be.renderable();
    MostRecentEmailLink.should.be.renderable({ hovering: true });
  });
});
