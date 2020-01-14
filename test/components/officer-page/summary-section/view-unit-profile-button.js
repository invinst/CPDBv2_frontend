import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

import ViewUnitProfileButton from 'components/officer-page/summary-section/view-unit-profile-button';


describe('ViewUnitProfileButton component', function () {
  it('should render properly', function () {
    const wrapper = shallow(<ViewUnitProfileButton unitName='localUnit' />);
    const link = wrapper.find(Link);
    link.prop('to').should.equal('/unit/localUnit/');
    link.dive().text().should.containEql('View Unit Profile');
  });
});
