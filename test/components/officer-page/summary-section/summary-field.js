import React from 'react';
import { shallow } from 'enzyme';

import SummaryField from 'components/officer-page/summary-section/summary-field';


describe('SummaryField component', function () {
  it('should display field label and value and right-child', function () {
    const wrapper = shallow(<SummaryField />);

    wrapper.find('.summary-field-label').should.have.length(1);
    wrapper.find('.summary-field-value').should.have.length(1);
    wrapper.find('.summary-field-extra-info').should.have.length(1);
  });
});
