import React from 'react';
import { shallow } from 'enzyme';

import NavigationButton from 'components/trr-page/officer-section/navigation-button';


describe('NavigationButton component', function () {
  it('should render correct text', function () {
    const wrapper = shallow(<NavigationButton text='Some text'/>);
    wrapper.text().should.equal('Some text');
  });

  it('should hide when printing', function () {
    const wrapper = shallow(<NavigationButton text='Some text'/>);
    wrapper.prop('className').should.containEql('no-print');
  });
});
