'use strict';

require('should');
import { map, countBy, values, filter, times } from 'lodash';

import { switchToRecentTab } from './utils';
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
      const toggleTimelineButton = pinboardPage.animatedSocialGraphSection.toggleTimelineButton;
      waitForGraphAnimationEnd(browser, pinboardPage);

      browser.waitUntil(function () {
        return toggleTimelineButton.getAttribute('class') === 'toggle-timeline-btn play-icon';
      });

      toggleTimelineButton.click();

      browser.waitUntil(function () {
        return pinboardPage.animatedSocialGraphSection.currentDate.getText() === '1994-04-17';
      }, 2000, 'expected timeline reaches specific date after 0.9s', 50);
      toggleTimelineButton.click();

      pinboardPage.animatedSocialGraphSection.graphNodes().should.have.length(20);
      pinboardPage.animatedSocialGraphSection.graphLinks().should.have.length(14);

      toggleTimelineButton.click();
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

    it('should go to officer page when clicking on a coaccusal card', function () {
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.nameWrapper.click();
      browser.getUrl().should.match(/\/officer\/123\/richard-sullivan\/$/);

      pinboardPage.open();
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.coaccusalCount.click();
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
      firstDocumentCard.notShowingOfficerCount.getText().should.eql('3+');
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

    it('should go to complaint page when clicking on right half of a document card', function () {
      pinboardPage.relevantDocumentsSection.documentCardSection.remainingOfficers.click();
      browser.getUrl().should.match(/\/complaint\/1071234\/$/);

      pinboardPage.open();
      pinboardPage.relevantDocumentsSection.documentCardSection.topOfficers.click();
      browser.getUrl().should.match(/\/complaint\/1071234\/$/);

      pinboardPage.open();
      pinboardPage.relevantDocumentsSection.documentCardSection.incidentDate.click();
      browser.getUrl().should.match(/\/complaint\/1071234\/$/);
    });

    it('should go to document pdf link in new tab when clicking on left half of a document card', function () {
      pinboardPage.relevantDocumentsSection.documentCardSection.leftHalf.click();
      switchToRecentTab();
      browser.getUrl().should.eql(
        'https://assets.documentcloud.org/documents/5680384/CRID-1083633-CR-CRID-1083633-CR-Tactical.pdf'
      );
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
      firstComplaintCard.notShowingOfficerCount.getText().should.eql('3+');
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

    it('should go to complaint page when clicking on right half of a complaint card', function () {
      pinboardPage.relevantComplaintsSection.complaintCardSection.remainingOfficers.click();
      browser.getUrl().should.match(/\/complaint\/1071234\/$/);

      pinboardPage.open();
      pinboardPage.relevantComplaintsSection.complaintCardSection.topOfficers.click();
      browser.getUrl().should.match(/\/complaint\/1071234\/$/);

      pinboardPage.open();
      pinboardPage.relevantComplaintsSection.complaintCardSection.incidentDate.click();
      browser.getUrl().should.match(/\/complaint\/1071234\/$/);
    });

    it('should go to complaint page when clicking on left half of a complaint card', function () {
      pinboardPage.relevantComplaintsSection.complaintCardSection.leftHalf.click();
      browser.getUrl().should.match(/\/complaint\/1071234\/$/);
    });
  });
});
