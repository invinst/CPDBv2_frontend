'use strict';

import 'should';

import socialGraphPage from './page-objects/officer-social-graph-page';
import { getRequestCount } from './utils';


describe('officer social graph page', function () {
  beforeEach(function () {
    socialGraphPage.open(1);
  });

  it('should show left pane', function () {
    socialGraphPage.leftPane.shade.waitForVisible();
    socialGraphPage.leftPane.shade.count.should.equal(3);
    socialGraphPage.leftPane.mostCrs.getText().should.equal('20');
    socialGraphPage.leftPane.leastCrs.getText().should.equal('1');
    socialGraphPage.leftPane.numOfficer.getText().should.equal('3');
  });

  it('should show social graph', function () {
    socialGraphPage.socialGraph.element.waitForVisible();
    socialGraphPage.socialGraph.nodes.count.should.equal(3);
    socialGraphPage.socialGraph.links.count.should.equal(2);
  });

  it('should visit other officer social map when click on node', function () {
    socialGraphPage.socialGraph.element.waitForVisible();
    browser.elements(socialGraphPage.socialGraph.nodes.selector).value[1].click();
    browser.getUrl().should.match(/\/officer\/2\/social\/$/);
  });

  it('should show slider', function () {
    socialGraphPage.slider.element.waitForVisible();
    socialGraphPage.slider.minHandle.getText().should.equal('2000');
    socialGraphPage.slider.maxHandle.getText().should.equal('2017');
  });

  it('should highlight social graph header button', function () {
    socialGraphPage.header.activeButton.waitForVisible();
    socialGraphPage.header.activeButton.getText().should.equal('Social Map');
  });

  it('should not launch any request when click on Summary tab', function () {
    socialGraphPage.header.summaryButton.waitForVisible();
    socialGraphPage.header.summaryButton.click();

    getRequestCount('/officers/1/summary/').should.equal(1);
  });
});
