import React from 'react';
import { shallow } from 'enzyme';

import ComplaintIncidentDate from 'components/cr-page/complaint-incident-date';


describe('ComplaintIncidentDate component', function () {
  it('should render incident-date', function () {
    const wrapper = shallow(<ComplaintIncidentDate incidentDate='2012-12-05' />);
    const incidentDateValue = wrapper.find('.cr-incident-date-value');
    incidentDateValue.text().should.equal('Dec 5, 2012');
  });

  it('should render nothing if incident date is not present', function () {
    const wrapper = shallow(<ComplaintIncidentDate />);
    wrapper.find('cr-incident-date-value').should.have.length(0);
  });
});
