import React from 'react';
import { shallow } from 'enzyme';

import { NewVisualTokenWidget as VisualTokenWidget } from 'components/common/preview-pane/widgets';
import StaticRadarChart from 'components/common/radar-chart';


describe('NewVisualTokenWidget component', function () {
  it('should contain StaticRadarChart component', function () {
    const wrapper = shallow(
      <VisualTokenWidget/>
    );
    wrapper.find(StaticRadarChart).exists().should.be.true();
  });
});
