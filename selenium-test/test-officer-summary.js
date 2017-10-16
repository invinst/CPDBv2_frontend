'use strict';

require('should');

import summaryPage from './page-objects/officer-summary-page';
import { getRequestCount } from './utils';


describe('officer summary page', function () {
  beforeEach(function () {
    summaryPage.open();
  });

  it('should highlight summary header button', function () {
    summaryPage.header.officerName.waitForVisible();
    summaryPage.header.activeButton.waitForVisible();
    summaryPage.header.activeButton.getText().should.equal('Summary');
  });

  it('should display officer summary', function () {
    summaryPage.header.officerName.getText().should.equal('Bernadette Kelly');

    summaryPage.summarySection.unitLabel.getText().should.equal('Unit');
    summaryPage.summarySection.unitValue.getText().should.equal('001');
    summaryPage.summarySection.unitLink.getText().should.equal('View unit profile');

    summaryPage.summarySection.dateOfApptLabel.getText().should.equal('Career');
    summaryPage.summarySection.dateOfApptValue.getText().should.equal('SEP 23, 2015—Present');
    summaryPage.summarySection.dateOfApptDescription.getText().should.equal('2 year veteran');

    summaryPage.summarySection.rankLabel.getText().should.equal('Rank');
    summaryPage.summarySection.rankValue.getText().should.equal('NA');

    summaryPage.summarySection.raceLabel.getText().should.equal('Race');
    summaryPage.summarySection.raceValue.getText().should.equal('White');

    summaryPage.summarySection.badgeLabel.getText().should.equal('Badge');
    summaryPage.summarySection.badgeValue.getText().should.equal('12345');

    summaryPage.summarySection.sexLabel.getText().should.equal('Sex');
    summaryPage.summarySection.sexValue.getText().should.equal('Male');

    summaryPage.summarySection.salaryLabel.getText().should.equal('2016 Salary');

    summaryPage.aggregateSection.title.getText().should.equal('10 complaint records (CRs), 2 sustained');

    summaryPage.aggregateSection.category.waitForVisible();
    summaryPage.aggregateSection.categoryName.getText().should.equal('CATEGORY');
    summaryPage.aggregateSection.categoryEntryCount.getText().should.equal('10');
    summaryPage.aggregateSection.categoryEntrySustainedCount.getText().should.equal('2');
    summaryPage.aggregateSection.categoryEntryName.getText().should.equal('Illegal Search');
    summaryPage.aggregateSection.categorySparkline.waitForVisible();

    summaryPage.aggregateSection.race.waitForVisible();
    summaryPage.aggregateSection.raceName.getText().should.equal('COMPLAINANT RACE');
    summaryPage.aggregateSection.raceEntryCount.getText().should.equal('10');
    summaryPage.aggregateSection.raceEntrySustainedCount.getText().should.equal('2');
    summaryPage.aggregateSection.raceEntryName.getText().should.equal('White');
    summaryPage.aggregateSection.raceSparkline.waitForVisible();

    summaryPage.aggregateSection.age.waitForVisible();
    summaryPage.aggregateSection.ageName.getText().should.equal('COMPLAINANT AGE');
    summaryPage.aggregateSection.ageEntryCount.getText().should.equal('10');
    summaryPage.aggregateSection.ageEntrySustainedCount.getText().should.equal('2');
    summaryPage.aggregateSection.ageEntryName.getText().should.equal('<20');
    summaryPage.aggregateSection.ageSparkline.waitForVisible();

    summaryPage.aggregateSection.gender.waitForVisible();
    summaryPage.aggregateSection.genderName.getText().should.equal('COMPLAINANT GENDER');
    summaryPage.aggregateSection.genderEntryCount.getText().should.equal('10');
    summaryPage.aggregateSection.genderEntrySustainedCount.getText().should.equal('2');
    summaryPage.aggregateSection.genderEntryName.getText().should.equal('Female');
    summaryPage.aggregateSection.genderSparkline.waitForVisible();

  });

  it('should launch timeline, summary, minimap requests upon direct visit', function () {
    getRequestCount('/officers/1/timeline-items/').should.equal(1);
    getRequestCount('/officers/1/summary/').should.equal(1);
    getRequestCount('/officers/1/timeline-minimap/').should.equal(1);
  });

  it('should not launch any request when click on Timeline tab', function () {
    summaryPage.header.timelineButton.waitForVisible();
    summaryPage.header.timelineButton.click();

    getRequestCount('/officers/1/timeline-items/').should.equal(1);
    getRequestCount('/officers/1/summary/').should.equal(1);
    getRequestCount('/officers/1/timeline-minimap/').should.equal(1);
  });
});
