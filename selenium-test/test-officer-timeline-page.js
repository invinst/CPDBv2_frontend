'use strict';

import 'should';

import timelinePage from './page-objects/officer-timeline-page';
import searchPage from './page-objects/search-page';

describe('officer timeline page', function () {
  beforeEach(function () {
    timelinePage.open(1);
  });

  it('should show minimap', function () {
    timelinePage.sidebar.filterButton.waitForVisible();
    timelinePage.sidebar.sortButton.waitForVisible();
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

  it('should refresh timeline as well as minimap when visit other officers', function () {
    // visit officer timeline 1234
    // click overlay -> return to search page
    // click on officer 5678
    // click on timeline tab
    // should show timeline and minimap of officer 5678
    timelinePage.open(1234);
    timelinePage.sidebar.yearLabel.count.should.equal(1);
    timelinePage.timeline.cardItem.count.should.equal(2);

    timelinePage.bottomSheet.clickOverlay();

    searchPage.input.waitForVisible();
    searchPage.input.setValue('foo');

    searchPage.firstOfficerResult.waitForVisible();
    searchPage.firstOfficerResult.click();

    timelinePage.header.headerTimelineButton.waitForVisible();
    timelinePage.header.headerTimelineButton.click();

    timelinePage.sidebar.yearLabel.count.should.equal(0);
    timelinePage.timeline.cardItem.count.should.equal(0);
  });

  describe('minimap', function () {
    it('should highlight corresponding timeline item when hovered on', function () {
      timelinePage.sidebar.yearLabel.waitForVisible();
      timelinePage.sidebar.minimapItem.waitForVisible();
      timelinePage.sidebar.hoverOn('2005', 'CR');
      timelinePage.timeline.cardItemAtIndex(2).getCssProperty('backgroundColor').value.should.equal(
        'rgba(255,255,255,1)'
      );
    });

    it.only('should scroll to corresponding timeline item when clicked on', function () {
      browser.debug();
      timelinePage.timeline.joinedItem.kind.isVisible().should.be.false();
      timelinePage.sidebar.clickOn('2001', 'Joined');
      timelinePage.timeline.joinedItem.kind.waitForVisible();
    });
  });

  describe('timeline', function () {
    it('should show timeline items', function () {
      timelinePage.timeline.cardItem.count.should.equal(10);

      timelinePage.timeline.yearItem.year.getText().should.equal('2005');
      timelinePage.timeline.yearItem.crsLabel.getText().should.equal('CRs');
      timelinePage.timeline.yearItem.crsValue.getText().should.equal('1');
      timelinePage.timeline.yearItem.trrsLabel.getText().should.equal('TRRs');
      timelinePage.timeline.yearItem.trrsValue.getText().should.equal('0');
      timelinePage.timeline.yearItem.salaryLabel.getText().should.equal('Salary');
      timelinePage.timeline.yearItem.salaryValue.getText().should.equal('Data not available');

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

    it('should fetch more timeline items when scroll down', function () {
      timelinePage.timeline.cardItem.count.should.equal(10);
      timelinePage.timeline.scrollToCardItem(10);
      timelinePage.timeline.cardItem.count.should.equal(15);
    });
  });
});
