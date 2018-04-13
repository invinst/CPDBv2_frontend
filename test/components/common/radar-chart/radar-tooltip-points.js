import React from 'react';
import { unmountComponentSuppressError } from 'utils/test';
import RadarToolTipPoint from 'components/common/radar-chart/radar-tooltip-point';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';


describe('Radar Tooltip components', function () {
  let instance;
  const data = [
    { axis: 'Use of Force Reports', value: 20, r: 2, x: 3, y: 6 },
    { axis: 'Civilian Complaints', value: 0, r: 1, x: 4, y: 7 },
    { axis: 'Internal Complaints', value: 10, r: 2, x: 5, y: 8 }
  ];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    RadarToolTipPoint.should.be.renderable();
  });

  it('should render if data provided', function () {
    instance = renderIntoDocument(
      <RadarToolTipPoint data={ data }/>
    );

    const points = scryRenderedDOMComponentsWithClass(instance, 'test--radar-tooltip-point');
    points.should.have.length(3);
    points[0].getAttribute('cx').should.eql('3');
    points[0].getAttribute('cy').should.eql('6');

    points[1].getAttribute('cx').should.eql('4');
    points[1].getAttribute('cy').should.eql('7');

    points[2].getAttribute('cx').should.eql('5');
    points[2].getAttribute('cy').should.eql('8');

    findRenderedDOMComponentWithClass(instance, 'test--radar-tooltip-text');
  });

  it('should change state when hover/leave', function () {
    instance = renderIntoDocument(
      <RadarToolTipPoint data={ data }/>
    );
    const points = scryRenderedDOMComponentsWithClass(instance, 'test--radar-tooltip-point');
    instance.state.should.be.eql({
      showTooltip: false,
      activePoint: { x: 0, y: 0, value: 0 }
    });

    const event = {
      target: {
        cx: {
          baseVal: {
            value: 3
          }
        },
        cy: {
          baseVal: {
            value: 6
          }
        }
      }
    };

    Simulate.mouseOver(points[0], event);
    instance.state.should.be.eql({
      showTooltip: true,
      activePoint: { x: 13, y: -4, value: 20 }
    });

    Simulate.mouseOut(points[0]);
    instance.state.should.be.eql({
      showTooltip: false,
      activePoint: { x: 0, y: 0, value: 0 }
    });
  });
});
