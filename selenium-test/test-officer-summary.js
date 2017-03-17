'use strict';

require('should');

import summaryPage from './page-objects/officer-summary-page';


describe('officer summary page', function () {
  beforeEach(function () {
    summaryPage.open();
  });

  it('should highlight summary header button', function () {
    summaryPage.header.officerName.waitForVisible();
    summaryPage.header.headerButton.waitForVisible();
    summaryPage.header.headerButton.count.should.equal(2);
    summaryPage.header.headerActiveButton.waitForVisible();
    summaryPage.header.headerActiveButton.getText().should.equal('Summary');
  });

  it('should display officer summary', function () {
    summaryPage.header.officerName.getText().should.equal('Bernadette Kelly');

    summaryPage.summarySection.unitLabel.getText().should.equal('Unit');
    summaryPage.summarySection.unitValue.getText().should.equal('001');

    summaryPage.summarySection.dateOfApptLabel.getText().should.equal('Date of Appt.');
    summaryPage.summarySection.dateOfApptValue.getText().should.equal('SEP 23, 2015');

    summaryPage.summarySection.rankLabel.getText().should.equal('Rank');
    summaryPage.summarySection.rankValue.getText().should.equal('NA');

    summaryPage.summarySection.raceLabel.getText().should.equal('Race');
    summaryPage.summarySection.raceValue.getText().should.equal('White');

    summaryPage.summarySection.badgeLabel.getText().should.equal('Badge');
    summaryPage.summarySection.badgeValue.getText().should.equal('12345');

    summaryPage.summarySection.sexLabel.getText().should.equal('Sex');
    summaryPage.summarySection.sexValue.getText().should.equal('Male');

    summaryPage.aggregateSection.title.getText().should.equal('COMPLAINT RECORDS');
    summaryPage.aggregateSection.fadedTitle.getText().should.equal('CRs');
    summaryPage.aggregateSection.count.getText().should.equal('10');

    summaryPage.aggregateSection.category.waitForVisible();
    summaryPage.aggregateSection.categoryName.getText().should.equal('CATEGORY');
    summaryPage.aggregateSection.categoryEntryCount.getText().should.equal('10');
    summaryPage.aggregateSection.categoryEntryName.getText().should.equal('Illegal Search');

    summaryPage.aggregateSection.race.waitForVisible();
    summaryPage.aggregateSection.raceName.getText().should.equal('RACE');
    summaryPage.aggregateSection.raceEntryCount.getText().should.equal('10');
    summaryPage.aggregateSection.raceEntryName.getText().should.equal('White');

    summaryPage.aggregateSection.age.waitForVisible();
    summaryPage.aggregateSection.ageName.getText().should.equal('AGE');
    summaryPage.aggregateSection.ageEntryCount.getText().should.equal('10');
    summaryPage.aggregateSection.ageEntryName.getText().should.equal('18');

    summaryPage.aggregateSection.gender.waitForVisible();
    summaryPage.aggregateSection.genderName.getText().should.equal('GENDER');
    summaryPage.aggregateSection.genderEntryCount.getText().should.equal('10');
    summaryPage.aggregateSection.genderEntryName.getText().should.equal('Female');
  });
});
