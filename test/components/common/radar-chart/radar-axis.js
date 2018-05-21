import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  findRenderedComponentWithType,
  scryRenderedComponentsWithType
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import RadarAxis from 'components/common/radar-chart/radar-axis';
import RadarAxisText from 'components/common/radar-chart/radar-axis-text';


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

  it('should render axis title as default', function () {
    instance = renderIntoDocument(
      <RadarAxis
        maxValue={ 100 }
        radius={ 145 }
        data={ data }
      />
    );

    findRenderedDOMComponentWithClass(instance, 'test--radar-axis-wrapper');

    const radarAxisText = findRenderedComponentWithType(instance, RadarAxisText);

    const axisElements = scryRenderedDOMComponentsWithClass(radarAxisText, 'test--radar-axis-text');
    axisElements.should.have.length(3);
    axisElements[0].textContent.should.containEql('Use of ForceReports');
    axisElements[1].textContent.should.containEql('CivilianComplaints');
    axisElements[2].textContent.should.containEql('InternalComplaints');

    findRenderedDOMComponentWithClass(instance, 'test--radar-boundary-area');
  });

  it('should render value if showValueInsteadOfTitle', function () {
    instance = renderIntoDocument(
      <RadarAxis
        maxValue={ 100 }
        radius={ 145 }
        data={ data }
        showValueInsteadOfTitle={ true }
      />
    );

    findRenderedDOMComponentWithClass(instance, 'test--radar-axis-wrapper');

    let axisElements = scryRenderedDOMComponentsWithClass(instance, 'test--radar-axis-text');
    axisElements.should.have.length(3);
    axisElements[0].textContent.should.containEql('22');
    axisElements[1].textContent.should.containEql('44');
    axisElements[2].textContent.should.containEql('99.2');

    findRenderedDOMComponentWithClass(instance, 'test--radar-boundary-area');
  });

  it('should hide axis title when hideText is true', function () {
    instance = renderIntoDocument(
      <RadarAxis
        maxValue={ 100 }
        radius={ 145 }
        hideText={ true }
        axisTitles={ ['Use of Force Reports', 'Civilian Complaints', 'Internal Complaints'] }
      />
    );

    scryRenderedComponentsWithType(instance, RadarAxisText).should.have.length(0);

    const domNode = findDOMNode(instance);
    domNode.textContent.should.not.containEql('Use of Force');
    domNode.textContent.should.not.containEql('Civilian');
    domNode.textContent.should.not.containEql('Internal');
    domNode.textContent.should.not.containEql('Complaints');
    scryRenderedDOMComponentsWithClass(instance, 'test--radar-ayarn xis-text').should.have.length(0);
  });
});
