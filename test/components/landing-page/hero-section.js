import HeroSection from 'components/landing-page/hero-section';


describe('HeroSection component', function () {
  it('should be renderable', function () {
    HeroSection.should.be.responsiveRenderable();
  });
});
