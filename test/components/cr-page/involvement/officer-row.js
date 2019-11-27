import React from 'react';
import { mount } from 'enzyme';

import OfficerRow from 'components/cr-page/involvement/officer-row';


describe('OfficerRow component', function () {
  it('should render fullName and extraInfo', function () {
    const wrapper = mount(<OfficerRow fullName='Foo' extraInfo='male, white' />);
    wrapper.text().should.containEql('Foo');
    wrapper.text().should.containEql('male, white');
  });
});
