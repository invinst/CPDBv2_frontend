import React from 'react';
import { Motion } from 'react-motion';
import { shallow, mount } from 'enzyme';
import should from 'should';

import RadarLegend from 'components/common/radar-chart/radar-legend';

describe('RadarLegend components', function () {
  it('should display nothing if no content provided', () => {
    const wrapper = shallow(<RadarLegend/>);
    should(wrapper.getElement()).be.null();
  });

  it('should render if text is defined', () => {
    const wrapper = shallow(<RadarLegend content='legend text'/>);

    const element = wrapper.find('.test--radar-legend-content');
    element.text().should.containEql('legend text');
  });

  it('should fadeOut the legend if fadeOut is true', (done) => {
    // TODO: move to selenium-test when officer-profle page is ready
    this.timeout(5000);
    const wrapper = mount(
      <RadarLegend content='2017' fadeOut={ true }/>
    );
    wrapper.find(Motion).exists().should.be.true();
    setTimeout(function () {
      wrapper.update();
      const legendYearElement = wrapper.find('.test--radar-legend-content');
      legendYearElement.text().should.equal('2017');
      legendYearElement.prop('style').should.containEql({ visibility: 'hidden' });
      done();
    }, 1500);
  });
});
