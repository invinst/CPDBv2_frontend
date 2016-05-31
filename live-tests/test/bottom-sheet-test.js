describe('bottom-sheet', function () {

  it('should open and close bottom-sheet', function (client) {
    // browse landing-page should see body
    client
      .url(client.launch_url)
      .expect.element('body').to.be.present.before(1000);

    // click on story-medium should open bottom-sheet and body element should has noscroll class
    client.click('.story-medium').expect.element('.story-full').to.be.present;
    client.expect.element('.overlay').to.be.present;
    client.expect.element('body').to.have.attribute('class').which.contains('noscroll');

    // click on dismiss should close bottom-sheet and body element shouldn't has noscroll class
    client.click('button.dismiss')
      .expect.element('.story-full').to.not.be.present.after(2000);
    client.expect.element('.overlay').to.not.be.present;
    client.expect.element('body').to.have.attribute('class').which.not.contains('noscroll');
  });
});
