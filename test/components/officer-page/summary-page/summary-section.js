import React from 'react';
import { findDOMNode } from 'react-dom';
import { map } from 'lodash';
import {
  renderIntoDocument, scryRenderedComponentsWithType, findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';

import SummarySection from 'components/officer-page/summary-page/summary-section';
import SummaryField from 'components/officer-page/summary-page/summary-field';
import ViewUnitProfileButton from 'components/officer-page/summary-page/view-unit-profile-button';


describe('SummarySection component', function () {
  it('should render unit and other summary fields', function () {
    const instance = renderIntoDocument(<SummarySection/>);

    const unitField = findRenderedDOMComponentWithClass(instance, 'test--field-unit-label');
    findDOMNode(unitField).innerText.should.be.equal('Unit');
    scryRenderedComponentsWithType(instance, ViewUnitProfileButton).should.have.length(1);

    const summaryFields = scryRenderedComponentsWithType(instance, SummaryField);
    summaryFields.should.have.length(6);
    map(summaryFields, field => field.props.label).should.eql([
      'Rank', 'Date of Appt.', 'Badge', 'Race', '2016 Salary', 'Sex'
    ]);
  });
});
