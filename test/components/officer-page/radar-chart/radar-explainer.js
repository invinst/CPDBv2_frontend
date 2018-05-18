import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
  Simulate,
} from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

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

  it('should only render Question Mark as default', function () {
    instance = renderIntoDocument(<RadarExplainer/>);
    instance.state.show.should.be.false();
    scryRenderedDOMComponentsWithClass(instance, 'test--radar-explainer-window').should.have.length(0);
    findRenderedDOMComponentWithClass(instance, 'test--radar-explainer-toggle-button').textContent.should.eql('?');
  });

  describe('clicking Question mark', function () {
    let questionMarkElement;
    beforeEach(function () {
      instance = renderIntoDocument(<RadarExplainer/>);

      questionMarkElement = findRenderedDOMComponentWithClass(instance, 'test--radar-explainer-toggle-button');
      Simulate.click(questionMarkElement);
    });

    it('should render TriangleExplainer and change button "?" to "X" as default', function () {
      instance.state.show.should.be.true();
      questionMarkElement.textContent.should.eql('X');

      findRenderedComponentWithType(instance, LeftNavigation);
      findRenderedComponentWithType(instance, RightNavigation);
      findRenderedComponentWithType(instance, TriangleExplainer);

      const instanceDOM = findDOMNode(instance);
      instanceDOM.textContent.should.containEql('What is the scale?');
      instanceDOM.textContent.should.containEql('Percentiles by year');
    });

    it('should change to ScaleExplainer when click to RightNavigation', function () {

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

    it('should change back to PercentilesByYear when click to RightNavigation two times', function () {

      findRenderedComponentWithType(instance, TriangleExplainer);
      instance.state.currentPaneIndex.should.eql(0);
      const rightNavigationElm = findRenderedDOMComponentWithClass(instance, 'test--radar-explainer-navigation-right');
      Simulate.click(rightNavigationElm);
      Simulate.click(rightNavigationElm);
      instance.state.currentPaneIndex.should.eql(2);
      findRenderedComponentWithType(instance, PercentilesByYearExplainer);
    });
  });
});
