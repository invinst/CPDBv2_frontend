describe('landing-page', function () {
  it('should trigger search bar', function (client) {
    client
      .url(client.launch_url)
      .expect.element('body').to.be.present.before(100);
    client.keys('a');
    client.expect.element('.autocomplete-page').to.be.present.before(100);
  });
});
