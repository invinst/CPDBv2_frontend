import React from 'react';
import { shallow, mount } from 'enzyme';
import MediaQuery from 'react-responsive';
import { TABLET } from 'utils/constants';

import ResponsiveComponent from 'components/responsive/responsive-component';

describe('ResponsiveComponent component', function () {
  it('should render all 4 screen sizes', function () {
    const wrapper = mount(
      <ResponsiveComponent
        mobileChildren={ <div className='mobile'/> }
        tabletChildren={ <div className='tablet'/> }
        desktopChildren={ <div className='desktop'/> }
        extraWideChildren={ <div className='extraWide'/> }/>
    );
    const mediaQueries = wrapper.find(MediaQuery);
    mediaQueries.at(0).prop('maxWidth').should.equal(767);
    mediaQueries.at(0).prop('children').props.className.should.equal('mobile');
    mediaQueries.at(1).prop('maxWidth').should.equal(991);
    mediaQueries.at(1).prop('minWidth').should.equal(768);
    mediaQueries.at(1).prop('children').props.className.should.equal('tablet');
    mediaQueries.at(2).prop('minWidth').should.equal(992);
    mediaQueries.at(2).prop('maxWidth').should.equal(1199);
    mediaQueries.at(2).prop('children').props.className.should.equal('desktop');
    mediaQueries.at(3).prop('minWidth').should.equal(1200);
    mediaQueries.at(3).prop('children').props.className.should.equal('extraWide');
  });

  it('should render according to certain screen size', function () {
    const wrapper = shallow(
      <ResponsiveComponent
        tabletChildren={ <div>mobile</div> }
        device={ TABLET }/>
    );
    wrapper.find('div').text().should.equal('mobile');
  });
});
