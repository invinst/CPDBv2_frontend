import React from 'react';
import { unmountComponentSuppressError } from 'utils/test';
import RadarAxis from 'components/common/radar-chart/radar-axis';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';

describe('RadarAxis components', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable', function () {
    RadarAxis.should.be.renderable();
  });

  it('should render if data provided', function () {
    instance = renderIntoDocument(
      <RadarAxis
        maxValue={ 100 }
        radius={ 145 }
        axisTitles={ ['Use of Force Reports', 'Civilian Complaints', 'Internal Complaints'] }/>
    );

    findRenderedDOMComponentWithClass(instance, 'test--radar--axis-wrapper');

    let axisElements = scryRenderedDOMComponentsWithClass(instance, 'test--radar--axis--axis');
    axisElements.should.have.length(3);
    axisElements[0].textContent.should.containEql('Use of Force Reports');
    axisElements[1].textContent.should.containEql('Civilian Complaints');
    axisElements[2].textContent.should.containEql('Internal Complaints');

    findRenderedDOMComponentWithClass(instance, 'test--radar--boundary-area');
  });
});
