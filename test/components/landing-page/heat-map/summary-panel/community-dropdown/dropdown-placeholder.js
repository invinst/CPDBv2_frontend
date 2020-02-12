import React from 'react';
import { shallow } from 'enzyme';
import { spy } from 'sinon';

import DropdownPlaceholder from
  'components/landing-page/heat-map/summary-panel/community-dropdown/dropdown-placeholder';


describe('DropdownPlaceholder component', function () {
  it('should renderable', function () {
    DropdownPlaceholder.should.be.renderable({ withRouter: true });
  });

  it('should trigger openDropdown when click on', function () {
    const openDropdown = spy();
    const wrapper = shallow(<DropdownPlaceholder openDropdown={ openDropdown }/>);
    wrapper.simulate('click');
    openDropdown.should.be.calledOnce();
  });
});
