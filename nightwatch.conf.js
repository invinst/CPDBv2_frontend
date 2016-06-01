var standaloneSelenium = require('selenium-server-standalone-jar');

module.exports = (function (settings) {
  settings.selenium['server_path'] = standaloneSelenium.path;
  return settings;
})(require('./nightwatch.json'));
