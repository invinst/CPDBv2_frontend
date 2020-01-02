import React from 'react';
import { shallow } from 'enzyme';

import MarkerTooltip from 'components/common/allegations-map/marker-tooltip';


describe('MarkerTooltip component', function () {
  it('should render marker tooltip correctly', function () {
    const wrapper = shallow(
      <MarkerTooltip
        date={ 'Sep, 23, 2006' }
        category={ 'test category' }
      />
    );
    const tooltipDate = wrapper.find('.marker-tooltip-date');
    const tooltipCategory = wrapper.find('.marker-tooltip-category');
    tooltipDate.text().should.equal('Sep, 23, 2006');
    tooltipCategory.text().should.equal('test category');
  });

  it('should go to CR detail page when clicking on', function () {
    const wrapper = shallow(
      <MarkerTooltip
        url='/complaint/123456/'
      />
    );
    const tooltip = wrapper.find('a');
    tooltip.prop('href').should.containEql('/complaint/123456/');
  });
});
