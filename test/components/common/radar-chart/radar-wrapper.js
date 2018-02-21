import React from 'react';
import { unmountComponentSuppressError } from 'utils/test';
import RadarWrapper from 'components/common/radar-chart/radar-wrapper';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';

describe('RadarWrapper components', function () {
  let instance;
  const data = [{
    year: 2015,
    items: [
      { axis: 'Use of Force Reports', value: 20 },
      { axis: 'Civilian Complaints', value: 0 },
      { axis: 'Internal Complaints', value: 10 },
    ]
  }, {
    year: 2016,
    items: [
      { axis: 'Use of Force Reports', value: 40 },
      { axis: 'Civilian Complaints', value: 50 },
      { axis: 'Internal Complaints', value: 60 },
    ]
  }, {
    year: 2017,
    items: [
      { axis: 'Use of Force Reports', value: 80 },
      { axis: 'Civilian Complaints', value: 70 },
      { axis: 'Internal Complaints', value: 60 },
    ]
  }];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    RadarWrapper.should.be.renderable();
  });

  it('should render if data provided', function () {
    instance = renderIntoDocument(
      <RadarWrapper data={ data }/>
    );
    findRenderedDOMComponentWithClass(instance, 'test--radar--wrapper');
    findRenderedDOMComponentWithClass(instance, 'test--radar--radar-area');
    findRenderedDOMComponentWithClass(instance, 'test--radar--stroke');
    scryRenderedDOMComponentsWithClass(instance, 'test--radar--circles').should.have.length(3);
  });

  it('should also render if data length is 1', function () {
    const compactData = [data[0]];
    instance = renderIntoDocument(
      <RadarWrapper data={ compactData }/>
    );
    findRenderedDOMComponentWithClass(instance, 'test--radar--wrapper');
    scryRenderedDOMComponentsWithClass(instance, 'test--radar--circles').should.have.length(3);
  });
});
