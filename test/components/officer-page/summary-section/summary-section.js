import React from 'react';
import { map } from 'lodash';
import {
  renderIntoDocument, scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

import SummarySection from 'components/officer-page/summary-section';
import SummaryField from 'components/officer-page/summary-section/summary-field';
import ViewUnitProfileButton from 'components/officer-page/summary-section/view-unit-profile-button';
import Salary from 'components/officer-page/summary-section/salary';
import YearOld from 'components/officer-page/summary-section/year-old';


describe('SummarySection component', function () {
  it('should render summary fields, YearOld, Salary and ViewUnitProfileButton', function () {
    const instance = renderIntoDocument(<SummarySection/>);

    scryRenderedComponentsWithType(instance, YearOld).should.have.length(1);
    scryRenderedComponentsWithType(instance, Salary).should.have.length(1);
    scryRenderedComponentsWithType(instance, ViewUnitProfileButton).should.have.length(1);

    const summaryFields = scryRenderedComponentsWithType(instance, SummaryField);
    summaryFields.should.have.length(7);
    map(summaryFields, field => field.props.label).should.eql([
      'Year of Birth', 'Race', 'Sex', 'Badge', 'Rank', 'Unit', 'Career',
    ]);
  });

  it('should render correct badge row', function () {
    const officerSummary = {
      badge: '1234',
      historicBadges: ['4321, 5678'],
    };
    const instance = renderIntoDocument(<SummarySection officerSummary={ officerSummary }/>);
    const summaryFields = scryRenderedComponentsWithType(instance, SummaryField);
    findDOMNode(summaryFields[3]).textContent.should.containEql('1234, 4321, 5678');
  });

  it('should only render historic badge when badge is empty', function () {
    const officerSummary = {
      badge: '',
      historicBadges: ['4321, 5678'],
    };
    const instance = renderIntoDocument(<SummarySection officerSummary={ officerSummary }/>);
    const summaryFields = scryRenderedComponentsWithType(instance, SummaryField);
    findDOMNode(summaryFields[3]).textContent.should.containEql('4321, 5678');
  });

  it('should only render badge when historic badge is empty', function () {
    const officerSummary = {
      badge: '1234',
      historicBadges: [],
    };
    const instance = renderIntoDocument(<SummarySection officerSummary={ officerSummary }/>);
    const summaryFields = scryRenderedComponentsWithType(instance, SummaryField);
    findDOMNode(summaryFields[3]).textContent.should.containEql('1234');
  });

  it('should render Unknown when both badge and historic badge are empty', function () {
    const officerSummary = {
      badge: '',
      historicBadges: [],
    };
    const instance = renderIntoDocument(<SummarySection officerSummary={ officerSummary }/>);
    const summaryFields = scryRenderedComponentsWithType(instance, SummaryField);
    findDOMNode(summaryFields[3]).textContent.should.containEql('Unknown');
  });
});
