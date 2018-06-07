import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  scryRenderedComponentsWithType,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import RadarAxis from 'components/common/radar-chart/radar-axis';
import RadarAxisText from 'components/common/radar-chart/radar-axis/radar-axis-text';


describe('RadarAxis components', function () {
  let instance;

  const data = [{
    axis: 'Use of Force Reports',
    value: 22.2,
  }, {
    axis: 'Civilian Complaints',
    value: 44.8,
  }, {
    axis: 'Internal Complaints',
    value: 99.28,
  }];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    RadarAxis.should.be.renderable();
  });

  it('should hide axis titles and values as default', function () {
    instance = renderIntoDocument(
      <RadarAxis
        maxValue={ 100 }
        radius={ 145 }
        data={ data }
        axisValueSuffix='%'
      />
    );

    scryRenderedComponentsWithType(instance, RadarAxisText).should.have.length(0);

    const domNode = findDOMNode(instance);
    domNode.textContent.should.not.containEql('Use of Force');
    domNode.textContent.should.not.containEql('Civilian');
    domNode.textContent.should.not.containEql('Internal');
    domNode.textContent.should.not.containEql('Complaints');
    domNode.textContent.should.not.containEql('%');
    scryRenderedDOMComponentsWithClass(instance, 'test--radar-axis-text').should.have.length(0);
  });

  it('should render value if showAxisValue', function () {
    instance = renderIntoDocument(
      <RadarAxis
        maxValue={ 100 }
        radius={ 145 }
        data={ data }
        showAxisValue={ true }
        axisValueSuffix='%'
      />
    );

    findRenderedDOMComponentWithClass(instance, 'test--radar-axis-wrapper');

    const axisElements = scryRenderedDOMComponentsWithClass(instance, 'test--radar-axis-text');
    axisElements.should.have.length(3);
    axisElements[0].textContent.should.eql('22%');
    axisElements[1].textContent.should.eql('44%');
    axisElements[2].textContent.should.eql('99.2%');

    findRenderedDOMComponentWithClass(instance, 'test--radar-boundary-area');
  });

  it('should render value if showAxisTitle', function () {
    instance = renderIntoDocument(
      <RadarAxis
        maxValue={ 100 }
        radius={ 145 }
        data={ data }
        showAxisTitle={ true }
      />
    );

    findRenderedDOMComponentWithClass(instance, 'test--radar-axis-wrapper');

    const axisElements = scryRenderedDOMComponentsWithClass(instance, 'test--radar-axis-text');
    axisElements.should.have.length(3);
    axisElements[0].textContent.should.eql('Use of ForceReports');
    axisElements[1].textContent.should.eql('CivilianComplaints');
    axisElements[2].textContent.should.eql('InternalComplaints');

    findRenderedDOMComponentWithClass(instance, 'test--radar-boundary-area');
  });

  it('should not render RadarAxisText if neither showAxisTitle nor showAxisValue', function () {
    instance = renderIntoDocument(
      <RadarAxis
        maxValue={ 100 }
        radius={ 145 }
        data={ data }
      />
    );

    scryRenderedComponentsWithType(instance, RadarAxisText).should.have.length(0);
  });
});
