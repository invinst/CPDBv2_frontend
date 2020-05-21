'use strict';

require('should');
import { map, countBy, filter, times } from 'lodash';

import pinboardPage from './page-objects/pinboard-page';
import socialGraphPage from './page-objects/social-graph-page';


function waitForGraphAnimationEnd(browser, pinboardPage) {
  browser.waitUntil(function () {
    return pinboardPage.animatedSocialGraphSection.graphLinks().length === 37;
  }, 3000, 'expected graph reaches end after 1.65s');
}

describe('Pinboard Page', function () {
  it('should go to search page when the search bar is clicked', function () {
    pinboardPage.open();
    pinboardPage.searchBar.click();
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

  it('should open pinboard instead of latest retrieved pinboard', function () {
    pinboardPage.open('5cd06f2b');
    times(20, () => {
      browser.getUrl().should.not.match(/\/pinboard\/abcd5678\//);
      browser.pause(50);
    });
    browser.getUrl().should.match(/\/pinboard\/5cd06f2b\//);
  });

  context('pinboard pinned section', function () {
    beforeEach(function () {
      pinboardPage.open();
    });

    it('should render the pinned cards correctly', function () {
      const officers = pinboardPage.pinnedSection.officers;
      officers.officerCards().should.have.length(1);
      officers.title.getText().should.equal('OFFICERS');
      officers.firstCardRank.getText().should.equal('Police Officer');
      officers.firstCardName.getText().should.equal('Daryl Mack');
      officers.firstCardCRsCount.getText().should.equal('10 complaints');
      officers.firstCardRadarChart.getCSSProperty('background-color').value.should.eql('rgba(245,37,36,1)');

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

    it('should show preview pane when click on pinned officer item', function () {
      pinboardPage.pinnedSection.officers.firstCardRank.click();
      pinboardPage.officerPreviewPane.wrapper.waitForDisplayed();
      pinboardPage.officerPreviewPane.pinButton.getText().should.equal('Remove from pinboard');
      pinboardPage.officerPreviewPane.viewOfficerButton.getText().should.equal('View Officer Profile');
      pinboardPage.officerPreviewPane.officerName.getText().should.equal('Daryl Mack');
      pinboardPage.officerPreviewPane.genericInfo.getText().should.equal('42-year-old, white, male.');
      pinboardPage.officerPreviewPane.badgeKey.getText().should.equal('Badge');
      pinboardPage.officerPreviewPane.badgeValue.getText().should.equal('456');
      pinboardPage.officerPreviewPane.rankKey.getText().should.equal('Rank');
      pinboardPage.officerPreviewPane.rankValue.getText().should.equal('Police Officer');
      pinboardPage.officerPreviewPane.unitKey.getText().should.equal('Unit');
      pinboardPage.officerPreviewPane.unitValue.getText().should.equal('District 004');
      pinboardPage.officerPreviewPane.careerKey.getText().should.equal('Career');
      pinboardPage.officerPreviewPane.allegationValue.getText().should.equal('1');
      pinboardPage.officerPreviewPane.allegationName.getText().should.equal('Allegations');
      pinboardPage.officerPreviewPane.allegationDescription.getText().should.equal('More than 99.3% of other officers');
      pinboardPage.officerPreviewPane.sustainedValue.getText().should.equal('0');
      pinboardPage.officerPreviewPane.sustainedName.getText().should.equal('Sustained');
      pinboardPage.officerPreviewPane.sustainedDescription.getText().should.equal('6 Disciplined');
      pinboardPage.officerPreviewPane.trrValue.getText().should.equal('7');
      pinboardPage.officerPreviewPane.trrName.getText().should.equal('Use of Force Reports');
      pinboardPage.officerPreviewPane.trrDescription.getText().should.equal('More than 12% of other officers');
      pinboardPage.officerPreviewPane.allegationCivilianValue.getText().should.equal('2');
      pinboardPage.officerPreviewPane.allegationCivilianName.getText().should.equal('Civilian\nCompliments');
      pinboardPage.officerPreviewPane.majorAwardValue.getText().should.equal('8');
      pinboardPage.officerPreviewPane.majorAwardName.getText().should.equal('Major Awards');
      pinboardPage.officerPreviewPane.honorableMentionValue.getText().should.equal('3');
      pinboardPage.officerPreviewPane.honorableMentionName.getText().should.equal('Honorable Mentions');
      pinboardPage.officerPreviewPane.honorableMentionDescription.getText().should.equal(
        'More than 88% of other officers'
      );
      pinboardPage.officerPreviewPane.radarChart
        .getCSSProperty('background-color').value.should.eql('rgba(245,37,36,1)');
    });

    it('should show undo card when click on pin button in officer preview pane', function () {
      pinboardPage.pinnedSection.officers.firstCardRank.click();
      pinboardPage.officerPreviewPane.wrapper.waitForDisplayed();
      pinboardPage.officerPreviewPane.pinButton.click();
      pinboardPage.pinnedSection.officers.undoCard.waitForDisplayed();
    });

    it('should show preview pane when click on TRR pinned item', function () {
      pinboardPage.pinnedSection.trrs.firstElement.click();
      pinboardPage.previewPane.wrapper.waitForDisplayed();
      pinboardPage.previewPane.actionText.getText().should.equal('View Tactical Response Report');
      pinboardPage.previewPane.trrTitle.getText().should.equal('Impact Weapon');
      pinboardPage.previewPane.trrFirstInfo.getText().should.equal('Jan 01, 2012');
      pinboardPage.previewPane.trrSecondInfo.getText().should.equal('14XX W 63RD ST, CHICAGO IL 60636');
      pinboardPage.previewPane.trrOfficerRadarChart
        .getCSSProperty('background-color').value.should.eql('rgba(245,37,36,1)');
    });

    it('should redirect to TRR page when click on TRR preview pane', function () {
      pinboardPage.pinnedSection.trrs.firstElement.click();
      pinboardPage.previewPane.wrapper.waitForDisplayed();
      pinboardPage.previewPane.actionText.click();
      browser.getUrl().should.containEql('/trr/123456/');
    });
  });

  context('pinboard section', function () {
    beforeEach(function () {
      pinboardPage.open();
    });

    it('should render correctly', function () {
      pinboardPage.pinboardSection.title.getValue().should.equal('Pinboard Title');
      pinboardPage.pinboardSection.description.getText().should.equal('Pinboard Description');
    });

    it('should update title and description after editing and out focusing them', function () {
      pinboardPage.pinboardSection.title.getValue().should.equal('Pinboard Title');
      pinboardPage.pinboardSection.description.getText().should.equal('Pinboard Description');
      browser.getUrl().should.containEql('/pinboard-title/');
      pinboardPage.pinboardSection.title.click();
      pinboardPage.pinboardSection.title.setValue('Updated Title');
      pinboardPage.pinboardSection.description.click();
      pinboardPage.pinboardSection.description.addValue(' **Updated**');
      pinboardPage.pinboardSection.title.click();
      pinboardPage.pinboardSection.title.getValue().should.equal('Updated Title');
      pinboardPage.pinboardSection.description.getText().should.equal('Pinboard Description Updated');
      pinboardPage.pinboardSection.description.getHTML().should.containEql(
        '<p>Pinboard Description <strong>Updated</strong></p>'
      );
      browser.getUrl().should.containEql('/updated-title/');
    });
  });

  context('social graph section', function () {
    beforeEach(function () {
      pinboardPage.open();
    });

    it('should render correctly', function () {
      waitForGraphAnimationEnd(browser, pinboardPage);

      const graphNodes = pinboardPage.animatedSocialGraphSection.graphNodes();
      const graphLinks = pinboardPage.animatedSocialGraphSection.graphLinks();
      const graphLabels = pinboardPage.animatedSocialGraphSection.graphLabels();

      graphNodes.should.have.length(20);
      graphLinks.should.have.length(37);
      graphLabels.should.have.length(5);

      const nodeGroupColors = countBy(map(
        graphNodes,
        (graphNode) => graphNode.getCSSProperty('fill').value
      ));
      const expectedNodeGroupColors = {
        'rgb(245,37,36)': 6,
        'rgb(255,65,44)': 6,
        'rgb(255,100,83)': 5,
        'rgb(244,162,152)': 1,
        'rgb(249,211,195)': 1,
        'rgb(245,244,244)': 1,
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

      let hideGraphNodes = filter(graphNodes, graphNode => graphNode.getCSSProperty('opacity').value === 0.1);
      let visibleGraphNodes = filter(graphNodes, graphNode => graphNode.getCSSProperty('opacity').value === 1);
      hideGraphNodes.should.have.length(9);
      visibleGraphNodes.should.have.length(11);

      let hideGraphLinks = filter(graphLinks, graphLink => graphLink.getCSSProperty('opacity').value === 0.1);
      let visibleGraphLinks = filter(graphLinks, graphLink => graphLink.getCSSProperty('opacity').value === 1);
      hideGraphLinks.should.have.length(27);
      visibleGraphLinks.should.have.length(10);

      biggestNode.doubleClick();

      hideGraphNodes = filter(graphNodes, graphNode => graphNode.getCSSProperty('opacity').value === 0.1);
      visibleGraphNodes = filter(graphNodes, graphNode => graphNode.getCSSProperty('opacity').value === 1);
      hideGraphNodes.should.have.length(0);
      visibleGraphNodes.should.have.length(20);

      hideGraphLinks = filter(graphLinks, graphLink => graphLink.getCSSProperty('opacity').value === 0.1);
      visibleGraphLinks = filter(graphLinks, graphLink => graphLink.getCSSProperty('opacity').value === 1);
      hideGraphLinks.should.have.length(0);
      visibleGraphLinks.should.have.length(37);
    });

    it('should go to corresponding social graph visualization page when clicking on expanded button', function () {
      pinboardPage.pinboardSection.socialGraphExpandButton.click();
      browser.getUrl().should.containEql('/social-graph/pinboard/5cd06f2b/');
      socialGraphPage.animatedSocialGraphSection.coaccusalsThresholdText.getText().should.equal(
        'Minimum Coaccusal Threshold'
      );
      socialGraphPage.animatedSocialGraphSection.startDate.getText().should.equal('1990-01-09');
      socialGraphPage.animatedSocialGraphSection.endDate.getText().should.equal('2008-01-11');

      socialGraphPage.animatedSocialGraphSection.geographicTab.click();
      browser.getUrl().should.containEql('/geographic/pinboard/5cd06f2b/');
      socialGraphPage.geographicSection.complaintText.getText().should.eql('Complaint');
      socialGraphPage.geographicSection.complaintNumber.getText().should.eql('5');
      socialGraphPage.geographicSection.trrText.getText().should.eql('Use of Force Report');
      socialGraphPage.geographicSection.trrNumber.getText().should.eql('2');
    });
  });

  context('Geographic section', function () {
    it('should render geographic section', function () {
      pinboardPage.open();
      pinboardPage.geographicMap.waitForDisplayed();
    });

    it('should go to corresponding geographic visualization page when clicking on expanded button', function () {
      pinboardPage.open();
      pinboardPage.geographicMap.waitForDisplayed();
      pinboardPage.pinboardSection.geographicExpandButton.click();
      browser.getUrl().should.containEql('/geographic/pinboard/5cd06f2b/');

      socialGraphPage.animatedSocialGraphSection.mainTabs.waitForDisplayed();
      socialGraphPage.geographicSection.complaintText.getText().should.eql('Complaint');
      socialGraphPage.geographicSection.complaintNumber.getText().should.eql('5');
      socialGraphPage.geographicSection.trrText.getText().should.eql('Use of Force Report');
      socialGraphPage.geographicSection.trrNumber.getText().should.eql('2');

      socialGraphPage.animatedSocialGraphSection.networkTab.click();
      browser.getUrl().should.containEql('/social-graph/pinboard/5cd06f2b/');
      socialGraphPage.animatedSocialGraphSection.coaccusalsThresholdText.getText().should.equal(
        'Minimum Coaccusal Threshold'
      );
      socialGraphPage.animatedSocialGraphSection.startDate.getText().should.equal('1990-01-09');
      socialGraphPage.animatedSocialGraphSection.endDate.getText().should.equal('2008-01-11');
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
      firstCoaccusalCard.radarChart
        .getCSSProperty('background-color').value.should.eql('rgba(249,211,195,1)');
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
      pinboardPage.previewPane.wrapper.waitForDisplayed();
    });

    it('should remove officer from the row and add to the pinned officers section', function () {
      pinboardPage.pinnedSection.officers.officerCards().should.have.length(1);
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.officerName.getText().should.equal(
        'Richard Sullivan'
      );
      pinboardPage.relevantCoaccusalsSection.coaccusalCards().should.have.length(20);

      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.plusButton.click();
      browser.pause(4500);

      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.officerName.getText().should.not.equal(
        'Richard Sullivan'
      );
      pinboardPage.relevantCoaccusalsSection.coaccusalCards().should.have.length(19);
      pinboardPage.pinnedSection.officers.officerCards().should.have.length(2);
    });

    it('should show undo card when click on pin button in preview pane', function () {
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.mainElement.click();
      pinboardPage.officerPreviewPane.wrapper.waitForDisplayed();
      pinboardPage.officerPreviewPane.pinButton.click();
      pinboardPage.relevantCoaccusalsSection.undoCard.mainElement.waitForDisplayed();
    });

    it('should supply enough data to pinned section if user pin it', function () {
      pinboardPage.pinnedSection.officers.officerCards().should.have.length(1);
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.plusButton.click();
      browser.pause(4500);

      pinboardPage.pinnedSection.officers.officerCards().should.have.length(2);
      pinboardPage.pinnedSection.officers.secondCardName.click();
      pinboardPage.officerPreviewPane.pinButton.getText().should.equal('Remove from pinboard');
      pinboardPage.officerPreviewPane.viewOfficerButton.getText().should.equal('View Officer Profile');
      pinboardPage.officerPreviewPane.officerName.getText().should.equal('Richard Sullivan');
      pinboardPage.officerPreviewPane.genericInfo.getText().should.equal('67-year-old, black, female.');
      pinboardPage.officerPreviewPane.badgeKey.getText().should.equal('Badge');
      pinboardPage.officerPreviewPane.badgeValue.getText().should.equal('456');
      pinboardPage.officerPreviewPane.rankKey.getText().should.equal('Rank');
      pinboardPage.officerPreviewPane.rankValue.getText().should.equal('Detective');
      pinboardPage.officerPreviewPane.unitKey.getText().should.equal('Unit');
      pinboardPage.officerPreviewPane.unitValue.getText().should.equal('District 004');
      pinboardPage.officerPreviewPane.careerKey.getText().should.equal('Career');
      pinboardPage.officerPreviewPane.allegationValue.getText().should.equal('1');
      pinboardPage.officerPreviewPane.allegationName.getText().should.equal('Allegations');
      pinboardPage.officerPreviewPane.allegationDescription.getText().should.equal('More than 22% of other officers');
      pinboardPage.officerPreviewPane.sustainedValue.getText().should.equal('4');
      pinboardPage.officerPreviewPane.sustainedName.getText().should.equal('Sustained');
      pinboardPage.officerPreviewPane.sustainedDescription.getText().should.equal('6 Disciplined');
      pinboardPage.officerPreviewPane.trrValue.getText().should.equal('7');
      pinboardPage.officerPreviewPane.trrName.getText().should.equal('Use of Force Reports');
      pinboardPage.officerPreviewPane.trrDescription.getText().should.equal('More than 11% of other officers');
      pinboardPage.officerPreviewPane.allegationCivilianValue.getText().should.equal('2');
      pinboardPage.officerPreviewPane.allegationCivilianName.getText().should.equal('Civilian\nCompliments');
      pinboardPage.officerPreviewPane.majorAwardValue.getText().should.equal('8');
      pinboardPage.officerPreviewPane.majorAwardName.getText().should.equal('Major Awards');
      pinboardPage.officerPreviewPane.honorableMentionValue.getText().should.equal('3');
      pinboardPage.officerPreviewPane.honorableMentionName.getText().should.equal('Honorable Mentions');
      pinboardPage.officerPreviewPane.honorableMentionDescription.getText().should.equal(
        'More than 88% of other officers'
      );
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
      firstDocumentCard.firstTopRadarChart
        .getCSSProperty('background-color').value.should.eql('rgba(249,211,195,1)');
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

      pinboardPage.previewPane.wrapper.waitForDisplayed(1000, true);
    });

    it('should redirect to document page when click on the left half of document card', function () {
      const firstDocumentCard = pinboardPage.relevantDocumentsSection.documentCardSection;
      firstDocumentCard.leftHalf.click();

      pinboardPage.previewPane.wrapper.waitForDisplayed(1000, true);
      browser.switchWindow(
        'https://assets.documentcloud.org/documents/5680384/CRID-1083633-CR-CRID-1083633-CR-Tactical.pdf'
      );
    });

    it('should add cr to the pinned crs section', function () {
      pinboardPage.pinnedSection.crs.crCards().should.have.length(1);
      pinboardPage.relevantDocumentsSection.documentCards().should.have.length(20);

      pinboardPage.relevantDocumentsSection.documentCardSection.plusButton.click();
      browser.pause(4500);

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
      firstComplaintCard.firstTopRadarChart
        .getCSSProperty('background-color').value.should.eql('rgba(249,211,195,1)');
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

      pinboardPage.previewPane.wrapper.waitForDisplayed();
    });

    it('should display preview pane when we click on top officers', function () {
      pinboardPage.relevantComplaintsSection.complaintCardSection.topOfficers.click();

      pinboardPage.previewPane.wrapper.waitForDisplayed();
    });

    it('should display preview pane when we click on remaining officers', function () {
      pinboardPage.relevantComplaintsSection.complaintCardSection.remainingOfficers.click();

      pinboardPage.previewPane.wrapper.waitForDisplayed();
    });

    it('should display preview pane when we click on left half of a complaint card', function () {
      pinboardPage.relevantComplaintsSection.complaintCardSection.leftHalf.click();

      pinboardPage.previewPane.wrapper.waitForDisplayed();
    });

    it('should remove cr from the row and add to the pinned crs section', function () {
      pinboardPage.pinnedSection.crs.crCards().should.have.length(1);
      pinboardPage.relevantComplaintsSection.complaintCardSection.category.getText().should.equal(
        'Lockup Procedures'
      );

      pinboardPage.relevantComplaintsSection.complaintCardSection.plusButton.click();
      browser.pause(4500);

      pinboardPage.pinnedSection.crs.crCards().should.have.length(2);
      pinboardPage.relevantComplaintsSection.complaintCardSection.category.getText().should.not.equal(
        'Lockup Procedures'
      );
    });
  });

  context('manage pinboards', function () {
    const removeOfficerFromPinboard = function () {
      pinboardPage.pinnedSection.officers.firstCardUnpinBtn.click();
      pinboardPage.pinnedSection.officers.undoCard.waitForDisplayed();
      browser.pause(500);
    };

    const expectAlertContent = function (browser) {
      const alertText = browser.getAlertText();
      alertText.should.containEql('Pinboard is saving, changes you made may not be saved.');
      alertText.should.containEql('Are you sure you want to navigate away from this page?');
    };

    const expectStillInCurrentPinboardPage = function (browser) {
      browser.getUrl().should.containEql('/pinboard/ceea8ea3/pinboard-title/');
      pinboardPage.pinboardSection.title.getText().should.equal('Pinboard Title');
      pinboardPage.pinboardSection.description.getText().should.equal('Pinboard Description');
    };

    it('should render the pinboards list', function () {
      pinboardPage.open('ceea8ea3');
      pinboardPage.managePinboardsButtonsSection.pinboardsListButton.click();

      pinboardPage.pinboardsListSection.pinboardsTitle.getText().should.equal('Pinboards');
      pinboardPage.pinboardsListSection.pinboardItems().should.have.length(2);

      pinboardPage.pinboardsListSection.firstPinboardItemTitle.getText().should.equal('Pinboard Title');
      pinboardPage.pinboardsListSection.firstPinboardItemCreatedAt.getText().should.equal('Created Sep 12, 2019');

      pinboardPage.pinboardsListSection.secondPinboardItemTitle.getText().should.equal('');
      pinboardPage.pinboardsListSection.secondPinboardItemCreatedAt.getText().should.equal('Created Oct 15, 2019');
    });

    context('clicking on pinboard item', function () {
      it('should go to pinboard detail page', function () {
        pinboardPage.open('ceea8ea3');
        pinboardPage.managePinboardsButtonsSection.pinboardsListButton.click();
        pinboardPage.pinboardsListSection.secondPinboardItemCreatedAt.click();
        browser.getUrl().should.containEql('/pinboard/77edc128/untitled-pinboard/');
        pinboardPage.pinboardSection.title.getText().should.equal('');
        pinboardPage.pinboardSection.description.getText().should.equal('Description for 77edc128');
      });

      it('should go to pinboard detail page if pinboard is saved', function () {
        pinboardPage.open('ceea8ea3');
        pinboardPage.pinnedSection.officers.firstCardUnpinBtn.click();
        browser.pause(2500);

        pinboardPage.managePinboardsButtonsSection.pinboardsListButton.click();
        pinboardPage.pinboardsListSection.secondPinboardItemCreatedAt.click();
        browser.getUrl().should.containEql('/pinboard/77edc128/untitled-pinboard/');
        pinboardPage.pinboardSection.title.getText().should.equal('');
        pinboardPage.pinboardSection.description.getText().should.equal('Description for 77edc128');
      });


      it('should go to pinboard detail page if users add relevant item and pinboard is saved', function () {
        pinboardPage.open('5cd06f2b');
        pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.plusButton.click();
        browser.pause(4500);

        pinboardPage.managePinboardsButtonsSection.pinboardsListButton.click();
        pinboardPage.pinboardsListSection.secondPinboardItemCreatedAt.click();
        browser.getUrl().should.containEql('/pinboard/77edc128/untitled-pinboard/');
        pinboardPage.pinboardSection.title.getText().should.equal('');
        pinboardPage.pinboardSection.description.getText().should.equal('Description for 77edc128');
      });

      context('pinboard is saving', function () {
        context('users confirm yes', function () {
          it('should go to pinboard detail page (pinboard is saving with long api call)', function () {
            pinboardPage.open('ceea8ea3');
            removeOfficerFromPinboard();
            pinboardPage.managePinboardsButtonsSection.pinboardsListButton.click();
            pinboardPage.pinboardsListSection.secondPinboardItemCreatedAt.click();
            expectAlertContent(browser);
            browser.acceptAlert();
            browser.getUrl().should.containEql('/pinboard/77edc128/untitled-pinboard/');
            pinboardPage.pinboardSection.title.getText().should.equal('');
            pinboardPage.pinboardSection.description.getText().should.equal('Description for 77edc128');
          });

          it('should go to pinboard detail page (users remove pinned items and pinboard saving errors)', function () {
            pinboardPage.open('ceea8ea3');
            pinboardPage.pinnedSection.crs.firstCardUnpinBtn.click();
            browser.pause(500);

            pinboardPage.managePinboardsButtonsSection.pinboardsListButton.click();
            pinboardPage.pinboardsListSection.secondPinboardItemCreatedAt.click();
            expectAlertContent(browser);
            browser.acceptAlert();
            browser.getUrl().should.containEql('/pinboard/77edc128/untitled-pinboard/');
            pinboardPage.pinboardSection.title.getText().should.equal('');
            pinboardPage.pinboardSection.description.getText().should.equal('Description for 77edc128');
          });

          it('should go to pinboard detail page (users add relevant item and pinboard saving errors)', function () {
            pinboardPage.open('ceea8ea3');
            pinboardPage.relevantDocumentsSection.documentCardSection.plusButton.click();
            browser.pause(4500);

            pinboardPage.managePinboardsButtonsSection.pinboardsListButton.click();
            pinboardPage.pinboardsListSection.secondPinboardItemCreatedAt.click();
            expectAlertContent(browser);
            browser.acceptAlert();
            browser.getUrl().should.containEql('/pinboard/77edc128/untitled-pinboard/');
            pinboardPage.pinboardSection.title.getText().should.equal('');
            pinboardPage.pinboardSection.description.getText().should.equal('Description for 77edc128');
          });

          it('should go to pinboard detail page and click on pinboard item again will not show alert', function () {
            pinboardPage.open('ceea8ea3');
            pinboardPage.pinnedSection.officers.firstCardUnpinBtn.click();
            browser.pause(500);

            pinboardPage.managePinboardsButtonsSection.pinboardsListButton.click();
            pinboardPage.pinboardsListSection.secondPinboardItemCreatedAt.click();
            expectAlertContent(browser);
            browser.acceptAlert();
            browser.getUrl().should.containEql('/pinboard/77edc128/untitled-pinboard/');
            pinboardPage.pinboardSection.title.getText().should.equal('');
            pinboardPage.pinboardSection.description.getText().should.equal('Description for 77edc128');

            pinboardPage.managePinboardsButtonsSection.pinboardsListButton.click();
            pinboardPage.pinboardsListSection.secondPinboardItemCreatedAt.click();
            browser.getUrl().should.containEql('/pinboard/ceea8ea3/pinboard-title/');
            pinboardPage.pinboardSection.title.getText().should.equal('Pinboard Title');
            pinboardPage.pinboardSection.description.getText().should.equal('Pinboard Description');
          });
        });

        context('user confirm no', function () {
          it('should still in current page', function () {
            pinboardPage.open('ceea8ea3');
            removeOfficerFromPinboard();
            pinboardPage.managePinboardsButtonsSection.pinboardsListButton.click();
            pinboardPage.pinboardsListSection.secondPinboardItemCreatedAt.click();
            expectAlertContent(browser);
            browser.dismissAlert();
            expectStillInCurrentPinboardPage(browser);
          });
        });
      });
    });

    context('clicking on create new pinboard button in menu', function () {
      beforeEach(function () {
        pinboardPage.open('ceea8ea3');
      });

      it('should create an empty pinboard', function () {
        pinboardPage.managePinboardsButtonsSection.newPinboardMenuButton.click();
        pinboardPage.managePinboardsButtonsSection.createNewPinboardButton.click();
        browser.getUrl().should.containEql('/pinboard/87e31b82/untitled-pinboard/');
        pinboardPage.emptyPinboardSection.firstExample.getText().should.containEql('Watts Crew');
        pinboardPage.emptyPinboardSection.secondExample.getText().should.containEql('Skullcap Crew');
      });

      it('should create an empty pinboard if pinboard is saving and user confirm yes', function () {
        removeOfficerFromPinboard();
        pinboardPage.managePinboardsButtonsSection.newPinboardMenuButton.click();
        pinboardPage.managePinboardsButtonsSection.createNewPinboardButton.click();
        expectAlertContent(browser);
        browser.acceptAlert();
        browser.getUrl().should.containEql('/pinboard/87e31b82/untitled-pinboard/');
        pinboardPage.emptyPinboardSection.firstExample.getText().should.containEql('Watts Crew');
        pinboardPage.emptyPinboardSection.secondExample.getText().should.containEql('Skullcap Crew');
      });

      it('should still in current page if pinboard is saving and user confirm no', function () {
        removeOfficerFromPinboard();
        pinboardPage.managePinboardsButtonsSection.newPinboardMenuButton.click();
        pinboardPage.managePinboardsButtonsSection.createNewPinboardButton.click();
        expectAlertContent(browser);
        browser.dismissAlert();
        expectStillInCurrentPinboardPage(browser);
      });
    });

    context('clicking on Duplicate this pinboard button', function () {
      beforeEach(function () {
        pinboardPage.open('ceea8ea3');
      });

      it('should duplicate current pinboard', function () {
        pinboardPage.managePinboardsButtonsSection.newPinboardMenuButton.click();
        pinboardPage.managePinboardsButtonsSection.duplicateCurrentPinboardButton.click();
        browser.getUrl().should.containEql('/pinboard/5cd06f2b/pinboard-title/');
        pinboardPage.pinboardSection.title.getText().should.containEql('Pinboard Title');
        pinboardPage.pinboardSection.description.getText().should.containEql('Pinboard Description');
      });

      it('should duplicate current pinboard if pinboard is saving and user confirm yes', function () {
        removeOfficerFromPinboard();
        pinboardPage.managePinboardsButtonsSection.newPinboardMenuButton.click();
        pinboardPage.managePinboardsButtonsSection.duplicateCurrentPinboardButton.click();
        expectAlertContent(browser);
        browser.acceptAlert();
        browser.getUrl().should.containEql('/pinboard/5cd06f2b/pinboard-title/');
        pinboardPage.pinboardSection.title.getText().should.containEql('Pinboard Title');
        pinboardPage.pinboardSection.description.getText().should.containEql('Pinboard Description');
      });

      it('should still in current page if pinboard is saving and user confirm no', function () {
        removeOfficerFromPinboard();
        pinboardPage.managePinboardsButtonsSection.newPinboardMenuButton.click();
        pinboardPage.managePinboardsButtonsSection.duplicateCurrentPinboardButton.click();
        expectAlertContent(browser);
        browser.dismissAlert();
        expectStillInCurrentPinboardPage(browser);
      });
    });

    context('clicking on plus button in pinboard list', function () {
      beforeEach(function () {
        pinboardPage.open('ceea8ea3');
      });

      it('should create an empty pinboard', function () {
        pinboardPage.managePinboardsButtonsSection.pinboardsListButton.click();
        pinboardPage.pinboardsListSection.createNewPinboardButton.click();
        browser.getUrl().should.containEql('/pinboard/87e31b82/untitled-pinboard/');
        pinboardPage.emptyPinboardSection.firstExample.getText().should.containEql('Watts Crew');
        pinboardPage.emptyPinboardSection.secondExample.getText().should.containEql('Skullcap Crew');
      });

      it('should create an empty pinboard if pinboard is saving and user confirm yes', function () {
        removeOfficerFromPinboard();
        pinboardPage.managePinboardsButtonsSection.pinboardsListButton.click();
        pinboardPage.pinboardsListSection.createNewPinboardButton.click();
        expectAlertContent(browser);
        browser.acceptAlert();
        browser.getUrl().should.containEql('/pinboard/87e31b82/untitled-pinboard/');
        pinboardPage.emptyPinboardSection.firstExample.getText().should.containEql('Watts Crew');
        pinboardPage.emptyPinboardSection.secondExample.getText().should.containEql('Skullcap Crew');
      });

      it('should still in current page if pinboard is saving and user confirm no', function () {
        removeOfficerFromPinboard();
        pinboardPage.managePinboardsButtonsSection.pinboardsListButton.click();
        pinboardPage.pinboardsListSection.createNewPinboardButton.click();
        expectAlertContent(browser);
        browser.dismissAlert();
        expectStillInCurrentPinboardPage(browser);
      });
    });

    context('clicking on duplicate button in pinboard list', function () {
      beforeEach(function () {
        pinboardPage.open('ceea8ea3');
      });

      it('should duplicate selected pinboard', function () {
        pinboardPage.openByQuery('?officer-ids=1,2&crids=5678123&trr-ids=3,2');

        pinboardPage.pinnedSection.officers.officerCards().should.have.length(2);
        pinboardPage.pinnedSection.crs.crCards().should.have.length(1);
        pinboardPage.pinnedSection.trrs.trrCards().should.have.length(2);

        pinboardPage.managePinboardsButtonsSection.pinboardsListButton.click();
        pinboardPage.pinboardsListSection.firstDuplicatePinboardButton.click();
        browser.getUrl().should.containEql('/pinboard/5cd06f2b/pinboard-title/');
        pinboardPage.pinboardSection.title.getText().should.containEql('Pinboard Title');
        pinboardPage.pinboardSection.description.getText().should.containEql('Pinboard Description');

        pinboardPage.pinnedSection.officers.officerCards().should.have.length(1);
        pinboardPage.pinnedSection.crs.crCards().should.have.length(1);
        pinboardPage.pinnedSection.trrs.trrCards().should.have.length(1);
      });

      it('should duplicate selected pinboard if pinboard is saving and user confirm yes', function () {
        removeOfficerFromPinboard();
        pinboardPage.managePinboardsButtonsSection.pinboardsListButton.click();
        pinboardPage.pinboardsListSection.firstDuplicatePinboardButton.click();
        expectAlertContent(browser);
        browser.acceptAlert();
        browser.getUrl().should.containEql('/pinboard/5cd06f2b/pinboard-title/');
        pinboardPage.pinboardSection.title.getText().should.containEql('Pinboard Title');
        pinboardPage.pinboardSection.description.getText().should.containEql('Pinboard Description');
      });

      it('should still in current page if pinboard is saving and user confirm no', function () {
        removeOfficerFromPinboard();
        pinboardPage.managePinboardsButtonsSection.pinboardsListButton.click();
        pinboardPage.pinboardsListSection.firstDuplicatePinboardButton.click();
        expectAlertContent(browser);
        browser.dismissAlert();
        expectStillInCurrentPinboardPage(browser);
      });
    });
  });
});

describe('Undo card', function () {
  beforeEach(function () {
    pinboardPage.open();
  });

  it('should show undo card when user click on unpin button', function () {
    pinboardPage.pinnedSection.officers.firstCardUnpinBtn.click();
    pinboardPage.pinnedSection.officers.undoCard.waitForDisplayed();

    // card disappear after 4s
    browser.pause(4500);
    pinboardPage.pinnedSection.officers.officerCards().should.have.length(0);
  });

  it('should show card when user click on undo button', function () {
    pinboardPage.pinnedSection.officers.firstCardUnpinBtn.click();
    pinboardPage.pinnedSection.officers.undoCard.waitForDisplayed();
    pinboardPage.pinnedSection.officers.undoCard.click();
    pinboardPage.pinnedSection.officers.officerCards().should.have.length(1);
  });
});

describe('Empty Pinboard Page', function () {
  beforeEach(function () {
    pinboardPage.open('abcd1234');
  });

  it('should render when there is no content', function () {
    pinboardPage.emptyPinboardSection.mainElement.waitForDisplayed();
    pinboardPage.emptyPinboardSection.firstExampleTitle.getText().should.equal('Watts Crew');
    pinboardPage.emptyPinboardSection.firstExampleDescription.getHTML().should.match(
      /.*<p><strong>It will be a election<\/strong> and we are going to do the best <strong>Lorem.*<\/strong>.*/
    );
    const descriptionText = pinboardPage.emptyPinboardSection.firstExampleDescription.getText();
    descriptionText.endsWith('...').should.be.true();
    descriptionText.should.not.containEql(
      'Lorem Ipsum has been the industry standard dummy text ever since the 1500s.'
    );
    pinboardPage.emptyPinboardSection.secondExampleTitle.getText().should.equal('Skullcap Crew');
    pinboardPage.emptyPinboardSection.secondExampleDescription.getText().should.equal(
      'Skullcap Crew is a nickname given to a group of five Chicago Police officers in a gang tactical.'
    );
  });

  it('should go to Watts Crew pinboard page when clicking on Repeaters row', function () {
    pinboardPage.emptyPinboardSection.firstExample.click();
    browser.getUrl().should.match(/pinboard\/abcd1234\/watts-crew\//);
    pinboardPage.pinboardSection.title.getValue().should.equal('Watts Crew');
    pinboardPage.pinboardSection.description.getText().should.equal(
      'Officers with at least 10 complaints against them generate 64% of all complaints.'
    );
    pinboardPage.pinnedSection.officers.officerCards().should.have.length(1);
  });

  it('should go to Skullcap Crew pinboard page when clicking on Skullcap Crew row', function () {
    pinboardPage.emptyPinboardSection.secondExample.click();
    browser.getUrl().should.match(/pinboard\/abcd1234\/skullcap-crew\//);
    pinboardPage.pinboardSection.title.getValue().should.equal('Skullcap Crew');
    pinboardPage.pinboardSection.description.getText().should.equal(
      'Skullcap Crew is a nickname given to a group of five Chicago Police officers in a gang.'
    );
    pinboardPage.pinnedSection.officers.officerCards().should.have.length(1);
  });
});

describe('No Id Pinboard Page', function () {
  beforeEach(function () {
    pinboardPage.open('');
  });

  it('should render pinboard return by latest-retrieved-pinboard', function () {
    pinboardPage.emptyPinboardSection.mainElement.waitForDisplayed();
  });
});

describe('Session Generator Pinboard Page', function () {
  const showingPinboardffff6666 = () => {
    browser.getUrl().should.match(/\/pinboard\/ffff6666\//);

    const officers = pinboardPage.pinnedSection.officers;
    const crs = pinboardPage.pinnedSection.crs;
    const trrs = pinboardPage.pinnedSection.trrs;

    officers.officerCards().should.have.length(2);
    crs.crCards().should.have.length(1);
    trrs.trrCards().should.have.length(2);
  };

  it('should create new pinboard by query', function () {
    pinboardPage.openByQuery('?officer-ids=1,2&crids=5678123&trr-ids=3,2');
    showingPinboardffff6666();
  });

  it('should accept title param', function () {
    pinboardPage.openByQuery('?officer-ids=1,2&crids=5678123&title=Preset+title+via+url');
    browser.getUrl().should.match(/\/pinboard\/eeee8888\/preset-title-via-url\//);

    pinboardPage.pinboardSection.title.getText().should.equal('Preset title via url');
  });

  it('should create empty pinboard if only title is provided', function () {
    pinboardPage.openByQuery('?title=Empty+pinboard+with+preset+title+via+url');
    browser.getUrl().should.match(/\/pinboard\/eeee9999\/empty-pinboard-with-preset-title-via-url\//);

    pinboardPage.emptyPinboardSection.mainElement.waitForDisplayed();
  });

  it('should create new pinboard by query with some not-found items', function () {
    pinboardPage.openByQuery('?officer-ids=1,2&crids=987654,5678123&trr-ids=9,7');
    browser.getUrl().should.match(/\/pinboard\/eeee7777\//);

    pinboardPage.firstToast.waitForText(
      '1 out of 2 allegations were added to this pinboard. 1 out of 2 allegation IDs could not be recognized (987654).'
    );
    pinboardPage.secondToast.waitForText(
      '2 out of 2 TRR IDs could not be recognized (9, 7).'
    );

    const officers = pinboardPage.pinnedSection.officers;
    const crs = pinboardPage.pinnedSection.crs;
    const trrs = pinboardPage.pinnedSection.trrs;

    officers.officerCards().should.have.length(2);
    crs.crCards().should.have.length(1);
    trrs.trrCards().should.have.length(0);
  });

  it('should accept params without s', function () {
    pinboardPage.openByQuery('?officer-id=1,2&crid=5678123&trr-id=3,2');
    showingPinboardffff6666();
  });

  it('should accept params with under score', function () {
    pinboardPage.openByQuery('?officer_ids=1,2&crid=5678123&trr_id=3,2');
    showingPinboardffff6666();
  });

  it('should accept camelCase params', function () {
    pinboardPage.openByQuery('?officerIds=1,2&crids=5678123&trrId=3,2');
    showingPinboardffff6666();
  });

  it('should accept params with some capitalizing mistakes', function () {
    pinboardPage.openByQuery('?officerID=1,2&CRids=5678123&tRRIds=3,2');
    showingPinboardffff6666();
  });

  it('should skip invalid param and show invalid param message', function () {
    pinboardPage.openByQuery('?officer_ids=1,2&crid=5678123&trr_id=3,2&invalid-param=1,2');
    showingPinboardffff6666();

    pinboardPage.firstToast.waitForText('invalid-param is not recognized.');
  });

  it('should skip invalid params and show invalid params message', function () {
    pinboardPage.openByQuery('?officer_ids=1,2&crid=5678123&trr_id=3,2&invalid-param-a=1,2&invalid-param-b=1,2');
    showingPinboardffff6666();

    pinboardPage.firstToast.waitForText('invalid-param-a, invalid-param-b are not recognized.');
  });

  it('should show redirect message and redirect to latest pinboard if no valid params', function () {
    pinboardPage.openByQuery('?invalid-param-a=1,2&invalid-param-b=1,2');
    browser.getUrl().should.match(/\/pinboard\/abcd1234\//);

    pinboardPage.firstToast.waitForText('invalid-param-a, invalid-param-b are not recognized.');
    pinboardPage.secondToast.waitForText('Redirected to latest pinboard.');
  });
});

describe('Saving Pinboard Failure Handling', function () {
  describe('Connection lost', function () {
    it('should show connection lost toast', function () {
      pinboardPage.open('5cd0dddd');

      pinboardPage.pinnedSection.officers.officerCards().should.have.length(1);
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.officerName.getText().should.equal(
        'Richard Sullivan'
      );
      pinboardPage.relevantCoaccusalsSection.coaccusalCards().should.have.length(20);

      browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true });
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.plusButton.click();

      pinboardPage.firstToast.waitForText('Connection lost. Trying to save ...');

      times(30, () => {
        browser.pause(100);
        pinboardPage.firstToast.waitForDisplayed();
      });

      browser.setNetworkConditions({}, 'No throttling');
    });

    it('should show connection lost toast and retry on click', function () {
      pinboardPage.open('5cd0eeee');
      pinboardPage.pinnedSection.officers.officerCards().should.have.length(1);
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.officerName.getText().should.equal(
        'Richard Sullivan'
      );
      pinboardPage.relevantCoaccusalsSection.coaccusalCards().should.have.length(20);

      browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true });
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.plusButton.click();

      pinboardPage.firstToast.waitForText('Connection lost. Trying to save ...');
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.officerName.getText().should.not.equal(
        'Richard Sullivan'
      );
      pinboardPage.pinnedSection.officers.officerCards().should.have.length(2);
      pinboardPage.relevantCoaccusalsSection.coaccusalCards().should.have.length(19);
      browser.pause(500);

      pinboardPage.firstToast.click();
      pinboardPage.firstToast.waitForDisplayed(5000, true);
      pinboardPage.firstToast.waitForText('Connection lost. Trying to save ...');
      browser.pause(500);

      pinboardPage.firstToast.click();
      pinboardPage.firstToast.waitForDisplayed(5000, true);

      times(10, () => {
        browser.pause(100);
        pinboardPage.firstToast.waitForDisplayed(5000, true);
      });

      browser.setNetworkConditions({}, 'No throttling');
    });

    it('should show connection lost toast and retry when online again', function () {
      pinboardPage.open('5cd0ffff');

      pinboardPage.pinnedSection.officers.officerCards().should.have.length(1);
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.officerName.getText().should.equal(
        'Richard Sullivan',
      );
      pinboardPage.relevantCoaccusalsSection.coaccusalCards().should.have.length(20);

      browser.setNetworkConditions({ latency: 0, throughput: 0, offline: true });
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.plusButton.click();

      pinboardPage.firstToast.waitForText('Connection lost. Trying to save ...');
      browser.pause(500);

      browser.setNetworkConditions({}, 'No throttling');
      pinboardPage.firstToast.waitForDisplayed(5000, true);

      times(10, () => {
        browser.pause(100);
        pinboardPage.firstToast.waitForDisplayed(5000, true);
      });
    });
  });

  describe('request failure', function () {
    it('should show saving failure toast', function () {
      pinboardPage.open('5cd0aaaa');

      pinboardPage.pinnedSection.officers.officerCards().should.have.length(1);
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.officerName.getText().should.equal(
        'Richard Sullivan'
      );
      pinboardPage.relevantCoaccusalsSection.coaccusalCards().should.have.length(20);

      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.plusButton.click();

      pinboardPage.firstToast.waitForDisplayed(5000, true);
      pinboardPage.firstToast.waitForText('Failed to save pinboard. Click to try again!', );

      times(30, () => {
        browser.pause(100);
        pinboardPage.firstToast.waitForDisplayed();
      });
    });

    it('should show saving failure toast and retry on click', function () {
      pinboardPage.open('5cd0bbbb');
      pinboardPage.pinnedSection.officers.officerCards().should.have.length(1);
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.officerName.getText().should.equal(
        'Richard Sullivan'
      );
      pinboardPage.relevantCoaccusalsSection.coaccusalCards().should.have.length(20);

      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.plusButton.click();

      pinboardPage.firstToast.waitForText('Failed to save pinboard. Click to try again!');
      pinboardPage.relevantCoaccusalsSection.coaccusalCardSection.officerName.getText().should.not.equal(
        'Richard Sullivan'
      );
      pinboardPage.pinnedSection.officers.officerCards().should.have.length(2);
      pinboardPage.relevantCoaccusalsSection.coaccusalCards().should.have.length(19);
      browser.pause(500);

      pinboardPage.firstToast.click();
      pinboardPage.firstToast.waitForDisplayed(5000, true);
      pinboardPage.firstToast.waitForText('Failed to save pinboard. Click to try again!');
      browser.pause(500);

      pinboardPage.firstToast.click();
      pinboardPage.firstToast.waitForDisplayed(5000, true);

      times(50, () => {
        browser.pause(100);
        pinboardPage.firstToast.waitForDisplayed(5000, true);
      });
    });
  });
});
