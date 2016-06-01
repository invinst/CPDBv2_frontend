import HeroSection from 'components/hero-section';


describe('HeroSection component', function () {
  it('should be renderable', function () {
    HeroSection.should.be.responsiveRenderable();
  });
});
