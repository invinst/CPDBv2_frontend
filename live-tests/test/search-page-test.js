describe('search-page', function () {
  beforeEach(function (client, done) {
    client
      .url(`${client.launch_url}/search/`)
      .expect.element('body').to.be.present.before(100);
    done();
  });

  it('should show result when user type in', function (client) {
    client.assert.visible('input')
      .setValue('input', 'Ke')
      .waitForElementVisible('.suggestion-group', 100);
    client.expect.element('#root').text.to.contain('Officer');
    client.expect.element('#root').text.to.contain('Neighborhoods');
    client.expect.element('.content-wrapper').text.to.contain('Bernadette Kelly'); // officer name
    client.expect.element('.content-wrapper').text.to.contain('7186'); // officer bdage
    client.expect.element('.content-wrapper').text.to.contain('Kenwood'); // neighborhood
  });

  it('should show filtered result when user select tag', function (client) {
    client.assert.visible('input')
      .setValue('input', 'Ke')
      .waitForElementVisible('.suggestion-group', 100);
    client.click('.suggestion-tags span')
      .pause(300);
    client.expect.element('.content-wrapper').text.to.contain('OFFICER');
    client.expect.element('.content-wrapper').text.to.not.contain('NEIGHBORHOODS');
    client.expect.element('.content-wrapper').text.to.contain('Bernadette Kelly');
    client.expect.element('.content-wrapper').text.to.contain('Charles Kelly'); // another officer
  });

  it('should show DataTool suggestions when no result return', function (client) {
    client.assert.visible('input')
      .setValue('input', 'noresult')
      .waitForElementVisible('.content-wrapper', 100);
    client.expect.element('.content-wrapper').text.to.contain('Data Tool');
    client.expect.element('.suggestion-tags').text.to.contain('Data Tool');
  });
});
