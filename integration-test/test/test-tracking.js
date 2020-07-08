import should from 'should';

import pinboardPage from '../page-objects/pinboard-page';


describe('Tracking', function () {
  const gaType = () => browser.execute('return (typeof window.ga);');
  const clickyLogType = () => browser.execute('return (typeof window.clicky.log);');
  const clicky = () => browser.execute('return window.clicky;');
  const gaLoaded = () => browser.execute('return window.gaLoaded;');

  it('should assign gaLoaded, ga & clicky on load', function () {
    pinboardPage.open();

    gaType().should.equal('function');
    clicky().should.not.be.null();
    clickyLogType().should.equal('function');
    gaLoaded().should.be.true();
  });

  context('tracking script is unable to load', function () {
    it('should be able to navigate to QA page', function () {
      pinboardPage.open();
      browser.execute(() => {
        window.gaLoaded = null;
        window.clicky = null;
      });

      gaType().should.equal('function');
      should(clicky()).be.null();
      should(gaLoaded()).be.null();

      pinboardPage.headerQALink.click();
      browser.getUrl().should.containEql('http://how.cpdp.works/');
    });
  });
});
