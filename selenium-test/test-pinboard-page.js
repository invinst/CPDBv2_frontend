'use strict';

require('should');
import { map, countBy, filter } from 'lodash';

import pinboardPage from './page-objects/pinboard-page';
import { switchToRecentTab } from './utils';


function waitForGraphAnimationEnd(browser, pinboardPage) {
  browser.waitUntil(function () {
    return pinboardPage.animatedSocialGraphSection.currentDate.getText() === '2008-01-11';
  }, 3000, 'expected timeline reaches end date after 1.65s');
}

describe('Pinboard Page', function () {
  it('should go to search page when the search bar is clicked', function () {
    pinboardPage.open();
    pinboardPage.searchBar.click();
    browser.element('.search-page').waitForVisible();
    browser.getUrl().should.endWith('/search/');
  });

  it('should go to landing page when header is clicked', function () {
    pinboardPage.open();
    pinboardPage.headerTitle.click();
    browser.getUrl().replace(/https?:\/\/[^/]+/, '').should.equal('/');
  });

  it('should go to Q&A url when clicking on Q&A link', function () {
    pinboardPage.open();
    pinboardPage.headerQALink.click();
    browser.getUrl().should.containEql('http://how.cpdp.works/');
  });

  context('pinboard pinned section', function () {
    it('should render the pinned cards correctly', function () {
      pinboardPage.open();
      const officers = pinboardPage.pinnedSection.officers;
      officers.officerCards().should.have.length(1);
      officers.title.getText().should.equal('OFFICERS');
      officers.firstCardRank.getText().should.equal('Police Officer');
      officers.firstCardName.getText().should.equal('Daryl Mack');
      officers.firstCardCRsCount.getText().should.equal('10 complaints');

      const crs = pinboardPage.pinnedSection.crs;
      crs.crCards().should.have.length(1);
      crs.title.getText().should.equal('COMPLAINTS');
      crs.firstCardDate.getText().should.equal('2010-01-01');
      crs.firstCardCategory.getText().should.equal('Use Of Force');

      const trrs = pinboardPage.pinnedSection.trrs;
      trrs.trrCards().should.have.length(1);
      trrs.title.getText().should.equal('TACTICAL RESPONSE REPORTS');
      trrs.firstCardDate.getText().should.equal('2012-01-01');
      trrs.firstCardCategory.getText().should.equal('Impact Weapon');
    });
  });

  context('pinboard section', function () {
    beforeEach(function () {
      pinboardPage.open();
    });

    it('should render correctly', function () {
      pinboardPage.pinboardSection.title.getValue().should.equal('Pinboard Title');
      pinboardPage.pinboardSection.description.getValue().should.equal('Pinboard Description');
      pinboardPage.pinboardSection.pinboardPaneMenu.waitForVisible();
      const pinboardPaneMenuText = pinboardPage.pinboardSection.pinboardPaneMenu.getText();
      pinboardPaneMenuText.should.containEql('NETWORK');
      pinboardPaneMenuText.should.containEql('GEOGRAPHIC');
    });

    it('should update title and description after editing and out focusing them', function () {
      pinboardPage.pinboardSection.title.getValue().should.equal('Pinboard Title');
      pinboardPage.pinboardSection.description.getValue().should.equal('Pinboard Description');
      browser.getUrl().should.containEql('/pinboard-title/');
      pinboardPage.pinboardSection.pinboardPaneMenu.waitForVisible();
      pinboardPage.pinboardSection.title.click();
      pinboardPage.pinboardSection.title.setValue('Updated Title');
      pinboardPage.pinboardSection.description.click();
      pinboardPage.pinboardSection.description.setValue('Updated Description');
      pinboardPage.pinboardSection.networkPaneName.click();
      pinboardPage.pinboardSection.title.getValue().should.equal('Updated Title');
      pinboardPage.pinboardSection.description.getValue().should.equal('Updated Description');
      browser.getUrl().should.containEql('/updated-title/');
    });
  });

  context('social graph section', function () {
    beforeEach(function () {
      pinboardPage.open();
    });

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
        'Hardy White',
        'Johnny Cavers',
        'Melvin Ector',
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
  });

  context('animatedSocialgraph off screen feature', function () {
    it('should pause the timeline when invisible and continue to play when visible', function () {
      pinboardPage.open('3664a7ea');
      pinboardPage.animatedSocialGraphSection.playButton.waitForExist(200, true);

      browser.scroll(pinboardPage.relevantCoaccusalsSection.title.selector);
      pinboardPage.animatedSocialGraphSection.playButton.waitForExist(1000);

      browser.scroll(pinboardPage.pinboardSection.title.selector);
      pinboardPage.animatedSocialGraphSection.playButton.waitForExist(1000, true);
    });
  });

  context('Geographic section', function () {
    it('should render geographic section', function () {
      pinboardPage.open();
      pinboardPage.pinboardSection.pinboardPaneMenu.waitForVisible();
      pinboardPage.pinboardSection.geographicPaneName.click();
      pinboardPage.geographicSection.complaintText.getText().should.equal('Complaint');
      pinboardPage.geographicSection.complaintNumber.getText().should.equal('5');
      pinboardPage.geographicSection.trrText.getText().should.equal('Use of Force Report');
      pinboardPage.geographicSection.trrNumber.getText().should.equal('2');
    });
  });

  context('relevant coaccusals section', function () {
    beforeEach(function () {
      pinboardPage.open();
    });

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

      let cardsCount = [];
      while (pinboardPage.relevantCoaccusalsSection.rightArrow.isExisting()) {
        pinboardPage.relevantCoaccusalsSection.rightArrow.click();

        let count = pinboardPage.relevantCoaccusalsSection.coaccusalCards().length;
        if (cardsCount.length === 0 || cardsCount[cardsCount.length - 1] !== count) {
          cardsCount.push(count);
        }
      }

      cardsCount.should.be.deepEqual([20, 40, 50]);
    });

    it('should display preview pane when click on relevant coaccusal card', function () {
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.mainElement.click();
      pinboardPage.previewPane.mainElement.waitForVisible();
    });

    it('should remove officer from the row and add to the pinned officers section', function () {
      pinboardPage.pinnedSection.officers.officerCards().should.have.length(1);
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.mainElement.getAttribute(
        'href'
      ).should.match(/\/officer\/123\/richard-sullivan\/$/);
      pinboardPage.relevantCoaccusalsSection.coaccusalCards().should.have.length(20);

      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.plusButton.click();
      browser.pause(1050);

      pinboardPage.relevantCoaccusalsSection.coaccusalCards().should.have.length(19);
      pinboardPage.pinnedSection.officers.officerCards().should.have.length(2);
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.mainElement.getAttribute(
        'href'
      ).should.not.match(/\/officer\/123\/richard-sullivan\/$/);
    });
  });

  context('relevant documents section', function () {
    beforeEach(function () {
      pinboardPage.open();
    });

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

      let cardsCount = [];
      while (pinboardPage.relevantDocumentsSection.rightArrow.isExisting()) {
        pinboardPage.relevantDocumentsSection.rightArrow.click();

        let count = pinboardPage.relevantDocumentsSection.documentCards().length;
        if (cardsCount.length === 0 || cardsCount[cardsCount.length - 1] !== count) {
          cardsCount.push(count);
        }
      }

      cardsCount.should.be.deepEqual([20, 40, 50]);
    });

    it('should not show preview pane when we click on the right half of document card', function () {
      const firstDocumentCard = pinboardPage.relevantDocumentsSection.documentCardSection;
      firstDocumentCard.rightHalf.click();

      pinboardPage.previewPane.mainElement.waitForVisible(1000, true);
    });

    it('should redirect to document page when click on the left half of document card', function () {
      const firstDocumentCard = pinboardPage.relevantDocumentsSection.documentCardSection;
      firstDocumentCard.leftHalf.click();

      pinboardPage.previewPane.mainElement.waitForVisible(1000, true);
      switchToRecentTab();
      browser.getUrl().should.equal(
        'https://assets.documentcloud.org/documents/5680384/CRID-1083633-CR-CRID-1083633-CR-Tactical.pdf'
      );
      browser.close();
    });

    it('should add cr to the pinned crs section', function () {
      pinboardPage.pinnedSection.crs.crCards().should.have.length(1);
      pinboardPage.relevantDocumentsSection.documentCards().should.have.length(20);

      pinboardPage.relevantDocumentsSection.documentCardSection.plusButton.click();
      browser.pause(1500);

      pinboardPage.relevantDocumentsSection.documentCards().should.have.length(20);
      pinboardPage.pinnedSection.crs.crCards().should.have.length(2);
    });
  });

  context('relevant complaints section', function () {
    beforeEach(function () {
      pinboardPage.open();
    });

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

      let cardsCount = [];
      while (pinboardPage.relevantComplaintsSection.rightArrow.isExisting()) {
        pinboardPage.relevantComplaintsSection.rightArrow.click();

        let count = pinboardPage.relevantComplaintsSection.complaintCards().length;
        if (cardsCount.length === 0 || cardsCount[cardsCount.length - 1] !== count) {
          cardsCount.push(count);
        }
      }

      cardsCount.should.be.deepEqual([20, 40, 50]);
    });

    it('should display preview pane when we click on incident date', function () {
      pinboardPage.relevantComplaintsSection.complaintCardSection.incidentDate.click();

      pinboardPage.previewPane.mainElement.waitForVisible();
    });

    it('should display preview pane when we click on top officers', function () {
      pinboardPage.relevantComplaintsSection.complaintCardSection.topOfficers.click();

      pinboardPage.previewPane.mainElement.waitForVisible();
    });

    it('should display preview pane when we click on remaining officers', function () {
      pinboardPage.relevantComplaintsSection.complaintCardSection.remainingOfficers.click();

      pinboardPage.previewPane.mainElement.waitForVisible();
    });

    it('should display preview pane when we click on left half of a complaint card', function () {
      pinboardPage.relevantComplaintsSection.complaintCardSection.leftHalf.click();

      pinboardPage.previewPane.mainElement.waitForVisible();
    });

    it('should remove cr from the row and add to the pinned crs section', function () {
      pinboardPage.pinnedSection.crs.crCards().should.have.length(1);
      pinboardPage.relevantComplaintsSection.complaintCardSection.rightHalf.getAttribute(
        'href'
      ).should.match(/\/complaint\/1071234\/$/);
      pinboardPage.relevantComplaintsSection.complaintCardSection.plusButton.click();
      browser.pause(1050);

      pinboardPage.pinnedSection.crs.crCards().should.have.length(2);
      pinboardPage.relevantComplaintsSection.complaintCardSection.rightHalf.getAttribute(
        'href'
      ).should.not.match(/\/complaint\/1071234\/$/);
    });
  });
});

describe('Empty Pinboard Page', function () {
  beforeEach(function () {
    pinboardPage.open('abcd1234');
  });

  it('should render when there is no content', function () {
    pinboardPage.emptyPinboardSection.mainElement.waitForVisible();
  });

  it('should go to Watts Crew pinboard page when clicking on Repeaters row', function () {
    pinboardPage.emptyPinboardSection.repeatersRow.click();
    browser.getUrl().should.match(/pinboard\/b20c2c36\//);
  });

  it('should go to Skullcap Crew pinboard page when clicking on Skullcap Crew row', function () {
    pinboardPage.emptyPinboardSection.skullcapCrewRow.click();
    browser.getUrl().should.match(/pinboard\/22e66085\//);
  });
});
