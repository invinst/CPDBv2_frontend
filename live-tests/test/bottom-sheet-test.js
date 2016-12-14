describe('bottom-sheet', function () {

  it('should open and close report bottom-sheet', function (client) {
    // browse landing-page should see body
    client
      .url(client.launch_url)
      .expect.element('body').to.be.present.before(1000);

    // click on story-medium should open bottom-sheet and body element should has noscroll class
    client.waitForElementVisible('.report', 1000);
    client.click('.report').expect.element('.report-bottom-sheet').to.be.present;
    client.expect.element('.bottom-sheet__overlay').to.be.present;
    client.expect.element('body').to.have.attribute('class').which.contains('noscroll');
    client.assert.urlEquals(`${client.launch_url}/reporting/1/`);

    // click on dismiss should close bottom-sheet and body element shouldn't has noscroll class
    client.click('.bottom-sheet__overlay')
      .expect.element('.report-bottom-sheet').to.not.be.present.after(2000);
    client.expect.element('.bottom-sheet__overlay').to.not.be.present;
    client.expect.element('body').to.have.attribute('class').which.not.contains('noscroll');
    client.assert.urlEquals(`${client.launch_url}/`);
  });

  it('should open and close faq bottom-sheet', function (client) {
    client
      .url(client.launch_url)
      .expect.element('body').to.be.present.before(1000);

    client.waitForElementVisible('.faq-title', 1000);
    client.click('.faq-title').expect.element('.faq-bottom-sheet').to.be.present;
    client.expect.element('.bottom-sheet__overlay').to.be.present;
    client.expect.element('body').to.have.attribute('class').which.contains('noscroll');
    client.assert.urlEquals(`${client.launch_url}/faq/9/`);

    client.click('.bottom-sheet__overlay')
      .expect.element('.faq-bottom-sheet').to.not.be.present.after(2000);
    client.expect.element('.bottom-sheet__overlay').to.not.be.present;
    client.expect.element('body').to.have.attribute('class').which.not.contains('noscroll');
    client.assert.urlEquals(`${client.launch_url}/`);
  });

  it('should show report bottom sheet when visit /reporting/<id>/ path', function (client) {
    client
      .url(`${client.launch_url}/reporting/1/`)
      .expect.element('body').to.be.present.before(1000);
    client.click('.bottom-sheet__overlay')
      .expect.element('.report-bottom-sheet').to.not.be.present.after(2000);
    client.expect.element('.bottom-sheet__overlay').to.not.be.present;
    client.expect.element('body').to.have.attribute('class').which.not.contains('noscroll');
    client.assert.urlEquals(`${client.launch_url}/reporting/`);
  });

  it('should show faq bottom sheet when visit /faq/<id>/ path', function (client) {
    client
      .url(`${client.launch_url}/faq/1/`)
      .expect.element('body').to.be.present.before(1000);
    client.click('.bottom-sheet__overlay')
      .expect.element('.faq-bottom-sheet').to.not.be.present.after(2000);
    client.expect.element('.bottom-sheet__overlay').to.not.be.present;
    client.expect.element('body').to.have.attribute('class').which.not.contains('noscroll');
    client.assert.urlEquals(`${client.launch_url}/faq/`);
  });
});
