import React from 'react';
import { shallow, mount } from 'enzyme';
import should from 'should';

import RadarLegend from 'components/common/radar-chart/radar-legend';


describe('RadarLegend components', function () {
  it('should display nothing if no content provided', function () {
    const wrapper = shallow(<RadarLegend/>);
    should(wrapper.getElement()).be.null();
  });

  it('should render if text is defined and fadeOut is false', function () {
    const wrapper = shallow(<RadarLegend content='legend text' fadeOut={ false }/>);

    const element = wrapper.find('.test--radar-legend-content');
    element.exists().should.be.true();
    element.text().should.containEql('legend text');
  });

  it('should fadeOut the legend when fadeOut is set to true', function () {
    // TODO: move to selenium-test when officer-profile page is ready
    const wrapper = mount(<RadarLegend content='2017' fadeOut={ true }/>);

    wrapper.find('.test--radar-legend-content').exists().should.be.false();
  });
});
