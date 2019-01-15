import React from 'react';
import {
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  renderIntoDocument,
} from 'react-addons-test-utils';


import { unmountComponentSuppressError } from 'utils/test';
import SearchTermItemPane from 'components/search-page/preview-pane/search-term-item-pane';
import CallToAction from 'components/search-page/preview-pane/search-term-item-pane/call-to-action';
import SlideMotion from 'components/animation/slide-motion';


describe('SearchTermItemPane component', function () {
  let instance;
  const name = 'item name';
  const description = 'some description';

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should be renderable if focused item has name', function () {
    SearchTermItemPane.should.be.renderable({ name: 'some name' });
  });

  it('should render correctly', function () {
    instance = renderIntoDocument(<SearchTermItemPane name={ name } description={ description } id={ name }/>);

    const titleComponent = findRenderedDOMComponentWithClass(instance, 'test--preview-pane-title');
    titleComponent.textContent.should.eql('item name');

    const descriptionComponent = findRenderedDOMComponentWithClass(instance, 'test--preview-pane-description');
    descriptionComponent.textContent.should.eql('some description');

    const callToAction = findRenderedComponentWithType(instance, CallToAction);
    callToAction.should.be.ok();
  });

  it('should render SlideMotion with show property is true when name is not empty', function () {
    instance = renderIntoDocument(<SearchTermItemPane name={ name } description={ description } id={ name }/>);

    const slideMotion = findRenderedComponentWithType(instance, SlideMotion);
    slideMotion.props.show.should.eql(true);
  });

  it('should render SlideMotion with show property is false when name is empty', function () {
    instance = renderIntoDocument(<SearchTermItemPane name='' id=''/>);

    const slideMotion = findRenderedComponentWithType(instance, SlideMotion);
    slideMotion.props.show.should.eql(false);
  });
});
