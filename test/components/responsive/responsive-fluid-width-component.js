import React from 'react';
import { shallow } from 'enzyme';
import MediaQuery from 'react-responsive';

import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import scrollBarWidth from 'utils/scrollbar-width';


describe('ResponsiveFluidWidthComponent', function () {
  it('should render responsively', function () {
    ResponsiveFluidWidthComponent.should.be.renderable();
    ResponsiveFluidWidthComponent.should.be.responsiveRenderable();
  });

  it('should take scrollbar width into account in fixed width mode', function () {
    const wrapper = shallow(
      <ResponsiveFluidWidthComponent />
    );
    const nodes = wrapper.find(MediaQuery);
    const node = nodes.filterWhere(n => n.prop('maxWidth') === 767).at(0);
    node.children().prop('style').width.should.equal(`${767 - scrollBarWidth}px`);
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

  it('should render MediaQuery with correct style', function () {
    const wrapper = shallow(
      <ResponsiveFluidWidthComponent
        minimumStyle={ { min: 'min' } }
        mediumStyle={ { med: 'med' } }
        maximumStyle={ { max: 'max' } }
      />
    );
    const mediaQueries = wrapper.find(MediaQuery);

    mediaQueries.at(0).prop('children').props.style.should.eql({ min: 'min' });
    mediaQueries.at(1).prop('children').props.style.should.eql({ med: 'med' });
    mediaQueries.at(2).prop('children').props.style.should.eql({ max: 'max' });
  });
});
