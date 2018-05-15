import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  Simulate
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

  it('should empty if "show" is false', function () {
    instance = renderIntoDocument(<RadarExplainer/>);
    instance.should.displayNothing();
  });

  it('should render TriangleExplainer if "show" is true', function () {
    instance = renderIntoDocument(<RadarExplainer show={ true }/>);
    findRenderedComponentWithType(instance, LeftNavigation);
    findRenderedComponentWithType(instance, RightNavigation);
    findRenderedComponentWithType(instance, TriangleExplainer);

    const instanceDOM = findDOMNode(instance);
    instanceDOM.textContent.should.containEql('What is the scale?');
    instanceDOM.textContent.should.containEql('Percentiles by year');
  });

  it('should change to ScaleExplainer when click to RightNavigation', function () {
    instance = renderIntoDocument(
      <RadarExplainer show={ true }/>
    );
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

  it('should change to PercentilesByYearExplainer when click to LeftNavigation', function () {
    instance = renderIntoDocument(
      <RadarExplainer show={ true }/>
    );
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

  it('should change back to PercentilesByYearExplainer when click to RightNavigation two times', function () {
    instance = renderIntoDocument(
      <RadarExplainer show={ true }/>
    );
    findRenderedComponentWithType(instance, TriangleExplainer);
    instance.state.currentPaneIndex.should.eql(0);
    const rightNavigationElm = findRenderedDOMComponentWithClass(instance, 'test--radar-explainer-navigation-right');
    Simulate.click(rightNavigationElm);
    Simulate.click(rightNavigationElm);
    instance.state.currentPaneIndex.should.eql(2);
    findRenderedComponentWithType(instance, PercentilesByYearExplainer);
  });

  it('should call closeHandler when click to close button', function () {
    const closeHandler = spy();
    instance = renderIntoDocument(
      <RadarExplainer closeHandler={ closeHandler } show={ true }/>
    );
    const closeBtn = findRenderedDOMComponentWithClass(instance, 'test--radar-explainer-close-button');
    Simulate.click(closeBtn);
    closeHandler.called.should.be.true();
  });
});
