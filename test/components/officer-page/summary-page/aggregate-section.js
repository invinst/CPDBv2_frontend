import React from 'react';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import AggregateSection from 'components/officer-page/summary-page/aggregate-section';
import AggregateFacet from 'components/officer-page/summary-page/aggregate-facet';


describe('AggregateSection component', function () {
  it('should render all aggregate facets', function () {
    const aggregateFacets = [{ name: 'category', entries: [] }, { name: 'race', entries: [] }];
    const instance = renderIntoDocument(<AggregateSection aggregateFacets={ aggregateFacets }/>);

    scryRenderedComponentsWithType(instance, AggregateFacet).should.have.length(aggregateFacets.length);
  });
});
