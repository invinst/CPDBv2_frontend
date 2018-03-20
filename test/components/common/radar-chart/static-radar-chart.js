import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  Simulate, findRenderedComponentWithType
} from 'react-addons-test-utils';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import StaticRadarChart from 'components/common/radar-chart/index';
import RadarArea from 'components/common/radar-chart/radar-area';
import RadarToolTipPoints from 'components/common/radar-chart/radar-tooltip-point';
import RadarLegend from 'components/common/radar-chart/radar-legend';
import RadarAxis from 'components/common/radar-chart/radar-axis';


describe('Static Radar Chart components', function () {
  let instance;
  const data = [
    {
      axis: 'A',
      value: 10,
    },
    {
      axis: 'B',
      value: 50,
    },
    {
      axis: 'C',
      value: 20,
    }
  ];

  afterEach(() => {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', () => {
    StaticRadarChart.should.be.renderable();
  });

  it('should render if data provided', () => {

    instance = renderIntoDocument(<StaticRadarChart data={ data }/>);
    findRenderedComponentWithType(instance, RadarAxis);
    findRenderedComponentWithType(instance, RadarArea);
    findRenderedComponentWithType(instance, RadarLegend);
    findRenderedComponentWithType(instance, RadarToolTipPoints);

    findRenderedDOMComponentWithClass(instance, 'test--radar').getAttribute('style')
      .should.containEql('background-color: rgb(253, 250, 242)');
  });

  it('should render with the given config props', () => {
    const config = {
      width: 232,
      height: 100,
      radius: 164,
    };
    instance = renderIntoDocument(<StaticRadarChart data={ data } { ...config } />);
    const elementDOM = findRenderedDOMComponentWithClass(instance, 'test--radar');
    elementDOM.getAttribute('viewBox').should.eql('0 0 232 100');
  });

  it('should change background color backgroundColor is true ', () => {
    instance = renderIntoDocument(<StaticRadarChart data={ data } backgroundColor='red'/>);

    findRenderedDOMComponentWithClass(instance, 'test--radar').getAttribute('style')
      .should.containEql('background-color: red');
  });

  it('should simulate click action on svg ', () => {
    const clickHandler = spy();
    instance = renderIntoDocument(<StaticRadarChart data={ data } onClick={ clickHandler }/>);

    clickHandler.called.should.be.false();
    Simulate.click(findRenderedDOMComponentWithClass(instance, 'test--radar'));
    clickHandler.calledOnce.should.be.true();
  });
});
