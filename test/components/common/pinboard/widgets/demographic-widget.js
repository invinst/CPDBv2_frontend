import React from 'react';
import { mount } from 'enzyme';

import DemographicWidget from 'components/common/pinboard/widgets/demographic-widget';


describe('DemographicWidget component', function () {
  it('should render correctly', function () {
    const demographicData = {
      race: [
        { name: 'Black', percentage: 0.67 },
        { name: 'White', percentage: 0.14 },
      ],
      gender: [
        { name: 'F', percentage: 0.49 },
        { name: 'M', percentage: 0.47 },
      ],
    };
    const wrapper = mount(<DemographicWidget demographicData={ demographicData } />);
    const demographicHeader = wrapper.find('.demographic-header');
    const demographicChart = wrapper.find('DemographicChart');

    demographicHeader.at(0).text().should.equal('RACE');
    demographicChart.at(0).prop('demographicData').should.eql([
      { name: 'Black', percentage: 0.67 },
      { name: 'White', percentage: 0.14 },
    ]);

    demographicHeader.at(1).text().should.equal('GENDER');
    demographicChart.at(1).prop('demographicData').should.eql([
      { name: 'F', percentage: 0.49 },
      { name: 'M', percentage: 0.47 },
    ]);
  });
});
