'use strict';

require('should');

import { map, countBy, values } from 'lodash';

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
    socialGraphPage.animatedSocialGraphSection.nodeCount().should.equal(20);
    socialGraphPage.animatedSocialGraphSection.linkCount().should.equal(37);

    const graphNodes = browser.elements(socialGraphPage.animatedSocialGraphSection.graphNodes.selector).value;
    const groupsColors = map(
      graphNodes,
      (graphNode) => graphNode.getCssProperty('fill').value
    );
    const groupsCount = values(countBy(groupsColors));
    groupsCount.sort((a, b) => a - b).should.eql([3, 3, 3, 4, 7]);
  });

  it('should pause timeline when click on toggle timeline button', function () {
    browser.waitUntil(function () {
      return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === '1994-01-09';
    }, 10000, 'expected timeline reaches specific date after 10s', 50);
    socialGraphPage.animatedSocialGraphSection.toggleTimelineButton.click();
    socialGraphPage.animatedSocialGraphSection.nodeCount().should.equal(20);
    socialGraphPage.animatedSocialGraphSection.linkCount().should.equal(8);

    socialGraphPage.animatedSocialGraphSection.toggleTimelineButton.click();
    browser.waitUntil(function () {
      return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === '2008-01-11';
    }, 15000, 'expected timeline reaches specific date after 15s');
    socialGraphPage.animatedSocialGraphSection.nodeCount().should.equal(20);
    socialGraphPage.animatedSocialGraphSection.linkCount().should.equal(37);
  });

  it('should change the graph when click on specific part of the timeline', function () {
    browser.waitUntil(function () {
      return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === '2008-01-11';
    }, 15000, 'expected timeline reaches specific date after 15s');
    socialGraphPage.animatedSocialGraphSection.nodeCount().should.equal(20);
    socialGraphPage.animatedSocialGraphSection.linkCount().should.equal(37);

    browser.moveToObject(socialGraphPage.animatedSocialGraphSection.timelineSlider.selector);
    browser.buttonPress();
    socialGraphPage.animatedSocialGraphSection.nodeCount().should.equal(20);
    socialGraphPage.animatedSocialGraphSection.linkCount().should.equal(18);
    const graphNodes = browser.elements(socialGraphPage.animatedSocialGraphSection.graphNodes.selector).value;
    const groupsColors = map(
      graphNodes,
      (graphNode) => graphNode.getCssProperty('fill').value
    );
    const groupsCount = values(countBy(groupsColors));
    groupsCount.sort((a, b) => a - b).should.eql([3, 6, 11]);
  });

  it('should load new data when change threshold and showCivilOnly', function () {
    browser.waitUntil(function () {
      return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === '2008-01-11';
    }, 15000, 'expected timeline reaches end date after 15s');
    socialGraphPage.animatedSocialGraphSection.nodeCount().should.equal(20);
    socialGraphPage.animatedSocialGraphSection.linkCount().should.equal(37);

    socialGraphPage.animatedSocialGraphSection.showCivilComplaintOnlyCheckbox.click();
    browser.waitUntil(function () {
      return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === '2008-01-11';
    }, 15000, 'expected timeline reaches end date after 15s');
    socialGraphPage.animatedSocialGraphSection.nodeCount().should.equal(20);
    socialGraphPage.animatedSocialGraphSection.linkCount().should.equal(31);

    browser.moveToObject(socialGraphPage.animatedSocialGraphSection.coaccusalsThresholdSlider.selector, 140, 7);
    browser.buttonPress();
    browser.waitUntil(function () {
      return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === '2008-01-11';
    }, 15000, 'expected timeline reaches end date after 15s');
    socialGraphPage.animatedSocialGraphSection.nodeCount().should.equal(20);
    socialGraphPage.animatedSocialGraphSection.linkCount().should.equal(16);
  });

  it('should be able to search', function () {
    socialGraphPage.animatedSocialGraphSection.searchInput.setValue('Tho');
    socialGraphPage.animatedSocialGraphSection.firstSearchResultSuggestion.click();
    socialGraphPage.animatedSocialGraphSection.searchInput.getValue().should.equal('Thomas Kampenga');
  });
});


