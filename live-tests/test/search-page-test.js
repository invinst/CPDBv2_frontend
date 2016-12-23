const visitSearchPage = (client) => {
  client
    .url(`${client.launch_url}/search/`)
    .expect.element('body').to.be.present.before(100);
};

describe('search-page', function () {
  it('should show result when user type in', function (client) {
    visitSearchPage(client);
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
    visitSearchPage(client);
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
    visitSearchPage(client);

    client.assert.visible('input')
      .setValue('input', 'noresult')
      .waitForElementVisible('.content-wrapper', 100);
    client.expect.element('.content-wrapper').text.to.contain('Data Tool');
    client.expect.element('.suggestion-tags').text.to.contain('Data Tool');
  });

  it('should show the recent search', function (client) {
    client.execute('window.localStorage.clear();');
    visitSearchPage(client);

    client.assert.visible('input')
      .setValue('input', 'Ke')
      .waitForElementVisible('.suggestion-group', 300);

    client.expect.element('.content-wrapper').text.to.contain('Bernadette Kelly');
    client.click('.suggestion-column a');

    visitSearchPage(client);
    client.expect.element('.recent-suggestions').text.to.contain('Bernadette Kelly');
  });

  it('should not show the recent search if it is empty', function (client) {
    client.execute('window.localStorage.clear();');
    visitSearchPage(client);
    client.expect.element('.recent-suggestions').to.not.be.present;
  });

  it('should go back to previous page when user click on back button', function (client) {
    client.url(client.launch_url);
    visitSearchPage(client);
    client.click('.searchbar__button--back');
    client.assert.urlEquals(`${client.launch_url}/`);
  });

  it('should go back to previous page when user hit ESCAPE with no focus on search input', function (client) {
    client.url(client.launch_url);
    visitSearchPage(client);
    // unfocus search input
    client.click('.search-hint');
    client.keys(client.Keys.ESCAPE);
    client.assert.urlEquals(`${client.launch_url}/`);
  });

  it('should go back to previous page when user hit ESCAPE with no focus on search input', function (client) {
    client.url(client.launch_url);
    visitSearchPage(client);
    // unfocus search input
    client.click('.search-hint');
    client.keys(client.Keys.ESCAPE);
    client.assert.urlEquals(`${client.launch_url}/`);
  });

  it('should go back to previous page when user hit ESCAPE with focus on search input', function (client) {
    client.url(client.launch_url);
    visitSearchPage(client);
    client.keys(client.Keys.ESCAPE);
    client.assert.urlEquals(`${client.launch_url}/`);
  });
});
