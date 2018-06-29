import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { spy } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import RadarExplainer from 'components/officer-page/radar-chart/explainer';
import LeftNavigation from 'components/officer-page/radar-chart/explainer/left-navigation';
import RightNavigation from 'components/officer-page/radar-chart/explainer/right-navigation';
import TriangleExplainer from 'components/officer-page/radar-chart/explainer/triangle-explainer';
import ScaleExplainer from 'components/officer-page/radar-chart/explainer/scale-explainer';
import PercentilesByYearExplainer from 'components/officer-page/radar-chart/explainer/percentiles-by-year';


describe('RadarExplainer components', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should renderable', function () {
    RadarExplainer.should.be.renderable();
  });

  it('should render close button and TriangleExplainer as default', function () {
    instance = renderIntoDocument(<RadarExplainer/>);
    const closeButton = findRenderedDOMComponentWithClass(instance, 'test--radar-explainer-close-button');

    closeButton.querySelectorAll('.fa-close').should.have.length(1);

    findRenderedComponentWithType(instance, LeftNavigation);
    findRenderedComponentWithType(instance, RightNavigation);
    findRenderedComponentWithType(instance, TriangleExplainer);

    const instanceDOM = findDOMNode(instance);
    instanceDOM.textContent.should.containEql('What is the scale?');
    instanceDOM.textContent.should.containEql('Percentiles by year');
  });

  it('should change to ScaleExplainer when click to RightNavigation', function () {
    instance = renderIntoDocument(<RadarExplainer/>);
    findRenderedComponentWithType(instance, TriangleExplainer);
    instance.state.currentPaneIndex.should.eql(0);
    const rightNavigationElm = findRenderedDOMComponentWithClass(instance, 'test--radar-explainer-navigation-right');
    Simulate.click(rightNavigationElm);
    instance.state.currentPaneIndex.should.eql(1);
    findRenderedComponentWithType(instance, ScaleExplainer);

    const instanceDOM = findDOMNode(instance);
    instanceDOM.textContent.should.containEql('What is this triangle?');
    instanceDOM.textContent.should.containEql('Percentiles by year');
  });

  it('should change to PercentilesByYear when click to LeftNavigation', function () {
    instance = renderIntoDocument(<RadarExplainer/>);
    findRenderedComponentWithType(instance, TriangleExplainer);
    instance.state.currentPaneIndex.should.eql(0);
    const leftNavigationElm = findRenderedDOMComponentWithClass(instance, 'test--radar-explainer-navigation-left');
    Simulate.click(leftNavigationElm);
    instance.state.currentPaneIndex.should.eql(2);
    findRenderedComponentWithType(instance, PercentilesByYearExplainer);

    const instanceDOM = findDOMNode(instance);
    instanceDOM.textContent.should.containEql('What is this triangle?');
    instanceDOM.textContent.should.containEql('What is the scale?');
  });

  it('should change to PercentilesByYear when click to RightNavigation two times', function () {
    instance = renderIntoDocument(<RadarExplainer/>);
    findRenderedComponentWithType(instance, TriangleExplainer);
    instance.state.currentPaneIndex.should.eql(0);
    const rightNavigationElm = findRenderedDOMComponentWithClass(instance, 'test--radar-explainer-navigation-right');
    Simulate.click(rightNavigationElm);
    Simulate.click(rightNavigationElm);
    instance.state.currentPaneIndex.should.eql(2);
    findRenderedComponentWithType(instance, PercentilesByYearExplainer);
  });


  it('should invoke closeExplainer when clicking on close button', function () {
    const closeExplainerSpy = spy();
    instance = renderIntoDocument(<RadarExplainer closeExplainer={ closeExplainerSpy }/>);
    const closeButton = findRenderedDOMComponentWithClass(instance, 'test--radar-explainer-close-button');

    closeButton.querySelectorAll('.fa-close').should.have.length(1);

    Simulate.click(closeButton);

    closeExplainerSpy.should.be.calledOnce();
  });
});
