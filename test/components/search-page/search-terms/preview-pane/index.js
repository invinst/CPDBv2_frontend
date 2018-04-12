import React from 'react';
import {
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  renderIntoDocument,
  Simulate,
} from 'react-addons-test-utils';

import { stub } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import PreviewPane from 'components/search-page/search-terms/preview-pane';
import CallToAction from 'components/search-page/search-terms/preview-pane/call-to-action';
import SlideMotion from 'components/animation/slide-motion';
import { browserHistory } from 'react-router';


describe('PreviewPane component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable if focused item has name', function () {
    PreviewPane.should.be.renderable({ item: { name: 'some name' } });
  });

  it('should render correctly', function () {
    const name = 'item name';
    const description = 'some description';
    const item = {
      id: name,
      name,
      description
    };

    instance = renderIntoDocument(<PreviewPane item={ item }/>);

    const titleComponent = findRenderedDOMComponentWithClass(instance, 'test--preview-pane-title');
    titleComponent.textContent.should.eql(name);

    const descriptionComponent = findRenderedDOMComponentWithClass(instance, 'test--preview-pane-description');
    descriptionComponent.textContent.should.eql(description);

    const callToAction = findRenderedComponentWithType(instance, CallToAction);
    callToAction.should.be.ok();
  });

  it('should render SlideMotion with show property is true when item.name is not empty', function () {
    const name = 'item name';
    const description = 'some description';
    const item = {
      id: name,
      name,
      description
    };
    instance = renderIntoDocument(<PreviewPane item={ item }/>);

    const slideMotion = findRenderedComponentWithType(instance, SlideMotion);
    slideMotion.props.show.should.eql(true);
  });

  it('should render SlideMotion with show property is false when item.name is empty', function () {
    const item = {
      id: '',
      name: ''
    };
    instance = renderIntoDocument(<PreviewPane item={ item }/>);

    const slideMotion = findRenderedComponentWithType(instance, SlideMotion);
    slideMotion.props.show.should.eql(false);
  });

  it('should call browserHistory.push method when click to CallToAction', function () {
    let stubBrowserHistory = stub(browserHistory, 'push');
    instance = renderIntoDocument(
      <PreviewPane
        item={ { to: 'xxx', id: 'community', name: 'name', 'call_to_action_type': 'view_all' } }
      />
    );
    const instanceDOM = findRenderedDOMComponentWithClass(instance, 'test--enter-button');
    Simulate.click(instanceDOM);

    stubBrowserHistory.calledWith('xxx').should.be.true();
    stubBrowserHistory.restore();
  });
});
