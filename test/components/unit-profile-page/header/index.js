import React from 'react';
import { shallow } from 'enzyme';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import Header from 'components/unit-profile-page/header';


describe('Header component', function () {
  it('should render unit name and unit description', function () {
    const wrapper = shallow(
      <Header unitName='004' unitDescription='District 004'/>
    );
    const unitName = wrapper.find('.test--unit-name');
    unitName.text().should.equal('Unit 004');
    const unitDescription = wrapper.find('.test--unit-description');
    unitDescription.text().should.equal('District 004');
  });

  it('should change styles at bottom', function () {
    const wrapper = shallow(
      <Header scrollPosition='middle'/>
    );
    wrapper.find(ResponsiveFluidWidthComponent).prop('style').position.should.equal('relative');

    wrapper.setProps({
      scrollPosition: 'bottom',
    });

    wrapper.find(ResponsiveFluidWidthComponent).prop('style').position.should.equal('fixed');
  });
});
