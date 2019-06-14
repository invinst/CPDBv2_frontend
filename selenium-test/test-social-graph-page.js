'use strict';


require('should');

import { map, countBy, isEqual, filter } from 'lodash';
import moment from 'moment/moment';

import socialGraphPage from './page-objects/social-graph-page';


function waitForGraphAnimationEnd(browser, socialGraphPage) {
  browser.waitUntil(function () {
    return socialGraphPage.animatedSocialGraphSection.currentDate.getText() === '2008-01-11';
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
    graphLinks.should.have.length(38);
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
      'link-group-color-3': 7,
      'link-group-color-4': 6,
      'link-group-color-5': 6,
      'link-group-color-6': 7,
    };

    linkGroupColors.should.eql(expectedlinkGroupColors);

    let graphLabelTexts = map(
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

    const updatedExpectedGraphLabelTexts = [
      'Charles Toussas',
      'David Portis',
      'Donnell Calhoun',
      'John Hart',
      'Thomas Kampenga',
    ];

    graphLabelTexts.sort().should.eql(expectedGraphLabelTexts);

    browser.moveToObject(socialGraphPage.animatedSocialGraphSection.timelineSlider.selector);
    browser.buttonPress();

    graphLabelTexts = map(
      graphLabels,
      (graphLabel) => graphLabel.getText()
    );
    graphLabelTexts.sort().should.eql(updatedExpectedGraphLabelTexts);
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
    hideGraphLinks.should.have.length(28);
    visibleGraphLinks.should.have.length(10);

    biggestNode.doubleClick();

    hideGraphNodes = filter(graphNodes, graphNode => graphNode.getCssProperty('opacity').value === 0.1);
    visibleGraphNodes = filter(graphNodes, graphNode => graphNode.getCssProperty('opacity').value === 1);
    hideGraphNodes.should.have.length(0);
    visibleGraphNodes.should.have.length(20);

    hideGraphLinks = filter(graphLinks, graphLink => graphLink.getCssProperty('opacity').value === 0.1);
    visibleGraphLinks = filter(graphLinks, graphLink => graphLink.getCssProperty('opacity').value === 1);
    hideGraphLinks.should.have.length(0);
    visibleGraphLinks.should.have.length(38);
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
    socialGraphPage.animatedSocialGraphSection.graphLinks().should.have.length(38);

    browser.moveToObject(socialGraphPage.animatedSocialGraphSection.timelineSlider.selector);
    browser.buttonPress();
    socialGraphPage.animatedSocialGraphSection.graphNodes().should.have.length(20);
    socialGraphPage.animatedSocialGraphSection.graphLinks().should.have.length(13);
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

  it('should load new data when change threshold and showCivilOnly', function () {
    waitForGraphAnimationEnd(browser, socialGraphPage);
    socialGraphPage.animatedSocialGraphSection.graphNodes().should.have.length(20);
    socialGraphPage.animatedSocialGraphSection.graphLinks().should.have.length(38);

    socialGraphPage.animatedSocialGraphSection.showCivilComplaintOnlyCheckbox.click();
    waitForGraphAnimationEnd(browser, socialGraphPage);
    socialGraphPage.animatedSocialGraphSection.graphNodes().should.have.length(20);
    socialGraphPage.animatedSocialGraphSection.graphLinks().should.have.length(39);

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

  it('should render officer name when hovering on officer node', function () {
    waitForGraphAnimationEnd(browser, socialGraphPage);
    browser.moveToObject(socialGraphPage.animatedSocialGraphSection.biggestGraphNode.selector);
    socialGraphPage.animatedSocialGraphSection.officerTip.getText().should.eql('Donnell Calhoun');

    socialGraphPage.animatedSocialGraphSection.biggestGraphNode.click();
    socialGraphPage.animatedSocialGraphSection.selectedNodeLabel.getText().should.eql('Donnell Calhoun');
    socialGraphPage.animatedSocialGraphSection.officerTip.waitForVisible(1000, true);

    socialGraphPage.animatedSocialGraphSection.anotherGraphNode.click();
    socialGraphPage.animatedSocialGraphSection.selectedNodeLabel.getText().should.eql('William Roberison');
    browser.moveToObject(socialGraphPage.animatedSocialGraphSection.biggestGraphNode.selector);
    socialGraphPage.animatedSocialGraphSection.officerTip.getText().should.eql('Donnell Calhoun');

    socialGraphPage.animatedSocialGraphSection.leftSection.click();
    socialGraphPage.animatedSocialGraphSection.selectedNodeLabel.waitForVisible(1000, true);
    browser.moveToObject(socialGraphPage.animatedSocialGraphSection.anotherGraphNode.selector);
    socialGraphPage.animatedSocialGraphSection.officerTip.getText().should.eql('William Roberison');
  });

  it('should render officer preview pane when clicking on the officer row', function () {
    waitForGraphAnimationEnd(browser, socialGraphPage);
    socialGraphPage.animatedSocialGraphSection.officerTab.click();
    socialGraphPage.officersSection.officerRowCount().should.eql(20);
    socialGraphPage.officersSection.firstOfficerRow.click();
    socialGraphPage.previewPaneSection.previewPane.waitForVisible();
    socialGraphPage.previewPaneSection.officerPreviewPaneName.getText().should.eql('Bennie Watson');

    socialGraphPage.animatedSocialGraphSection.leftSection.click();
    socialGraphPage.previewPaneSection.previewPane.waitForVisible(1000, true);
  });

  it('should render officer preview pane and officer name when clicking on the officer node', function () {
    waitForGraphAnimationEnd(browser, socialGraphPage);
    socialGraphPage.animatedSocialGraphSection.officerTab.click();
    socialGraphPage.officersSection.officerRowCount().should.eql(20);
    socialGraphPage.animatedSocialGraphSection.biggestGraphNode.click();
    socialGraphPage.previewPaneSection.previewPane.waitForVisible();

    socialGraphPage.animatedSocialGraphSection.leftSection.click();
    socialGraphPage.previewPaneSection.previewPane.waitForVisible(1000, true);
  });

  it('should render timeline section and show preview pane when click on timeline item', function () {
    waitForGraphAnimationEnd(browser, socialGraphPage);
    socialGraphPage.timelineSection.allegationRowCount().should.eql(83);

    socialGraphPage.timelineSection.firstYearItem.getText().should.eql('1990');
    socialGraphPage.timelineSection.firstAllegationCategory.getText().should.eql('Use Of Force');
    socialGraphPage.timelineSection.firstAllegationSubcategory.getText().should.eql(
      'Excessive Force / On Duty - Injury'
    );
    socialGraphPage.timelineSection.firstAllegationDate.getText().should.eql('JAN 9');

    socialGraphPage.timelineSection.firstAllegationItem.click();

    socialGraphPage.previewPaneSection.crPreviewPaneTitle.getText().should.eql('Use Of Force');
    socialGraphPage.previewPaneSection.crPreviewPaneSubtitle.getText().should.eql('Excessive Force / On Duty - Injury');
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

  it('should render edge coaccusals preview pane when clicking on officer edge', function () {
    socialGraphPage.animatedSocialGraphSection.rightPaneSectionMenu.waitForVisible();
    waitForGraphAnimationEnd(browser, socialGraphPage);

    function waitUntilEdgeNotMoving(edge) {
      let edgePosition = {};
      browser.waitUntil(function () {
        const newEdgePosition = {
          x1: edge.getAttribute('x1'),
          x2: edge.getAttribute('x2'),
          y1: edge.getAttribute('y1'),
          y2: edge.getAttribute('y2'),
        };
        const result = isEqual(newEdgePosition, edgePosition);
        edgePosition = newEdgePosition;
        return result;
      }, 20000);
    }

    browser.execute(() => {
      const currentLinks = document.getElementsByClassName('current-link');
      for (let i = 0; i < currentLinks.length; i++) {
        currentLinks[i].style['stroke-width'] = '8px';
      }
    });
    const firstCurrentEdge = socialGraphPage.animatedSocialGraphSection.firstCurrentEdge;
    waitUntilEdgeNotMoving(firstCurrentEdge);

    firstCurrentEdge.getAttribute('class').should.not.containEql('edge-hover');
    browser.moveToObject(firstCurrentEdge.selector);
    firstCurrentEdge.getAttribute('class').should.containEql('edge-hover');

    socialGraphPage.animatedSocialGraphSection.firstCurrentEdge.click();
    socialGraphPage.animatedSocialGraphSection.selectedEdgeLabel.getText().should.eql('2 coaccusals');
    socialGraphPage.previewPaneSection.edgePreviewPaneHeader.getText().should.eql(
      'Matthew Brandon & William Roberison\'s 2 coaccusals'
    );
    let edgeCoaccusalsItems = socialGraphPage.previewPaneSection.edgeCoaccusalsItems();
    edgeCoaccusalsItems.should.have.length(4);
    edgeCoaccusalsItems[0].getText().should.eql('1990');
    edgeCoaccusalsItems[1].getText().should.containEql('JAN 9');
    edgeCoaccusalsItems[1].getText().should.containEql('Use Of Force');
    edgeCoaccusalsItems[2].getText().should.eql('1991');
    edgeCoaccusalsItems[3].getText().should.containEql('JUL 6');
    edgeCoaccusalsItems[3].getText().should.containEql('Criminal Misconduct');

    socialGraphPage.animatedSocialGraphSection.biggestGraphNode.click();
    socialGraphPage.animatedSocialGraphSection.selectedNodeLabel.getText().should.eql('Donnell Calhoun');
    socialGraphPage.animatedSocialGraphSection.officerTip.waitForVisible(1000, true);
    socialGraphPage.previewPaneSection.previewPane.waitForVisible();

    waitUntilEdgeNotMoving(socialGraphPage.animatedSocialGraphSection.secondCurrentEdge);

    socialGraphPage.animatedSocialGraphSection.secondCurrentEdge.click();
    socialGraphPage.animatedSocialGraphSection.selectedEdgeLabel.getText().should.eql('4 coaccusals');
    socialGraphPage.previewPaneSection.edgePreviewPaneHeader.getText().should.eql(
      'Joseph Blaye & Tracy Hughes\'s 4 coaccusals'
    );

    edgeCoaccusalsItems = socialGraphPage.previewPaneSection.edgeCoaccusalsItems();

    edgeCoaccusalsItems.should.have.length(6);
    edgeCoaccusalsItems[0].getText().should.eql('1992');
    edgeCoaccusalsItems[1].getText().should.containEql('JUL 18');
    edgeCoaccusalsItems[1].getText().should.containEql('Operation/Personnel Violations');
    edgeCoaccusalsItems[2].getText().should.eql('1993');
    edgeCoaccusalsItems[3].getText().should.containEql('MAR 28');
    edgeCoaccusalsItems[3].getText().should.containEql('Lockup Procedures');
    edgeCoaccusalsItems[4].getText().should.containEql('APR 3');
    edgeCoaccusalsItems[4].getText().should.containEql('Operation/Personnel Violations');
    edgeCoaccusalsItems[5].getText().should.containEql('JUN 9');
    edgeCoaccusalsItems[5].getText().should.containEql('Illegal Search');

    socialGraphPage.timelineSection.firstAllegationItem.click();

    socialGraphPage.previewPaneSection.crPreviewPaneTitle.getText().should.eql('Operation/Personnel Violations');
    socialGraphPage.previewPaneSection.crPreviewPaneSubtitle.getText().should.eql('Inventory Procedures');

    socialGraphPage.animatedSocialGraphSection.leftSection.click();

    socialGraphPage.previewPaneSection.edgePreviewPaneHeader.getText().should.eql(
      'Joseph Blaye & Tracy Hughes\'s 4 coaccusals'
    );

    socialGraphPage.animatedSocialGraphSection.leftSection.click();
    socialGraphPage.previewPaneSection.previewPane.waitForVisible(1000, true);
  });
});
