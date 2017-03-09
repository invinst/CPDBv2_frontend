import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';
import { spy } from 'sinon';

import SummaryPage from 'components/officer-page/summary-page';
import SummarySection from 'components/officer-page/summary-page/summary-section';
import AggregateSection from 'components/officer-page/summary-page/aggregate-section';
import { unmountComponentSuppressError } from 'utils/test';


describe('SummaryPage component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render SummarySection and AggregateSection', function () {
    const fetchOfficerSummary = spy();
    instance = renderIntoDocument(
      <SummaryPage fetchOfficerSummary={ fetchOfficerSummary }/>
    );

    scryRenderedComponentsWithType(instance, SummarySection).should.have.length(1);
    scryRenderedComponentsWithType(instance, AggregateSection).should.have.length(1);
  });

  it('should call fetchOfficerSummary on initialization', function () {
    const fetchOfficerSummary = spy();
    const officerId = 1;
    instance = renderIntoDocument(
      <SummaryPage
        fetchOfficerSummary={ fetchOfficerSummary } officerId={ officerId }/>
    );

    fetchOfficerSummary.calledWith(officerId).should.be.true();
  });
});
