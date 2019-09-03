import React from 'react';

import { unmountComponentSuppressError } from 'utils/test';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass, scryRenderedComponentsWithType,
} from 'react-addons-test-utils';
import ComplaintIncidentDate from 'components/cr-page/complaint-incident-date';


describe('ComplaintIncidentDate component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render incident-date', function () {
    instance = renderIntoDocument(<ComplaintIncidentDate incidentDate='2012-12-05' />);
    const incidentDateValue = findRenderedDOMComponentWithClass(instance, 'cr-incident-date-value');
    incidentDateValue.textContent.should.eql('Dec 5, 2012');
  });

  it('should render nothing if incident date is not present', function () {
    instance = renderIntoDocument(<ComplaintIncidentDate />);
    scryRenderedComponentsWithType(instance, 'cr-incident-date-value').should.have.length(0);
  });
});
