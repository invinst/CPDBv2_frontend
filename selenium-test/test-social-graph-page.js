'use strict';


require('should');

import { map, countBy, filter } from 'lodash';
import moment from 'moment/moment';

import socialGraphPage from './page-objects/social-graph-page';


function waitForGraphAnimationEnd(browser, socialGraphPage, endDate='2008-01-11') {
  browser.waitUntil(function () {
    return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === endDate;
  }, 3000, 'expected timeline reaches end date after 1.65s');
}

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
    waitForGraphAnimationEnd(browser, socialGraphPage);

    const graphNodes = socialGraphPage.animatedSocialGraphSection.graphNodes();
    const graphLinks = socialGraphPage.animatedSocialGraphSection.graphLinks();
    const graphLabels = socialGraphPage.animatedSocialGraphSection.graphLabels();

    graphNodes.should.have.length(20);
    graphLinks.should.have.length(37);
    graphLabels.should.have.length(5);

    const nodeGroupColors = countBy(map(
      graphNodes,
      (graphNode) => graphNode.getCssProperty('fill').value
    ));
    const expectedNodeGroupColors = {
      'rgb(253,94,76)': 6,
      'rgb(244,162,152)': 6,
      'rgb(249,211,195)': 5,
      'rgb(243,42,41)': 1,
      'rgb(255,80,80)': 1,
      'rgb(243,173,173)': 1,
    };
    nodeGroupColors.should.eql(expectedNodeGroupColors);

    const linkGroupColors = countBy(map(
      graphLinks,
      (graphLink) => graphLink.getAttribute('class').match(/link-group-color-[\d]/)
    ));

    const expectedlinkGroupColors = {
      'link-group-color-1': 6,
      'link-group-color-2': 6,
      'link-group-color-3': 6,
      'link-group-color-4': 6,
      'link-group-color-5': 6,
      'link-group-color-6': 7,
    };

    linkGroupColors.should.eql(expectedlinkGroupColors);

    const graphLabelTexts = map(
      graphLabels,
      (graphLabel) => graphLabel.getText()
    );

    const expectedGraphLabelTexts = [
      'Donnell Calhoun',
      'Eugene Offett',
      'Johnny Cavers',
      'Melvin Ector',
      'Thomas Kampenga'
    ];

    graphLabelTexts.sort().should.eql(expectedGraphLabelTexts);
  });

  it('should show connected nodes when double click on a node', function () {
    waitForGraphAnimationEnd(browser, socialGraphPage);

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
    waitForGraphAnimationEnd(browser, socialGraphPage);

    browser.moveToObject(socialGraphPage.animatedSocialGraphSection.biggestGraphNode.selector);
    socialGraphPage.animatedSocialGraphSection.tooltip.getText().should.equal('Donnell Calhoun');
  });

  it('should pause timeline when click on toggle timeline button', function () {
    const toggleTimelineButton = socialGraphPage.animatedSocialGraphSection.toggleTimelineButton;

    waitForGraphAnimationEnd(browser, socialGraphPage);
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
      return middleDays.indexOf(socialGraphPage.animatedSocialGraphSection.currentDate.getText()) !== -1;
    });

    toggleTimelineButton.click();
    toggleTimelineButton.getAttribute('class').should.equal('toggle-timeline-btn play-icon');

    toggleTimelineButton.click();
    waitForGraphAnimationEnd(browser, socialGraphPage);
  });

  it('should change the graph when click on specific part of the timeline', function () {
    waitForGraphAnimationEnd(browser, socialGraphPage);
    socialGraphPage.animatedSocialGraphSection.graphNodes().should.have.length(20);
    socialGraphPage.animatedSocialGraphSection.graphLinks().should.have.length(37);

    browser.moveToObject(socialGraphPage.animatedSocialGraphSection.timelineSlider.selector);
    browser.buttonPress();
    socialGraphPage.animatedSocialGraphSection.graphNodes().should.have.length(20);
    socialGraphPage.animatedSocialGraphSection.graphLinks().should.have.length(14);
    const graphNodes = socialGraphPage.animatedSocialGraphSection.graphNodes();
    const groupsColors = countBy(map(
      graphNodes,
      (graphNode) => graphNode.getCssProperty('fill').value
    ));
    const expectedGroupsColors = {
      'rgb(253,94,76)': 6,
      'rgb(244,162,152)': 6,
      'rgb(249,211,195)': 5,
      'rgb(243,42,41)': 1,
      'rgb(255,80,80)': 1,
      'rgb(243,173,173)': 1,
    };
    groupsColors.should.eql(expectedGroupsColors);
  });

  it('should load new data when change threshold and complaintOrigin', function () {
    waitForGraphAnimationEnd(browser, socialGraphPage);
    socialGraphPage.animatedSocialGraphSection.complaintOriginSelected.getText().should.eql('CIVILIAN');
    socialGraphPage.animatedSocialGraphSection.startDate.getText().should.eql('1990-01-09');
    socialGraphPage.animatedSocialGraphSection.endDate.getText().should.eql('2008-01-11');
    socialGraphPage.animatedSocialGraphSection.graphNodes().should.have.length(20);
    socialGraphPage.animatedSocialGraphSection.graphLinks().should.have.length(37);

    socialGraphPage.animatedSocialGraphSection.complaintOriginOfficer.click();
    waitForGraphAnimationEnd(browser, socialGraphPage, '1992-03-08');
    socialGraphPage.animatedSocialGraphSection.complaintOriginSelected.getText().should.eql('OFFICER');
    socialGraphPage.animatedSocialGraphSection.startDate.getText().should.eql('1990-01-09');
    socialGraphPage.animatedSocialGraphSection.endDate.getText().should.eql('1992-03-08');
    socialGraphPage.animatedSocialGraphSection.graphNodes().should.have.length(20);
    socialGraphPage.animatedSocialGraphSection.graphLinks().should.have.length(3);

    socialGraphPage.animatedSocialGraphSection.complaintOriginAll.click();
    waitForGraphAnimationEnd(browser, socialGraphPage, '2009-01-11');
    socialGraphPage.animatedSocialGraphSection.complaintOriginSelected.getText().should.eql('ALL');
    socialGraphPage.animatedSocialGraphSection.startDate.getText().should.eql('1990-01-09');
    socialGraphPage.animatedSocialGraphSection.endDate.getText().should.eql('2009-01-11');
    socialGraphPage.animatedSocialGraphSection.graphNodes().should.have.length(20);
    socialGraphPage.animatedSocialGraphSection.graphLinks().should.have.length(38);

    browser.moveToObject(socialGraphPage.animatedSocialGraphSection.coaccusalsThresholdSlider.selector, 140, 7);
    browser.buttonPress();
    waitForGraphAnimationEnd(browser, socialGraphPage);
    socialGraphPage.animatedSocialGraphSection.graphNodes().should.have.length(20);
    socialGraphPage.animatedSocialGraphSection.graphLinks().should.have.length(15);
  });

  it('should render geographic section when clicking on geographic button', function () {
    socialGraphPage.animatedSocialGraphSection.mainTabs.waitForVisible();
    socialGraphPage.animatedSocialGraphSection.geographicTab.click();
    socialGraphPage.geographicSection.complaintText.getText().should.eql('Complaint');
    socialGraphPage.geographicSection.complaintNumber.getText().should.eql('5');
    socialGraphPage.geographicSection.trrText.getText().should.eql('Use of Force Report');
    socialGraphPage.geographicSection.trrNumber.getText().should.eql('2');

    socialGraphPage.animatedSocialGraphSection.networkTab.click();
    waitForGraphAnimationEnd(browser, socialGraphPage);
  });

  it('should render officer preview pane when clicking on the officer row', function () {
    waitForGraphAnimationEnd(browser, socialGraphPage);
    socialGraphPage.animatedSocialGraphSection.officerTab.click();
    socialGraphPage.officersSection.officerRowCount().should.eql(20);
    socialGraphPage.officersSection.firstOfficerRow.click();
    socialGraphPage.officersSection.officerPreviewPane.waitForVisible();
    socialGraphPage.officersSection.officerName.getText().should.eql('Bennie Watson');

    socialGraphPage.animatedSocialGraphSection.leftSection.click();
    socialGraphPage.officersSection.officerPreviewPane.waitForVisible(1000, true);
  });

  it('should render officer preview pane when clicking on the officer node', function () {
    waitForGraphAnimationEnd(browser, socialGraphPage);
    socialGraphPage.animatedSocialGraphSection.officerTab.click();
    socialGraphPage.officersSection.officerRowCount().should.eql(20);
    socialGraphPage.animatedSocialGraphSection.biggestGraphNode.click();
    socialGraphPage.officersSection.officerPreviewPane.waitForVisible();
    socialGraphPage.officersSection.officerName.getText().should.eql('Donnell Calhoun');

    socialGraphPage.animatedSocialGraphSection.leftSection.click();
    socialGraphPage.officersSection.officerPreviewPane.waitForVisible(1000, true);
  });

  it('should render timeline section when clicking on timeline tab', function () {
    waitForGraphAnimationEnd(browser, socialGraphPage);
    socialGraphPage.timelineSection.allegationRowCount().should.eql(64);

    socialGraphPage.timelineSection.firstAllegationYear.getText().should.eql('1990');
    socialGraphPage.timelineSection.firstAllegationCategory.getText().should.eql('Use Of Force');
    socialGraphPage.timelineSection.firstAllegationSubcategory.getText().should.eql(
      'Excessive Force / On Duty - Injury'
    );
    socialGraphPage.timelineSection.firstAllegationDate.getText().should.eql('JAN 9');
  });

  it('should scroll to last timeline item(s) when slider reach the end', function () {
    socialGraphPage.animatedSocialGraphSection.rightPaneSectionMenu.waitForVisible();
    waitForGraphAnimationEnd(browser, socialGraphPage);
    const formattedCurrentDate = moment(
      socialGraphPage.animatedSocialGraphSection.currentDate.getText()
    ).format('MMM D').toUpperCase();
    formattedCurrentDate.should.eql('JAN 11');
    socialGraphPage.timelineSection.timelineItemDateActive.getText().should.eql(formattedCurrentDate);
  });

  it('should scroll to specific timeline item(s) when click on slider', function () {
    socialGraphPage.animatedSocialGraphSection.rightPaneSectionMenu.waitForVisible();
    waitForGraphAnimationEnd(browser, socialGraphPage);
    browser.moveToObject(socialGraphPage.animatedSocialGraphSection.timelineSlider.selector);
    browser.buttonPress();
    const formattedCurrentDate = moment(
      socialGraphPage.animatedSocialGraphSection.currentDate.getText()
    ).format('MMM D').toUpperCase();
    formattedCurrentDate.should.eql('APR 17');
    socialGraphPage.timelineSection.timelineItemDateActive.getText().should.eql(formattedCurrentDate);
  });

  it('should go to corresponding slider event when scroll to specific timeline item(s)', function () {
    socialGraphPage.animatedSocialGraphSection.rightPaneSectionMenu.waitForVisible();
    waitForGraphAnimationEnd(browser, socialGraphPage);
    browser.moveToObject(socialGraphPage.timelineSection.allegationItem.selector);
    browser.waitUntil(function () {
      return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === '1992-03-08';
    }, 3000);
    const formattedCurrentDate = moment(
      socialGraphPage.animatedSocialGraphSection.currentDate.getText()
    ).format('MMM D').toUpperCase();
    formattedCurrentDate.should.eql('MAR 8');
    socialGraphPage.timelineSection.timelineItemDateActive.getText().should.eql(formattedCurrentDate);
  });

  it('should go to corresponding slider event when scroll after switch back from OfficerTab', function () {
    socialGraphPage.animatedSocialGraphSection.rightPaneSectionMenu.waitForVisible();
    waitForGraphAnimationEnd(browser, socialGraphPage);

    socialGraphPage.animatedSocialGraphSection.officerTab.click();
    socialGraphPage.officersSection.officerRowCount().should.eql(20);

    socialGraphPage.animatedSocialGraphSection.timelineTab.click();
    browser.waitUntil(function () {
      return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === '2008-01-11';
    }, 3000);
    let formattedCurrentDate = moment(
      socialGraphPage.animatedSocialGraphSection.currentDate.getText()
    ).format('MMM D').toUpperCase();
    formattedCurrentDate.should.eql('JAN 11');
    socialGraphPage.timelineSection.timelineItemDateActive.getText().should.eql(formattedCurrentDate);

    browser.moveToObject(socialGraphPage.timelineSection.allegationItem.selector);

    browser.waitUntil(function () {
      return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === '1992-03-08';
    }, 3000);
    formattedCurrentDate = moment(
      socialGraphPage.animatedSocialGraphSection.currentDate.getText()
    ).format('MMM D').toUpperCase();
    formattedCurrentDate.should.eql('MAR 8');
    socialGraphPage.timelineSection.timelineItemDateActive.getText().should.eql(formattedCurrentDate);
  });
});
