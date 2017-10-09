'use strict';

import 'should';

import socialGraphPage from './page-objects/officer-social-graph-page';


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

  it('should show slider', function () {
    socialGraphPage.slider.element.waitForVisible();
    socialGraphPage.slider.minHandle.getText().should.equal('1984');
    socialGraphPage.slider.maxHandle.getText().should.equal('2017');
  });
});
