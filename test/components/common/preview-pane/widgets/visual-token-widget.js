import React from 'react';
import { shallow } from 'enzyme';

import { VisualTokenWidget } from 'components/common/preview-pane/widgets';
import StaticRadarChart from 'components/common/radar-chart';


describe('VisualTokenWidget component', () => {
  it('should contain StaticRadarChart component', () => {
    const wrapper = shallow(
      <VisualTokenWidget/>
    );
    wrapper.find(StaticRadarChart).exists().should.be.true();
  });
});
