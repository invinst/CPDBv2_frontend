'use strict';

require('should');

import { map, countBy, values, filter } from 'lodash';

import socialGraphPage from './page-objects/social-graph-page';


describe('Social Graph Page', function () {
  beforeEach(function () {
    socialGraphPage.open();
  });

  it('should render social graph correctly', function () {
    socialGraphPage.animatedSocialGraphSection.title.getText().should.equal('Live test social graph title');
    socialGraphPage.animatedSocialGraphSection.coaccusalsThresholdText.getText().should.equal(
      'Minimum Coaccusal Threshold'
    );
    socialGraphPage.animatedSocialGraphSection.startDate.getText().should.equal('1990-01-09');
    socialGraphPage.animatedSocialGraphSection.endDate.getText().should.equal('2008-01-11');
    browser.waitUntil(function () {
      return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === '2008-01-11';
    }, 15000, 'expected timeline reaches end date after 15s');

    const graphNodes = socialGraphPage.animatedSocialGraphSection.graphNodes();
    const graphLinks = socialGraphPage.animatedSocialGraphSection.graphLinks();

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
    browser.waitUntil(function () {
      return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === '2008-01-11';
    }, 15000, 'expected timeline reaches end date after 15s');

    const graphNodes = socialGraphPage.animatedSocialGraphSection.graphNodes();
    const graphLinks = socialGraphPage.animatedSocialGraphSection.graphLinks();

    const biggestNode = socialGraphPage.animatedSocialGraphSection.biggestGraphNode;
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

  it('should show tooltip when hover a node', function () {
    browser.waitUntil(function () {
      return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === '2008-01-11';
    }, 15000, 'expected timeline reaches end date after 15s');

    browser.moveToObject(socialGraphPage.animatedSocialGraphSection.biggestGraphNode.selector);
    socialGraphPage.animatedSocialGraphSection.tooltip.getText().should.equal('Donnell Calhoun');
  });

  it('should pause timeline when click on toggle timeline button', function () {
    const toggleTimelineButton = socialGraphPage.animatedSocialGraphSection.toggleTimelineButton;
    const toggleTimelineIcon = socialGraphPage.animatedSocialGraphSection.toggleTimelineIcon;

    browser.waitUntil(function () {
      return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === '2008-01-11';
    }, 15000, 'expected timeline reaches end date after 15s');
    browser.waitUntil(function () {
      return toggleTimelineIcon.getAttribute('class') === 'play-icon';
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
    toggleTimelineIcon.getAttribute('class').should.equal('pause-icon');
    browser.waitUntil(function () {
      return middleDays.indexOf(socialGraphPage.animatedSocialGraphSection.currentDate.getText()) !== -1;
    });

    toggleTimelineButton.click();
    toggleTimelineIcon.getAttribute('class').should.equal('play-icon');

    toggleTimelineButton.click();
    browser.waitUntil(function () {
      return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === '2008-01-11';
    }, 15000, 'expected timeline reaches end date after 15s');
  });

  it('should change the graph when click on specific part of the timeline', function () {
    browser.waitUntil(function () {
      return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === '2008-01-11';
    }, 15000, 'expected timeline reaches specific date after 15s');
    socialGraphPage.animatedSocialGraphSection.graphNodes().should.have.length(20);
    socialGraphPage.animatedSocialGraphSection.graphLinks().should.have.length(37);

    browser.moveToObject(socialGraphPage.animatedSocialGraphSection.timelineSlider.selector);
    browser.buttonPress();
    socialGraphPage.animatedSocialGraphSection.graphNodes().should.have.length(20);
    socialGraphPage.animatedSocialGraphSection.graphLinks().should.have.length(14);
    const graphNodes = socialGraphPage.animatedSocialGraphSection.graphNodes();
    const groupsColors = map(
      graphNodes,
      (graphNode) => graphNode.getCssProperty('fill').value
    );
    const groupsCount = values(countBy(groupsColors));
    groupsCount.sort((a, b) => a - b).should.eql([3, 3, 3, 11]);
  });

  it('should load new data when change threshold and showCivilOnly', function () {
    browser.waitUntil(function () {
      return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === '2008-01-11';
    }, 15000, 'expected timeline reaches end date after 15s');
    socialGraphPage.animatedSocialGraphSection.graphNodes().should.have.length(20);
    socialGraphPage.animatedSocialGraphSection.graphLinks().should.have.length(37);

    socialGraphPage.animatedSocialGraphSection.showCivilComplaintOnlyCheckbox.click();
    browser.waitUntil(function () {
      return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === '2008-01-11';
    }, 15000, 'expected timeline reaches end date after 15s');
    socialGraphPage.animatedSocialGraphSection.graphNodes().should.have.length(20);
    socialGraphPage.animatedSocialGraphSection.graphLinks().should.have.length(38);

    browser.moveToObject(socialGraphPage.animatedSocialGraphSection.coaccusalsThresholdSlider.selector, 140, 7);
    browser.buttonPress();
    browser.waitUntil(function () {
      return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === '2008-01-11';
    }, 15000, 'expected timeline reaches end date after 15s');
    socialGraphPage.animatedSocialGraphSection.graphNodes().should.have.length(20);
    socialGraphPage.animatedSocialGraphSection.graphLinks().should.have.length(15);
  });

  it('should be able to search', function () {
    socialGraphPage.animatedSocialGraphSection.searchInput.setValue('Tho');
    socialGraphPage.animatedSocialGraphSection.firstSearchResultSuggestion.click();
    socialGraphPage.animatedSocialGraphSection.searchInput.getValue().should.equal('Thomas Kampenga');
  });
});


