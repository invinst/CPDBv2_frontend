import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerRow from 'components/trr-page/officer-section/officer-row';
import NavigationButton from 'components/trr-page/officer-section/navigation-button';
import StaticRadarChart from 'components/common/radar-chart';


describe('OfficerRow component', function () {
  let instance;
  const officerData = {
    officerId: 123,
    fullName: 'Ronald Watts',
    rank: 'Police Officer',
    percentile: {
      year: undefined,
      items: [
        { axis: 'Use of Force Reports', value: 99.9 },
        { axis: 'Officer Allegations', value: 11.1 },
        { axis: 'Civilian Allegations', value: 22.2 }
      ],
      visualTokenBackground: '#ed6154',
      textColor: '#231F20',
    },
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render radar chart, officerName and View Profile button', function () {
    instance = renderIntoDocument(<OfficerRow { ...officerData }/>);

    const radarChart = findRenderedComponentWithType(instance, StaticRadarChart);
    radarChart.props.backgroundColor.should.eql('#ed6154');
    radarChart.props.data.should.eql([
      { axis: 'Use of Force Reports', value: 99.9 },
      { axis: 'Officer Allegations', value: 11.1 },
      { axis: 'Civilian Allegations', value: 22.2 }
    ]);

    findRenderedDOMComponentWithClass(instance, 'trr-officer-row-rank').textContent.should.eql('Police Officer');
    const officerName = findRenderedDOMComponentWithClass(instance, 'trr-officer-full-name');
    officerName.textContent.should.containEql('Ronald Watts');
    const navigationButton = findRenderedComponentWithType(instance, NavigationButton);
    navigationButton.props.text.should.eql('View Profile');
  });

  it('should hide visual token when printing', function () {
    instance = renderIntoDocument(<OfficerRow { ...officerData }/>);
    findRenderedDOMComponentWithClass(instance, 'trr-officer-row-visual-token').className.should.containEql(
      'no-print'
    );
  });
});
