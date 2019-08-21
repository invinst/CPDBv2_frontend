function initCommands() {
  browser.addCommand('scroll', (_x, _y) => {
    browser.execute((x, y) => { window.scrollTo(x, y); }, _x, _y);
  });
}

module.exports = initCommands;
