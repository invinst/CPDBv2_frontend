describe('header', function () {

  it('should fixed on scroll down over 88px', function (client) {
    // browse landing-page should see body
    client
      .url('http://localhost:9100')
      .expect.element('body').to.be.present.before(1000);

    // initial header should not be fixed
    client.expect.element('.header-wrapper-fixed').to.not.be.present;

    // scroll down 100px header should be fixed
    client.execute('scrollTo(0,100)').pause(1000)
      .expect.element('.header-wrapper-fixed').to.be.present;
  });
});
