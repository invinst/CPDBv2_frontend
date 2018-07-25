import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
  findRenderedComponentWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import RadarChart from 'components/common/radar-chart/radar-chart';
import RadarArea from 'components/common/radar-chart/radar-area';
import RadarLegend from 'components/common/radar-chart/radar-legend';
import RadarAxis from 'components/common/radar-chart/radar-axis';
import RadarSpineLine from 'components/common/radar-chart/radar-spine-line';
import RadarGrid from 'components/common/radar-chart/radar-grid';
import { reRender } from '../../../../src/js/utils/test';


describe('RadarChart component', function () {
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
    RadarChart.should.be.renderable();
  });

  it('should render default radar chart if data provided', () => {
    instance = renderIntoDocument(<RadarChart data={ data }/>);
    findRenderedComponentWithType(instance, RadarArea);
    findRenderedComponentWithType(instance, RadarSpineLine);
    findRenderedComponentWithType(instance, RadarLegend);

    findRenderedDOMComponentWithClass(instance, 'test--radar').getAttribute('style')
      .should.containEql('background-color: rgb(253, 250, 242)');
    findRenderedDOMComponentWithClass(instance, 'test--radar-boundary-area');
  });

  it('should show RadarAxis if there is data and showAxisTitle || showAxisValue', function () {
    instance = renderIntoDocument(<RadarChart data={ data } showAxisTitle={ true }/>);
    findRenderedComponentWithType(instance, RadarAxis);

    instance = reRender(<RadarChart data={ data }/>, instance);
    scryRenderedComponentsWithType(instance, RadarAxis).should.have.length(0);

    instance = renderIntoDocument(<RadarChart data={ data } showAxisValue={ true }/>);
    findRenderedComponentWithType(instance, RadarAxis);
  });

  it('should render grid if showGrid is true', function () {
    instance = renderIntoDocument(<RadarChart data={ data } showGrid={ true }/>);
    findRenderedComponentWithType(instance, RadarGrid);
  });

  it('should hide spline line if showSpineLine is set to false', function () {
    instance = renderIntoDocument(<RadarChart data={ data } showSpineLine={ false }/>);
    scryRenderedComponentsWithType(instance, RadarSpineLine).should.have.length(0);
  });

  it('should render with the given aspect ratio config props', () => {
    const config = {
      width: 232,
      height: 100,
      radius: 164,
    };
    instance = renderIntoDocument(<RadarChart data={ data } { ...config } />);
    const elementDOM = findRenderedDOMComponentWithClass(instance, 'test--radar');
    elementDOM.getAttribute('viewBox').should.eql('0 0 232 100');
  });

  it('should change background color backgroundColor is true ', () => {
    instance = renderIntoDocument(<RadarChart data={ data } backgroundColor='red'/>);

    findRenderedDOMComponentWithClass(instance, 'test--radar').getAttribute('style')
      .should.containEql('background-color: red');
  });
});
