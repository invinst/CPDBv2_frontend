'use strict';

import 'should';

import timelinePage from './page-objects/officer-timeline-page';
import summaryPage from './page-objects/officer-summary-page';
import crPage from './page-objects/cr-page';
import { getRequestCount } from './utils';


describe('officer timeline page', function () {

  beforeEach(function () {
    browser.setViewportSize({
      width: 1000,
      height: 500
    });
    timelinePage.open(1);
  });

  afterEach(function () {
    browser.setViewportSize({
      width: 1000,
      height: 1000
    });
  });

  it('should show minimap', function () {
    timelinePage.sidebar.yearLabel.waitForVisible();

    timelinePage.sidebar.yearLabel.count.should.equal(5);
    timelinePage.sidebar.yearLabel.getText().should.equal('2005');

    timelinePage.sidebar.minimapItem.waitForVisible();
    timelinePage.sidebar.minimapItem.count.should.equal(10);
    timelinePage.sidebar.minimapItem.getText().should.equal('CR');
  });

  it('should show timeline', function () {
    timelinePage.timeline.element.waitForVisible();
  });

  it('should show officer name on header when first loaded', function () {
    timelinePage.header.officerName.getText().should.equal('Bernadette Kelly');
  });

  it('should highlight timeline header button', function () {
    timelinePage.header.activeButton.waitForVisible();
    timelinePage.header.activeButton.getText().should.equal('Timeline');
  });

  it('should launch timeline, summary, minimap requests upon direct visit', function () {
    getRequestCount('/officers/1/timeline-items/').should.equal(1);
    getRequestCount('/officers/1/summary/').should.equal(1);
    getRequestCount('/officers/1/timeline-minimap/').should.equal(1);
  });

  it('should not launch any request when click on Summary tab', function () {
    timelinePage.header.summaryButton.waitForVisible();
    timelinePage.header.summaryButton.click();

    getRequestCount('/officers/1/timeline-items/').should.equal(1);
    getRequestCount('/officers/1/summary/').should.equal(1);
    getRequestCount('/officers/1/timeline-minimap/').should.equal(1);
  });

  // Sorting is disabled in this release
  it.skip('should preserve sort order when click other tabs', function () {
    timelinePage.sidebar.sortButton.getText().should.equal('Sort by oldest first');

    timelinePage.sidebar.sortButton.click();
    timelinePage.header.summaryButton.click();
    timelinePage.header.timelineButton.click();

    timelinePage.sidebar.sortButton.getText().should.equal('Sort by newest first');
  });

  it('should change selected minimap item when going back from CR page', function () {
    timelinePage.sidebar.clickOn('2005', 1);
    timelinePage.timeline.cardItemAtIndex(3).click();
    crPage.element.waitForVisible();
    browser.back();
    timelinePage.sidebar.itemAt('2004', 1).getCssProperty('backgroundColor').value.should.equal(
      'rgba(255,255,255,1)'
    );
  });

  describe('minimap', function () {
    it('should highlight corresponding timeline item when hovered on', function () {
      timelinePage.sidebar.yearLabel.waitForVisible();
      timelinePage.sidebar.minimapItem.waitForVisible();
      timelinePage.sidebar.hoverOn('2005', 1);
      timelinePage.timeline.cardItemAtIndex(1).getCssProperty('backgroundColor').value.should.equal(
        'rgba(255,255,255,1)'
      );
    });

    it('should scroll to corresponding timeline item when clicked on', function () {
      timelinePage.timeline.cardItem.count.should.equal(10);
      timelinePage.timeline.joinedItem.kind.isVisibleWithinViewport().should.be.false();
      timelinePage.sidebar.clickOn('2001', 2);
      timelinePage.timeline.joinedItem.kind.waitForVisible();
      timelinePage.timeline.joinedItem.kind.getText().should.equal('Joined');
      timelinePage.timeline.joinedItem.date.getText().should.equal('DEC 5, 2001');
      timelinePage.timeline.joinedItem.description.getText().should.equal('Joined CPD');
    });

    it('should highlight selected item', function () {
      timelinePage.sidebar.clickOn('2005', 1);
      timelinePage.sidebar.itemAt('2005', 1).getCssProperty('backgroundColor').value.should.equal(
        'rgba(255,255,255,1)'
      );
    });
  });

  describe('timeline', function () {
    it('should show timeline items', function () {
      timelinePage.timeline.cardItem.count.should.equal(10);

      timelinePage.timeline.crItem.date.getText().should.equal('NOV 28, 2005');
      timelinePage.timeline.crItem.crid.getText().should.equal('CR 968734');
      timelinePage.timeline.crItem.category.getText().should.equal('Use of Force');
      timelinePage.timeline.crItem.subcategory.getText().should.equal('EXCESSIVE FORCE - OFF DUTY');
      timelinePage.timeline.crItem.finding.getText().should.equal('Unfounded');
      timelinePage.timeline.crItem.coaccused.getText().should.equal('1 of 1 Coaccused');

      timelinePage.timeline.unitItem.kind.getText().should.equal('Unit Change');
      timelinePage.timeline.unitItem.date.getText().should.equal('APR 28, 2005');
      timelinePage.timeline.unitItem.description.getText().should.equal('Assigned to Unit 004');
    });

    it('should highlight corresponding minimap item when hovered on', function () {
      timelinePage.timeline.hoverOn(1);
      timelinePage.sidebar.itemAt('2005', 1).getCssProperty('backgroundColor').value.should.equal(
        'rgba(228,228,228,1)'
      );
    });

    it('should launch Complaint bottom sheet when click on a CR item', function () {
      timelinePage.timeline.cardItemAtIndex(1).click();
      crPage.element.waitForVisible();
      crPage.currentBasePath.should.equal('/complaint/968734/1/');
    });

    it('should resume pagination correctly after switching to another tab and back', function () {
      timelinePage.header.summaryButton.click();
      summaryPage.aggregateSection.title.waitForVisible();

      summaryPage.header.timelineButton.click();
      const earliestMinimapItem = timelinePage.sidebar.itemAt(2001, 2);
      earliestMinimapItem.waitForVisible();
      earliestMinimapItem.click();
      timelinePage.timeline.cardItemAtIndex(8).waitForVisible();
    });
  });
});

describe('Timeline page with filtered params', function () {
  beforeEach(function () {
    timelinePage.open(1, '?category=Use%20of%20Force&race=Black&invalid=xxx');
  });

  it.skip('should show 2 filtered item and handle clear each filter', function () {

    timelinePage.sidebar.filterItem.count.should.equal(2);

    let categoryFilterLink = timelinePage.sidebar.findFilterItemRemoveBtnWithText('Use of Force');
    categoryFilterLink.waitForVisible();

    let raceFilterLink = timelinePage.sidebar.findFilterItemRemoveBtnWithText('Black');
    raceFilterLink.waitForVisible();

    timelinePage.sidebar.itemAt('2002', 2).waitForVisible(500, true);
    timelinePage.sidebar.itemAt('2003', 2).waitForVisible(500, true);
    timelinePage.timeline.element.getText().should.not.containEql('Illegal Search');
    timelinePage.timeline.element.getText().should.not.containEql('CR 123456');
    timelinePage.timeline.element.getText().should.containEql('CR 456123');
    raceFilterLink.click();

    timelinePage.sidebar.findFilterItemRemoveBtnWithText('Black').waitForVisible(500, true);
    timelinePage.sidebar.itemAt('2003', 2).waitForVisible();  // more item appear
    timelinePage.timeline.element.getText().should.not.containEql('Illegal Search');
    timelinePage.timeline.element.getHTML().should.containEql('123456');
    timelinePage.timeline.element.getHTML().should.containEql('456123');

    timelinePage.sidebar.findFilterItemRemoveBtnWithText('Use of Force').waitForVisible();

    categoryFilterLink.click();
    timelinePage.sidebar.findFilterItemRemoveBtnWithText('Use of Force').waitForVisible(500, true);
    timelinePage.sidebar.itemAt('2002', 2).waitForVisible();
    timelinePage.timeline.element.getHTML().should.containEql('123456');
    timelinePage.timeline.element.getHTML().should.containEql('456123');
  });

  it.skip('should scroll down to previously selected item when revisiting Timeline with the same filter', function () {
    timelinePage.sidebar.itemAt('2004', 1).click();
    timelinePage.timeline.cardItemAtIndex(6).waitForVisible();
    browser.pause(2000);
    const prevScrollPosition = browser.element('.test--timeline-items-container').getAttribute('scrollTop');
    prevScrollPosition.should.be.greaterThan(0); // should scroll down to focused item

    // Go to any other page
    timelinePage.header.summaryButton.click();
    const categoryTitleLink = browser.element('(//a[@class="test--entry-name"])[2]');
    categoryTitleLink.waitForVisible();

    // Go back to timeline
    summaryPage.header.timelineButton.click();
    browser.pause(2000);

    const newScrollPosition = browser.element('.test--timeline-items-container').getAttribute('scrollTop');
    newScrollPosition.should.equal(prevScrollPosition);
  });

  it.skip('should not scroll down when revisiting Timeline with a different filter', function () {
    timelinePage.sidebar.itemAt('2004', 1).click();
    timelinePage.timeline.cardItemAtIndex(6).waitForVisible();
    const prevScrollPosition = browser.element('.test--timeline-items-container').getAttribute('scrollTop');
    prevScrollPosition.should.be.greaterThan(0); // should scroll down to focused item

    // Go to any other page
    timelinePage.header.summaryButton.click();
    const categoryTitleLink = browser.element('(//a[@class="test--entry-name"])[2]');
    categoryTitleLink.waitForVisible();

    // Go back to timeline but with a different filter
    categoryTitleLink.click();

    const newScrollPosition = browser.element('.test--timeline-items-container').getAttribute('scrollTop');
    newScrollPosition.should.equal('0');
  });

  it.skip('should scroll to latest item of chosen year if provided in URL params', function () {
    timelinePage.open(1, '?year=2003');
    browser.pause(2000);

    const container = browser.element('.test--timeline-items-container');
    // Should have scrolled past the "Unit Change" event item above it
    container.getText().should.not.containEql('APR 28, 2005');
    container.getAttribute('scrollTop').should.be.greaterThan(300);
  });

});
