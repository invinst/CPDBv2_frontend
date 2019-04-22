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

  it('should go to search page when the search bar is clicked', function () {
    pinboardPage.searchBar.click();
    browser.element('body').waitForVisible();
    browser.getUrl().should.endWith('/search/');
  });

  context('pinboard pinned section', function () {
    it('should render the pinned cards correctly', function () {
      const officers = pinboardPage.pinnedSection.officers;
      officers.title.getText().should.equal('OFFICERS');
      officers.firstCardRank.getText().should.equal('Police Officer');
      officers.firstCardName.getText().should.equal('Daryl Mack');
      officers.firstCardCRsCount.getText().should.equal('10 complaints');

      const crs = pinboardPage.pinnedSection.crs;
      crs.title.getText().should.equal('COMPLAINTS');
      crs.firstCardDate.getText().should.equal('2010-01-01');
      crs.firstCardCategory.getText().should.equal('Use Of Force');

      const trrs = pinboardPage.pinnedSection.trrs;
      trrs.title.getText().should.equal('TACTICAL RESPONSE REPORTS');
      trrs.firstCardDate.getText().should.equal('2012-01-01');
      trrs.firstCardCategory.getText().should.equal('Impact Weapon');
    });
  });

  context('pinboard section', function () {
    it('should render correctly', function () {
      pinboardPage.pinboardSection.title.getText().should.equal('Pinboard Title');
      pinboardPage.pinboardSection.description.getText().should.equal('Pinboard Description');
      pinboardPage.pinboardSection.pinboardPaneMenu.waitForVisible();
      const pinboardPaneMenuText = pinboardPage.pinboardSection.pinboardPaneMenu.getText();
      pinboardPaneMenuText.should.containEql('NETWORK');
      pinboardPaneMenuText.should.containEql('GEOGRAPHIC');
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
      const toggleTimelineButton = pinboardPage.animatedSocialGraphSection.toggleTimelineButton;

      waitForGraphAnimationEnd(browser, pinboardPage);
      browser.waitUntil(function () {
        return toggleTimelineButton.getAttribute('class') === 'toggle-timeline-btn play-icon';
      });

      toggleTimelineButton.click();

      const middleDays = [
        '1992-03-08',
        '1994-01-10',
        '1994-03-07',
        '1994-03-12',
        '1994-04-17',
        '1998-11-17',
        '1999-02-08',
        '1999-07-22',
        '2006-03-15'
      ];
      toggleTimelineButton.getAttribute('class').should.equal('toggle-timeline-btn pause-icon');
      browser.waitUntil(function () {
        return middleDays.indexOf(pinboardPage.animatedSocialGraphSection.currentDate.getText()) !== -1;
      });

      toggleTimelineButton.click();
      toggleTimelineButton.getAttribute('class').should.equal('toggle-timeline-btn play-icon');

      toggleTimelineButton.click();
      waitForGraphAnimationEnd(browser, pinboardPage);
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

    it('should render geographic section', function () {
      pinboardPage.pinboardSection.pinboardPaneMenu.waitForVisible();
      pinboardPage.pinboardSection.geographicPaneName.click();
      pinboardPage.geographicSection.complaintText.getText().should.eql('Complaint');
      pinboardPage.geographicSection.complaintNumber.getText().should.eql('5');
      pinboardPage.geographicSection.trrText.getText().should.eql('Use of Force Report');
      pinboardPage.geographicSection.trrNumber.getText().should.eql('2');
    });
  });

  context('Geographic section', function () {
    it('should render geographic section', function () {
      pinboardPage.pinboardSection.pinboardPaneMenu.waitForVisible();
      pinboardPage.pinboardSection.geographicPaneName.click();
      pinboardPage.geographicSection.complaintText.getText().should.eql('Complaint');
      pinboardPage.geographicSection.complaintNumber.getText().should.eql('5');
      pinboardPage.geographicSection.trrText.getText().should.eql('Use of Force Report');
      pinboardPage.geographicSection.trrNumber.getText().should.eql('2');
    });
  });
});
