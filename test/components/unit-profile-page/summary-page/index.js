import React from 'react';
import { spy } from 'sinon';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import MemberAggregateSection from 'components/unit-profile-page/summary-page/member-aggregate-section';
import ComplaintAggregateSection from 'components/unit-profile-page/summary-page/complaint-aggregate-section';
import SummaryPage from 'components/unit-profile-page/summary-page';


describe('SummaryPage component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render MemberAggregateSection and ComplaintAggregateSection', function () {
    instance = renderIntoDocument(<SummaryPage />);
    scryRenderedComponentsWithType(instance, MemberAggregateSection).should.have.length(1);
    scryRenderedComponentsWithType(instance, ComplaintAggregateSection).should.have.length(1);
  });

  it('should trigger fetchUnitProfileSummary on initialize', function () {
    const fetchUnitProfileSummary = spy();
    const unitName = '001';
    instance = renderIntoDocument(<SummaryPage unitName={ unitName }
      fetchUnitProfileSummary={ fetchUnitProfileSummary }/>);
    fetchUnitProfileSummary.calledWith(unitName).should.be.true();
  });
});
