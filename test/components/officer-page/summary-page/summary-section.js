import React from 'react';
import { map } from 'lodash';
import { renderIntoDocument, scryRenderedComponentsWithType } from 'react-addons-test-utils';

import SummarySection from 'components/officer-page/summary-page/summary-section';
import SummaryField from 'components/officer-page/summary-page/summary-field';


describe('SummarySection component', function () {
  it('should render summary fields', function () {
    const instance = renderIntoDocument(<SummarySection/>);

    const summaryFields = scryRenderedComponentsWithType(instance, SummaryField);
    summaryFields.should.have.length(6);
    map(summaryFields, field => field.props.label).should.eql([
      'Unit', 'Date of Appt.', 'Rank', 'Race', 'Badge', 'Sex'
    ]);
  });
});
