describe('landing-page', function () {
  it('should show result when user type in', function (client) {
    client
      .url(`${client.launch_url}/search/`)
      .expect.element('body').to.be.present.before(1000);

    // Search by term
    client.assert.visible('input')
      .setValue('input', 'Ke')
      .waitForElementVisible('.content-wrapper', 100);
    client.expect.element('#root').text.to.contain('Officer');
    client.expect.element('#root').text.to.contain('Neighborhoods');
    client.expect.element('.content-wrapper').text.to.contain('Bernadette Kelly'); // officer name
    client.expect.element('.content-wrapper').text.to.contain('7186'); // officer bdage
    client.expect.element('.content-wrapper').text.to.contain('Kenwood'); // neighborhood

    // Filter by content type
    client.click('.suggestion-tags span').pause(300);
    client.expect.element('.content-wrapper').text.to.contain('OFFICER');
    client.expect.element('.content-wrapper').text.to.not.contain('NEIGHBORHOODS');
    client.expect.element('.content-wrapper').text.to.contain('Bernadette Kelly');
    client.expect.element('.content-wrapper').text.to.contain('Charles Kelly'); // another officer
  });
});
