import React from 'react';
import { unmountComponentSuppressError } from 'utils/test';
import RadarWrapper from 'components/common/radar-chart/radar-wrapper';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
} from 'react-addons-test-utils';

import { useFakeTimers } from 'sinon';

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
    if (instance) {
      unmountComponentSuppressError(instance);
    }
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
    findRenderedDOMComponentWithClass(instance, 'test--radar--legend-content');
  });

  it('should also render if data length is 1', function () {
    const compactData = [data[0]];
    instance = renderIntoDocument(
      <RadarWrapper data={ compactData }/>
    );
    findRenderedDOMComponentWithClass(instance, 'test--radar--wrapper');
  });

  it('test hide text year legend after animation end', function (done) {
    // TODO: move to selenium-test when officer-profle page is ready
    this.timeout(5000);
    instance = renderIntoDocument(
      <RadarWrapper data={ data }/>
    );

    setTimeout(function () {
      const legendYearElement = findRenderedDOMComponentWithClass(instance, 'test--radar--legend-content');
      legendYearElement.textContent.should.be.eql('2017');
      legendYearElement.getAttribute('style').should.containEql('visibility: hidden');
      done();
    }, 1900);
  });

  describe('test transition', function () {
    let clock;
    beforeEach(function () {
      clock = useFakeTimers();
    });

    afterEach(function () {
      clock.restore();
    });

    it('should change transition value after mounting', function () {
      instance = renderIntoDocument(
        <RadarWrapper data={ data }/>
      );
      instance.state.transitionValue.should.eql(0);
      clock.tick(25);
      instance.state.transitionValue.should.eql(instance.velocity);
      clock.tick(500);
      instance.state.transitionValue.should.eql(2);
    });

    it('should update the text legend as transition execute', function () {
      const intervalTime = Math.ceil(instance.interval * (1.0 / instance.velocity)) + instance.interval;
      instance = renderIntoDocument(
        <RadarWrapper data={ data }/>
      );

      let legendYearElement = findRenderedDOMComponentWithClass(instance, 'test--radar--legend-content');
      legendYearElement.textContent.should.be.eql('2015');

      clock.tick(intervalTime);
      findRenderedDOMComponentWithClass(instance, 'test--radar--legend-content').textContent.should.be.eql('2016');
    });
  });
});
