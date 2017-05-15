import React from 'react';
import { renderIntoDocument, scryRenderedDOMComponentsWithClass } from 'react-addons-test-utils';

import SummaryField from 'components/officer-page/summary-page/summary-field';


describe('SummaryField component', function () {
  it('should display field label and value and description', function () {
    const instance = renderIntoDocument(<SummaryField />);

    scryRenderedDOMComponentsWithClass(instance, 'test--field-label').should.have.length(1);
    scryRenderedDOMComponentsWithClass(instance, 'test--field-value').should.have.length(1);
    scryRenderedDOMComponentsWithClass(instance, 'test--field-description').should.have.length(1);
  });
});
