describe('Header', function () {
  it('should navigate to reporting path when click on reporting link', function (client) {
    client
      .url(client.launch_url)
      .useCss().expect.element('body').to.be.present.before(1000);

    client.useXpath().waitForElementVisible('//a[text()="Reporting"]', 1000);
    client.click('//a[text()="Reporting"]');
    client.assert.urlEquals(`${client.launch_url}/reporting/`);

    client.useCss().waitForElementVisible('.nav-link__close-btn', 1000);
    client.click('.nav-link__close-btn');
    client.assert.urlEquals(`${client.launch_url}/`);
  });

  it('should navigate to FAQ path when click on FAQ link', function (client) {
    client
      .url(client.launch_url)
      .useCss().expect.element('body').to.be.present.before(1000);

    client.useXpath().waitForElementVisible('//a[text()="FAQ"]', 1000);
    client.click('//a[text()="FAQ"]');
    client.assert.urlEquals(`${client.launch_url}/faq/`);

    client.useCss().waitForElementVisible('.nav-link__close-btn', 1000);
    client.click('.nav-link__close-btn');
    client.assert.urlEquals(`${client.launch_url}/`);
  });

  it('should navigate to Collaborate path when click on Collaborate link', function (client) {
    client
      .url(client.launch_url)
      .useCss().expect.element('body').to.be.present.before(1000);

    client.useXpath().waitForElementVisible('//a[text()="Collaborate"]', 1000);
    client.click('//a[text()="Collaborate"]');
    client.assert.urlEquals(`${client.launch_url}/collaborate/`);

    client.useCss().waitForElementVisible('.nav-link__close-btn', 1000);
    client.click('.nav-link__close-btn');
    client.assert.urlEquals(`${client.launch_url}/`);
  });

  it('should navigate to base path when click on header logo', function (client) {
    client
      .url(client.launch_url)
      .useCss().expect.element('body').to.be.present.before(1000);

    client.useXpath().waitForElementVisible('//a[text()="Collaborate"]', 1000);
    client.click('//a[text()="Collaborate"]');
    client.assert.urlEquals(`${client.launch_url}/collaborate/`);

    client.useCss().waitForElementVisible('.test--header-logo', 1000);
    client.click('.test--header-logo');
    client.assert.urlEquals(`${client.launch_url}/`);
  });

  it('should enter edit mode when press ESC', function (client) {
    client
      .url(client.launch_url)
      .useCss().expect.element('body').to.be.present.before(1000);
    client.useCss().waitForElementVisible('.subscribe-form__input', 1000);
    client.keys(client.Keys.ESCAPE);
    client.waitForElementVisible('.test--edit-toggle', 1000);
    client.assert.urlEquals(`${client.launch_url}/edit/`);
  });

  it('should preserve edit mode when go to reporting page', function (client) {
    client.setCookie({
      name: 'apiAccessToken',
      value: 'abc'
    });
    client.url(client.launch_url);
    client.useCss().waitForElementVisible('.subscribe-form__input', 1000);
    client.keys(client.Keys.ESCAPE);
    client.waitForElementVisible('.test--edit-toggle', 1000);

    client.useXpath().waitForElementVisible('//a[text()="Reporting"]', 1000);
    client.click('//a[text()="Reporting"]');
    client.assert.urlEquals(`${client.launch_url}/edit/reporting/`);

    client.useCss().waitForElementVisible('.nav-link__close-btn', 1000);
    client.click('.nav-link__close-btn');
    client.assert.urlEquals(`${client.launch_url}/edit/`);
  });

  it('should preserve edit mode when go to faq page', function (client) {
    client.setCookie({
      name: 'apiAccessToken',
      value: 'abc'
    });
    client.url(client.launch_url);
    client.useCss().waitForElementVisible('.subscribe-form__input', 1000);
    client.keys(client.Keys.ESCAPE);
    client.waitForElementVisible('.test--edit-toggle', 1000);

    client.useXpath().waitForElementVisible('//a[text()="FAQ"]', 1000);
    client.click('//a[text()="FAQ"]');
    client.assert.urlEquals(`${client.launch_url}/edit/faq/`);

    client.useCss().waitForElementVisible('.nav-link__close-btn', 1000);
    client.click('.nav-link__close-btn');
    client.assert.urlEquals(`${client.launch_url}/edit/`);
  });
});
