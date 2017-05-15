import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils';

import AggregateFacet from 'components/officer-page/summary-page/aggregate-facet';


describe('AggregateFacet component', function () {
  it('should render the name and count of all entries', function () {
    const name = 'name';
    const entries = [{ name: 'foo', count: 1, sustainedCount: 0 }, { name: 'bar', count: 2, sustainedCount: 1 }];
    const instance = renderIntoDocument(<AggregateFacet name={ name } entries={ entries }/>);

    scryRenderedDOMComponentsWithClass(instance, 'test--entry-count').should.have.length(2);
    scryRenderedDOMComponentsWithClass(instance, 'test--entry-sustained-count').should.have.length(2);
    scryRenderedDOMComponentsWithClass(instance, 'test--entry-name').should.have.length(2);
  });
});
