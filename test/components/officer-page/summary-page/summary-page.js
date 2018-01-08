import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import SummaryPage from 'components/officer-page/summary-page';
import SummarySection from 'components/officer-page/summary-page/summary-section';
import AggregateSection from 'components/officer-page/summary-page/aggregate-section';
import { unmountComponentSuppressError } from 'utils/test';
import scrollbarWidth from 'utils/scrollbar-width';


describe('SummaryPage component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render SummarySection and AggregateSection', function () {
    instance = renderIntoDocument(
      <SummaryPage fetchOfficerSummary={ () => {
      } }/>
    );

    scryRenderedComponentsWithType(instance, SummarySection).should.have.length(1);
    scryRenderedComponentsWithType(instance, AggregateSection).should.have.length(1);
  });
});
