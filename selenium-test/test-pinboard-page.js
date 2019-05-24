'use strict';

require('should');
import { map, countBy, values, filter, times } from 'lodash';

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
    browser.element('.search-page').waitForVisible();
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
      pinboardPage.pinboardSection.title.getValue().should.equal('Pinboard Title');
      pinboardPage.pinboardSection.description.getValue().should.equal('Pinboard Description');
      const pinboardPaneMenuText = pinboardPage.pinboardSection.pinboardPaneMenu.getText();
      pinboardPaneMenuText.should.containEql('NETWORK');
      pinboardPaneMenuText.should.containEql('GEOGRAPHIC');
    });

    it('should update title and description after editing and out focusing them', function () {
      pinboardPage.pinboardSection.title.getValue().should.equal('Pinboard Title');
      pinboardPage.pinboardSection.description.getValue().should.equal('Pinboard Description');
      pinboardPage.pinboardSection.pinboardPaneMenu.waitForVisible();
      pinboardPage.pinboardSection.title.click();
      pinboardPage.pinboardSection.title.setValue('Updated Title');
      pinboardPage.pinboardSection.description.click();
      pinboardPage.pinboardSection.description.setValue('Updated Description');
      pinboardPage.pinboardSection.networkPaneName.click();
      pinboardPage.pinboardSection.title.getValue().should.equal('Updated Title');
      pinboardPage.pinboardSection.description.getValue().should.equal('Updated Description');
    });
  });

  context('social graph section', function () {
    it('should render correctly', function () {
      pinboardPage.animatedSocialGraphSection.startDate.getText().should.equal('1990-01-09');
      pinboardPage.animatedSocialGraphSection.endDate.getText().should.equal('2008-01-11');
      waitForGraphAnimationEnd(browser, pinboardPage);

      const graphNodes = pinboardPage.animatedSocialGraphSection.graphNodes();
      const graphLinks = pinboardPage.animatedSocialGraphSection.graphLinks();
      const graphLabels = pinboardPage.animatedSocialGraphSection.graphLabels();

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

    it('should render geographic section', function () {
      pinboardPage.pinboardSection.pinboardPaneMenu.waitForVisible();
      pinboardPage.pinboardSection.geographicPaneName.click();
      pinboardPage.geographicSection.complaintText.getText().should.equal('Complaint');
      pinboardPage.geographicSection.complaintNumber.getText().should.equal('5');
      pinboardPage.geographicSection.trrText.getText().should.equal('Use of Force Report');
      pinboardPage.geographicSection.trrNumber.getText().should.equal('2');
    });
  });

  context('Geographic section', function () {
    it('should render geographic section', function () {
      pinboardPage.pinboardSection.pinboardPaneMenu.waitForVisible();
      pinboardPage.pinboardSection.geographicPaneName.click();
      pinboardPage.geographicSection.complaintText.getText().should.equal('Complaint');
      pinboardPage.geographicSection.complaintNumber.getText().should.equal('5');
      pinboardPage.geographicSection.trrText.getText().should.equal('Use of Force Report');
      pinboardPage.geographicSection.trrNumber.getText().should.equal('2');
    });
  });

  context('relevant coaccusals section', function () {
    it('should render coaccusal cards', function () {
      pinboardPage.relevantCoaccusalsSection.title.getText().should.equal('COACCUSALS');

      pinboardPage.relevantCoaccusalsSection.coaccusalCards().should.have.length(20);
      pinboardPage.relevantCoaccusalsSection.leftArrow.waitForExist(1000, true);
      pinboardPage.relevantCoaccusalsSection.rightArrow.waitForExist(1000);

      const firstCoaccusalCard = pinboardPage.relevantCoaccusalsSection.coaccusalCardSection;
      firstCoaccusalCard.plusButton.waitForExist(1000);
      firstCoaccusalCard.radarChart.waitForExist(1000);
      firstCoaccusalCard.officerRank.getText().should.equal('Detective');
      firstCoaccusalCard.officerName.getText().should.equal('Richard Sullivan');
      firstCoaccusalCard.coaccusalCount.getText().should.equal('53 coaccusals');
    });

    it('should request more when clicking on right arrow', function () {
      pinboardPage.relevantCoaccusalsSection.leftArrow.waitForExist(1000, true);
      pinboardPage.relevantCoaccusalsSection.rightArrow.waitForExist(1000);

      pinboardPage.relevantCoaccusalsSection.coaccusalCards().should.have.length(20);

      pinboardPage.relevantCoaccusalsSection.rightArrow.click();
      pinboardPage.relevantCoaccusalsSection.leftArrow.waitForExist(1000);

      pinboardPage.relevantCoaccusalsSection.leftArrow.click();
      pinboardPage.relevantCoaccusalsSection.leftArrow.waitForExist(1000, true);

      times(5, () => pinboardPage.relevantCoaccusalsSection.rightArrow.click());
      pinboardPage.relevantCoaccusalsSection.rightArrow.waitForExist(1000);
      pinboardPage.relevantCoaccusalsSection.coaccusalCards().should.have.length(40);

      times(4, () => pinboardPage.relevantCoaccusalsSection.rightArrow.click());
      pinboardPage.relevantCoaccusalsSection.coaccusalCards().should.have.length(50);
      pinboardPage.relevantCoaccusalsSection.rightArrow.waitForExist(1000, true);
    });

    it('should go to officer page when clicking on officer name section', function () {
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.nameWrapper.click();
      browser.pause(500);
      browser.getUrl().should.match(/\/officer\/123\/richard-sullivan\/$/);
    });

    it('should go to officer page when clicking on coaccusal cont section', function () {
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.coaccusalCount.click();
      browser.pause(500);
      browser.getUrl().should.match(/\/officer\/123\/richard-sullivan\/$/);
    });
  });

  context('relevant documents section', function () {
    it('should render document cards', function () {
      pinboardPage.relevantDocumentsSection.title.getText().should.equal('DOCUMENTS');

      pinboardPage.relevantDocumentsSection.documentCards().should.have.length(20);
      pinboardPage.relevantDocumentsSection.leftArrow.waitForExist(1000, true);
      pinboardPage.relevantDocumentsSection.rightArrow.waitForExist(1000);

      const firstDocumentCard = pinboardPage.relevantDocumentsSection.documentCardSection;
      firstDocumentCard.plusButton.waitForExist(1000);
      firstDocumentCard.incidentDate.getText().should.equal('Apr 23, 2004');
      firstDocumentCard.category.getText().should.equal('Lockup Procedures');
      firstDocumentCard.firstTopOfficerName.getText().should.equal('R. Sullivan');
      firstDocumentCard.secondTopOfficerName.getText().should.equal('B. Lopez');
      firstDocumentCard.notShowingOfficerCount.getText().should.equal('3+');
    });

    it('should request more when clicking on right arrow', function () {
      pinboardPage.relevantDocumentsSection.leftArrow.waitForExist(1000, true);
      pinboardPage.relevantDocumentsSection.rightArrow.waitForExist(1000);

      pinboardPage.relevantDocumentsSection.documentCards().should.have.length(20);

      pinboardPage.relevantDocumentsSection.rightArrow.click();
      pinboardPage.relevantDocumentsSection.leftArrow.waitForExist(1000);

      pinboardPage.relevantDocumentsSection.leftArrow.click();
      pinboardPage.relevantDocumentsSection.leftArrow.waitForExist(1000, true);

      times(12, () => pinboardPage.relevantDocumentsSection.rightArrow.click());
      pinboardPage.relevantDocumentsSection.rightArrow.waitForExist(1000);
      pinboardPage.relevantDocumentsSection.documentCards().should.have.length(40);

      times(12, () => pinboardPage.relevantDocumentsSection.rightArrow.click());
      pinboardPage.relevantDocumentsSection.documentCards().should.have.length(50);
      pinboardPage.relevantDocumentsSection.rightArrow.waitForExist(1000, true);
    });
  });

  context('relevant complaints section', function () {
    it('should render complaint cards', function () {
      pinboardPage.relevantComplaintsSection.title.getText().should.equal('COMPLAINTS');

      pinboardPage.relevantComplaintsSection.complaintCards().should.have.length(20);
      pinboardPage.relevantComplaintsSection.leftArrow.waitForExist(1000, true);
      pinboardPage.relevantComplaintsSection.rightArrow.waitForExist(1000);

      const firstComplaintCard = pinboardPage.relevantComplaintsSection.complaintCardSection;
      firstComplaintCard.plusButton.waitForExist(1000);
      firstComplaintCard.incidentDate.getText().should.equal('Apr 23, 2004');
      firstComplaintCard.category.getText().should.equal('Lockup Procedures');
      firstComplaintCard.firstTopOfficerName.getText().should.equal('R. Sullivan');
      firstComplaintCard.secondTopOfficerName.getText().should.equal('B. Lopez');
      firstComplaintCard.notShowingOfficerCount.getText().should.equal('3+');
    });

    it('should request more when clicking on right arrow', function () {
      pinboardPage.relevantComplaintsSection.leftArrow.waitForExist(1000, true);
      pinboardPage.relevantComplaintsSection.rightArrow.waitForExist(1000);

      pinboardPage.relevantComplaintsSection.complaintCards().should.have.length(20);

      pinboardPage.relevantComplaintsSection.rightArrow.click();
      pinboardPage.relevantComplaintsSection.leftArrow.waitForExist(1000);

      pinboardPage.relevantComplaintsSection.leftArrow.click();
      pinboardPage.relevantComplaintsSection.leftArrow.waitForExist(1000, true);

      times(12, () => pinboardPage.relevantComplaintsSection.rightArrow.click());
      pinboardPage.relevantComplaintsSection.rightArrow.waitForExist(1000);
      pinboardPage.relevantComplaintsSection.complaintCards().should.have.length(40);

      times(12, () => pinboardPage.relevantComplaintsSection.rightArrow.click());
      pinboardPage.relevantComplaintsSection.complaintCards().should.have.length(50);
      pinboardPage.relevantComplaintsSection.rightArrow.waitForExist(1000, true);
    });

    it('should go to complaint page when clicking on incident date', function () {
      pinboardPage.relevantComplaintsSection.complaintCardSection.incidentDate.click();
      browser.pause(500);
      browser.getUrl().should.match(/\/complaint\/1071234\/$/);
    });

    it('should go to complaint page when clicking on top officers', function () {
      pinboardPage.relevantComplaintsSection.complaintCardSection.topOfficers.click();
      browser.pause(500);
      browser.getUrl().should.match(/\/complaint\/1071234\/$/);
    });

    it('should go to complaint page when clicking on remaining officers', function () {
      pinboardPage.relevantComplaintsSection.complaintCardSection.remainingOfficers.click();
      browser.pause(500);
      browser.getUrl().should.match(/\/complaint\/1071234\/$/);
    });

    it('should go to complaint page when clicking on left half of a complaint card', function () {
      pinboardPage.relevantComplaintsSection.complaintCardSection.leftHalf.click();
      browser.pause(500);
      browser.getUrl().should.match(/\/complaint\/1071234\/$/);
    });
  });
});
