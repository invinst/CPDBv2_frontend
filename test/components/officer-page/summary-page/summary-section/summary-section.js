import React from 'react';
import { map } from 'lodash';
import {
  renderIntoDocument, scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import SummarySection from 'components/officer-page/summary-page/summary-section';
import SummaryField from 'components/officer-page/summary-page/summary-section/summary-field';
import ViewUnitProfileButton from 'components/officer-page/summary-page/summary-section/view-unit-profile-button';
import Salary from 'components/officer-page/summary-page/summary-section/salary';
import YearOld from 'components/officer-page/summary-page/summary-section/year-old';


describe('SummarySection component', function () {
  it('should render summary fields, YearOld, Salary and ViewUnitProfileButton', function () {
    const instance = renderIntoDocument(<SummarySection/>);

    scryRenderedComponentsWithType(instance, YearOld).should.have.length(1);
    scryRenderedComponentsWithType(instance, Salary).should.have.length(1);
    scryRenderedComponentsWithType(instance, ViewUnitProfileButton).should.have.length(1);

    const summaryFields = scryRenderedComponentsWithType(instance, SummaryField);
    summaryFields.should.have.length(7);
    map(summaryFields, field => field.props.label).should.eql([
      'Year of Birth', 'Race', 'Sex', 'Badge', 'Rank', 'Unit', 'Career'
    ]);
  });
});
