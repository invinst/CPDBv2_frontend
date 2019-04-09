'use strict';

require('should');
import { map, countBy, values, filter } from 'lodash';

import pinboardPage from './page-objects/pinboard-page';


function waitForGraphAnimationEnd(browser, pinboardPage) {
  browser.waitUntil(function () {
    return pinboardPage.animatedSocialGraphSection.currentDate.getText() === '2008-01-11';
  }, 3000, 'expected timeline reaches end date after 1.65s');
}

describe('Pinboard Page', function () {
  beforeEach(function () {
    pinboardPage.open();
  });

  context('pinboard section', function () {
    it('should render correctly', function () {
      pinboardPage.pinboardSection.title.getText().should.equal('Pinboard Title');
      pinboardPage.pinboardSection.description.getText().should.equal('Pinboard Description');
    });
  });

  context('social graph section', function () {
    it('should render correctly', function () {
      pinboardPage.animatedSocialGraphSection.startDate.getText().should.equal('1990-01-09');
      pinboardPage.animatedSocialGraphSection.endDate.getText().should.equal('2008-01-11');
      waitForGraphAnimationEnd(browser, pinboardPage);

      const graphNodes = pinboardPage.animatedSocialGraphSection.graphNodes();
      const graphLinks = pinboardPage.animatedSocialGraphSection.graphLinks();

      graphNodes.should.have.length(20);
      graphLinks.should.have.length(37);

      const groupsColors = map(
        graphNodes,
        (graphNode) => graphNode.getCssProperty('fill').value
      );
      const groupsCount = values(countBy(groupsColors));
      groupsCount.sort((a, b) => a - b).should.eql([3, 5, 6, 6]);
    });

    it('should show connected nodes when double click on a node', function () {
      waitForGraphAnimationEnd(browser, pinboardPage);

      const graphNodes = pinboardPage.animatedSocialGraphSection.graphNodes();
      const graphLinks = pinboardPage.animatedSocialGraphSection.graphLinks();

      const biggestNode = pinboardPage.animatedSocialGraphSection.biggestGraphNode;
      biggestNode.doubleClick();

      let hideGraphNodes = filter(graphNodes, graphNode => graphNode.getCssProperty('opacity').value === 0.1);
      let visibleGraphNodes = filter(graphNodes, graphNode => graphNode.getCssProperty('opacity').value === 1);
      hideGraphNodes.should.have.length(9);
      visibleGraphNodes.should.have.length(11);

      let hideGraphLinks = filter(graphLinks, graphLink => graphLink.getCssProperty('opacity').value === 0.1);
      let visibleGraphLinks = filter(graphLinks, graphLink => graphLink.getCssProperty('opacity').value === 1);
      hideGraphLinks.should.have.length(27);
      visibleGraphLinks.should.have.length(10);

      biggestNode.doubleClick();

      hideGraphNodes = filter(graphNodes, graphNode => graphNode.getCssProperty('opacity').value === 0.1);
      visibleGraphNodes = filter(graphNodes, graphNode => graphNode.getCssProperty('opacity').value === 1);
      hideGraphNodes.should.have.length(0);
      visibleGraphNodes.should.have.length(20);

      hideGraphLinks = filter(graphLinks, graphLink => graphLink.getCssProperty('opacity').value === 0.1);
      visibleGraphLinks = filter(graphLinks, graphLink => graphLink.getCssProperty('opacity').value === 1);
      hideGraphLinks.should.have.length(0);
      visibleGraphLinks.should.have.length(37);
    });

    it('should pause timeline when click on toggle timeline button', function () {
      browser.waitUntil(function () {
        return pinboardPage.animatedSocialGraphSection.currentDate.getText() === '1994-01-10';
      }, 2000, 'expected timeline reaches specific date after 0.9s', 50);
      pinboardPage.animatedSocialGraphSection.toggleTimelineButton.click();
      pinboardPage.animatedSocialGraphSection.graphNodes().should.have.length(20);
      pinboardPage.animatedSocialGraphSection.graphLinks().should.have.length(10);

      pinboardPage.animatedSocialGraphSection.toggleTimelineButton.click();
      browser.waitUntil(function () {
        return pinboardPage.animatedSocialGraphSection.currentDate.getText() === '2008-01-11';
      }, 2000, 'expected timeline reaches end date after 0.75s start from middle');
      pinboardPage.animatedSocialGraphSection.graphNodes().should.have.length(20);
      pinboardPage.animatedSocialGraphSection.graphLinks().should.have.length(37);
    });

    it('should change the graph when click on specific part of the timeline', function () {
      waitForGraphAnimationEnd(browser, pinboardPage);
      pinboardPage.animatedSocialGraphSection.graphNodes().should.have.length(20);
      pinboardPage.animatedSocialGraphSection.graphLinks().should.have.length(37);

      browser.moveToObject(pinboardPage.animatedSocialGraphSection.timelineSlider.selector);
      browser.buttonPress();
      pinboardPage.animatedSocialGraphSection.graphNodes().should.have.length(20);
      pinboardPage.animatedSocialGraphSection.graphLinks().should.have.length(14);
      const graphNodes = pinboardPage.animatedSocialGraphSection.graphNodes();
      const groupsColors = map(
        graphNodes,
        (graphNode) => graphNode.getCssProperty('fill').value
      );
      const groupsCount = values(countBy(groupsColors));
      groupsCount.sort((a, b) => a - b).should.eql([3, 3, 3, 11]);
    });

    it('should be able to search', function () {
      pinboardPage.animatedSocialGraphSection.searchInput.setValue('Tho');
      pinboardPage.animatedSocialGraphSection.firstSearchResultSuggestion.click();
      pinboardPage.animatedSocialGraphSection.searchInput.getValue().should.equal('Thomas Kampenga');
    });
  });
});
