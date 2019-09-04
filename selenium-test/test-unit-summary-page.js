'use strict';

require('should');

import summaryPage from './page-objects/unit-summary-page';


describe('unit summary page', function () {
  beforeEach(function () {
    summaryPage.open();
  });

  it('should display unit summary', function () {
    summaryPage.header.unitName.getText().should.equal('Unit 001');

    summaryPage.memberAggregateSection.status.getText().should.equal('5 active members, 10 all-time');

    summaryPage.memberAggregateSection.raceName.getText().should.equal('RACE');
    summaryPage.memberAggregateSection.raceEntryCount.getText().should.equal('10');
    summaryPage.memberAggregateSection.raceEntryName.getText().should.equal('White');

    summaryPage.memberAggregateSection.ageName.getText().should.equal('AGE');
    summaryPage.memberAggregateSection.ageEntryCount.getText().should.equal('10');
    summaryPage.memberAggregateSection.ageEntryName.getText().should.equal('21-30');

    summaryPage.memberAggregateSection.genderName.getText().should.equal('GENDER');
    summaryPage.memberAggregateSection.genderEntryCount.getText().should.equal('10');
    summaryPage.memberAggregateSection.genderEntryName.getText().should.equal('Female');

    summaryPage.complaintAggregateSection.status.getText().should.equal('10 complaint records (CRs), 2 sustained');

    summaryPage.complaintAggregateSection.categoryName.getText().should.equal('CATEGORY');
    summaryPage.complaintAggregateSection.categoryEntryCount.getText().should.equal('10');
    summaryPage.complaintAggregateSection.categoryEntrySustainedCount.getText().should.equal('2');
    summaryPage.complaintAggregateSection.categoryEntryName.getText().should.equal('Illegal Search');

    summaryPage.complaintAggregateSection.raceName.getText().should.equal('RACE');
    summaryPage.complaintAggregateSection.raceEntryCount.getText().should.equal('10');
    summaryPage.complaintAggregateSection.raceEntrySustainedCount.getText().should.equal('2');
    summaryPage.complaintAggregateSection.raceEntryName.getText().should.equal('White');

    summaryPage.complaintAggregateSection.ageName.getText().should.equal('AGE');
    summaryPage.complaintAggregateSection.ageEntryCount.getText().should.equal('10');
    summaryPage.complaintAggregateSection.ageEntrySustainedCount.getText().should.equal('2');
    summaryPage.complaintAggregateSection.ageEntryName.getText().should.equal('<20');

    summaryPage.complaintAggregateSection.genderName.getText().should.equal('GENDER');
    summaryPage.complaintAggregateSection.genderEntryCount.getText().should.equal('10');
    summaryPage.complaintAggregateSection.genderEntrySustainedCount.getText().should.equal('2');
    summaryPage.complaintAggregateSection.genderEntryName.getText().should.equal('Female');
  });
});
