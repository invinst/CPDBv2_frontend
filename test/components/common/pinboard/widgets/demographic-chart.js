import React from 'react';
import { mount } from 'enzyme';

import DemographicChart from 'components/common/pinboard/widgets/demographic-chart';


describe('DemographicChart component', function () {
  it('should be renderable', function () {
    const wrapper = mount(
      <DemographicChart demographicData={ [
        { name: 'Unknown', percentage: 0.49 },
        { name: 'M', percentage: 0.47 },
      ]
      } />
    );
    wrapper.html().should.not.be.null();
  });
});
