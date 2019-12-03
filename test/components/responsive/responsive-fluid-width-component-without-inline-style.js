import React from 'react';
import { shallow } from 'enzyme';
import MediaQuery from 'react-responsive';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component-without-inline-style';


describe('ResponsiveFluidWidthComponentWithoutInlineStyle', function () {

  afterEach(function () {
  });

  it('should render responsively', function () {
    ResponsiveFluidWidthComponent.should.be.renderable();
    ResponsiveFluidWidthComponent.should.be.responsiveRenderable();
  });

  it('should render MediaQuery with correct width', function () {
    const wrapper = shallow(
      <ResponsiveFluidWidthComponent
        minWidthThreshold={ 768 }
        maxWidthThreshold={ 1440 }/>
    );
    const mediaQueries = wrapper.find(MediaQuery);

    mediaQueries.should.have.length(3);
    mediaQueries.at(0).prop('maxWidth').should.equal(767);

    mediaQueries.at(1).prop('minWidth').should.equal(768);
    mediaQueries.at(1).prop('maxWidth').should.equal(1439);

    mediaQueries.at(2).prop('minWidth').should.equal(1440);
  });
});
