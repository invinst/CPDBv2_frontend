import React from 'react';
import { findDOMNode } from 'react-dom';
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

    let axisElements = scryRenderedDOMComponentsWithClass(instance, 'test--radar--axis--text');
    axisElements.should.have.length(3);
    axisElements[0].textContent.should.containEql('Use of ForceReports');
    axisElements[1].textContent.should.containEql('CivilianComplaints');
    axisElements[2].textContent.should.containEql('InternalComplaints');
    axisElements[0].style.fill.should.eql('#231f20');

    findRenderedDOMComponentWithClass(instance, 'test--radar--boundary-area');
  });

  it('should hide axis title when hideText is true', function () {
    instance = renderIntoDocument(
      <RadarAxis
        maxValue={ 100 }
        radius={ 145 }
        hideText={ true }
        axisTitles={ ['Use of Force Reports', 'Civilian Complaints', 'Internal Complaints'] }/>
    );

    const domNode = findDOMNode(instance);
    domNode.textContent.should.not.containEql('Use of Force');
    domNode.textContent.should.not.containEql('Civilian');
    domNode.textContent.should.not.containEql('Internal');
    domNode.textContent.should.not.containEql('Complaints');
    scryRenderedDOMComponentsWithClass(instance, 'test--radar--axis--text').should.have.length(0);

  });
});
