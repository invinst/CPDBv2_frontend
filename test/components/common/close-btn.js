import CloseButton from 'components/search-page/search-box/close-btn';


describe('CloseButton component', function () {
  it('should be renderable', function () {
    CloseButton.should.be.renderable();
  });

  it('should trigger onClick callback when clicked on', function () {
    CloseButton.should.triggerCallbackWhenClick('onClick');
  });
});
