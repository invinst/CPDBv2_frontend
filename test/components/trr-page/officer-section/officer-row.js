import React from 'react';
import { shallow } from 'enzyme';

import OfficerRow from 'components/trr-page/officer-section/officer-row';
import NavigationButton from 'components/trr-page/officer-section/navigation-button';
import StaticRadarChart from 'components/common/radar-chart';


describe('OfficerRow component', function () {
  const officerData = {
    officerId: 123,
    fullName: 'Ronald Watts',
    rank: 'Police Officer',
    percentile: {
      year: undefined,
      items: [
        { axis: 'Use of Force Reports', value: 99.9 },
        { axis: 'Officer Allegations', value: 11.1 },
        { axis: 'Civilian Allegations', value: 22.2 },
      ],
      visualTokenBackground: '#ed6154',
      textColor: '#231F20',
    },
  };

  it('should render radar chart, officerName and View Profile button', function () {
    const wrapper = shallow(<OfficerRow { ...officerData }/>);

    const radarChart = wrapper.find(StaticRadarChart);
    radarChart.prop('backgroundColor').should.equal('#ed6154');
    radarChart.prop('data').should.eql([
      { axis: 'Use of Force Reports', value: 99.9 },
      { axis: 'Officer Allegations', value: 11.1 },
      { axis: 'Civilian Allegations', value: 22.2 },
    ]);

    wrapper.find('.trr-officer-row-rank').text().should.equal('Police Officer');
    const officerName = wrapper.find('.trr-officer-full-name');
    officerName.text().should.containEql('Ronald Watts');
    const navigationButton = wrapper.find(NavigationButton);
    navigationButton.prop('text').should.equal('View Profile');
  });

  it('should hide visual token when printing', function () {
    const wrapper = shallow(<OfficerRow { ...officerData }/>);
    wrapper.find('.trr-officer-row-visual-token').prop('className').should.containEql('no-print');
  });
});
