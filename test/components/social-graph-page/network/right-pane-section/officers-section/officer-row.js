import React from 'react';
import {
  renderIntoDocument,
  scryRenderedComponentsWithType,
  findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerRow from 'components/social-graph-page/network/right-pane-section/officers-section/officer-row';
import StaticRadarChart from 'components/common/radar-chart';


describe('OfficerRow component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render officer correctly', function () {
    const officer = {
      fullName: 'Jerome Finnigan',
      id: 1,
      percentile: {
        officerId: 1,
        year: 2007,
        items: [
          { axis: 'Use of Force Reports', value: 92.3 },
          { axis: 'Officer Allegations', value: 82 },
          { axis: 'Civilian Allegations', value: 97 }
        ],
        visualTokenBackground: '#f52524',
        textColor: '#DFDFDF'
      }
    };
    instance = renderIntoDocument(<OfficerRow officer={ officer }/>);
    const radarChart = scryRenderedComponentsWithType(instance, StaticRadarChart);
    const officerName = findRenderedDOMComponentWithClass(instance, 'officer-name');
    radarChart.should.have.length(1);
    officerName.textContent.should.eql('Jerome Finnigan');
  });
});
