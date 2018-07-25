import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import RadarChart from 'components/common/radar-chart/radar-chart';
import NoDataRadarChart from 'components/common/radar-chart/no-data-radar-chart';


describe('NoDataRadarChart component', function () {
  let instance;

  afterEach(() => {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable with no data text', () => {
    const props = {
      width: 456,
      height: 432,
      radius: 123,
    };

    instance = renderIntoDocument(<NoDataRadarChart { ...props }/>);

    findRenderedComponentWithType(instance, RadarChart);
    scryRenderedDOMComponentsWithClass(instance, 'test--no-data-text').should.have.length(0);
  });

  it('should be able to render NoDataRadarChart', () => {
    const noDataText = 'some explain text';
    const props = {
      width: 456,
      height: 432,
      radius: 123,
      noDataText
    };

    instance = renderIntoDocument(<NoDataRadarChart { ...props }/>);

    findRenderedComponentWithType(instance, RadarChart);
    findRenderedDOMComponentWithClass(instance, 'test--no-data-text').textContent.should.equal(noDataText);
  });
});
